'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  Award, 
  ChevronRight, 
  Send,
  X,
  Store,
  RotateCcw,
  Building
} from 'lucide-react';
import { MOCK_VERIFIED_VENDORS } from '@/lib/mock-data';
import { WORK_TAXONOMY, getCategoryByCode } from '@/lib/taxonomy';
import { ITALIAN_REGIONS_PROVINCES, ALL_PROVINCES } from '@/lib/italian-territory';

export default function FornitoriPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [requestSentVendor, setRequestSentVendor] = useState<string | null>(null);

  // Available provinces based on region selection
  const availableProvinces = selectedRegion === 'all'
    ? ALL_PROVINCES
    : (ITALIAN_REGIONS_PROVINCES.find(r => r.name === selectedRegion)?.provinces || []);

  const handleRegionChange = (newRegion: string) => {
    setSelectedRegion(newRegion);
    setSelectedProvince('all'); // Reset province when changing region
  };

  const filteredVendors = MOCK_VERIFIED_VENDORS.filter((v) => {
    if (selectedRegion !== 'all' && v.region !== selectedRegion) return false;
    if (selectedProvince !== 'all' && v.province !== selectedProvince) return false;
    if (selectedCategory !== 'all' && !v.categories.includes(selectedCategory)) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return v.name.toLowerCase().includes(q) || v.city.toLowerCase().includes(q) || v.type.toLowerCase().includes(q) || v.province.toLowerCase().includes(q);
    }
    return true;
  });

  const resetFilters = () => {
    setSelectedRegion('all');
    setSelectedProvince('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleSendCapitolato = (vendorName: string) => {
    setRequestSentVendor(vendorName);
    setTimeout(() => {
      setRequestSentVendor(null);
    }, 4000);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-tr from-slate-900 via-slate-900 to-blue-950 text-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-bold">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-black text-blue-400">Trova Imprese</span>
          </div>

          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1 rounded-full border border-white/10 text-blue-300 text-xs font-black">
              <Store className="w-3.5 h-3.5 text-blue-400" />
              <span>ALBO NAZIONALE: TUTTE LE 20 REGIONI E 107 PROVINCE ITALIANE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Trova le Migliori Imprese Edili nella tua Zona
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Solo imprese verificate con DURC regolare e conformità al disciplinare di trasparenza. Invia il tuo computo con 1 clic per ricevere un preventivo allineato a parità di scope.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Notification Toast */}
      <AnimatePresence>
        {requestSentVendor && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-emerald-900 text-white rounded-2xl shadow-xl flex items-center justify-between border border-emerald-700 text-xs font-bold"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Richiesta inviata con successo a <strong>{requestSentVendor}</strong>! Riceverai il preventivo direttamente nella tua matrice di confronto.</span>
            </div>
            <button onClick={() => setRequestSentVendor(null)} className="p-1 hover:bg-emerald-800 rounded">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FILTER TOOLBAR: REGIONE + PROVINCIA + SPECIALIZZAZIONE + CERCA */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
          <div className="text-xs font-black text-slate-900 flex items-center space-x-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filtra l&apos;Albo Nazionale per Territorio e Categoria</span>
          </div>
          {(selectedRegion !== 'all' || selectedProvince !== 'all' || selectedCategory !== 'all' || searchQuery !== '') && (
            <button 
              onClick={resetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta Filtri</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
          
          {/* 1. Region Selector (20 Regions) */}
          <div>
            <label className="block text-slate-700 mb-1.5 flex items-center space-x-1">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>1. Regione (20 Regioni)</span>
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">Tutte le 20 Regioni d&apos;Italia</option>
              {ITALIAN_REGIONS_PROVINCES.map((reg) => (
                <option key={reg.name} value={reg.name}>
                  {reg.name} ({reg.provinces.length} prov.)
                </option>
              ))}
            </select>
          </div>

          {/* 2. Province Selector (107 Provinces) */}
          <div>
            <label className="block text-slate-700 mb-1.5 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>2. Provincia ({availableProvinces.length})</span>
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">Tutte le Province {selectedRegion !== 'all' ? `di ${selectedRegion}` : ''}</option>
              {availableProvinces.map((prov) => (
                <option key={prov.code} value={prov.code}>
                  {prov.name} ({prov.code})
                </option>
              ))}
            </select>
          </div>

          {/* 3. Category Selector */}
          <div>
            <label className="block text-slate-700 mb-1.5 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>3. Specializzazione Edile</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">Tutte le Specializzazioni</option>
              {WORK_TAXONOMY.filter(c => c.code !== '20').map(cat => (
                <option key={cat.code} value={cat.code}>
                  {cat.code}. {cat.name.split(',')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Search Query */}
          <div>
            <label className="block text-slate-700 mb-1.5 flex items-center space-x-1">
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>4. Cerca per Nome / Città</span>
            </label>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="es. Milano, Restauri, Termoidraulica..."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

        </div>

        <div className="text-[11px] text-slate-500 font-semibold pt-1 flex justify-between items-center">
          <span>Mostrando <strong>{filteredVendors.length}</strong> imprese certificate disponibili</span>
          {selectedRegion !== 'all' && (
            <span className="text-blue-600 font-bold">Filtro attivo: {selectedRegion} {selectedProvince !== 'all' ? `(${selectedProvince})` : ''}</span>
          )}
        </div>

      </div>

      {/* VENDORS GRID */}
      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVendors.map((vendor) => (
            <div 
              key={vendor.id}
              className="luminous-card p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              
              {/* Top Vendor Header */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-black text-slate-900">{vendor.name}</h3>
                      {vendor.badge_level === 'oro' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[10px] font-black flex items-center space-x-1 border border-amber-300">
                          <Award className="w-3 h-3 text-amber-600" />
                          <span>Bollino ORO</span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {vendor.type} • <strong>{vendor.city} ({vendor.province})</strong> — {vendor.region}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-amber-500 font-black text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{vendor.rating}</span>
                      <span className="text-slate-400 text-xs font-normal">({vendor.reviews_count})</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
                      {vendor.completed_projects} cantieri verificati
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {vendor.description}
                </p>

                {/* Badges and Guarantees */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-700 font-medium">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>DURC Regolare</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Abilitata DiCo</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Polizza RCT</span>
                  </div>
                </div>

                {/* Covered Categories Tags */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Lavorazioni coperte nel computo ({vendor.categories.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {vendor.categories.slice(0, 6).map(catCode => (
                      <span key={catCode} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {catCode}. {getCategoryByCode(catCode).name.split(',')[0]}
                      </span>
                    ))}
                    {vendor.categories.length > 6 && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-bold">
                        +{vendor.categories.length - 6} altre
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                <div className="flex items-center space-x-2 text-slate-500 text-[11px] font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Risposta media: ~{vendor.response_time_hours} ore</span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSendCapitolato(vendor.name)}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-black uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Invia Capitolato (1 Clic)</span>
                </motion.button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State with Fast Reset */
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Store className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-900">Nessuna impresa trovata per questa combinazione di filtri</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
              Stiamo espandendo continuamente la nostra rete di imprese certificate in tutta Italia.
            </p>
          </div>
          <button 
            onClick={resetFilters}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors inline-flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mostra Tutte le Imprese</span>
          </button>
        </div>
      )}

    </div>
  );
}
