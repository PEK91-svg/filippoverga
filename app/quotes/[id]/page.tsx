'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  ChevronRight, 
  Scale
} from 'lucide-react';
import { MOCK_QUOTES, MOCK_FLAGS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function SingleQuoteReportPage() {
  const params = useParams();
  const quoteId = (params?.id as string) || 'quote-b';
  
  const quote = MOCK_QUOTES.find(q => q.id === quoteId) || MOCK_QUOTES[1];
  const flags = MOCK_FLAGS.filter(f => f.quote_id === quote.id);

  const criticalFlags = flags.filter(f => f.severity === 'critical');
  const warningFlags = flags.filter(f => f.severity === 'warning');

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-stone-500 font-bold mb-1">
            <Link href="/area-personale" className="hover:underline">I Miei Cantieri</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/projects/${quote.project_id}`} className="hover:underline">Cantiere #01</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-black text-[#FF6B00]">Report Preventivo</span>
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Report Analisi & Flag Engine — {quote.vendor_name}
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-medium">
            Valutazione contrattuale, anomalie fiscali e riscontro rispetto ai benchmark provinciali.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <Link href={`/quotes/${quote.id}/review`}>
            <button className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors">
              Revisiona Voci
            </button>
          </Link>
          <Link href={`/projects/${quote.project_id}/compare`}>
            <button className="px-4 py-2 bg-gradient-to-r from-[#FF6B00] to-[#FA5D00] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center space-x-1">
              <Scale className="w-4 h-4" />
              <span>Matrice Confronto</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="gem-card p-5">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Totale Dichiarato (Netto)</div>
          <div className="text-2xl font-black text-stone-900 mt-1 tabular-numbers">{formatCurrency(quote.raw_total_net)}</div>
          <div className="text-[11px] text-stone-500 mt-0.5 font-medium">Lordo: {formatCurrency(quote.raw_total_gross)}</div>
        </div>

        <div className="gem-card p-5 border-t-4 border-t-[#FF6B00]">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Totale a Parità di Scope</div>
          <div className="text-2xl font-black text-stone-950 mt-1 tabular-numbers">{formatCurrency(quote.scope_adjusted_net)}</div>
          <div className="text-[11px] text-rose-700 font-bold mt-0.5">
            + {formatCurrency(quote.scope_adjusted_net - quote.raw_total_net)} omissioni
          </div>
        </div>

        <div className="gem-card p-5">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Termini Pagamento</div>
          <div className="text-lg font-black text-stone-900 mt-1">
            Acconto {quote.payment_terms.acconto_pct}%
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5 font-medium">
            SAL: {quote.payment_terms.sal.join('+')}% • Saldo: {quote.payment_terms.saldo_pct}%
          </div>
        </div>

        <div className="gem-card p-5">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Anomalie Rilevate</div>
          <div className="text-2xl font-black text-rose-700 mt-1">
            {flags.length} Flag
          </div>
          <div className="text-[11px] text-rose-600 font-semibold mt-0.5">
            {criticalFlags.length} critici • {warningFlags.length} warning
          </div>
        </div>

      </div>

      {/* FLAG ENGINE DETERMINISTIC SECTION */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-stone-900">Rilievi Deterministici & Contrattuali</h2>
            <p className="text-xs text-stone-500 font-medium">
              Regole deterministiche eseguite sui dati estratti dal documento PDF.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {flags.map((flag) => {
            const isCritical = flag.severity === 'critical';
            const isWarning = flag.severity === 'warning';

            return (
              <div 
                key={flag.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCritical 
                    ? 'bg-rose-50/70 border-rose-200 text-rose-950' 
                    : isWarning 
                      ? 'bg-orange-50/70 border-orange-200 text-orange-950' 
                      : 'bg-stone-50 border-stone-200 text-stone-900'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 shrink-0">
                    {isCritical ? (
                      <ShieldAlert className="w-5 h-5 text-rose-600" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-5 h-5 text-[#FF6B00]" />
                    ) : (
                      <Info className="w-5 h-5 text-stone-500" />
                    )}
                  </div>

                  <div className="space-y-1 text-xs font-medium">
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-sm">{flag.message}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isCritical ? 'bg-rose-200 text-rose-900' : isWarning ? 'bg-orange-200 text-orange-950' : 'bg-stone-200 text-stone-800'
                      }`}>
                        {flag.rule_code}
                      </span>
                    </div>

                    <p className="text-stone-700 leading-relaxed pt-1">
                      <strong>Evidenza:</strong> {flag.evidence}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
