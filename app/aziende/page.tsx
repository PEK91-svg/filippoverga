'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Scale, 
  Award, 
  Star, 
  FileSpreadsheet
} from 'lucide-react';

export default function AziendePage() {
  return (
    <div className="space-y-16 max-w-6xl mx-auto py-4">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-tr from-slate-900 via-slate-900 to-blue-950 text-white p-8 sm:p-14 rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 text-blue-300 text-xs font-black">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>PROGRAMMA CERTIFICAZIONE IMPRESE EDILI & ARTIGIANI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Vinci le commesse sulla <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">qualità reale</span>, non sulla corsa al ribasso.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Sei stanco di perdere clienti a favore di concorrenti che presentano preventivi stracciati omettendo lo smaltimento macerie, i massetti o la sicurezza? Con PrevEDIbile.ai certifichi la completezza del tuo computo e dimostri al committente il vero valore della tua offerta.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/aziende/onboarding">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Certifica la Tua Impresa & Ottieni il Bollino &rarr;</span>
              </motion.button>
            </Link>
          </div>
        </div>

      </section>

      {/* Value Pillars for Companies */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="luminous-card p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100 shadow-xs">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Bollino &quot;Computo Trasparente&quot;
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            I tuoi preventivi vengono corredati dal sigillo digitale PrevEDIbile.ai, che garantisce al committente l&apos;inclusione di tutte le lavorazioni essenziali senza sorprese a metà cantiere.
          </p>
        </div>

        <div className="luminous-card p-8 space-y-4 border-t-4 border-t-indigo-600">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100 shadow-xs">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Confronto a Parità di Scope
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Quando il committente carica il tuo preventivo insieme a quelli della concorrenza, la nostra piattaforma evidenzia immediatamente le voci omesse dagli altri, riequilibrando il confronto economico.
          </p>
        </div>

        <div className="luminous-card p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100 shadow-xs">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Allineamento Prezzari DEI
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Accedi ai benchmark di mercato provinciali e dimostra che i tuoi prezzi unitari rispecchiano i costi effettivi di manodopera specializzata e materiali certificati.
          </p>
        </div>

      </section>

      {/* How it works for construction companies */}
      <section className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/90 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Processo Semplice</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Come entrare nella rete delle Imprese Certificate
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            Solo imprese verificate con DURC regolare e computi dettagliati a norma.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-xs text-center">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold mx-auto">1</div>
            <h4 className="font-bold text-slate-900">Registrazione & P.IVA</h4>
            <p className="text-slate-500">Inserisci i dati aziendali e le categorie coperte.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold mx-auto">2</div>
            <h4 className="font-bold text-slate-900">Verifica Requisiti</h4>
            <p className="text-slate-500">Certificazione DiCo, assicurazione RCT/RCO e conformità.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mx-auto">3</div>
            <h4 className="font-bold text-slate-900">Bollino di Trasparenza</h4>
            <p className="text-slate-500">Genera il badge digitale per i tuoi preventivi.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold mx-auto">4</div>
            <h4 className="font-bold text-slate-900">Ricevi Capitolati</h4>
            <p className="text-slate-500">Quota richieste standardizzate senza sprechi di tempo.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="luminous-card p-6 space-y-3">
          <div className="flex items-center space-x-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-xs text-slate-700 italic leading-relaxed font-medium">
            &quot;Prima di PrevEDIbile.ai perdevamo 3 preventivi su 4 perché noi mettevamo sempre a norma lo smaltimento calcinacci e gli oneri di sicurezza, mentre altri no. Con la matrice a parità di scope, il cliente capisce subito il perché della differenza di prezzo.&quot;
          </p>
          <div className="text-xs font-bold text-slate-900">
            Ing. Marco Riva • Impresa Generale Milano
          </div>
        </div>

        <div className="luminous-card p-6 space-y-3">
          <div className="flex items-center space-x-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-xs text-slate-700 italic leading-relaxed font-medium">
            &quot;Il bollino di trasparenza ha dato ai nostri computi un&apos;autorevolezza immediata. I clienti firmano più serenamente sapendo che non ci saranno varianti ingiustificate a fine lavori.&quot;
          </p>
          <div className="text-xs font-bold text-slate-900">
            Stefano Berardi • Edilizia Residenziale Monza
          </div>
        </div>
      </section>

      {/* CTA Onboarding */}
      <section className="bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 rounded-[2.5rem] text-center space-y-6 border border-white/10 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-black">
          Pronto a certificare la trasparenza dei tuoi computi?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-medium">
          Registra la tua impresa e completa l&apos;onboarding guidato in 5 minuti.
        </p>
        <Link href="/aziende/onboarding">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
          >
            Inizia la Certificazione Aziendale &rarr;
          </motion.button>
        </Link>
      </section>

    </div>
  );
}
