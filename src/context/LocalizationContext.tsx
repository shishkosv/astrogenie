import React, { createContext, useContext, ReactNode } from 'react';
import * as RNLocalize from 'react-native-localize';
import translations from '../localization/translations';

interface LocalizationContextType {
  locale: string;
  setLocale: (locale: string) => void;
  translations: Record<string, string>;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<Props> = ({ children }): JSX.Element => {
  const [locale, setLocale] = React.useState<string>('en');
  const translations: Record<string, string> = {}; // Add your translations here

  const value = {
    locale,
    setLocale,
    translations,
  };

  // RNLocalize.addEventListener('change', handleLocalizationChange);

  // return () => {
  //   RNLocalize.removeEventListener('change', handleLocalizationChange);
  // };

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
