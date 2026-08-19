# 🏗️ PrevEDIbile.ai — EDILIZIA DIGITALE
> **Il 1° Comparatore Edilizio a Parità di Scope con Intelligenza Artificiale**  
> *Normalizzazione automatica dei computi metrici, individuazione delle lavorazioni omesse, split IVA beni significativi e matching con prezzari regionali DEI.*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

---

## 💡 Il Problema Risolto

Nel settore delle ristrutturazioni edilizie in Italia, il **78% dei preventivi apparentemente più economici** nasconde lavorazioni omesse (smaltimento calcinacci, massetti, oneri di sicurezza). Il committente firma il totale più basso e si ritrova a pagare dal 15% al 35% in più di varianti a cantiere avviato.

**PrevEDIbile.ai** normalizza i documenti estratti dai PDF e calcola il **Totale a Parità di Scope**, reintegrando automaticamente le voci mancanti al prezzo mediano provinciale DEI.

---

## ✨ Funzionalità Chiave

1. **Matrice di Confronto a Parità di Scope**:
   - Switch istantaneo tra **Totale Dichiarato** e **Totale a Parità di Scope**.
   - Evidenziazione visiva immediata delle omissioni di capitolato.
2. **Tassonomia Edile Standard a 20 Categorie**:
   - Mappatura normalizzata delle voci descritte in modo eterogeneo dai vari fornitori.
3. **Controllo Fiscale & IVA Beni Significativi**:
   - Calcolo automatico della scissione IVA (10% fino alla quota manodopera, 22% sull'eccedenza).
   - Simulatore interattivo **Bonus Ristrutturazioni Casa 50%** con calcolo rate 730 decennali.
4. **Albo Imprese con Filtri Tutte le 20 Regioni e 107 Province Italiane**:
   - Ricerca e invio capitolato con 1 clic a imprese verificate con **DURC regolare**, abilitazione DiCo e polizza RCT.
5. **Onboarding Dedicati**:
   - **Privati**: Registrazione rapida con **Google** e **Apple** in 1 clic.
   - **Imprese**: Wizard di certificazione a 5 step con rilascio del **Bollino di Trasparenza Certificato**.

---

## 🛠️ Stack Tecnologico

- **Framework**: [Next.js 16.3 (App Router & Turbopack)](https://nextjs.org)
- **UI & Design System**: Tailwind CSS 4, Framer Motion, Lucide Icons, Glassmorphism 2026.
- **Linguaggio**: TypeScript Strict Mode.
- **Database / Backend Ready**: Supabase Postgres (schema con migrazioni SQL pronte in `/supabase`).

---

## 🚀 Avvio Rapido Locale

```bash
# 1. Clona il repository
git clone https://github.com/PEK91-svg/filippoverga.git
cd filippoverga

# 2. Installa le dipendenze
npm install

# 3. Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

---

## 📦 Struttura del Progetto

```
filippoverga/
├── app/
│   ├── area-personale/       # Dashboard utente autenticato (Cantieri, Archivio, Notifiche)
│   ├── aziende/              # Landing imprese & onboarding certificazione
│   ├── fornitori/            # Albo nazionale con filtri 20 regioni & 107 province
│   ├── login/                # Accesso rapido Google, Apple, Magic Link
│   ├── privati/              # Guida committenti, simulatore 50% & onboarding rapido
│   ├── projects/[id]/
│   │   ├── compare/          # Matrice di confronto a parità di scope
│   │   ├── tax-export/       # Esportazione report e quadro detrazioni
│   │   └── upload/           # Engine upload PDF computi metrici
│   └── globals.css           # Design System Electric Azure & Luminous Glass
├── components/
│   ├── layout/header.tsx     # Floating Frosted Glass Navbar
│   └── ui/logo.tsx           # Logo Vettoriale Minimal SVG
├── lib/
│   ├── italian-territory.ts  # Database 20 Regioni e 107 Province Italiane
│   ├── taxonomy.ts           # Tassonomia a 20 Categorie di Lavorazione Edile
│   ├── mock-data.ts          # Dataset realistico cantieri e computi metrici
│   └── auth-context.tsx      # Gestione sessione e autorizzazioni
└── supabase/
    └── migrations/           # Schema database relazionale completo
```

---

## 📄 Licenza

Distribuito sotto licenza MIT. PrevEDIbile.ai — Tutti i diritti riservati.
