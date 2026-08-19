import { Quote, Flag } from './types';
import { MOCK_QUOTES, MOCK_LINE_ITEMS, MOCK_CANONICAL_ITEMS, MOCK_FLAGS, MOCK_TAX_INCENTIVES } from './mock-data';

export interface ScopeAdjustmentDetail {
  canonical_id: string;
  category_code: string;
  description: string;
  estimated_price: number;
  reason: string;
}

export interface QuoteScopeAnalysis {
  quote: Quote;
  declared_net: number;
  declared_vat: number;
  declared_gross: number;
  scope_adjusted_net: number;
  scope_adjusted_gross: number;
  adjustments: ScopeAdjustmentDetail[];
  flags: Flag[];
  items_count: number;
}

export function analyzeQuoteScope(quoteId: string): QuoteScopeAnalysis | null {
  const quote = MOCK_QUOTES.find(q => q.id === quoteId);
  if (!quote) return null;

  const items = MOCK_LINE_ITEMS.filter(li => li.quote_id === quoteId);
  const flags = MOCK_FLAGS.filter(f => f.quote_id === quoteId);
  
  const adjustments: ScopeAdjustmentDetail[] = [];
  let addedMissingNet = 0;

  // Find canonical items where this quote is missing the work
  MOCK_CANONICAL_ITEMS.forEach(canon => {
    if (canon.missing_from_quote_ids.includes(quoteId)) {
      adjustments.push({
        canonical_id: canon.id,
        category_code: canon.category_code,
        description: canon.canonical_description,
        estimated_price: canon.estimated_missing_price,
        reason: `Lavorazione presente in altri preventivi ma omessa in ${quote.vendor_name}`
      });
      addedMissingNet += canon.estimated_missing_price;
    }
  });

  const scope_adjusted_net = quote.raw_total_net + addedMissingNet;
  const scope_adjusted_gross = Math.round(scope_adjusted_net * 1.10); // Standard 10% IVA for renovation

  return {
    quote,
    declared_net: quote.raw_total_net,
    declared_vat: quote.raw_total_vat,
    declared_gross: quote.raw_total_gross,
    scope_adjusted_net,
    scope_adjusted_gross,
    adjustments,
    flags,
    items_count: items.length
  };
}

export function calculateGoodsVatSplit(totalGoodsCost: number, totalLaborCost: number): {
  goodsAt10: number;
  goodsAt22: number;
  vat10Amount: number;
  vat22Amount: number;
  totalVat: number;
} {
  // Italian Tax Rule for "Beni Significativi":
  // The 10% reduced VAT applies to the value of significant goods ONLY up to the total labor cost value.
  // The excess value of the goods above the labor cost is subject to standard 22% VAT.
  const goodsAt10 = Math.min(totalGoodsCost, totalLaborCost);
  const goodsAt22 = Math.max(0, totalGoodsCost - goodsAt10);

  const vat10Amount = goodsAt10 * 0.10;
  const vat22Amount = goodsAt22 * 0.22;
  const totalVat = vat10Amount + vat22Amount;

  return {
    goodsAt10,
    goodsAt22,
    vat10Amount,
    vat22Amount,
    totalVat
  };
}

export function estimateTaxDeduction(projectNet: number, isPrimaCasa: boolean = true) {
  const incentive = MOCK_TAX_INCENTIVES.find(t => t.code === (isPrimaCasa ? 'BONUS_CASA_50' : 'BONUS_CASA_36')) || MOCK_TAX_INCENTIVES[0];
  const eligibleAmount = Math.min(projectNet * 1.10, incentive.cap_amount);
  const totalDeduction = (eligibleAmount * incentive.rate) / 100;
  const annualInstallment = totalDeduction / 10; // Split over 10 years in Italy

  return {
    incentive,
    eligibleAmount,
    totalDeduction,
    annualInstallment
  };
}
