'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Building,
  Mail
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/ui/logo';
import { ITALIAN_REGIONS_PROVINCES, ALL_PROVINCES } from '@/lib/italian-territory';

export default function PrivatiOnboardingPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [step, setStep] = useState(1);
  const [emailInput, setEmailInput] = useState('');
  
  // Project Details
  const [interventionType, setInterventionType] = useState('Casa Completa');
  const [selectedRegion, setSelectedRegion] = useState('Lombardia');
  const [selectedProvince, setSelectedProvince] = useState('MI');
  const [surfaceSqm, setSurfaceSqm] = useState(85);
  const [isPrimaCasa, setIsPrimaCasa] = useState(true);

  // Available provinces for selected region
  const availableProvinces = selectedRegion === 'all'
    ? ALL_PROVINCES
    : (ITALIAN_REGIONS_PROVINCES.find(r => r.name === selectedRegion)?.provinces || []);

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    login(`utente.${provider}@example.com`);
    setStep(2);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    login(emailInput);
    setStep(2);
  };

  const handleCompleteOnboarding = () => {
    router.push('/area-personale');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-3 flex flex-col items-center">
        <Logo size="md" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Registrazione Rapida Committente
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Crea il tuo account in 10 secondi e inizia a confrontare i preventivi a parità di scope.
          </p>
        </div>
      </div>

      {/* Progress Bar (2 Simple Steps) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-black text-slate-700">
          <span>{step === 1 ? 'Step 1: Accesso Immediato' : 'Step 2: Dettagli del Tuo Cantiere'}</span>
          <span className="text-blue-600 font-mono font-bold">{step === 1 ? '50%' : '100%'}</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
            initial={{ width: '50%' }}
            animate={{ width: step === 1 ? '50%' : '100%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-200/90 shadow-xl space-y-6">
        
        <AnimatePresence mode="wait">
          
          {/* STEP 1: FAST EASY SOCIAL LOGIN (GOOGLE / APPLE) */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="border-b border-slate-100 pb-3 text-center">
                <h2 className="text-lg font-black text-slate-900">Come desideri registrarti?</h2>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">Nessuna password richiesta, accesso immediato e sicuro.</p>
              </div>

              {/* 1-Click Social Sign-in Buttons */}
              <div className="space-y-3 pt-2">
                
                {/* Google Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialLogin('google')}
                  className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 rounded-2xl font-black text-xs text-slate-800 transition-all flex items-center justify-center space-x-3 shadow-xs"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continua con Google</span>
                </motion.button>

                {/* Apple Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialLogin('apple')}
                  className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl font-black text-xs transition-all flex items-center justify-center space-x-3 shadow-md"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.3-9.56-11.33-20.24-15.08-32.04-3.75-11.79-5.63-23.01-5.63-33.65 0-13.37 3.38-24.63 10.13-33.77 6.75-9.13 15.42-13.79 26.01-13.97 4.13 0 9.07 1.13 14.83 3.39 5.76 2.26 9.87 3.44 12.33 3.55 2.12-.11 6.34-1.34 12.65-3.71 6.31-2.37 11.39-3.44 15.24-3.23 11.41.65 20.35 4.78 26.83 12.4-9.89 5.98-14.73 14.24-14.51 24.78.22 8.16 3.32 15.02 9.3 20.59 5.98 5.56 13.06 8.79 21.23 9.68-2.18 6.31-4.73 12.74-7.65 19.3zM119.22 31.97c0-7.39 2.66-14.28 7.98-20.69 5.32-6.41 11.83-10.42 19.53-12.03.22 1.19.33 2.28.33 3.28 0 7.39-2.77 14.39-8.31 21-5.54 6.61-12.15 10.48-19.83 11.61-.43-1.08-.65-2.07-.65-3.17z"/>
                  </svg>
                  <span>Continua con Apple</span>
                </motion.button>

              </div>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-bold uppercase">oppure con email</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Email Magic Link Form */}
              <form onSubmit={handleEmailLogin} className="space-y-3">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input 
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="nome@esempio.it"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
                >
                  Continua con Email Magic Link
                </button>
              </form>

              <div className="text-[11px] text-center text-slate-400 font-medium">
                🔒 I tuoi dati e preventivi sono protetti da crittografia end-to-end.
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROJECT QUICK CONFIGURATION */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-black text-slate-900">Configura il Tuo Primo Cantiere</h2>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">Informazioni minime per calcolare la parità di scope e le detrazioni fiscali.</p>
              </div>

              <div className="space-y-4 text-xs font-medium">
                
                {/* Intervention Type */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Tipologia di Intervento
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Casa Completa', 'Bagno', 'Impianti'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInterventionType(type)}
                        className={`p-3 rounded-xl border font-bold text-center transition-all ${
                          interventionType === type 
                            ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs' 
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region & Province */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                      <Building className="w-3.5 h-3.5 text-blue-600" />
                      <span>Regione dell&apos;Immobile</span>
                    </label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => {
                        setSelectedRegion(e.target.value);
                        const firstProv = ITALIAN_REGIONS_PROVINCES.find(r => r.name === e.target.value)?.provinces[0]?.code || 'MI';
                        setSelectedProvince(firstProv);
                      }}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      {ITALIAN_REGIONS_PROVINCES.map((reg) => (
                        <option key={reg.name} value={reg.name}>
                          {reg.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>Provincia</span>
                    </label>
                    <select
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      {availableProvinces.map((prov) => (
                        <option key={prov.code} value={prov.code}>
                          {prov.name} ({prov.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Surface & Prima Casa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Superficie Appartamento (mq)
                    </label>
                    <input 
                      type="number"
                      value={surfaceSqm}
                      onChange={(e) => setSurfaceSqm(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Immobile Prima Casa?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPrimaCasa(true)}
                        className={`p-3 rounded-xl border font-bold text-center transition-all ${
                          isPrimaCasa 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        Sì (Bonus 50%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsPrimaCasa(false)}
                        className={`p-3 rounded-xl border font-bold text-center transition-all ${
                          !isPrimaCasa 
                            ? 'bg-blue-50 text-blue-800 border-blue-300' 
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        Seconda Casa
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Complete Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Indietro</span>
                </button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCompleteOnboarding}
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center space-x-2"
                >
                  <span>Completa & Vai alla Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
}
