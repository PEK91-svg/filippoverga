'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft, 
  Award,
  Building,
  MapPin
} from 'lucide-react';
import { WORK_TAXONOMY } from '@/lib/taxonomy';
import { ITALIAN_REGIONS_PROVINCES } from '@/lib/italian-territory';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  // Form State
  const [companyName, setCompanyName] = useState('Edilizia Moderna S.r.l.');
  const [vatNumber, setVatNumber] = useState('IT08923410962');
  const [companyType, setCompanyType] = useState('Impresa Generale');
  const [yearFounded, setYearFounded] = useState('2012');
  const [employees, setEmployees] = useState('10-25');

  // Categories Selection
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '14', '17', '18'
  ]);

  // Territory
  const [region, setRegion] = useState('Lombardia');
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(['MI', 'MB', 'PV']);
  const [radiusKm, setRadiusKm] = useState('50');

  // Certifications
  const [hasDurc, setHasDurc] = useState(true);
  const [hasDico, setHasDico] = useState(true);
  const [hasInsurance, setHasInsurance] = useState(true);
  const [acceptedPact, setAcceptedPact] = useState(true);

  // Current region provinces
  const currentRegionProvinces = ITALIAN_REGIONS_PROVINCES.find(r => r.name === region)?.provinces || [];

  const toggleCategory = (code: string) => {
    if (selectedCategories.includes(code)) {
      setSelectedCategories(selectedCategories.filter(c => c !== code));
    } else {
      setSelectedCategories([...selectedCategories, code]);
    }
  };

  const toggleProvince = (code: string) => {
    if (selectedProvinces.includes(code)) {
      setSelectedProvinces(selectedProvinces.filter(p => p !== code));
    } else {
      setSelectedProvinces([...selectedProvinces, code]);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      
      {/* Header Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/aziende" className="hover:underline">Per le Imprese</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-black text-blue-600">Certificazione Impresa</span>
      </div>

      {/* Progress Bar with 5 Steps */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-black text-slate-700">
          <span>Step {step} di 5: {
            step === 1 ? 'Dati Anagrafici' :
            step === 2 ? 'Lavorazioni Coperte' :
            step === 3 ? 'Territorio Operativo' :
            step === 4 ? 'Certificazioni & Trasparenza' : 'Completamento'
          }</span>
          <span className="text-blue-600 font-mono font-bold">{(step * 20)}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
            initial={{ width: '20%' }}
            animate={{ width: `${step * 20}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-200/90 shadow-xl space-y-6">
        
        <AnimatePresence mode="wait">
          
          {/* STEP 1: DATI ANAGRAFICI */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-black text-slate-900">Dati Aziendali & Ragione Sociale</h2>
                <p className="text-xs text-slate-500 mt-0.5">Inserisci le informazioni della tua ditta o società.</p>
              </div>

              <div className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ragione Sociale / Denominazione</label>
                  <input 
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="es. Edilizia Moderna S.r.l."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Partita IVA / Codice Fiscale</label>
                    <input 
                      type="text"
                      value={vatNumber}
                      onChange={(e) => setVatNumber(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="es. IT08923410962"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tipologia Impresa</label>
                    <select
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Impresa Generale">Impresa Generale / General Contractor</option>
                      <option value="Artigiano">Artigiano Specializzato (Idraulica / Elettrica)</option>
                      <option value="Studio Tecnico">Studio Tecnico / Architetto / Progettista</option>
                      <option value="Consorzio">Consorzio Edile</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Anno di Fondazione</label>
                    <input 
                      type="text"
                      value={yearFounded}
                      onChange={(e) => setYearFounded(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="es. 2012"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Numero Dipendenti</label>
                    <select
                      value={employees}
                      onChange={(e) => setEmployees(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="1-5">1 - 5 dipendenti</option>
                      <option value="6-10">6 - 10 dipendenti</option>
                      <option value="10-25">10 - 25 dipendenti</option>
                      <option value="25+">Oltre 25 dipendenti</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CATEGORIE DI LAVORAZIONE */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-black text-slate-900">Lavorazioni Eseguite (Tassonomia 01-20)</h2>
                <p className="text-xs text-slate-500 mt-0.5">Seleziona le categorie di lavorazione che la tua impresa realizza.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {WORK_TAXONOMY.filter(c => c.code !== '20').map((cat) => {
                  const isSelected = selectedCategories.includes(cat.code);

                  return (
                    <div 
                      key={cat.code}
                      onClick={() => toggleCategory(cat.code)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start space-x-2 text-xs font-medium ${
                        isSelected 
                          ? 'bg-blue-50 text-blue-950 border-blue-300 shadow-xs' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white font-black' : 'border border-slate-300'
                      }`}>
                        {isSelected && '✓'}
                      </div>
                      <div>
                        <span className="font-bold">{cat.code}. {cat.name.split(',')[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: TERRITORIO OPERATIVO (ALL 20 REGIONS & 107 PROVINCES) */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-black text-slate-900">Territorio & Raggio d&apos;Azione</h2>
                <p className="text-xs text-slate-500 mt-0.5">Seleziona la tua regione e le province in cui accetti cantieri.</p>
              </div>

              <div className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 flex items-center space-x-1">
                    <Building className="w-3.5 h-3.5 text-blue-600" />
                    <span>Regione Principale della Sede (20 Regioni)</span>
                  </label>
                  <select
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value);
                      const regProvs = ITALIAN_REGIONS_PROVINCES.find(r => r.name === e.target.value)?.provinces || [];
                      setSelectedProvinces(regProvs.slice(0, 3).map(p => p.code));
                    }}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {ITALIAN_REGIONS_PROVINCES.map((reg) => (
                      <option key={reg.name} value={reg.name}>
                        {reg.name} ({reg.provinces.length} province)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interactive Province Checkboxes for current region */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Province Servite in {region} ({selectedProvinces.length} selezionate)</span>
                  </label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-2xl">
                    {currentRegionProvinces.map((prov) => {
                      const isChecked = selectedProvinces.includes(prov.code);
                      return (
                        <div
                          key={prov.code}
                          onClick={() => toggleProvince(prov.code)}
                          className={`p-2 rounded-xl border cursor-pointer transition-all flex items-center space-x-2 text-xs ${
                            isChecked 
                              ? 'bg-blue-50 text-blue-900 border-blue-300 font-bold' 
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] font-black ${
                            isChecked ? 'bg-blue-600 text-white' : 'border border-slate-300'
                          }`}>
                            {isChecked && '✓'}
                          </div>
                          <span>{prov.name} ({prov.code})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Raggio Massimo di Intervento (km dalla sede)</label>
                  <select
                    value={radiusKm}
                    onChange={(e) => setRadiusKm(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="30">Entro 30 km dalla sede</option>
                    <option value="50">Entro 50 km dalla sede</option>
                    <option value="100">Entro 100 km dalla sede</option>
                    <option value="regionale">Intera Regione</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CERTIFICAZIONI & PATTO TRASPARENZA */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-black text-slate-900">Requisiti & Patto di Trasparenza</h2>
                <p className="text-xs text-slate-500 mt-0.5">Dichiarazione per il rilascio del Bollino PrevEDIbile.ai.</p>
              </div>

              <div className="space-y-3 text-xs font-medium">
                <label className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={hasDurc}
                    onChange={(e) => setHasDurc(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5"
                  />
                  <div>
                    <strong className="text-slate-900">DURC Regolare:</strong> L&apos;azienda dichiara di essere in possesso di Documento Unico di Regolarità Contributiva in corso di validità.
                  </div>
                </label>

                <label className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={hasDico}
                    onChange={(e) => setHasDico(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5"
                  />
                  <div>
                    <strong className="text-slate-900">Abilitazione Impianti D.M. 37/08:</strong> Rilascio di Dichiarazione di Conformità (DiCo) per impianti realizzati.
                  </div>
                </label>

                <label className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={hasInsurance}
                    onChange={(e) => setHasInsurance(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5"
                  />
                  <div>
                    <strong className="text-slate-900">Polizza Assicurativa RCT/RCO:</strong> Copertura per danni a terzi e prestatori d&apos;opera durante le attività di cantiere.
                  </div>
                </label>

                <label className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start space-x-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={acceptedPact}
                    onChange={(e) => setAcceptedPact(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500 mt-0.5"
                  />
                  <div>
                    <strong className="text-blue-950">Adesione al Disciplinare PrevEDIbile:</strong> Impegno a non omettere oneri di sicurezza, smaltimento macerie o massetti nei preventivi inviati ai committenti.
                  </div>
                </label>
              </div>
            </motion.div>
          )}

          {/* STEP 5: COMPLETAMENTO E RILASCIO BOLLINO */}
          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900">
                  Certificazione Completata con Successo!
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  La tua impresa <strong>{companyName}</strong> è ora registrata e certificata su PrevEDIbile.ai per la regione <strong>{region}</strong>.
                </p>
              </div>

              {/* Verified Badge Graphic */}
              <div className="p-6 rounded-3xl bg-slate-950 text-white max-w-md mx-auto shadow-2xl border border-white/10 space-y-3">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 text-blue-400 rounded-full text-xs font-bold border border-white/10">
                  <Award className="w-3.5 h-3.5" />
                  <span>Bollino PrevEDIbile Certificato</span>
                </div>
                <div className="font-black text-lg">{companyName}</div>
                <div className="text-xs text-slate-400 font-mono">P.IVA: {vatNumber} • Territorio: {region} ({selectedProvinces.join(', ')})</div>
                <div className="text-[11px] text-blue-400 pt-2 border-t border-slate-800 font-bold">
                  Computi conformi a parità di scope e prezzari regionali
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
                <Link href="/area-personale">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
                  >
                    Accedi all&apos;Area Riservata &rarr;
                  </motion.button>
                </Link>
                <Link href="/fornitori">
                  <button className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all">
                    Vedi Albo Imprese
                  </button>
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Action Buttons (Back / Forward) */}
        {step < 5 && (
          <div className="flex justify-between items-center pt-6 border-t border-slate-100 text-xs font-bold">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Indietro</span>
              </button>
            ) : <div />}

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-black uppercase tracking-wider rounded-xl shadow-md flex items-center space-x-2"
            >
              <span>{step === 4 ? 'Concludi e Certifica Impresa' : 'Continua'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}

      </div>

    </div>
  );
}
