import { createContext, useContext, useState } from 'react';
import type { Language } from '../types/menu';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'zh',
  setLang: () => {},
});

const STORAGE_KEY = 'lemongrass-lang';

function getSavedLang(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'zh' || saved === 'en' || saved === 'ja' || saved === 'ko') return saved;
  return 'zh';
}

export function useLanguageState(): LanguageContextValue {
  const [lang, setLangState] = useState<Language>(getSavedLang);

  const setLang = (next: Language) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return { lang, setLang };
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
