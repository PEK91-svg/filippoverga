'use client';

import React, { createContext, useContext, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'committente_privato' | 'impresa_edile' | 'tecnico';
  fiscal_code: string;
  address: string;
  city: string;
  avatar_initials: string;
}

export interface UserProjectSummary {
  id: string;
  name: string;
  property_type: string;
  surface_sqm: number;
  city: string;
  province: string;
  status: string;
  quotes_count: number;
  scope_saved_amount: number;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  is_read: boolean;
  type: 'alert' | 'success' | 'info';
  link?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email?: string) => void;
  logout: () => void;
  projects: UserProjectSummary[];
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-01',
  name: 'Gaetano Pecorella',
  email: 'gaetano.pecorella@example.com',
  phone: '+39 347 1234567',
  role: 'committente_privato',
  fiscal_code: 'PCRGTN85M01F205X',
  address: 'Via Solferino 14',
  city: 'Milano (MI)',
  avatar_initials: 'GP'
};

const DEFAULT_PROJECTS: UserProjectSummary[] = [
  {
    id: 'proj-01',
    name: 'Ristrutturazione Appartamento Via Solferino 14',
    property_type: 'Appartamento Quadrilocale',
    surface_sqm: 85,
    city: 'Milano',
    province: 'MI',
    status: '3 Preventivi Riconciliati',
    quotes_count: 3,
    scope_saved_amount: 14250,
    created_at: '2026-08-01'
  },
  {
    id: 'proj-02',
    name: 'Rifacimento 2 Bagni & Impianto Idraulico',
    property_type: 'Appartamento',
    surface_sqm: 45,
    city: 'Roma',
    province: 'RM',
    status: 'In attesa 2° preventivo',
    quotes_count: 1,
    scope_saved_amount: 3200,
    created_at: '2026-08-10'
  },
  {
    id: 'proj-03',
    name: 'Isolamento Termico & Sostituzione Infissi',
    property_type: 'Villa Unifamiliare',
    surface_sqm: 140,
    city: 'Monza',
    province: 'MB',
    status: 'Capitolato Pubblicato',
    quotes_count: 2,
    scope_saved_amount: 6800,
    created_at: '2026-08-15'
  }
];

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    title: '⚠️ Lavorazione fondamentale omessa',
    message: 'Impresa Edile Rossi & Figli non ha incluso lo smaltimento macerie e il massetto nel computo per Via Solferino.',
    date: 'Oggi alle 09:30',
    is_read: false,
    type: 'alert',
    link: '/projects/proj-01/compare'
  },
  {
    id: 'notif-02',
    title: '✨ Nuovo preventivo ricevuto',
    message: 'Edilizia Moderna S.r.l. ha caricato il computo metrico dettagliato con 13 categorie.',
    date: 'Ieri alle 17:45',
    is_read: false,
    type: 'success',
    link: '/projects/proj-01/compare'
  },
  {
    id: 'notif-03',
    title: '📋 Stima Detrazioni Fiscale Pronta',
    message: 'Il tuo cantiere di Milano ha maturato € 27.500 di detrazioni IRPEF 50% recuperabili in 10 rate.',
    date: '16 Ago 2026',
    is_read: true,
    type: 'info',
    link: '/projects/proj-01/tax-export'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [projects] = useState<UserProjectSummary[]>(DEFAULT_PROJECTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEFAULT_NOTIFICATIONS);

  const login = (email?: string) => {
    setUser({
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email
    });
  };

  const logout = () => {
    setUser(null);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      projects,
      notifications,
      markNotificationAsRead
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
