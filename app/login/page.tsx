'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Mail, 
  CheckCircle2, 
  Building2, 
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/ui/logo';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    setIsSent(true);
    setTimeout(() => {
      router.push('/area-personale');
    }, 1000);
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    login(`utente.${provider}@example.com`);
    router.push('/area-personale');
  };

  const handleFastDemoLogin = (role: 'privato' | 'impresa') => {
    login(role === 'privato' ? 'gaetano.pecorella@example.com' : 'info@ediliziamoderna.it');
    router.push('/area-personale');
  };

  return (
    <div className="max-w-md mx-auto space-y-8 py-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-4 flex flex-col items-center">
        <Logo size="lg" />
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Accedi all&apos;Area Riservata
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Gestisci i tuoi cantieri, confronta i preventivi a parità di scope e monitora le detrazioni.
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/90 shadow-xl space-y-6">
        
        {isSent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4 space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Accesso Eseguito!</h3>
            <p className="text-xs text-slate-500 font-medium">Reindirizzamento all&apos;Area Personale in corso...</p>
          </motion.div>
        ) : (
          <>
            {/* 1-Click Social Sign-in Buttons */}
            <div className="space-y-2.5">
              
              {/* Google Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialLogin('google')}
                className="w-full py-3 px-4 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 rounded-2xl font-bold text-xs text-slate-800 transition-all flex items-center justify-center space-x-2.5 shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Accedi con Google</span>
              </motion.button>

              {/* Apple Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialLogin('apple')}
                className="w-full py-3 px-4 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl font-bold text-xs transition-all flex items-center justify-center space-x-2.5 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.3-9.56-11.33-20.24-15.08-32.04-3.75-11.79-5.63-23.01-5.63-33.65 0-13.37 3.38-24.63 10.13-33.77 6.75-9.13 15.42-13.79 26.01-13.97 4.13 0 9.07 1.13 14.83 3.39 5.76 2.26 9.87 3.44 12.33 3.55 2.12-.11 6.34-1.34 12.65-3.71 6.31-2.37 11.39-3.44 15.24-3.23 11.41.65 20.35 4.78 26.83 12.4-9.89 5.98-14.73 14.24-14.51 24.78.22 8.16 3.32 15.02 9.3 20.59 5.98 5.56 13.06 8.79 21.23 9.68-2.18 6.31-4.73 12.74-7.65 19.3zM119.22 31.97c0-7.39 2.66-14.28 7.98-20.69 5.32-6.41 11.83-10.42 19.53-12.03.22 1.19.33 2.28.33 3.28 0 7.39-2.77 14.39-8.31 21-5.54 6.61-12.15 10.48-19.83 11.61-.43-1.08-.65-2.07-.65-3.17z"/>
                </svg>
                <span>Accedi con Apple</span>
              </motion.button>

            </div>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-slate-400 text-[10px] font-bold uppercase">oppure email magic link</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@esempio.it"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
              >
                <span>Invia Magic Link</span>
              </motion.button>
            </form>
          </>
        )}

        {/* FAST DEMO LOGIN BUTTONS */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-black text-center text-blue-600 uppercase tracking-wider">
            Oppure prova subito con un account demo
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => handleFastDemoLogin('privato')}
              className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 transition-colors flex items-center justify-center space-x-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Committente</span>
            </button>

            <button
              onClick={() => handleFastDemoLogin('impresa')}
              className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 transition-colors flex items-center justify-center space-x-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Impresa Edile</span>
            </button>
          </div>
        </div>

      </div>

      <div className="text-center text-[11px] text-slate-400 font-medium">
        Non hai ancora un account? L&apos;iscrizione è automatica al primo accesso.
      </div>

    </div>
  );
}
