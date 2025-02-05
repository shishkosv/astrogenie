import type React from 'react';
import { createContext, useContext } from 'react';
import * as astrologyApi from '../services/astrologyApi';
import type { AstrologyContextType } from '../types/context';
import type { Horoscope, Compatibility, TarotCard } from '../types/astrology';

const AstrologyContext = createContext<AstrologyContextType | undefined>(undefined);

export const AstrologyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getHoroscope = async (
    sign: string,
    day: 'today' | 'tomorrow' | 'yesterday' = 'today'
  ): Promise<Horoscope> => {
    return await astrologyApi.getHoroscope(sign, day);
  };

  const getCompatibility = async (sign1: string, sign2: string): Promise<Compatibility> => {
    return await astrologyApi.getCompatibilityScore(sign1, sign2);
  };

  const getTarotCards = async (): Promise<TarotCard[]> => {
    return await astrologyApi.getTarotReading();
  };

  return (
    <AstrologyContext.Provider value={{ getHoroscope, getCompatibility, getTarotCards }}>
      {children}
    </AstrologyContext.Provider>
  );
};

export const useAstrology = () => {
  const context = useContext(AstrologyContext);
  if (context === undefined) {
    throw new Error('useAstrology must be used within an AstrologyProvider');
  }
  return context;
};
