'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  UploadCloud, 
  Calculator, 
  Scale, 
  Percent
} from 'lucide-react';
import { TAX_INCENTIVE_CODES, estimateTaxDeduction } from '@/lib/tax-incentives';
import { formatCurrency } from '@/lib/utils';

export default function PrivatiPage() {
  const [customExpense, setCustomExpense] = useState(50000);

  const taxSim = estimateTaxDeduction(customExpense, TAX_INCENTIVE_CODES.bonusCasaAbitazionePrincipale);

  return (
    <div className="space-y-16 max-w-6xl mx-auto py-4">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-tr from-slate-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 text-blue-300 text-xs font-black">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>GUIDA & CONFRONTO PREVENTIVI PER COMMITTENTI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Ristruttura con la certezza del <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">costo reale</span>.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Non farti ingannare dal preventivo che sembra più basso solo perché ha omesso lo smaltimento dei calcinacci o gli oneri di sicurezza. PrevEDIbile.ai analizza i tuoi documenti e ti protegge da contese e varianti in corso d&apos;opera.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/privati/onboarding">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center space-x-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Inizia Subito (Google / Apple) &rarr;</span>
              </motion.button>
            </Link>
            <Link href="/fornitori">
              <button className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-xs rounded-xl transition-all">
                Trova Imprese nella Tua Zona &rarr;
              </button>
            </Link>
          </div>
        </div>

      </section>

      {/* 3 Pillars for Private Clients */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="luminous-card p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100 shadow-xs">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            1. Totale a Parità di Scope
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Se l&apos;Impresa A include la rimozione macerie (€ 1.800) e l&apos;Impresa B non la scrive, il nostro sistema reintegra la voce al prezzo mediano, rendendo i due preventivi finalmente confrontabili alla pari.
          </p>
        </div>

        <div className="luminous-card p-8 space-y-4 border-t-4 border-t-indigo-600">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100 shadow-xs">
            <Percent className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            2. Controllo IVA Beni Significativi
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            La legge italiana vieta di applicare l&apos;IVA 10% all&apos;intero costo di condizionatori, caldaie o infissi. L&apos;eccedenza rispetto alla manodopera va al 22%. PrevEDIbile.ai calcola lo split esatto per evitare rischi fiscali.
          </p>
        </div>

        <div className="luminous-card p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            3. Tutela Contrattuale & Acconti
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Rileviamo acconti eccessivi (&gt;30%), assenza di penali giornaliere per ritardo nella consegna e clausole ambigue prima che tu versi qualsiasi somma.
          </p>
        </div>

      </section>

      {/* Interactive Tax Incentives Widget for Private Homeowners */}
      <section className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/90 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-blue-600 font-black text-xs uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>SIMULATORE AGEVOLAZIONI FISCALI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Quanto puoi recuperare con il Bonus Casa 50%?
            </h2>
          </div>

          <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full font-black text-xs border border-blue-200">
            Detrazione IRPEF in 10 Quote Annuali
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-6 space-y-5 text-xs text-slate-600 font-medium">
            <div>
              <label className="block font-bold text-slate-800 text-sm mb-2">
                Stima Importo Lavori Netto: <strong className="text-blue-600 text-base">{formatCurrency(customExpense)}</strong>
              </label>
              <input 
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={customExpense}
                onChange={(e) => setCustomExpense(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>€ 10.000</span>
                <span>€ 50.000</span>
                <span>€ 100.000</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="font-bold text-slate-900">Riepilogo Fiscale Dettagliato:</div>
              <ul className="space-y-1 text-slate-600">
                <li>• Spesa lorda stimata: <strong>{formatCurrency(taxSim.grossExpense)}</strong></li>
                <li>• Tetto di spesa dell&apos;agevolazione: <strong>{formatCurrency(taxSim.incentive.capAmount)}</strong></li>
                <li>• Quota detraibile al {taxSim.incentive.ratePercent}%: <strong>{formatCurrency(taxSim.totalDeduction)}</strong></li>
                <li>• Rata annuale scalata dalle tasse: <strong className="text-emerald-700">{formatCurrency(taxSim.annualInstallment)} / anno</strong> per {taxSim.incentive.installmentYears} anni</li>
              </ul>
            </div>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-6 bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10 space-y-4 text-center">
            <div className="text-xs font-black text-blue-400 uppercase tracking-wider">
              Risparmio Fiscale Diretto
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white tabular-numbers">
              {formatCurrency(taxSim.totalDeduction)}
            </div>
            <div className="text-xs text-slate-400">
              Corrispondenti a <strong className="text-blue-400">{formatCurrency(taxSim.annualInstallment)}</strong> scalati ogni anno per {taxSim.incentive.installmentYears} anni dal tuo 730 / Redditi.
            </div>

            <div className="pt-2">
              <Link href="/login">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md">
                  Calcola le Tue Detrazioni &rarr;
                </button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Homeowner 7-Point Pre-Sign Checklist */}
      <section className="bg-slate-50 p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/90 space-y-6">
        <div className="max-w-xl space-y-1">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Guida Pratica</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            La Checklist di PrevEDIbile.ai prima di firmare
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            Verifica che nel preventivo siano presenti tutte le 7 clausole di garanzia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            'Oneri della sicurezza (POS e dispositivi) specificati in modo distinto.',
            'Oneri di trasporto a discarica autorizzata con obbligo di formulario FIR.',
            'Massetto e preparazione sottofondo inclusi esplicitamente prima della posa.',
            'Scissione IVA beni significativi (10% fino a manodopera, 22% eccedenza).',
            'Acconto alla firma non superiore al 20-30% del totale pattuito.',
            'Penale giornaliera per ogni giorno di ritardo oltre il termine di consegna.',
            'Garanzia post-lavori di almeno 24 mesi con rilascio DiCo impianti.'
          ].map((checkText, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-start space-x-3 shadow-xs">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                ✓
              </div>
              <span className="text-slate-700 leading-relaxed font-medium">{checkText}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
