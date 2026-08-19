'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LogIn, 
  Menu, 
  X,
  Scale,
  Building2,
  FileSpreadsheet,
  Plus,
  LogOut,
  Store,
  Award,
  UploadCloud,
  ChevronRight
} from 'lucide-react';
import { MOCK_PROJECT } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/ui/logo';

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full max-w-7xl mx-auto px-3 sm:px-6">
      
      {/* FLOATING LUMINOUS FROSTED GLASS NAVBAR */}
      <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-200">
        
        {/* 1. LEFT: ULTRA MINIMAL VECTOR LOGO */}
        <Link href={isAuthenticated ? "/area-personale" : "/"}>
          <Logo size="md" />
        </Link>

        {/* 2. CENTER: COMMERCIAL HIGH-CONVERTING MENU */}
        <nav className="hidden xl:flex items-center space-x-1 text-xs font-bold text-slate-600">
          
          {/* ================= AREA PUBBLICA ================= */}
          {!isAuthenticated ? (
            <>
              <Link 
                href="/" 
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  pathname === '/' 
                    ? 'bg-blue-50 text-[#2563EB] font-black' 
                    : 'hover:text-slate-950 hover:bg-slate-100/60'
                }`}
              >
                Home
              </Link>

              <Link 
                href="/privati" 
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  pathname === '/privati' 
                    ? 'bg-blue-50 text-[#2563EB] font-black' 
                    : 'hover:text-slate-950 hover:bg-slate-100/60'
                }`}
              >
                <Scale className="w-4 h-4 text-[#2563EB]" />
                <span>Confronta Preventivi</span>
              </Link>

              <Link 
                href="/fornitori" 
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  pathname === '/fornitori' 
                    ? 'bg-blue-50 text-[#2563EB] font-black' 
                    : 'hover:text-slate-950 hover:bg-slate-100/60'
                }`}
              >
                <Store className="w-4 h-4 text-[#2563EB]" />
                <span>Trova Imprese</span>
              </Link>

              <Link 
                href="/aziende" 
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  pathname === '/aziende' || pathname === '/aziende/onboarding' 
                    ? 'bg-blue-50 text-[#2563EB] font-black' 
                    : 'hover:text-slate-950 hover:bg-slate-100/60'
                }`}
              >
                <Award className="w-4 h-4 text-[#2563EB]" />
                <span>Certifica Impresa</span>
              </Link>

              <Link 
                href="/#come-funziona" 
                className="px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-950 hover:bg-slate-100/60 transition-all"
              >
                Come Funziona
              </Link>
            </>
          ) : (
            /* ================= AREA PRIVATA (POST-AUTH) ================= */
            <>
              <Link 
                href="/area-personale" 
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  pathname === '/area-personale' 
                    ? 'bg-blue-50 text-[#2563EB] font-black' 
                    : 'hover:text-slate-950 hover:bg-slate-100/60'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#2563EB]" />
                <span>I Miei Cantieri</span>
              </Link>

              <Link 
                href={`/projects/${MOCK_PROJECT.id}/compare`} 
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  pathname.includes('/compare') 
                    ? 'bg-blue-50 text-[#2563EB] font-black' 
                    : 'hover:text-slate-950 hover:bg-slate-100/60'
                }`}
              >
                <Scale className="w-4 h-4 text-[#2563EB]" />
                <span>Matrice a Scope</span>
              </Link>

              <Link 
                href={`/projects/${MOCK_PROJECT.id}/tax-export`} 
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  pathname.includes('/tax-export') 
                    ? 'bg-blue-50 text-[#2563EB] font-black' 
                    : 'hover:text-slate-950 hover:bg-slate-100/60'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-[#2563EB]" />
                <span>Detrazioni & Report</span>
              </Link>

              <Link 
                href="/fornitori" 
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  pathname === '/fornitori' 
                    ? 'bg-blue-50 text-[#2563EB] font-black' 
                    : 'hover:text-slate-950 hover:bg-slate-100/60'
                }`}
              >
                <Store className="w-4 h-4 text-[#2563EB]" />
                <span>Richiedi Preventivi</span>
              </Link>
            </>
          )}

        </nav>

        {/* 3. RIGHT: AUTH & ACTIONS (SWITCH LINGUA RIMOSSO) */}
        <div className="flex items-center space-x-2.5">
          
          {/* DYNAMIC USER STATE */}
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-2">
              <Link href="/area-personale">
                <div 
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all ${
                    pathname === '/area-personale'
                      ? 'bg-blue-50 text-[#2563EB] border-blue-200 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                    {user.avatar_initials}
                  </div>
                  <span className="text-xs font-bold hidden md:inline">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
              </Link>

              <button
                onClick={logout}
                title="Disconnetti"
                className="p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl border border-slate-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>

              <Link href={`/projects/${MOCK_PROJECT.id}/upload`}>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span className="hidden sm:inline">Carica PDF</span>
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <button className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-slate-950 font-bold text-xs transition-colors flex items-center space-x-1.5 bg-slate-100/70 hover:bg-slate-100 border border-slate-200">
                  <LogIn className="w-3.5 h-3.5 text-blue-600" />
                  <span>Accedi</span>
                </button>
              </Link>

              <Link href="/privati">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-md shadow-blue-600/25 transition-all flex items-center space-x-2"
                >
                  <UploadCloud className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Analizza PDF Gratis</span>
                </motion.button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* MOBILE EXPANDABLE MENU */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="xl:hidden mt-2 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-2xl p-4 space-y-2 text-xs font-bold text-slate-800 shadow-xl"
        >
          {!isAuthenticated ? (
            <>
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl hover:bg-slate-100 text-slate-800"
              >
                Home
              </Link>
              <Link 
                href="/privati" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl hover:bg-slate-100 text-slate-800"
              >
                Confronta Preventivi
              </Link>
              <Link 
                href="/fornitori" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl hover:bg-slate-100 text-slate-800"
              >
                Trova Imprese Certificate
              </Link>
              <Link 
                href="/aziende" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl hover:bg-slate-100 text-slate-800"
              >
                Certifica la Tua Impresa
              </Link>
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl bg-blue-50 text-blue-700 font-black flex items-center justify-between"
              >
                <span>Accedi all&apos;Area Riservata</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/area-personale" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl bg-blue-50 text-blue-700 font-black"
              >
                I Miei Cantieri ({user?.name})
              </Link>
              <Link 
                href={`/projects/${MOCK_PROJECT.id}/compare`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl hover:bg-slate-100 text-slate-800"
              >
                Matrice a Scope
              </Link>
              <Link 
                href={`/projects/${MOCK_PROJECT.id}/tax-export`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl hover:bg-slate-100 text-slate-800"
              >
                Detrazioni & Report
              </Link>
              <Link 
                href="/fornitori" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl hover:bg-slate-100 text-slate-800"
              >
                Richiedi Preventivi Fornitori
              </Link>
              <button 
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-red-600 hover:bg-red-50"
              >
                Disconnetti
              </button>
            </>
          )}
        </motion.div>
      )}

    </header>
  );
}
