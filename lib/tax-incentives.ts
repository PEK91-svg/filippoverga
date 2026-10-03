/**
 * Agevolazioni edilizie usate dal simulatore, anno d'imposta 2026.
 *
 * Unica fonte di aliquote, tetti e numero di quote. Le pagine non devono
 * riscrivere questi numeri.
 *
 * Fonti usate per aliquote e tetto di spesa del bonus ristrutturazione:
 * - Agenzia delle Entrate, Guida «Ristrutturazioni edilizie», febbraio 2026
 *   (spese 2025-2026: 50% abitazione principale e 36% negli altri casi,
 *   limite di spesa agevolabile 96.000 € per unità immobiliare);
 * - art. 16-bis del TUIR e art. 16, comma 1, D.L. 63/2013, come modificati
 *   dall'art. 1, comma 22, della legge 30 dicembre 2025, n. 199.
 * Le quote sono dieci dal 1° gennaio 2024 (art. 4-bis, commi 4 e 5, L. 67/2024).
 *
 * TODO(owner): non è applicato il tetto complessivo degli oneri detraibili
 * dell'art. 16-ter del TUIR per i redditi sopra 75.000 € (L. 207/2024).
 * TODO(owner): non è verificato il requisito di abitazione principale
 * (dimora abituale all'inizio o alla fine dei lavori) né la titolarità
 * del diritto reale. La card scelta dall'utente decide l'aliquota.
 * TODO(owner): `applicableCategories` è solo descrittivo. Il simulatore
 * applica l'agevolazione all'intero importo indicato, senza scorporare
 * le lavorazioni escluse.
 */

/**
 * IVA forfettaria per passare dall'imponibile del preventivo alla spesa
 * su cui si calcola la detrazione (la detrazione compete sulla spesa
 * sostenuta, IVA compresa).
 *
 * TODO(owner): il 10% è l'aliquota tipica delle ristrutturazioni, non il
 * lordo reale del cantiere. Restano fuori l'IVA al 22% sull'eccedenza dei
 * beni significativi e su alcune prestazioni professionali (per esempio la
 * CILA nel preventivo demo è al 22%).
 */
export const ASSUMED_RENOVATION_VAT_RATE = 0.1;

export type TaxCapKind = 'eligible_expense' | 'max_deduction';

export interface TaxIncentiveRule {
  code: string;
  name: string;
  /** Aliquota di detrazione in punti percentuali. 50 significa 50%. */
  ratePercent: number;
  /**
   * Importo del tetto, in euro.
   * `eligible_expense`: spesa massima su cui si applica l'aliquota.
   * `max_deduction`: tetto della detrazione già calcolata.
   */
  capAmount: number;
  capKind: TaxCapKind;
  /** Etichetta del tetto, mostrata nella card di scelta. */
  capLabel: string;
  /** Quote annuali costanti in dichiarazione dei redditi. */
  installmentYears: number;
  validFrom: string;
  validTo: string;
  requiresPrimaCasa: boolean;
  /** Codici tassonomia a cui l'agevolazione è pensata. Non filtrano il calcolo. */
  applicableCategories: string[];
  lawReference: string;
}

export const TAX_INCENTIVE_CODES = {
  bonusCasaAbitazionePrincipale: 'BONUS_CASA_50',
  bonusCasaAltriImmobili: 'BONUS_CASA_36',
  ecobonusAbitazionePrincipale: 'ECOBONUS_ABITAZIONE_PRINCIPALE',
} as const;

