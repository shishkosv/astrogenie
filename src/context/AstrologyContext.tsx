import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as astrologyApi from '../services/astrologyApi';
import type { Horoscope, Compatibility, TarotCard } from '../types';

interface AstrologyContextType {
  horoscope: Horoscope | null;
  compatibility: Compatibility | null;
  tarotCard: TarotCard | null;
  getCompatibilityScore: (sign1: string, sign2: string) => Promise<number>;
}

const AstrologyContext = createContext<AstrologyContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AstrologyProvider: React.FC<Props> = ({ children }): JSX.Element => {
  const [horoscope, setHoroscope] = useState<Horoscope | null>(null);
  const [compatibility, setCompatibility] = useState<Compatibility | null>(null);
  const [tarotCard, setTarotCard] = useState<TarotCard | null>(null);

  const getCompatibilityScore = async (sign1: string, sign2: string): Promise<number> => {
    return astrologyApi.getCompatibilityScore(sign1, sign2);
  };

  const value = {
    horoscope,
    compatibility,
    tarotCard,
    getCompatibilityScore,
  };

  return <AstrologyContext.Provider value={value}>{children}</AstrologyContext.Provider>;
};

export const useAstrology = (): AstrologyContextType => {
  const context = useContext(AstrologyContext);
  if (context === undefined) {
    throw new Error('useAstrology must be used within an AstrologyProvider');
  }
  return context;
};
