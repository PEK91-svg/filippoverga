-- Migration script per Supabase PostgreSQL
-- NormaPreventivi — Schema Dati, RLS Policies e Seed Tassonomia

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. WorkCategory (Tassonomia a 20 Categorie)
CREATE TABLE public.work_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) NOT NULL UNIQUE,
    name TEXT NOT NULL,
    parent_id UUID REFERENCES public.work_categories(id),
    typical_unit VARCHAR(20) NOT NULL,
    description TEXT
);

-- 2. Projects (Cantieri dell'utente)
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    surface_sqm NUMERIC(10, 2) NOT NULL,
    location_city TEXT NOT NULL,
    location_province VARCHAR(5) NOT NULL,
    intervention_type VARCHAR(100) NOT NULL,
    is_prima_casa BOOLEAN NOT NULL DEFAULT true,
    budget_target NUMERIC(12, 2),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. ProjectDocuments (Planimetrie, capitolati, relazioni)
CREATE TABLE public.project_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    kind VARCHAR(50) NOT NULL,
    extracted_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Quotes (Preventivi)
CREATE TABLE public.quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    vendor_name TEXT NOT NULL,
    vendor_vat VARCHAR(20),
    vendor_type TEXT,
    quote_date DATE,
    validity_days INT DEFAULT 30,
    storage_path TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'uploaded',
    raw_total_net NUMERIC(12, 2),
    raw_total_vat NUMERIC(12, 2),
    raw_total_gross NUMERIC(12, 2),
    payment_terms JSONB,
    duration_days INT,
    penalty_clause TEXT,
    warranty_months INT DEFAULT 12,
    extraction_confidence NUMERIC(3, 2),
    source VARCHAR(30) NOT NULL DEFAULT 'uploaded_pdf',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CanonicalItems (Voci unificate a livello di progetto)
CREATE TABLE public.canonical_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.work_categories(id),
    canonical_description TEXT NOT NULL,
    consensus_quantity NUMERIC(10, 2),
    consensus_unit VARCHAR(20),
    present_in_quote_ids UUID[] DEFAULT '{}',
    missing_from_quote_ids UUID[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. LineItems (Voci estratte dal preventivo)
CREATE TABLE public.line_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
    raw_description TEXT NOT NULL,
    category_id UUID REFERENCES public.work_categories(id),
    quantity NUMERIC(10, 2),
    unit VARCHAR(20),
    unit_price NUMERIC(12, 2),
    total_price NUMERIC(12, 2) NOT NULL,
    vat_rate NUMERIC(4, 2),
    pricing_mode VARCHAR(20) NOT NULL DEFAULT 'a_misura',
    is_optional BOOLEAN NOT NULL DEFAULT false,
    includes_materials BOOLEAN,
    includes_labor BOOLEAN,
    confidence NUMERIC(3, 2) NOT NULL DEFAULT 1.0,
    canonical_item_id UUID REFERENCES public.canonical_items(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Flags (Anomalie rilevate)
CREATE TABLE public.flags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
    line_item_id UUID REFERENCES public.line_items(id) ON DELETE CASCADE,
    severity VARCHAR(20) NOT NULL,
    rule_code VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    evidence TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. PriceBenchmarks (Aggregati anonimizzati)
CREATE TABLE public.price_benchmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES public.work_categories(id),
    province VARCHAR(5) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    p25 NUMERIC(10, 2) NOT NULL,
    p50 NUMERIC(10, 2) NOT NULL,
    p75 NUMERIC(10, 2) NOT NULL,
    sample_size INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. TaxIncentives (Modulo Detrazioni edili)
CREATE TABLE public.tax_incentives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name TEXT NOT NULL,
    rate NUMERIC(5, 2) NOT NULL,
    cap_amount NUMERIC(12, 2) NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    requires_prima_casa BOOLEAN NOT NULL DEFAULT false,
    applicable_categories TEXT[] DEFAULT '{}',
    law_reference TEXT NOT NULL
);

-- 10. Capitolati (MIGRATION ONLY - FASE 2)
CREATE TABLE public.capitolati (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    generated_items JSONB NOT NULL,
    published_at TIMESTAMPTZ,
    share_token TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. CapitolatoResponses (MIGRATION ONLY - FASE 2)
CREATE TABLE public.capitolato_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    capitolato_id UUID NOT NULL REFERENCES public.capitolati(id) ON DELETE CASCADE,
    vendor_email TEXT NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS POLICIES (Row Level Security Strict)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own projects" 
ON public.projects FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage documents of their projects" 
ON public.project_documents FOR ALL 
USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage quotes of their projects" 
ON public.quotes FOR ALL 
USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage canonical items of their projects" 
ON public.canonical_items FOR ALL 
USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage line items of their quotes" 
ON public.line_items FOR ALL 
USING (quote_id IN (
    SELECT q.id FROM public.quotes q 
    JOIN public.projects p ON q.project_id = p.id 
    WHERE p.user_id = auth.uid()
));

CREATE POLICY "Users can manage flags of their quotes" 
ON public.flags FOR ALL 
USING (quote_id IN (
    SELECT q.id FROM public.quotes q 
    JOIN public.projects p ON q.project_id = p.id 
    WHERE p.user_id = auth.uid()
));

-- SEED TASSONOMIA (01 - 20)
INSERT INTO public.work_categories (code, name, typical_unit, description) VALUES
('01', 'Allestimento cantiere, ponteggi e oneri sicurezza', 'corpo', 'Recinzioni, protezione parti comuni e POS'),
('02', 'Demolizioni, rimozioni e smontaggi', 'mq', 'Demolizione tramezzi e pavimenti'),
('03', 'Smaltimento in discarica e trasporti', 'mc', 'Cariaggio, carico e trasporto a discarica'),
('04', 'Opere murarie, tramezzature, strutturali', 'mq', 'Costruzione nuovi tramezzi intonacati'),
('05', 'Impianto idrico-sanitario e scarichi', 'cad', 'Punti acqua, collettori e colonne scarico'),
('06', 'Impianto elettrico, dati, domotica', 'cad', 'Punti luce, prese e certificazione CEI 64-8'),
('07', 'Impianto termico, climatizzazione, VMC', 'corpo', 'Pompa di calore, split e riscaldamento'),
('08', 'Massetti, sottofondi, impermeabilizzazioni', 'mq', 'Massetti cementizi e guaine impermeabili'),
('09', 'Pavimenti e rivestimenti (posa)', 'mq', 'Manodopera e collanti per posa piastrelle/parquet'),
('10', 'Fornitura pavimenti e rivestimenti', 'mq', 'Fornitura piastrelle e parquet'),
('11', 'Serramenti esterni e oscuranti', 'cad', 'Finestre PVC/alluminio e tapparelle motorizzate'),
('12', 'Porte interne', 'cad', 'Fornitura e posa porte a battente o scorrevoli'),
('13', 'Cartongesso e controsoffitti', 'mq', 'Controsoffitti fonoassorbenti e velette'),
('14', 'Intonaci, rasature, tinteggiature', 'mq', 'Rasatura e tinteggiatura lavabile'),
('15', 'Sanitari, rubinetteria, arredo bagno', 'cad', 'Fornitura e posa sanitari e miscelatori'),
('16', 'Opere da fabbro e falegname', 'corpo', 'Porta blindata e inferriate'),
('17', 'Progettazione, pratiche edilizie, DL, APE, accatastamento', 'corpo', 'Pratica CILA/SCIA, DL e DOCFA'),
('18', 'Pulizie finali e consegna', 'corpo', 'Pulizia profonda post-cantiere'),
('19', 'Spese generali e utile d’impresa', 'corpo', 'Quota forfettaria spese generali e margine'),
('20', 'Voci non classificabili', 'corpo', 'Voci ambigue o con confidence < 0.6');
