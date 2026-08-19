'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  User, 
  Bell, 
  Download, 
  Scale, 
  Plus, 
  LogOut, 
  TrendingDown,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { formatCurrency } from '@/lib/utils';
import { MOCK_PROJECT } from '@/lib/mock-data';

export default function AreaPersonalePage() {
  const { user, isAuthenticated, logout, projects, notifications, markNotificationAsRead } = useAuth();
  const [activeTab, setActiveTab] = useState<'cantieri' | 'profilo' | 'archivio' | 'notifiche'>('cantieri');

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-md border border-blue-100">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Accesso Richiesto</h2>
          <p className="text-xs text-slate-500 font-medium">
            Effettua il login per visualizzare i tuoi cantieri, i preventivi riconciliati e l&apos;archivio documentale.
          </p>
        </div>
        <Link href="/login">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all">
            Accedi con Email o Account Demo &rarr;
          </button>
        </Link>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      
      {/* 1. USER PROFILE SUMMARY HERO */}
      <div className="bg-gradient-to-tr from-slate-900 via-slate-900 to-blue-950 text-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 flex items-center space-x-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-500 p-0.5 shadow-lg shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-xl font-black text-blue-400">
              {user.avatar_initials}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black tracking-tight">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-blue-300 text-[10px] font-black uppercase border border-white/10">
                {user.role === 'committente_privato' ? 'Committente Privato' : 'Impresa Edile'}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {user.email} • C.F. {user.fiscal_code}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center space-x-3 shrink-0">
          <Link href={`/projects/${MOCK_PROJECT.id}/upload`}>
            <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-2">
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Nuovo Preventivo</span>
            </button>
          </Link>

          <button
            onClick={logout}
            className="p-2.5 bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl transition-colors border border-white/10"
            title="Disconnetti"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. SUMMARY KPI STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="luminous-card p-5 flex justify-between items-center border-t-4 border-t-blue-600">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Cantieri Attivi</div>
            <div className="text-2xl font-black text-slate-900 mt-1 tabular-numbers">{projects.length} Cantieri</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="luminous-card p-5 flex justify-between items-center border-t-4 border-t-emerald-600">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Omissioni Scovate</div>
            <div className="text-2xl font-black text-emerald-700 mt-1 tabular-numbers">+ € 24.250</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>

        <div className="luminous-card p-5 flex justify-between items-center border-t-4 border-t-indigo-600">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Detrazioni Fiscali Stimate</div>
            <div className="text-2xl font-black text-indigo-700 mt-1 tabular-numbers">€ 38.500</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* 3. TABS NAVIGATION */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2 overflow-x-auto text-xs font-bold scrollbar-none">
        
        <button
          onClick={() => setActiveTab('cantieri')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'cantieri' 
              ? 'bg-blue-50 text-blue-700 font-black shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4 text-blue-600" />
          <span>I Miei Cantieri ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('archivio')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'archivio' 
              ? 'bg-blue-50 text-blue-700 font-black shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Download className="w-4 h-4 text-blue-600" />
          <span>Archivio Report & Contratti</span>
        </button>

        <button
          onClick={() => setActiveTab('notifiche')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'notifiche' 
              ? 'bg-blue-50 text-blue-700 font-black shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4 text-blue-600" />
          <span>Notifiche</span>
          {unreadCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('profilo')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'profilo' 
              ? 'bg-blue-50 text-blue-700 font-black shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4 text-blue-600" />
          <span>Dati Anagrafici & Fiscali</span>
        </button>

      </div>

      {/* 4. TAB CONTENTS */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: I MIEI CANTIERI */}
        {activeTab === 'cantieri' && (
          <motion.div
            key="tab-cantieri"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="luminous-card p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[10px] font-bold">
                        {proj.property_type}
                      </span>
                      <span className="text-xs font-black text-blue-600">
                        {proj.city} ({proj.province})
                      </span>
                    </div>

                    <h3 className="font-black text-base text-slate-900 leading-snug">
                      {proj.name}
                    </h3>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 font-medium">
                      <div className="flex justify-between text-slate-600">
                        <span>Preventivi Caricati:</span>
                        <strong className="text-slate-900">{proj.quotes_count} preventivi</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Superficie Immobile:</span>
                        <strong className="text-slate-900">{proj.surface_sqm} mq</strong>
                      </div>
                      <div className="flex justify-between text-emerald-800 font-bold border-t border-slate-200/60 pt-1">
                        <span>Risparmio Omissioni:</span>
                        <span>+ {formatCurrency(proj.scope_saved_amount)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 text-xs">
                    <Link href={`/projects/${proj.id}/compare`} className="flex-1">
                      <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors flex items-center justify-center space-x-1 shadow-sm">
                        <Scale className="w-3.5 h-3.5 text-blue-400" />
                        <span>Vedi Matrice</span>
                      </button>
                    </Link>
                    <Link href={`/projects/${proj.id}`}>
                      <button className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors">
                        Scheda
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 2: ARCHIVIO REPORT & CONTRATTI */}
        {activeTab === 'archivio' && (
          <motion.div
            key="tab-archivio"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200/90 shadow-md space-y-6"
          >
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">Documenti & Report Scaricabili</h3>
              <p className="text-xs text-slate-500 font-medium">I deliverable generati dall&apos;engine di normalizzazione per i tuoi cantieri.</p>
            </div>

            <div className="divide-y divide-slate-100 text-xs font-medium">
              {[
                { title: 'Report Completo di Confronto a Scope (PDF 8 Pag.)', cantiere: 'Via Solferino Milano', date: '08 Ago 2026', format: 'PDF', size: '2.4 MB' },
                { title: 'Matrice Comparativa Riconciliata (XLSX)', cantiere: 'Via Solferino Milano', date: '08 Ago 2026', format: 'XLSX', size: '148 KB' },
                { title: 'Bozza Contratto d\'Appalto con Clausole di Tutela', cantiere: 'Via Solferino Milano', date: '12 Ago 2026', format: 'DOCX', size: '85 KB' },
                { title: 'Asseverazione Detrazioni Fiscali Bonus Casa 50%', cantiere: 'Via Solferino Milano', date: '15 Ago 2026', format: 'PDF', size: '520 KB' }
              ].map((doc, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-900">{doc.title}</div>
                    <div className="text-[11px] text-slate-500">
                      Cantiere: <strong>{doc.cantiere}</strong> • Generato il {doc.date} • {doc.size}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 transition-colors flex items-center space-x-1.5 shrink-0 self-start sm:self-center">
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Scarica {doc.format}</span>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: NOTIFICHE & FLAG */}
        {activeTab === 'notifiche' && (
          <motion.div
            key="tab-notifiche"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200/90 shadow-md space-y-6"
          >
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-900">Centro Notifiche Cantiere</h3>
                <p className="text-xs text-slate-500 font-medium">Aggiornamenti in tempo reale su preventivi e anomalie contrattuali.</p>
              </div>
            </div>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div 
                  key={n.id}
                  onClick={() => markNotificationAsRead(n.id)}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                    !n.is_read ? 'bg-blue-50/60 border-blue-200 font-medium' : 'bg-white border-slate-100 opacity-75'
                  }`}
                >
                  <div className="space-y-1 text-xs font-medium">
                    <div className="font-bold text-slate-900 flex items-center space-x-2">
                      <span>{n.title}</span>
                      {!n.is_read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-slate-600 leading-relaxed">{n.message}</p>
                    <div className="text-[10px] text-slate-400 font-mono">{n.date}</div>
                  </div>

                  {n.link && (
                    <Link href={n.link} className="shrink-0 text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1">
                      <span>Apri</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: DATI PROFILO */}
        {activeTab === 'profilo' && (
          <motion.div
            key="tab-profilo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200/90 shadow-md space-y-6 max-w-2xl"
          >
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">Dati Anagrafici & Pratiche Fiscali</h3>
              <p className="text-xs text-slate-500 font-medium">Utilizzati per le intestazioni dei contratti d&apos;appalto e le asseverazioni CILA.</p>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome e Cognome / Ragione Sociale</label>
                <input 
                  type="text" 
                  defaultValue={user.name}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Codice Fiscale</label>
                  <input 
                    type="text" 
                    defaultValue={user.fiscal_code}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Telefono</label>
                  <input 
                    type="text" 
                    defaultValue={user.phone}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Indirizzo di Residenza</label>
                <input 
                  type="text" 
                  defaultValue={`${user.address}, ${user.city}`}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black uppercase tracking-wider text-xs rounded-xl hover:brightness-110 transition-all shadow-md">
                  Salva Modifiche Profilo
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
