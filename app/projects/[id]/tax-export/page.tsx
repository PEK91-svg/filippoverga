'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  ChevronRight, 
  Check
} from 'lucide-react';
import { MOCK_PROJECT, MOCK_QUOTES, MOCK_TAX_INCENTIVES } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { estimateTaxDeduction } from '@/lib/engine-mock';

export default function TaxAndExportPage() {
  const [selectedIncentiveCode, setSelectedIncentiveCode] = useState<string>('BONUS_CASA_50');
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  const bestQuote = MOCK_QUOTES[0]; // Edilizia Moderna € 48.500
  const deductionDetails = estimateTaxDeduction(bestQuote.raw_total_net, true);

  const handleSimulatedExport = (format: 'pdf' | 'xlsx') => {
    setExportSuccessMsg(`Download avviato: ${format === 'pdf' ? 'Report_Confronto_ScopeAdjusted.pdf' : 'Matrice_Confronto_Preventivi.xlsx'}`);
    setTimeout(() => setExportSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-stone-500 font-bold mb-1">
            <Link href="/area-personale" className="hover:underline">I Miei Cantieri</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/projects/${MOCK_PROJECT.id}`} className="hover:underline">{MOCK_PROJECT.name}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-black text-[#FF6B00]">Detrazioni & Export</span>
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Stima Detrazioni Fiscali & Export Report
          </h1>
          <p className="text-xs text-stone-500 mt-1 max-w-xl font-medium">
            Calcolo agevolazioni edilizie normate ed esportazione della matrice di confronto per il committente.
          </p>
        </div>
      </div>

      {/* TAX INCENTIVES MODULE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-lg font-black text-stone-900">Modulo Agevolazioni & Detrazioni Fiscali</h2>
            </div>
            <p className="text-xs text-stone-500 font-medium">
              Calcolo detrazioni IRPEF basato sulla normativa fiscale vigente per prime e seconde case.
            </p>
          </div>
        </div>

        {/* Incentive Selection Radio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_TAX_INCENTIVES.map((inc) => (
            <div
              key={inc.code}
              onClick={() => setSelectedIncentiveCode(inc.code)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 flex flex-col justify-between ${
                selectedIncentiveCode === inc.code
                  ? 'bg-orange-50/60 border-[#FF6B00] ring-2 ring-orange-400/20'
                  : 'bg-stone-50/60 border-stone-200 hover:bg-stone-100/60'
              }`}
            >
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-black text-sm text-stone-900">{inc.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-950 text-xs font-black">
                    {inc.rate}%
                  </span>
                </div>
                <div className="text-xs text-stone-600 mt-2 font-medium">
                  Tetto spesa: <strong>{formatCurrency(inc.cap_amount)}</strong>
                </div>
              </div>
              <div className="text-[11px] text-stone-500 border-t border-stone-200/60 pt-2 font-mono">
                {inc.law_reference}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Calculation Results for Selected Project */}
        <div className="bg-[#09090B] text-white p-6 rounded-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-xs text-stone-400 uppercase tracking-wider font-bold">Importo Lavori Ammissibile</div>
            <div className="text-2xl font-black text-white mt-1 tabular-numbers">
              {formatCurrency(deductionDetails.eligibleAmount)}
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">IVA 10% inclusa (€ 53.350 lordi)</div>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l sm:border-r border-stone-800 pt-4 sm:pt-0">
            <div className="text-xs text-[#FF6B00] uppercase tracking-wider font-black">Detrazione Totale Recuperata</div>
            <div className="text-3xl font-black text-white mt-1 tabular-numbers">
              {formatCurrency(deductionDetails.totalDeduction)}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5 font-medium">Pari al 50% in 10 anni</div>
          </div>

          <div className="border-t sm:border-t-0 border-stone-800 pt-4 sm:pt-0">
            <div className="text-xs text-stone-400 uppercase tracking-wider font-bold">Rata Annuale 730 / Redditi</div>
            <div className="text-2xl font-black text-white mt-1 tabular-numbers">
              {formatCurrency(deductionDetails.annualInstallment)} <span className="text-xs font-normal text-stone-400">/ anno</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5 font-medium">per 10 quote annuali costanti</div>
          </div>
        </div>
      </div>

      {/* EXPORT SECTION */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-stone-900">Download Report & Deliverable</h2>
            <p className="text-xs text-stone-500 font-medium">Esporta la matrice comparativa normalizzata in formato PDF per il committente o in foglio di calcolo Excel.</p>
          </div>
        </div>

        {exportSuccessMsg && (
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2 border border-emerald-300">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{exportSuccessMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* PDF Report Export */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#09090B] text-[#FF6B00] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-stone-900">Report Sintesi Comparativa (PDF)</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Documento impaginato di 8 pagine con matrice comparativa a parità di scope, grafici a barre dei totali, dettaglio delle omissioni per ciascuna impresa e asseverazione fiscale.
              </p>
            </div>

            <button
              onClick={() => handleSimulatedExport('pdf')}
              className="w-full py-3 bg-[#09090B] hover:bg-stone-900 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <Download className="w-4 h-4 text-[#FF6B00]" />
              <span>Scarica Report PDF</span>
            </button>
          </div>

          {/* Excel / XLSX Export */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-950 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <h3 className="font-black text-base text-stone-900">Foglio di Calcolo Matrice (XLSX)</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Cartella di lavoro Excel con formule trasparenti, foglio di riconciliazione a 20 categorie e stima parametrica dei prezzi mediani per lavorazioni omesse.
              </p>
            </div>

            <button
              onClick={() => handleSimulatedExport('xlsx')}
              className="w-full py-3 bg-gradient-to-r from-[#FF6B00] to-[#FA5D00] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Scarica Foglio XLSX</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
