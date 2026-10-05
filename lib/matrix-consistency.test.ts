import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { MOCK_CANONICAL_ITEMS, MOCK_LINE_ITEMS, MOCK_QUOTES } from './mock-data';

const QUOTE_IDS = ['quote-a', 'quote-b', 'quote-c'] as const;
const OMISSION_VAT_RATE = 0.1;

function roundCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

describe('totali dei preventivi', () => {
  it('fa coincidere il dichiarato con la somma delle voci e l’IVA di riga', () => {
    for (const quote of MOCK_QUOTES) {
      const lines = MOCK_LINE_ITEMS.filter((line) => line.quote_id === quote.id);
      const net = roundCents(lines.reduce((sum, line) => sum + line.total_price, 0));
      const vat = roundCents(lines.reduce((sum, line) => sum + (line.total_price * (line.vat_rate ?? 0)) / 100, 0));

      assert.equal(quote.raw_total_net, net, quote.id);
      assert.equal(quote.raw_total_vat, vat, quote.id);
      assert.equal(quote.raw_total_gross, roundCents(net + vat), quote.id);
    }
  });

  it('fa coincidere lo scope con il dichiarato più le omissioni', () => {
    for (const quote of MOCK_QUOTES) {
      const omissions = MOCK_CANONICAL_ITEMS
        .filter((item) => item.missing_from_quote_ids.includes(quote.id))
        .reduce((sum, item) => sum + item.estimated_missing_price, 0);
      const scopeNet = roundCents(quote.raw_total_net + omissions);
      const scopeGross = roundCents(quote.raw_total_gross + omissions * (1 + OMISSION_VAT_RATE));

      assert.equal(quote.scope_adjusted_net, scopeNet, quote.id);
      assert.equal(quote.scope_adjusted_gross, scopeGross, quote.id);
    }
  });

  it('porta Rossi a 47.410 € di scope, non a 50.450 €', () => {
    const rossi = MOCK_QUOTES.find((quote) => quote.id === 'quote-b');
    assert.ok(rossi);
    assert.equal(rossi.raw_total_net, 36_200);
    assert.equal(rossi.scope_adjusted_net, 47_410);
    assert.equal(rossi.scope_adjusted_net - rossi.raw_total_net, 11_210);
  });
});

describe('celle della matrice', () => {
  it('mostra in ogni colonna la voce della stessa impresa e della stessa categoria', () => {
    for (const canonical of MOCK_CANONICAL_ITEMS) {
      const mappedIds = Object.keys(canonical.line_item_map);
      assert.deepEqual(
        [...mappedIds].sort(),
        [...canonical.present_in_quote_ids].sort(),
        canonical.id,
      );

      for (const quoteId of QUOTE_IDS) {
        const line = canonical.line_item_map[quoteId];
        const missing = canonical.missing_from_quote_ids.includes(quoteId);
        assert.equal(Boolean(line), !missing, `${canonical.id} ${quoteId}`);
        if (!line) continue;
        assert.equal(line.quote_id, quoteId, `${canonical.id} ${line.id}`);
        assert.equal(line.category_code, canonical.category_code, `${canonical.id} ${line.id}`);
      }
    }
  });

  it('aggancia la sicurezza di Lombarde alla sua voce di cantiere, non al parquet di un’altra impresa', () => {
    const safety = MOCK_CANONICAL_ITEMS.find((item) => item.category_code === '01');
    assert.ok(safety);
    const lombarde = safety.line_item_map['quote-c'];
    assert.ok(lombarde);
    assert.equal(lombarde.id, 'li-c-01');
    assert.equal(lombarde.quote_id, 'quote-c');
    assert.equal(lombarde.category_code, '01');
    assert.match(lombarde.raw_description, /cantiere/i);
  });

  it('inserisce ogni voce classificata in una sola cella', () => {
    const seen = new Map<string, string>();
    for (const canonical of MOCK_CANONICAL_ITEMS) {
      for (const line of Object.values(canonical.line_item_map)) {
        assert.equal(seen.has(line.id), false, line.id);
        seen.set(line.id, canonical.id);
      }
    }

    for (const line of MOCK_LINE_ITEMS) {
      if (line.category_code === '20') {
        assert.equal(seen.has(line.id), false, line.id);
      } else {
        assert.equal(seen.has(line.id), true, line.id);
      }
    }
  });
});

describe('griglia della matrice', () => {
  it('usa quattro colonne da 3 su 12 e non la classe frazionaria invalida', () => {
    const source = readFileSync(new URL('../app/projects/[id]/compare/page.tsx', import.meta.url), 'utf8');
    assert.equal(source.includes('col-span-8/3'), false);
    assert.equal(source.includes('lg:col-span-3'), true);
    assert.equal((source.match(/lg:col-span-3/g) ?? []).length, 4);
  });
});
