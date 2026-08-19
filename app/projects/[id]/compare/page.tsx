'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  Download, 
  ChevronRight, 
  Sparkles,
  X
} from 'lucide-react';
import { MOCK_PROJECT, MOCK_QUOTES, MOCK_CANONICAL_ITEMS } from '@/lib/mock-data';
import { WORK_TAXONOMY, getCategoryByCode } from '@/lib/taxonomy';
import { formatCurrency } from '@/lib/utils';
import { CanonicalItem } from '@/lib/types';

export default function CompareMatrixPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyDifferences, setShowOnlyDifferences] = useState<boolean>(false);
  const [isScopeAdjusted, setIsScopeAdjusted] = useState<boolean>(true); // Scope-Adjusted mode default ON
  const [includeOptionals, setIncludeOptionals] = useState<boolean>(false);
  const [selectedCanonical, setSelectedCanonical] = useState<CanonicalItem | null>(null);

  // Filter canonical items based on controls
  const filteredCanonicalItems = MOCK_CANONICAL_ITEMS.filter((item) => {
    if (selectedCategory !== 'all' && item.category_code !== selectedCategory) return false;
    if (showOnlyDifferences && item.missing_from_quote_ids.length === 0) return false;
    return true;
  });

  return (
    <div className="space-y-6 py-4">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold mb-1">
            <Link href="/area-personale" className="hover:underline">I Miei Cantieri</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/projects/${MOCK_PROJECT.id}`} className="hover:underline">{MOCK_PROJECT.name}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-black text-blue-600">Matrice di Confronto</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-3">
            <span>Matrice Comparativa a Parità di Scope</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200">
              3 Preventivi Riconciliati
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl font-medium">
            Riconciliazione automatica delle lavorazioni equivalenti ed evidenziazione immediata delle omissioni di capitolato.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <Link href={`/projects/${MOCK_PROJECT.id}/tax-export`}>
            <button className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4 text-blue-600" />
              <span>Esporta PDF / XLSX</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Control Toolbar: Scope Switcher + Category Filters */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          
          {/* THE CORE SWITCH: Declared Total vs Scope-Adjusted Total */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setIsScopeAdjusted(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isScopeAdjusted 
                  ? 'bg-white text-slate-950 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Totale Dichiarato (Grezzo)
            </button>
            <button
              onClick={() => setIsScopeAdjusted(true)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 ${
                isScopeAdjusted 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Totale a Parità di Scope (Consigliato)</span>
            </button>
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center space-x-4 text-xs font-bold text-slate-700">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={showOnlyDifferences}
                onChange={(e) => setShowOnlyDifferences(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Mostra solo differenze / omissioni</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={includeOptionals}
                onChange={(e) => setIncludeOptionals(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Includi opzionali</span>
            </label>
          </div>

        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tutte le Categorie ({MOCK_CANONICAL_ITEMS.length})
          </button>
          {WORK_TAXONOMY.filter(c => c.code !== '20').map((cat) => (
            <button
              key={cat.code}
              onClick={() => setSelectedCategory(cat.code)}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.code
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.code}. {cat.name.split(',')[0]}
            </button>
          ))}
        </div>

      </div>

      {/* COMPARISON MATRIX TABLE CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        
        {/* TOP FROZEN VENDOR CARDS (Sticky Quote Headers with Scope Adjustments) */}
        <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50/70 divide-x divide-slate-200">
          
          {/* Frozen Category/Work Header */}
          <div className="col-span-4 p-5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-black text-blue-600 uppercase tracking-wider">
                Voci di Capitolato Normalizzate
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">
                Mappatura su 20 Categorie Standard Prezzari Regionali
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono pt-2">
              Mostrate {filteredCanonicalItems.length} voci riconciliate
            </div>
          </div>

          {/* 3 Vendor Frozen Columns */}
          {MOCK_QUOTES.map((q) => {
            const hasOmissions = q.id === 'quote-b';
            const scopeDelta = q.scope_adjusted_net - q.raw_total_net;

            return (
              <div key={q.id} className="col-span-8 sm:col-span-4 lg:col-span-8/3 p-5 flex flex-col justify-between space-y-3">
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-sm text-slate-900">{q.vendor_name}</h3>
                    <div className="text-[11px] text-slate-500 font-mono">P.IVA {q.vendor_vat}</div>
                  </div>
                  <Link href={`/quotes/${q.id}`}>
                    <span className="text-[10px] text-blue-600 hover:underline font-black uppercase">
                      Report &rarr;
                    </span>
                  </Link>
                </div>

                {/* Totals Box with Animated Scope Adjustment */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200 space-y-1">
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>Dichiarato:</span>
                    <span className="font-semibold text-slate-700 tabular-numbers">{formatCurrency(q.raw_total_net)}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    {isScopeAdjusted ? (
                      <motion.div
                        key="scope-on"
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        className="pt-1 border-t border-slate-100"
                      >
                        <div className="flex justify-between items-center text-sm font-black text-slate-950">
                          <span className="flex items-center space-x-1">
                            <span>A Parità di Scope:</span>
                            {hasOmissions && (
                              <span className="w-2 h-2 rounded-full bg-rose-500" title="Contiene lavorazioni omesse reintegrate" />
                            )}
                          </span>
                          <span className="tabular-numbers text-slate-950">
                            {formatCurrency(q.scope_adjusted_net)}
                          </span>
                        </div>

                        {scopeDelta > 0 && (
                          <div className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded mt-1 flex justify-between">
                            <span>+ Omissioni reintegrate:</span>
                            <span>+{formatCurrency(scopeDelta)}</span>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="scope-off"
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        className="pt-1 border-t border-slate-100 flex justify-between font-black text-sm text-slate-900"
                      >
                        <span>Totale Grezzo:</span>
                        <span className="tabular-numbers">{formatCurrency(q.raw_total_net)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            );
          })}

        </div>

        {/* MATRIX ROWS: CANONICAL ITEMS & MATCHED LINE ITEMS */}
        <div className="divide-y divide-slate-200 text-xs font-medium">
          {filteredCanonicalItems.map((canonical) => {
            const cat = getCategoryByCode(canonical.category_code);
            const isOmittedInAny = canonical.missing_from_quote_ids.length > 0;

            return (
              <div 
                key={canonical.id} 
                className={`grid grid-cols-12 divide-x divide-slate-200 transition-colors ${
                  isOmittedInAny ? 'bg-amber-50/30 hover:bg-amber-50/50' : 'hover:bg-slate-50/60'
                }`}
              >
                
                {/* Column 1: Canonical Description & Category */}
                <div 
                  className="col-span-4 p-4 space-y-1.5 cursor-pointer"
                  onClick={() => setSelectedCanonical(canonical)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[10px] font-black">
                      {canonical.category_code}. {cat.name.split(',')[0]}
                    </span>
                    {isOmittedInAny && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 text-rose-600" />
                        <span>Omesso in {canonical.missing_from_quote_ids.length} preventivo</span>
                      </span>
                    )}
                  </div>

                  <div className="font-bold text-slate-900 leading-snug">
                    {canonical.canonical_description}
                  </div>

                  <div className="text-[11px] text-slate-500 font-mono">
                    Consenso: <strong>{canonical.consensus_quantity} {canonical.consensus_unit}</strong>
                  </div>
                </div>

                {/* Columns 2, 3, 4: Line Items for each quote */}
                {MOCK_QUOTES.map((q) => {
                  const lineItem = canonical.line_item_map[q.id];

                  return (
                    <div key={q.id} className="col-span-8 sm:col-span-4 lg:col-span-8/3 p-4 flex flex-col justify-between space-y-2">
                      {lineItem ? (
                        <div className="space-y-1">
                          <div className="text-slate-800 line-clamp-2 leading-relaxed">
                            {lineItem.raw_description}
                          </div>
                          <div className="flex justify-between items-center text-[11px] pt-1 text-slate-500">
                            <span>
                              {lineItem.quantity ?? '—'} {lineItem.unit} {lineItem.unit_price ? `× ${formatCurrency(lineItem.unit_price)}` : ''}
                            </span>
                            <span className="font-bold text-slate-900 tabular-numbers">
                              {formatCurrency(lineItem.total_price)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* OMITTED ITEM WARNING CELL */
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                          <div className="flex items-center space-x-1 text-[11px] font-black">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span>Lavorazione Omessa</span>
                          </div>
                          <div className="text-[10px] text-rose-700 leading-snug">
                            Non quotato nel documento originale.
                          </div>
                          {isScopeAdjusted && (
                            <div className="text-[10px] font-black text-rose-900 pt-1 border-t border-rose-200/60 flex justify-between">
                              <span>Stima Reintegrata:</span>
                              <span className="tabular-numbers">+{formatCurrency(canonical.estimated_missing_price)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

              </div>
            );
          })}
        </div>

      </div>

      {/* DETAIL MODAL FOR SELECTED CANONICAL ITEM */}
      <AnimatePresence>
        {selectedCanonical && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                    Dettaglio Voce Canonica
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    {selectedCanonical.canonical_description}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedCanonical(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-medium">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-slate-500">Categoria Tassonomia:</span>
                    <div className="font-bold text-slate-900">{getCategoryByCode(selectedCanonical.category_code).name}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Quantità di Consenso:</span>
                    <div className="font-bold text-slate-900">{selectedCanonical.consensus_quantity} {selectedCanonical.consensus_unit}</div>
                  </div>
                </div>

                <h4 className="font-black text-sm text-slate-900 pt-2">Voci Originali Estratte per Preventivo:</h4>
                
                <div className="space-y-3">
                  {MOCK_QUOTES.map((q) => {
                    const li = selectedCanonical.line_item_map[q.id];
                    return (
                      <div key={q.id} className="p-4 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-slate-900">{q.vendor_name}</span>
                          {li ? (
                            <span className="text-emerald-700">{formatCurrency(li.total_price)}</span>
                          ) : (
                            <span className="text-rose-700 font-bold">Omesso (Reintegrato a {formatCurrency(selectedCanonical.estimated_missing_price)})</span>
                          )}
                        </div>
                        {li && (
                          <div className="text-slate-600 bg-slate-50 p-2.5 rounded-xl font-mono text-[11px]">
                            &quot;{li.raw_description}&quot;
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedCanonical(null)}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs"
                >
                  Chiudi Dettaglio
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
