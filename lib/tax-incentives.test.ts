import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  ASSUMED_RENOVATION_VAT_RATE,
  TAX_INCENTIVE_CODES,
  TAX_INCENTIVES_2026,
  estimateTaxDeduction,
  getTaxIncentive,
} from './tax-incentives';

const QUOTE_NET = 48_500;

describe('configurazione agevolazioni 2026', () => {
  it('definisce un solo elenco e copre i tre bonus selezionabili', () => {
    assert.equal(TAX_INCENTIVES_2026.length, 3);
    assert.deepEqual(
      TAX_INCENTIVES_2026.map((incentive) => incentive.code),
      [
        TAX_INCENTIVE_CODES.bonusCasaAbitazionePrincipale,
        TAX_INCENTIVE_CODES.bonusCasaAltriImmobili,
        TAX_INCENTIVE_CODES.ecobonusAbitazionePrincipale,
      ],
    );
  });

  it('usa le aliquote e i tetti del 2026, non il 65% né il tetto da 48.000 €', () => {
    const principale = getTaxIncentive(TAX_INCENTIVE_CODES.bonusCasaAbitazionePrincipale);
    const altri = getTaxIncentive(TAX_INCENTIVE_CODES.bonusCasaAltriImmobili);
    const ecobonus = getTaxIncentive(TAX_INCENTIVE_CODES.ecobonusAbitazionePrincipale);

    assert.ok(principale && altri && ecobonus);

    assert.equal(principale.ratePercent, 50);
    assert.equal(principale.capAmount, 96_000);
    assert.equal(principale.capKind, 'eligible_expense');
    assert.equal(principale.installmentYears, 10);

    assert.equal(altri.ratePercent, 36);
    assert.equal(altri.capAmount, 96_000);
    assert.equal(altri.capKind, 'eligible_expense');
    assert.equal(altri.installmentYears, 10);

    assert.equal(ecobonus.ratePercent, 50);
    assert.equal(ecobonus.capAmount, 100_000);
    assert.equal(ecobonus.capKind, 'max_deduction');
    assert.equal(ecobonus.installmentYears, 10);

    assert.equal(ASSUMED_RENOVATION_VAT_RATE, 0.1);
  });
});

describe('estimateTaxDeduction', () => {
  it('calcola il bonus casa 50% sull’imponibile del preventivo demo', () => {
    const result = estimateTaxDeduction(QUOTE_NET, TAX_INCENTIVE_CODES.bonusCasaAbitazionePrincipale);

    assert.equal(result.grossExpense, 53_350);
    assert.equal(result.eligibleExpense, 53_350);
    assert.equal(result.totalDeduction, 26_675);
    assert.equal(result.annualInstallment, 2_667.5);
    assert.equal(result.expenseCapped, false);
    assert.equal(result.incentive.ratePercent, 50);
  });

  it('applica il tetto di spesa di 96.000 € al bonus casa 50%', () => {
    const result = estimateTaxDeduction(100_000, TAX_INCENTIVE_CODES.bonusCasaAbitazionePrincipale);

    assert.equal(result.grossExpense, 110_000);
    assert.equal(result.eligibleExpense, 96_000);
    assert.equal(result.totalDeduction, 48_000);
    assert.equal(result.annualInstallment, 4_800);
    assert.equal(result.expenseCapped, true);
  });

  it('calcola il bonus casa 36% con la propria aliquota, non il 50%', () => {
    const result = estimateTaxDeduction(QUOTE_NET, TAX_INCENTIVE_CODES.bonusCasaAltriImmobili);

    assert.equal(result.grossExpense, 53_350);
    assert.equal(result.eligibleExpense, 53_350);
    assert.equal(result.totalDeduction, 19_206);
    assert.equal(result.annualInstallment, 1_920.6);
    assert.equal(result.incentive.ratePercent, 36);
  });

  it('usa 96.000 € anche per il 36%: una spesa tra 48.000 e 96.000 resta intera', () => {
    const result = estimateTaxDeduction(80_000, TAX_INCENTIVE_CODES.bonusCasaAltriImmobili);

    assert.equal(result.grossExpense, 88_000);
    assert.equal(result.eligibleExpense, 88_000);
    assert.equal(result.totalDeduction, 31_680);
    assert.equal(result.expenseCapped, false);
  });

  it('applica il tetto di spesa di 96.000 € anche al bonus casa 36%', () => {
    const result = estimateTaxDeduction(90_000, TAX_INCENTIVE_CODES.bonusCasaAltriImmobili);

    assert.equal(result.grossExpense, 99_000);
    assert.equal(result.eligibleExpense, 96_000);
    assert.equal(result.totalDeduction, 34_560);
    assert.equal(result.annualInstallment, 3_456);
    assert.equal(result.expenseCapped, true);
  });

  it('calcola l’ecobonus 2026 al 50% e non al 65%', () => {
    const result = estimateTaxDeduction(QUOTE_NET, TAX_INCENTIVE_CODES.ecobonusAbitazionePrincipale);

    assert.equal(result.incentive.ratePercent, 50);
    assert.equal(result.totalDeduction, 26_675);
    assert.equal(result.deductionCapped, false);
    assert.notEqual(result.totalDeduction, Math.round(53_350 * 0.65 * 100) / 100);
  });

  it('taglia l’ecobonus al massimale di detrazione di 100.000 €', () => {
    const result = estimateTaxDeduction(250_000, TAX_INCENTIVE_CODES.ecobonusAbitazionePrincipale);

    assert.equal(result.grossExpense, 275_000);
    assert.equal(result.eligibleExpense, 275_000);
    assert.equal(result.totalDeduction, 100_000);
    assert.equal(result.annualInstallment, 10_000);
    assert.equal(result.deductionCapped, true);
    assert.equal(result.expenseCapped, false);
  });

  it('cambia risultato al cambiare del bonus, a parità di imponibile', () => {
    const principale = estimateTaxDeduction(QUOTE_NET, TAX_INCENTIVE_CODES.bonusCasaAbitazionePrincipale);
    const altri = estimateTaxDeduction(QUOTE_NET, TAX_INCENTIVE_CODES.bonusCasaAltriImmobili);
    const sopraTetto = estimateTaxDeduction(250_000, TAX_INCENTIVE_CODES.bonusCasaAbitazionePrincipale);
    const ecobonusSopraTetto = estimateTaxDeduction(250_000, TAX_INCENTIVE_CODES.ecobonusAbitazionePrincipale);

    assert.notEqual(principale.totalDeduction, altri.totalDeduction);
    assert.notEqual(sopraTetto.totalDeduction, ecobonusSopraTetto.totalDeduction);
  });

  it('restituisce zero per importi non positivi e rifiuta un codice sconosciuto', () => {
    const zero = estimateTaxDeduction(0, TAX_INCENTIVE_CODES.bonusCasaAbitazionePrincipale);
    const negative = estimateTaxDeduction(-100, TAX_INCENTIVE_CODES.bonusCasaAltriImmobili);

    assert.equal(zero.totalDeduction, 0);
    assert.equal(negative.totalDeduction, 0);
    assert.throws(() => estimateTaxDeduction(10_000, 'ECOBONUS_65'), /Agevolazione sconosciuta/);
  });
});
