'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Check, 
  FileText, 
  ChevronRight
} from 'lucide-react';
import { MOCK_QUOTES, MOCK_LINE_ITEMS } from '@/lib/mock-data';
import { WORK_TAXONOMY, getCategoryByCode } from '@/lib/taxonomy';
import { formatCurrency } from '@/lib/utils';
import { LineItem } from '@/lib/types';

export default function ExtractionReviewPage() {
  const router = useRouter();
  const quote = MOCK_QUOTES[1]; // Impresa Edile Rossi & Figli (contains low confidence Cat 20 item)
  const [items, setItems] = useState<LineItem[]>(
    MOCK_LINE_ITEMS.filter(li => li.quote_id === quote.id)
  );

  const handleCategoryChange = (lineId: string, newCatCode: string) => {
    const cat = getCategoryByCode(newCatCode);
    setItems(items.map(item => {
      if (item.id === lineId) {
        return {
          ...item,
          category_code: newCatCode,
          category_id: cat.id,
          confidence: 1.0 // User confirmed!
        };
      }
      return item;
    }));
  };

  const handleConfirmReview = () => {
    router.push(`/projects/${quote.project_id}/compare`);
  };

  const lowConfidenceCount = items.filter(i => i.confidence < 0.6 || i.category_code === '20').length;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-stone-500 font-bold mb-1">
            <Link href="/area-personale" className="hover:underline">I Miei Cantieri</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/quotes/${quote.id}`} className="hover:underline">{quote.vendor_name}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-black text-[#FF6B00]">Revisione Estrazione</span>
          </div>
          <h1 className="text-xl font-black text-stone-900 tracking-tight flex items-center space-x-2">
            <span>Revisione Voci Estratte — {quote.vendor_name}</span>
            {lowConfidenceCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-950 text-xs font-black flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{lowConfidenceCount} voce da verificare</span>
              </span>
            )}
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-medium">
            Verifica la corretta associazione tra le righe del PDF e le 20 categorie della tassonomia standard.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleConfirmReview}
            className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B00] to-[#FA5D00] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Conferma & Vai alla Matrice</span>
          </motion.button>
        </div>
      </div>

      {/* Side-by-Side View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Extracted Line Items List */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h2 className="text-sm font-black text-stone-900">Voci Estratte dall&apos;AI ({items.length})</h2>
            <span className="text-[11px] text-stone-500 font-mono">Modifica la categoria per correggere</span>
          </div>

          <div className="space-y-3 divide-y divide-stone-100 text-xs font-medium">
            {items.map((item, idx) => {
              const isLowConfidence = item.confidence < 0.6 || item.category_code === '20';

              return (
                <div 
                  key={item.id}
                  className={`pt-3 space-y-2 p-3 rounded-2xl transition-all ${
                    isLowConfidence ? 'bg-orange-50/70 border border-orange-300 ring-2 ring-orange-400/20' : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-bold text-stone-400">#{idx + 1}</span>
                        {isLowConfidence && (
                          <span className="px-1.5 py-0.5 bg-orange-200 text-orange-950 rounded font-black text-[9px] uppercase tracking-wider">
                            Da Classificare (Cat. 20)
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-stone-900 leading-snug">
                        {item.raw_description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-black text-stone-900 text-sm tabular-numbers">
                        {formatCurrency(item.total_price)}
                      </div>
                      <div className="text-[11px] text-stone-500 font-medium">
                        {item.quantity ? `${item.quantity} ${item.unit}` : item.pricing_mode}
                      </div>
                    </div>
                  </div>

                  {/* Taxonomy Dropdown Selector */}
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-[11px] text-stone-500 font-bold shrink-0">Categoria Assegnata:</span>
                    <select
                      value={item.category_code}
                      onChange={(e) => handleCategoryChange(item.id, e.target.value)}
                      className={`text-xs p-1.5 rounded-lg border font-bold ${
                        isLowConfidence 
                          ? 'border-orange-400 bg-white text-orange-950' 
                          : 'border-stone-200 bg-stone-50 text-stone-800'
                      }`}
                    >
                      {WORK_TAXONOMY.map((cat) => (
                        <option key={cat.code} value={cat.code}>
                          {cat.code}. {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: PDF Viewer Mock */}
        <div className="lg:col-span-5 bg-[#09090B] text-white rounded-3xl border border-white/10 shadow-xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#FF6B00] text-xs font-black uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Documento PDF Originale</span>
            </div>
            <h3 className="font-black text-base text-white">preventivo_rossi.pdf</h3>
            <p className="text-xs text-stone-400 font-medium">
              Confronta il testo estratto dall&apos;AI direttamente con il documento originale inviato dall&apos;impresa.
            </p>
          </div>

          <div className="bg-black/60 p-4 rounded-2xl border border-white/10 space-y-3 font-mono text-[11px] text-stone-300">
            <div className="text-stone-500 border-b border-white/10 pb-2">
              [ESTRATTO DAL PDF SORGENTE - PAGINA 1 DI 2]
            </div>
            <p>1. Demolizioni tramezze e sottomura: € 1.870,00</p>
            <p>2. Nuove tavolati per divisione ambienti: € 1.710,00</p>
            <p>3. Impianto idraulico 2 bagni: € 3.640,00</p>
            <p>4. Impianto elettrico 70 punti: € 4.550,00</p>
            <p className="text-[#FF6B00] bg-orange-500/10 p-1.5 rounded border border-orange-500/20">
              9. Opere varie di finitura e dettagli a forfait: € 13.280,00
            </p>
            <p className="text-stone-500 pt-2 border-t border-white/10">
              TOTALE NETTO: € 36.200,00 + IVA 10%
            </p>
          </div>

          <div className="text-xs text-stone-400 bg-white/5 p-3 rounded-xl border border-white/10">
            💡 <strong>Nota del Validatore AI:</strong> La voce 9 è stata categorizzata in Cat. 20 a causa della descrizione generica senza prezzi unitari.
          </div>
        </div>

      </div>

    </div>
  );
}
