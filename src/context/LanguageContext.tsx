import React, { createContext, useContext, useEffect, useState } from 'react';
import { DATA } from '../lib/data';
import { PortfolioContent } from '../types/portfolio';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: PortfolioContent;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('language');
    if (saved === 'ar' || saved === 'en') return saved;
  } catch {
    // storage unavailable (private mode, etc.)
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    try {
      localStorage.setItem('language', language);
    } catch {
      // ignore
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: DATA[language], dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
