export type PropertyType = 'appartamento' | 'villa' | 'locale_commerciale';

export type InterventionType = 
  | 'manutenzione_ordinaria'
  | 'manutenzione_straordinaria'
  | 'restauro_risanamento'
  | 'ristrutturazione_edilizia';

export type QuoteStatus = 'uploaded' | 'extracting' | 'extracted' | 'extraction_failed' | 'reviewed';

export type UnitType = 'mq' | 'ml' | 'mc' | 'cad' | 'corpo' | 'kg' | 'ora' | 'giorno';

export type PricingMode = 'a_misura' | 'a_corpo';

export type FlagSeverity = 'critical' | 'warning' | 'info';

export interface Project {
  id: string;
  user_id: string;
  name: string;
  property_type: PropertyType;
  surface_sqm: number;
  location_city: string;
  location_province: string;
  intervention_type: InterventionType;
  is_prima_casa: boolean;
  budget_target: number;
  notes?: string;
  created_at: string;
}

export interface ProjectDocument {
  id: string;
  project_id: string;
  storage_path: string;
  kind: 'planimetria' | 'relazione' | 'foto' | 'capitolato';
  extracted_text?: string;
  created_at: string;
}

export interface PaymentTerms {
  acconto_pct: number;
  sal: number[]; // e.g. [30, 30, 30]
  saldo_pct: number;
}

export interface Quote {
  id: string;
  project_id: string;
  vendor_name: string;
  vendor_vat: string;
  vendor_type: string;
  quote_date: string;
  validity_days: number;
  storage_path: string;
  status: QuoteStatus;
  raw_total_net: number;
  raw_total_vat: number;
  raw_total_gross: number;
  scope_adjusted_net: number;
  scope_adjusted_gross: number;
  payment_terms: PaymentTerms;
  duration_days: number;
  penalty_clause: string | null;
  warranty_months: number;
  extraction_confidence: number;
  source: 'uploaded_pdf' | 'capitolato_response';
  created_at: string;
}

export interface WorkCategory {
  id: string;
  code: string; // e.g. "01", "02", ... "20"
  name: string;
  parent_id?: string;
  typical_unit: UnitType;
  description: string;
}

export interface LineItem {
  id: string;
  quote_id: string;
  raw_description: string;
  category_id: string;
  category_code: string;
  quantity: number | null;
  unit: UnitType | null;
  unit_price: number | null;
  total_price: number;
  vat_rate: number | null; // 4, 10, 22
  pricing_mode: PricingMode;
  is_optional: boolean;
  includes_materials: boolean | null;
  includes_labor: boolean | null;
  confidence: number;
  canonical_item_id?: string;
  page_number?: number;
}

export interface CanonicalItem {
  id: string;
  project_id: string;
  category_id: string;
  category_code: string;
  canonical_description: string;
  consensus_quantity: number;
  consensus_unit: UnitType;
  present_in_quote_ids: string[];
  missing_from_quote_ids: string[];
  line_item_map: Record<string, LineItem>; // quote_id -> LineItem
  estimated_missing_price: number; // Median price across quotes that have it
}

export interface Flag {
  id: string;
  quote_id: string;
  line_item_id?: string | null;
  severity: FlagSeverity;
  rule_code: string;
  message: string;
  evidence: string;
  created_at: string;
}

export interface PriceBenchmark {
  id: string;
  category_id: string;
  province: string;
  unit: UnitType;
  p25: number;
  p50: number;
  p75: number;
  sample_size: number;
  updated_at: string;
}

export interface TaxIncentive {
  code: string;
  name: string;
  rate: number; // e.g. 50, 65, 36
  cap_amount: number; // e.g. 96000
  valid_from: string;
  valid_to: string;
  requires_prima_casa: boolean;
  applicable_categories: string[]; // category codes
  law_reference: string;
}
