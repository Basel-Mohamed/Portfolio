import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DATA } from '../lib/data';
import { resolveImage } from '../lib/imageRegistry';
import { PortfolioContent } from '../types/portfolio';

// Recursively walk an object and resolve any "image" fields through the registry
function resolveImages<T>(obj: T): T {
  if (Array.isArray(obj)) return obj.map(item => resolveImages(item)) as unknown as T;
  if (obj && typeof obj === 'object') {
    const result: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      const val = (obj as Record<string, any>)[key];
      if (key === 'image' && typeof val === 'string') {
        result[key] = resolveImage(val);
      } else {
        result[key] = resolveImages(val);
      }
    }
    return result as T;
  }
  return obj;
}

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: PortfolioContent;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const themePalette: Record<string, Record<string, string>> = {
  emerald: { 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857' },
  rose: { 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c' },
  amber: { 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
  purple: { 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce' },
  blue: { 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' }
};

function applyThemeVariables(themeName: string) {
  const styleId = 'dynamic-theme-overrides';
  let styleEl = document.getElementById(styleId);
  
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  if (themeName === 'default') {
      styleEl.innerHTML = '';
      return;
  }

  const palette = themePalette[themeName] || themePalette.blue;
  styleEl.innerHTML = `
    :root {
      --color-blue-400: ${palette['400']} !important;
      --color-blue-500: ${palette['500']} !important;
      --color-blue-600: ${palette['600']} !important;
      --color-blue-700: ${palette['700']} !important;
    }
  `;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [tData, setTData] = useState<PortfolioContent>(DATA.en);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'ar' || saved === 'en') setLanguage(saved);
  }, []);

  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
    
    async function fetchDynamicContent() {
      setIsLoading(true);
      
      try {
        const [contentRes, settingsRes] = await Promise.all([
           supabase.from('portfolio_content').select('*').eq('language', language),
           supabase.from('site_settings').select('theme_color').single()
        ]);
        
        if (settingsRes.data && settingsRes.data.theme_color) {
            applyThemeVariables(settingsRes.data.theme_color);
        }

        const rows = contentRes.data;
        const error = contentRes.error;
        
        if (error || !rows || rows.length === 0) {
           setTData(DATA[language]);
           setIsLoading(false);
           return;
        }

        const rebuilt: PortfolioContent = JSON.parse(JSON.stringify(DATA[language]));
        
        rebuilt.projects.items = [];
        if (rebuilt.experience) rebuilt.experience.items = [];
        if (rebuilt.services) rebuilt.services.items = [];
        if (rebuilt.about) rebuilt.about.certifications = [];

        rows.forEach((row: any) => {
            if (row.section === 'projects' && rebuilt.projects) rebuilt.projects.items.push(row.content);
            else if (row.section === 'experience' && rebuilt.experience) rebuilt.experience.items?.push(row.content);
            else if (row.section === 'services' && rebuilt.services) rebuilt.services.items?.push(row.content);
            else if (row.section === 'certifications' && rebuilt.about) rebuilt.about.certifications.push(row.content);
            else if (row.section === 'about' && rebuilt.about) rebuilt.about = { ...rebuilt.about, ...row.content };
            else if (row.section === 'hero' && rebuilt.hero) rebuilt.hero = { ...rebuilt.hero, ...row.content };
            else (rebuilt as Record<string, any>)[row.section] = row.content;
        });

        const resolved = resolveImages(rebuilt);
        setTData(resolved);
      } catch {
        setTData(DATA[language]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDynamicContent();
  }, [language]);

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: tData, dir }}>
      {isLoading ? (
        <div className="fixed inset-0 bg-[#0d1117] flex items-center justify-center z-50 transition-opacity">
           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : children}
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
