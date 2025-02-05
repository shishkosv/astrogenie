import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import * as RNLocalize from 'react-native-localize';
import translations from '../localization/translations';

interface LocalizationContextType {
  t: (key: string, params?: Record<string, string | number>) => string;
  locale: string;
  setLocale: (locale: string) => void;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    const locales = RNLocalize.getLocales();
    const supportedLanguages = Object.keys(translations);
    const preferredLanguage = locales[0]?.languageCode;
    return supportedLanguages.includes(preferredLanguage) ? preferredLanguage : 'en';
  });

  const t = (key: string, params?: Record<string, string | number>) => {
    let translation = translations[locale][key] || key;
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{{${param}}}`, String(value));
      });
    }
    return translation;
  };

  useEffect(() => {
    const handleLocalizationChange = () => {
      const newLocale = RNLocalize.getLocales()[0]?.languageCode;
      if (newLocale && Object.keys(translations).includes(newLocale)) {
        setLocale(newLocale);
      }
    };

    // RNLocalize.addEventListener('change', handleLocalizationChange);

    // return () => {
    //   RNLocalize.removeEventListener('change', handleLocalizationChange);
    // };
  }, []);

  return (
    <LocalizationContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
