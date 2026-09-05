import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Translations, itTranslations } from './it';

export type SupportedLanguage = 'it';

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
}

const translationsMap: Record<SupportedLanguage, Translations> = {
  it: itTranslations
};

const I18nContext = createContext<I18nContextType>({
  language: 'it',
  setLanguage: () => {},
  t: itTranslations
});

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('it');

  const value: I18nContextType = {
    language,
    setLanguage,
    t: translationsMap[language] || itTranslations
  };

  return React.createElement(I18nContext.Provider, { value }, children);
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      language: 'it' as SupportedLanguage,
      setLanguage: () => {},
      t: itTranslations
    };
  }
  return context;
};

// Also export the direct dictionary instance for non-hook or static consumption
export const t = itTranslations;
export * from './it';
