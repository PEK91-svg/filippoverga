'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Ruler, 
  Home, 
  Target, 
  FileText, 
  UploadCloud, 
  ChevronRight, 
  Scale, 
  CheckCircle2, 
  ShieldAlert,
  Plus,
  Send,
  Star,
  Award,
  X
} from 'lucide-react';
import { MOCK_PROJECT, MOCK_QUOTES, MOCK_VERIFIED_VENDORS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function ProjectDetailPage() {
  const [invitedVendor, setInvitedVendor] = useState<string | null>(null);

  const handleInvite = (vendorName: string) => {
    setInvitedVendor(vendorName);
    setTimeout(() => setInvitedVendor(null), 4000);
  };

  const localVendors = MOCK_VERIFIED_VENDORS.filter(v => v.province === MOCK_PROJECT.location_province);

  return (
    <div className="space-y-8">
      
      {/* Header Breadcrumbs & Title with Hero Cover */}
      <div className="relative overflow-hidden rounded-3xl bg-[#09090B] text-white shadow-xl border border-white/10 p-6 sm:p-8">
        
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/bathroom_renovation.jpg"
            alt="Ristrutturazione Bagno Milano"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/90 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-stone-400 font-bold">
              <Link href="/area-personale" className="hover:underline">I Miei Cantieri</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-black text-[#FF6B00]">Cantiere #{MOCK_PROJECT.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {MOCK_PROJECT.name}
            </h1>
            <p className="text-xs text-stone-300 max-w-xl font-medium">
              {MOCK_PROJECT.notes}
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Link href={`/projects/${MOCK_PROJECT.id}/upload`}>
              <button className="px-4 py-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors flex items-center space-x-2">
                <UploadCloud className="w-4 h-4 text-[#FF6B00]" />
                <span>Carica PDF</span>
              </button>
            </Link>
            <Link href={`/projects/${MOCK_PROJECT.id}/compare`}>
              <button className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B00] to-[#FA5D00] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors flex items-center space-x-2">
                <Scale className="w-4 h-4" />
                <span>Matrice Confronto</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {invitedVendor && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-4 bg-emerald-900 text-white rounded-2xl shadow-xl flex items-center justify-between border border-emerald-700 text-xs font-bold"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Invito inviato a <strong>{invitedVendor}</strong>! Riceverai il preventivo normalizzato direttamente nella matrice comparativa.</span>
            </div>
            <button onClick={() => setInvitedVendor(null)} className="p-1 hover:bg-emerald-800 rounded">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="gem-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center space-x-1">
            <Building2 className="w-3.5 h-3.5 text-stone-700" />
            <span>Tipologia</span>
          </div>
          <div className="text-sm font-black text-stone-900 mt-2 capitalize">
            {MOCK_PROJECT.property_type}
          </div>
        </div>

        <div className="gem-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center space-x-1">
            <Ruler className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Superficie</span>
          </div>
          <div className="text-sm font-black text-stone-900 mt-2 tabular-numbers">
            {MOCK_PROJECT.surface_sqm} mq
          </div>
        </div>

        <div className="gem-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>Comune</span>
          </div>
          <div className="text-sm font-black text-stone-900 mt-2">
            {MOCK_PROJECT.location_city} ({MOCK_PROJECT.location_province})
          </div>
        </div>

        <div className="gem-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center space-x-1">
            <Home className="w-3.5 h-3.5 text-emerald-600" />
            <span>Prima Casa</span>
          </div>
          <div className="text-sm font-black text-emerald-700 mt-2">
            {MOCK_PROJECT.is_prima_casa ? 'Sì (Bonus 50%)' : 'No'}
          </div>
        </div>

        <div className="gem-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center space-x-1">
            <Target className="w-3.5 h-3.5 text-orange-600" />
            <span>Budget Target</span>
          </div>
          <div className="text-sm font-black text-stone-900 mt-2 tabular-numbers">
            {formatCurrency(MOCK_PROJECT.budget_target)}
          </div>
        </div>

        <div className="gem-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center space-x-1">
            <FileText className="w-3.5 h-3.5 text-stone-700" />
            <span>Stato Cantiere</span>
          </div>
          <div className="text-sm font-black text-[#FF6B00] mt-2">
            Confronto Preventivi
          </div>
        </div>

      </div>

      {/* Preventivi Caricati Section */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-stone-900">Preventivi Ricevuti & Riconciliati ({MOCK_QUOTES.length})</h2>
            <p className="text-xs text-stone-500 font-medium">Documenti estratti e pronti per il confronto a parità di scope.</p>
          </div>

          <Link href={`/projects/${MOCK_PROJECT.id}/upload`}>
            <button className="px-3.5 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-950 rounded-xl text-xs font-black transition-colors flex items-center space-x-1 border border-orange-200">
              <Plus className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Aggiungi Preventivo PDF</span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_QUOTES.map((q) => (
            <div key={q.id} className="gem-card p-5 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <div className="font-bold text-sm text-stone-900">{q.vendor_name}</div>
                    <div className="text-xs text-stone-500 font-mono">{q.vendor_type} • P.IVA {q.vendor_vat}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Estratto</span>
                  </span>
                </div>

                {/* Totals */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Totale Dichiarato:</span>
                    <span className="font-semibold text-stone-900 tabular-numbers">{formatCurrency(q.raw_total_net)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-stone-200/60 font-black text-stone-950">
                    <span>Totale a Parità di Scope:</span>
                    <span className="tabular-numbers text-stone-950">{formatCurrency(q.scope_adjusted_net)}</span>
                  </div>
                </div>

                {/* Attributes */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100 font-medium">
                  <div>Durata: <strong>{q.duration_days} giorni</strong></div>
                  <div>Acconto: <strong>{q.payment_terms.acconto_pct}%</strong></div>
                  <div>Garanzia: <strong>{q.warranty_months} mesi</strong></div>
                  <div>Confidence: <strong>{(q.extraction_confidence * 100).toFixed(0)}%</strong></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-2">
                <Link href={`/quotes/${q.id}/review`} className="flex-1">
                  <button className="w-full py-2 bg-stone-100 border border-stone-200 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors">
                    Revisiona Voci
                  </button>
                </Link>
                <Link href={`/quotes/${q.id}`} className="flex-1">
                  <button className="w-full py-2 bg-[#09090B] hover:bg-stone-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Report Flag</span>
                  </button>
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* SECTION: RICHIEDI ALTRI PREVENTIVI A IMPRESE VERIFICATE DELLA TUA ZONA */}
      <div className="bg-[#09090B] text-white p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[#FF6B00] text-xs font-black uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>IMPRESE CERTIFICATE NELLA TUA ZONA ({MOCK_PROJECT.location_city})</span>
            </div>
            <h3 className="text-xl font-black text-white">
              Vuoi un preventivo alternativo a parità dello stesso capitolato?
            </h3>
            <p className="text-xs text-stone-300 font-medium">
              Invia le voci del tuo cantiere a queste imprese verificate di Milano con 1 clic: quoteranno esattamente le stesse lavorazioni.
            </p>
          </div>

          <Link href="/fornitori">
            <button className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold rounded-xl border border-stone-700 transition-colors shrink-0">
              Vedi Tutte le Imprese &rarr;
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {localVendors.map(vendor => (
            <div key={vendor.id} className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-sm text-white">{vendor.name}</div>
                  <div className="flex items-center space-x-1 text-[#FF6B00] text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{vendor.rating}</span>
                  </div>
                </div>
                <div className="text-[11px] text-stone-400 font-medium">{vendor.type} • {vendor.city}</div>
                <div className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed font-medium">
                  {vendor.description}
                </div>
              </div>

              <button
                onClick={() => handleInvite(vendor.name)}
                className="w-full py-2 bg-gradient-to-r from-[#FF6B00] to-[#FA5D00] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md"
              >
                <Send className="w-3 h-3" />
                <span>Richiedi Preventivo (1 Clic)</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
