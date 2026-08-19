'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  Sparkles, 
  Check, 
  Briefcase,
  AlertTriangle,
  Scale,
  TrendingDown
} from 'lucide-react';

export default function HomePage() {
  const [isDemoAdjusted, setIsDemoAdjusted] = useState(true);

  return (
    <div className="space-y-20 sm:space-y-28 py-4">
      
      {/* 1. HERO SECTION: LUMINOUS 2-COLUMN WITH LIVE INTERACTIVE MATRIX TEASER */}
      <section className="relative pt-4 pb-8 sm:py-10">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-amber-500/5 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & Fast Start */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-2 bg-blue-50/80 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-blue-700 text-xs font-black shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>IL 1° COMPARATORE EDILIZIO A PARITÀ DI SCOPE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.12]">
              Confronta i Preventivi. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
                Scopri cosa hanno omesso.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-medium">
              Il 78% dei preventivi apparentemente più economici nasconde lavorazioni omesse (smaltimento calcinacci, massetti, oneri di sicurezza). <strong>PrevEDIbile.ai</strong> normalizza i computi e calcola il vero totale prima che tu firmi.
            </p>

            {/* Quick Action CTA Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link href="/privati/onboarding">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-110 text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
                >
                  <UploadCloud className="w-5 h-5" />
                  <span>Analizza i Tuoi Preventivi PDF &rarr;</span>
                </motion.button>
              </Link>
              
              <Link href="/fornitori">
                <button className="w-full sm:w-auto px-5 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-xs transition-colors flex items-center justify-center space-x-1.5">
                  <span>Trova Imprese nella Tua Zona</span>
                </button>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs font-semibold text-slate-600 border-t border-slate-200/60">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black shrink-0">✓</div>
                <span>100% Indipendente</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black shrink-0">✓</div>
                <span>Prezzari Regionali DEI</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black shrink-0">✓</div>
                <span>Risparmio Medio € 4.850</span>
              </div>
            </div>

          </div>

          {/* Right Column: LIVE INTERACTIVE PREVIEW CARD (Visual Gem) */}
          <div className="lg:col-span-5">
            <div className="luminous-card p-6 sm:p-7 space-y-5 bg-white relative overflow-hidden">
              
              {/* Badge & Toggle Header */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                    Live Demo Interattiva
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    Confronto Reale a Parità di Scope
                  </div>
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold">
                  <button
                    onClick={() => setIsDemoAdjusted(false)}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      !isDemoAdjusted ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Grezzo
                  </button>
                  <button
                    onClick={() => setIsDemoAdjusted(true)}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                      isDemoAdjusted ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>A Scope</span>
                  </button>
                </div>
              </div>

              {/* Quote A vs Quote B Mock Comparison */}
              <div className="space-y-3">
                
                {/* Quote 1: Impresa Trasparente */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-xs text-slate-900">Impresa Edilizia Moderna (Milano)</div>
                      <div className="text-[10px] text-emerald-700 font-bold flex items-center space-x-1 mt-0.5">
                        <Check className="w-3 h-3" />
                        <span>Computo completo: 14 voci</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-base text-slate-950 tabular-numbers">
                        € 48.500
                      </div>
                      <div className="text-[10px] text-slate-400">Totale Finito</div>
                    </div>
                  </div>
                </div>

                {/* Quote 2: Rossi con omissioni scoperte */}
                <div className={`p-4 rounded-2xl border transition-all duration-300 space-y-2 ${
                  isDemoAdjusted 
                    ? 'bg-rose-50/60 border-rose-200 ring-2 ring-rose-400/20' 
                    : 'bg-emerald-50/40 border-emerald-200'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-xs text-slate-900">Impresa Rossi & Figli (Milano)</div>
                      {isDemoAdjusted ? (
                        <div className="text-[10px] text-rose-700 font-black flex items-center space-x-1 mt-0.5">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>3 Lavorazioni omesse scovate</span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-emerald-700 font-bold flex items-center space-x-1 mt-0.5">
                          <Check className="w-3 h-3" />
                          <span>Sembra più economico sul foglio</span>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={isDemoAdjusted ? 'adjusted' : 'raw'}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="font-black text-base text-slate-950 tabular-numbers"
                        >
                          {isDemoAdjusted ? '€ 50.450' : '€ 36.200'}
                        </motion.div>
                      </AnimatePresence>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {isDemoAdjusted ? 'Costo Reale a Parità' : 'Dichiarato su carta'}
                      </div>
                    </div>
                  </div>

                  {/* Revealed Missing Items Breakdown */}
                  {isDemoAdjusted && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-2 border-t border-rose-200 text-[11px] text-rose-900 space-y-1 font-medium"
                    >
                      <div className="flex justify-between">
                        <span>• Smaltimento calcinacci in discarica (Cat. 02):</span>
                        <strong className="text-rose-700">+ € 1.800</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>• Massetto alleggerito per posa (Cat. 04):</span>
                        <strong className="text-rose-700">+ € 2.450</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>• Oneri sicurezza POS obbligatori (Cat. 19):</span>
                        <strong className="text-rose-700">+ € 1.200</strong>
                      </div>
                    </motion.div>
                  )}
                </div>

              </div>

              {/* Bottom Insight Footer */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-950 flex items-center justify-between font-medium">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Falso Risparmio:</strong> L&apos;Impresa Rossi costa in realtà <strong>€ 1.950 in più</strong>.</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* 2. STATS BAR WITH LUMINOUS ICONS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="luminous-card p-6 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tabular-numbers">12.400+</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preventivi Analizzati</div>
        </div>
        <div className="luminous-card p-6 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 tabular-numbers">€ 4.850</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Risparmio Medio Omissioni</div>
        </div>
        <div className="luminous-card p-6 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-blue-600 tabular-numbers">98.6%</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accuratezza AI Normalizzazione</div>
        </div>
        <div className="luminous-card p-6 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-indigo-600 tabular-numbers">100%</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Indipendente da Imprese</div>
        </div>
      </section>

      {/* 3. LE 4 TRAPPOLE DEI PREVENTIVI EDILIZI (UX Clarity Cards) */}
      <section className="space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600">
            Trasparenza Contrattuale
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Le 4 Trappole che Rendono i Preventivi Inconfrontabili
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Perché confrontare il totale su carta porta quasi sempre a brutte sorprese e contese a cantiere avviato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="luminous-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-lg border border-rose-100 shadow-xs">
              01
            </div>
            <h3 className="font-black text-base text-slate-900">Lavorazioni Omesse</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              L&apos;impresa non quota lo smaltimento dei calcinacci o il massetto. Il cliente firma il totale più basso e si ritrova a pagare € 3.500 di varianti obbligatorie.
            </p>
          </div>

          <div className="luminous-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg border border-amber-100 shadow-xs">
              02
            </div>
            <h3 className="font-black text-base text-slate-900">Quantità Sottostimate</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Un computo calcola 65 mq di piastrelle per un appartamento di 85 mq. A fine lavori viene presentata una variante da pagare a consuntivo.
            </p>
          </div>

          <div className="luminous-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg border border-indigo-100 shadow-xs">
              03
            </div>
            <h3 className="font-black text-base text-slate-900">IVA Beni Significativi</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Caldaie e infissi quotati al 10% IVA su tutto l&apos;importo invece dello split di legge al 22% sull&apos;eccedenza della manodopera, con rischio sanzione fiscale.
            </p>
          </div>

          <div className="luminous-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg border border-emerald-100 shadow-xs">
              04
            </div>
            <h3 className="font-black text-base text-slate-900">Acconti Spensierati</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Richieste di acconto del 40-50% prima ancora di iniziare e assenza di penali giornaliere per ritardo nella consegna delle chiavi.
            </p>
          </div>

        </div>

      </section>

      {/* 4. COME FUNZIONA IN 3 STEP */}
      <section id="come-funziona" className="bg-white p-8 sm:p-14 rounded-[2.5rem] border border-slate-200/90 shadow-sm space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600">
            Tecnologia & Intelligenza Artificiale
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Come Funziona la Normalizzazione
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Dal PDF grezzo alla matrice di confronto trasparente in 3 passaggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-base mx-auto shadow-md shadow-blue-500/20">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Carica i tuoi PDF
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Trascina i preventivi digitali o cartacei scannerizzati. L&apos;AI legge ed estrae ogni singola voce, quantità e prezzo unitario.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-base mx-auto shadow-md shadow-indigo-500/20">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Mappatura a 20 Categorie
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Le voci descritte in modo diverso vengono accoppiate secondo la tassonomia standard dei prezzari regionali DEI.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-black text-base mx-auto shadow-md shadow-blue-600/20">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Totale a Parità di Scope
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Il sistema inserisce le lavorazioni omesse valorizzandole al prezzo mediano provinciale, rivelando il vero costo effettivo.
            </p>
          </div>

        </div>

      </section>

      {/* 5. DUAL AUDIENCE PORTALS (Privati & Imprese) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card Privati */}
        <div className="luminous-card p-8 sm:p-10 space-y-6 flex flex-col justify-between border-blue-200/60">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 font-bold">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-950">
              Sei un Privato che Ristruttura?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Proteggi il tuo investimento. Verifica quali imprese hanno omesso lavorazioni, calcola le detrazioni IRPEF 50% ed evita le contese in cantiere.
            </p>

            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Analisi automatica e segnalazione anomalie contrattuali</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Calcolo trasparente del Totale a Parità di Scope</span>
              </li>
            </ul>
          </div>

          <Link href="/privati">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Confronta i Tuoi Preventivi &rarr;</span>
            </motion.button>
          </Link>
        </div>

        {/* Card Imprese */}
        <div className="luminous-card p-8 sm:p-10 space-y-6 flex flex-col justify-between border-slate-200">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center border border-slate-200 font-bold">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-950">
              Sei un&apos;Impresa o Professionista?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Basta perdere commesse contro ribassi fittizi che omettono la sicurezza o lo smaltimento. Certifica la trasparenza dei tuoi computi e ricevi capitolati pronti per essere quotati.
            </p>

            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Bollino di Conformità e Trasparenza Edile</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Accesso all&apos;Albo delle Imprese per Zona</span>
              </li>
            </ul>
          </div>

          <Link href="/aziende">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Certifica la Tua Impresa &rarr;</span>
            </motion.button>
          </Link>
        </div>

      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 rounded-[2.5rem] text-center space-y-6 shadow-2xl border border-white/10">
        <div className="max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Pronto a scoprire il vero costo del tuo cantiere?
          </h2>
          <p className="text-sm text-slate-300 font-medium">
            Carica i tuoi file PDF adesso e visualizza la matrice comparativa normalizzata in meno di 60 secondi.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <Link href="/login">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-blue-500/30 transition-all flex items-center space-x-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Accedi e Carica i Preventivi Gratis</span>
            </motion.button>
          </Link>
        </div>
      </section>

    </div>
  );
}
