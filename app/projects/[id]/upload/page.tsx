'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { MOCK_PROJECT } from '@/lib/mock-data';

export default function UploadPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Passata A, 2: Passata B, 3: Classificazione, 4: Done

  const extractionSteps = [
    'Caricamento PDF su Supabase Storage protetto',
    'Passata A — Estrazione testata, totali e condizioni contrattuali (Sonnet)',
    'Passata B — Estrazione capillare voci di lavorazione in batch (Sonnet)',
    'Classificazione tassonomia su 20 categorie edili (Haiku)',
    'Riconciliazione voci ed elaborazione Totale a Parità di Scope'
  ];

  const handleSimulatedUpload = () => {
    setIsProcessing(true);
    setCurrentStep(1);

    setTimeout(() => setCurrentStep(2), 1000);
    setTimeout(() => setCurrentStep(3), 2000);
    setTimeout(() => setCurrentStep(4), 3000);
    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/quotes/quote-b/review`);
    }, 3800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2">
        <div className="flex items-center space-x-2 text-xs text-stone-500 font-bold">
          <Link href="/area-personale" className="hover:underline">I Miei Cantieri</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/projects/${MOCK_PROJECT.id}`} className="hover:underline">{MOCK_PROJECT.name}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-black text-[#FF6B00]">Upload PDF</span>
        </div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">
          Carica Preventivi Edilizi (PDF)
        </h1>
        <p className="text-xs text-stone-500 max-w-xl font-medium">
          Carica i documenti PDF originali delle imprese edili. L&apos;AI analizzerà ed estrarrà ogni singola voce del computo metrico.
        </p>
      </div>

      {/* Drag & Drop Area */}
      <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-stone-200 shadow-md space-y-6">
        
        {!isProcessing ? (
          <>
            <div 
              onClick={handleSimulatedUpload}
              className="border-2 border-dashed border-orange-200 hover:border-[#FF6B00] bg-orange-50/20 hover:bg-orange-50/40 rounded-3xl p-10 text-center cursor-pointer transition-all duration-200 space-y-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#09090B] text-[#FF6B00] flex items-center justify-center mx-auto shadow-md">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-stone-900 text-base">
                  Trascina qui i tuoi preventivi PDF oppure <span className="text-[#FF6B00] underline">sfoglia i file</span>
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Supporta computi metrici dettagliati, preventivi a corpo e scansioni ad alta risoluzione (Max 25 MB).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs font-bold">
              <div className="flex items-center space-x-2 text-stone-700">
                <FileText className="w-4 h-4 text-[#FF6B00]" />
                <span>Demo rapida: <strong>preventivo_rossi.pdf</strong> (36.2 KB)</span>
              </div>
              <button
                onClick={handleSimulatedUpload}
                className="px-4 py-2 bg-gradient-to-r from-[#FF6B00] to-[#FA5D00] text-white font-black uppercase tracking-wider text-[11px] rounded-xl hover:brightness-110 shadow-sm"
              >
                Avvia Estrazione AI Demo &rarr;
              </button>
            </div>
          </>
        ) : (
          /* PROCESSING ANIMATED STEPPER */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 py-4"
          >
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#09090B] text-[#FF6B00] flex items-center justify-center mx-auto shadow-md">
                <RefreshCw className="w-7 h-7 animate-spin text-[#FF6B00]" />
              </div>
              <h3 className="font-black text-lg text-stone-900">
                Analisi & Normalizzazione Intelligente in Corso...
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Claude 3.5 Sonnet sta leggendo e categorizzando le voci del computo metrico.
              </p>
            </div>

            {/* Stepper Checklist */}
            <div className="max-w-md mx-auto space-y-3">
              {extractionSteps.map((stepText, idx) => {
                const isDone = currentStep > idx;
                const isCurrent = currentStep === idx;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center space-x-3 text-xs ${
                      isDone 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' 
                        : isCurrent
                          ? 'bg-orange-50 border-[#FF6B00] text-orange-950 font-black shadow-xs ring-2 ring-orange-400/20'
                          : 'bg-stone-50/60 border-stone-200 text-stone-400'
                    }`}
                  >
                    <div className="shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isCurrent ? (
                        <RefreshCw className="w-4 h-4 text-[#FF6B00] animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-stone-300" />
                      )}
                    </div>
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

      </div>

    </div>
  );
}