export const TAX_INCENTIVES_2026: readonly TaxIncentiveRule[] = [
  {
    code: TAX_INCENTIVE_CODES.bonusCasaAbitazionePrincipale,
    name: 'Bonus ristrutturazione 50% — abitazione principale',
    ratePercent: 50,
    capAmount: 96_000,
    capKind: 'eligible_expense',
    capLabel: 'Tetto spesa',
    installmentYears: 10,
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    requiresPrimaCasa: true,
    applicableCategories: ['02', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '17'],
    lawReference:
      'Art. 16-bis TUIR e art. 16, c. 1, D.L. 63/2013 — art. 1, c. 22, L. 199/2025',
  },
  {
    code: TAX_INCENTIVE_CODES.bonusCasaAltriImmobili,
    name: 'Bonus ristrutturazione 36% — altri immobili',
    ratePercent: 36,
    // Guida AdE febbraio 2026: anche il 36% ha tetto di spesa 96.000 € nel 2026.
    // Il tetto di 48.000 € riguarda gli anni dal 2028, non il 2026.
    capAmount: 96_000,
    capKind: 'eligible_expense',
    capLabel: 'Tetto spesa',
    installmentYears: 10,
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    requiresPrimaCasa: false,
    applicableCategories: ['02', '04', '05', '06', '08', '09', '14'],
    lawReference:
      'Art. 16-bis TUIR e art. 16, c. 1, D.L. 63/2013 — art. 1, c. 22, L. 199/2025',
  },
  {
    code: TAX_INCENTIVE_CODES.ecobonusAbitazionePrincipale,
    name: 'Ecobonus 2026 — abitazione principale',
    // Nel 2026 l'aliquota ordinaria non è più il 65%: 50% sull'abitazione
    // principale, 36% negli altri casi (art. 14 D.L. 63/2013, come modificato
    // dall'art. 1, c. 22, L. 199/2025).
    ratePercent: 50,
    /**
     * TODO(owner): 100.000 € è il limite MASSIMO DI DETRAZIONE della sola
     * riqualificazione energetica globale, non un tetto di spesa valido per
     * ogni intervento di ecobonus. Altri massimali di detrazione (guida
     * IPSOA / art. 14 D.L. 63/2013): 60.000 € involucro, infissi e schermature;
     * 30.000 € pompe di calore e scaldacqua; 15.000 € building automation.
     * Restano fuori anche i costi massimi unitari del D.M. 14 febbraio 2022
     * e l'esclusione, dal 2025, delle caldaie uniche a combustibili fossili.
     * Confermare se questa card deve restare sulla riqualificazione globale.
     */
    capAmount: 100_000,
    capKind: 'max_deduction',
    capLabel: 'Detrazione massima',
    installmentYears: 10,
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    requiresPrimaCasa: true,
    applicableCategories: ['07', '11'],
    lawReference:
      'Art. 14 D.L. 63/2013 — aliquota 2026 da art. 1, c. 22, L. 199/2025',
  },
];

export interface TaxDeductionEstimate {
  incentive: TaxIncentiveRule;
  /** Spesa lorda stimata prima del tetto (imponibile + IVA forfettaria). */
  grossExpense: number;
  /** Spesa su cui si applica l'aliquota, dopo un eventuale tetto di spesa. */
  eligibleExpense: number;
  totalDeduction: number;
  annualInstallment: number;
  expenseCapped: boolean;
  deductionCapped: boolean;
}

export function getTaxIncentive(code: string): TaxIncentiveRule | undefined {
  return TAX_INCENTIVES_2026.find((incentive) => incentive.code === code);
}

function roundCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Stima la detrazione IRPEF per l'agevolazione scelta.
 * `netAmount` è l'imponibile dei lavori, non la spesa già ivata.
 */
export function estimateTaxDeduction(netAmount: number, incentiveCode: string): TaxDeductionEstimate {
  const incentive = getTaxIncentive(incentiveCode);
  if (!incentive) {
    throw new Error(`Agevolazione sconosciuta: ${incentiveCode}`);
  }

  if (!Number.isFinite(netAmount) || netAmount <= 0) {
    return {
      incentive,
      grossExpense: 0,
      eligibleExpense: 0,
      totalDeduction: 0,
      annualInstallment: 0,
      expenseCapped: false,
      deductionCapped: false,
    };
  }

  const grossExpense = roundCents(netAmount * (1 + ASSUMED_RENOVATION_VAT_RATE));
  const rate = incentive.ratePercent / 100;

  if (incentive.capKind === 'eligible_expense') {
    const expenseCapped = grossExpense > incentive.capAmount;
    const eligibleExpense = expenseCapped ? incentive.capAmount : grossExpense;
    const totalDeduction = roundCents(eligibleExpense * rate);
    return {
      incentive,
      grossExpense,
      eligibleExpense,
      totalDeduction,
      annualInstallment: roundCents(totalDeduction / incentive.installmentYears),
      expenseCapped,
      deductionCapped: false,
    };
  }

  const rawDeduction = grossExpense * rate;
  const deductionCapped = rawDeduction > incentive.capAmount;
  const totalDeduction = roundCents(deductionCapped ? incentive.capAmount : rawDeduction);
  return {
    incentive,
    grossExpense,
    eligibleExpense: grossExpense,
    totalDeduction,
    annualInstallment: roundCents(totalDeduction / incentive.installmentYears),
    expenseCapped: false,
    deductionCapped,
  };
}
