import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { AuthProvider } from "@/lib/auth-context";
import { Logo } from "@/components/ui/logo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PrevEDIbile.ai — Edilizia Digitale | Normalizzazione e Confronto Preventivi Edilizi a Parità di Scope",
  description: "PrevEDIbile.ai (predibile.ai): La prima piattaforma di intelligenza artificiale per il confronto di preventivi di ristrutturazione edilizia in Italia a parità di scope con individuazione immediata delle omissioni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} font-sans antialiased bg-[#F8FAFC] text-[#0F172A] min-h-screen flex flex-col`}>
        <AuthProvider>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </AuthProvider>
        
        {/* Footer Ufficiale PrevEDIbile.ai (Luminous Tech & Clean Minimal) */}
        <footer className="border-t border-slate-200 bg-white text-slate-700 py-14 mt-20 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-100">
              
              {/* Brand Col */}
              <div className="space-y-3.5">
                <Logo size="md" />

                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Piattaforma indipendente di normalizzazione computi metrici estimativi e confronto preventivi edilizi a parità di scope con intelligenza artificiale.
                </p>
                <div className="text-[11px] font-mono text-blue-600 font-bold">
                  https://predibile.ai/
                </div>
              </div>

              {/* Per i Privati */}
              <div className="space-y-2.5">
                <div className="font-black text-slate-900 uppercase tracking-wider text-[11px]">Per i Privati</div>
                <ul className="space-y-2 text-slate-500 font-medium">
                  <li><Link href="/privati" className="hover:text-blue-600 transition-colors">Confronta Preventivi & Omissioni</Link></li>
                  <li><Link href="/fornitori" className="hover:text-blue-600 transition-colors">Trova Imprese nella Tua Zona</Link></li>
                  <li><Link href="/login" className="hover:text-blue-600 transition-colors">Area Riservata Cantieri</Link></li>
                  <li><Link href="/privati" className="hover:text-blue-600 transition-colors">Simulatore Detrazioni Bonus 50%</Link></li>
                </ul>
              </div>

              {/* Per le Imprese */}
              <div className="space-y-2.5">
                <div className="font-black text-slate-900 uppercase tracking-wider text-[11px]">Per le Imprese</div>
                <ul className="space-y-2 text-slate-500 font-medium">
                  <li><Link href="/aziende" className="hover:text-blue-600 transition-colors">Soluzioni per Costruttori & Artigiani</Link></li>
                  <li><Link href="/aziende/onboarding" className="hover:text-blue-600 transition-colors">Certifica la Tua Impresa (Bollino)</Link></li>
                  <li><Link href="/fornitori" className="hover:text-blue-600 transition-colors">Ricezione Preventivi su Capitolato</Link></li>
                  <li><Link href="/login" className="hover:text-blue-600 transition-colors">Accesso Albo Imprese</Link></li>
                </ul>
              </div>

              {/* Metodo & Normativa */}
              <div className="space-y-2.5">
                <div className="font-black text-slate-900 uppercase tracking-wider text-[11px]">Metodo & Garanzia</div>
                <ul className="space-y-2 text-slate-500 font-medium">
                  <li><span className="text-slate-700">Tassonomia a 20 Categorie Edili</span></li>
                  <li><span className="text-slate-700">Prezzari Regionali & DEI (p25-p75)</span></li>
                  <li><span className="text-slate-700">Scissione IVA Beni Significativi</span></li>
                  <li><span className="text-slate-700">Algoritmo di Riconciliazione AI</span></li>
                </ul>
              </div>

            </div>

            <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 space-y-3 sm:space-y-0">
              <div>
                © 2026 <strong>PrevEDIbile.ai</strong> — EDILIZIA DIGITALE. Tutti i diritti riservati.
              </div>
              <div className="flex space-x-6 text-slate-500 font-medium">
                <span className="hover:text-slate-900 cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-slate-900 cursor-pointer transition-colors">Termini di Servizio</span>
                <span className="hover:text-slate-900 cursor-pointer transition-colors">Cookie Policy</span>
              </div>
            </div>

          </div>
        </footer>
      </body>
    </html>
  );
}
