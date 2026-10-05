'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FileText, 
  AlertTriangle, 
  Plus, 
  Scale, 
  TrendingDown, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { MOCK_PROJECT, MOCK_QUOTES, MOCK_FLAGS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { TAX_INCENTIVE_CODES, estimateTaxDeduction } from '@/lib/tax-incentives';

export default function DashboardPage() {
  const criticalFlagsCount = MOCK_FLAGS.filter(f => f.severity === 'critical').length;
  const rossiQuote = MOCK_QUOTES.find((quote) => quote.id === 'quote-b');
  const omissionAmount = rossiQuote ? rossiQuote.scope_adjusted_net - rossiQuote.raw_total_net : 0;
  const deduction = estimateTaxDeduction(MOCK_QUOTES[0].raw_total_net, TAX_INCENTIVE_CODES.bonusCasaAbitazionePrincipale);

  return (
    <div className="space-y-8">
      
      {/* Top Hero Banner with Generated Renovation Image & Solar Minimal Master Palette */}
      <div className="relative overflow-hidden rounded-3xl bg-[#09090B] text-white shadow-2xl border border-white/10">
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/renovation_hero.jpg"
            alt="Ristrutturazione Milano"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/90 to-transparent" />
        </div>

        {/* Banner Content */}
        <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md text-[#FF6B00] text-xs px-3.5 py-1.5 rounded-full border border-white/10 font-black shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PrevEDIbile.ai • Area Riservata Cantiere</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Analisi & Normalizzazione Preventivi a <span className="text-[#FF6B00]">Parità di Scope</span>
          </h1>

          <p className="text-sm text-stone-300 leading-relaxed max-w-2xl font-medium">
            Confronta i preventivi ricevuti per <strong>{MOCK_PROJECT.name}</strong> al netto delle omissioni e dei costi occulti.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={`/projects/${MOCK_PROJECT.id}/compare`}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#FA5D00] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center space-x-2"
              >
                <Scale className="w-4 h-4" />
                <span>Apri Matrice di Confronto &rarr;</span>
              </motion.button>
            </Link>

            <Link href={`/projects/${MOCK_PROJECT.id}/upload`}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl backdrop-blur-md border border-white/15 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4 text-[#FF6B00]" />
                <span>Carica Altro PDF</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Preventivi */}
        <div className="gem-card p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Preventivi Analizzati</div>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-stone-900 tabular-numbers">
              {MOCK_QUOTES.length} Imprese
            </div>
            <div className="text-xs text-stone-500 mt-0.5 font-medium">
              100% estratti ed allineati
            </div>
          </div>
        </div>

        {/* Card 2: Falso Risparmio */}
        <div className="gem-card p-5 flex flex-col justify-between border-t-4 border-t-emerald-600">
          <div className="flex justify-between items-start">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Omissioni Scovate</div>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-700 tabular-numbers">
              + {formatCurrency(omissionAmount)}
            </div>
            <div className="text-xs text-emerald-800 font-bold mt-0.5">
              Reintegrate sul Preventivo B
            </div>
          </div>
        </div>

        {/* Card 3: Alert Critici */}
        <div className="gem-card p-5 flex flex-col justify-between border-t-4 border-t-rose-500">
          <div className="flex justify-between items-start">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Anomalie Contrattuali</div>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-rose-700 tabular-numbers">
              {criticalFlagsCount} Rilievi Critici
            </div>
            <div className="text-xs text-stone-500 mt-0.5 font-medium">
              Smaltimento e sicurezza omessi
            </div>
          </div>
        </div>

        {/* Card 4: Detrazioni Fiscali */}
        <div className="gem-card p-5 flex flex-col justify-between border-t-4 border-t-[#FF6B00]">
          <div className="flex justify-between items-start">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Detrazione 50%</div>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-bold">
              %
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-stone-900 tabular-numbers">
              {formatCurrency(deduction.totalDeduction)}
            </div>
            <div className="text-xs text-stone-500 mt-0.5 font-medium">
              Recuperabili in 10 anni
            </div>
          </div>
        </div>

      </div>

      {/* Active Quotes Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-stone-900">Preventivi del Cantiere ({MOCK_QUOTES.length})</h2>
            <p className="text-xs text-stone-500 font-medium">Confronto tra totale dichiarato e totale effettivo a parità di lavorazioni.</p>
          </div>

          <Link href={`/projects/${MOCK_PROJECT.id}/upload`}>
            <button className="px-3.5 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-950 border border-orange-200 rounded-xl text-xs font-black transition-colors flex items-center space-x-1">
              <Plus className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Aggiungi Preventivo</span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_QUOTES.map((q) => {
            const hasOmissions = q.id === 'quote-b';
            const diff = q.scope_adjusted_net - q.raw_total_net;

            return (
              <div 
                key={q.id} 
                className="gem-card p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-sm text-stone-900">{q.vendor_name}</h3>
                      <div className="text-xs text-stone-500 font-mono">{q.vendor_type}</div>
                    </div>
                    {hasOmissions ? (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        <span>Omissioni</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Completo</span>
                      </span>
                    )}
                  </div>

                  {/* Totals Comparison */}
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs font-medium">
                    <div className="flex justify-between text-stone-500">
                      <span>Totale Dichiarato:</span>
                      <span className="font-semibold text-stone-700 tabular-numbers">{formatCurrency(q.raw_total_net)}</span>
                    </div>

                    <div className="flex justify-between font-black text-stone-950 pt-1 border-t border-stone-200/60">
                      <span>A Parità di Scope:</span>
                      <span className="tabular-numbers text-stone-950">{formatCurrency(q.scope_adjusted_net)}</span>
                    </div>

                    {diff > 0 && (
                      <div className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded flex justify-between">
                        <span>Omissioni reintegrate:</span>
                        <span>+{formatCurrency(diff)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2 text-xs">
                  <Link href={`/quotes/${q.id}`} className="flex-1">
                    <button className="w-full py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 font-bold rounded-xl transition-colors">
                      Report Singolo
                    </button>
                  </Link>
                  <Link href={`/projects/${MOCK_PROJECT.id}/compare`} className="flex-1">
                    <button className="w-full py-2 bg-[#09090B] hover:bg-stone-900 text-white font-bold rounded-xl transition-colors flex items-center justify-center space-x-1 shadow-sm">
                      <Scale className="w-3 h-3 text-[#FF6B00]" />
                      <span>Confronta</span>
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
