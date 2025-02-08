import React, { createContext, useContext, useState, useEffect } from 'react';
import { zodiacSignService } from '../services/zodiacSignService';
import { zodiacSigns } from '../services/zodiacSigns';
import type { ZodiacSignInfo } from '../types/ZodiacSignInfo';

export type ZodiacSign = {
  name: string;
  dateRange: string;
  period: string;
};

type ZodiacContextType = {
  selectedSign: ZodiacSign | null;
  setSelectedSign: (sign: ZodiacSign) => void;
  current: () => ZodiacSignInfo | null;
};

const ZodiacContext = createContext<ZodiacContextType | undefined>(undefined);

export const ZodiacProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [currentInfo, setCurrentInfo] = useState<ZodiacSignInfo | null>(null);

  // Preselect first zodiac sign
  useEffect(() => {
    if (!selectedSign && zodiacSigns.length > 0) {
      setSelectedSign({
        name: zodiacSigns[0].name,
        dateRange: zodiacSigns[0].dates,
        period: ''
      });
    }
  }, []);

  const handleSetSelectedSign = (sign: ZodiacSign) => {
    setSelectedSign(sign);
    const signInfo = zodiacSignService.Current(sign.name);
    setCurrentInfo(signInfo);
  };

  const current = () => currentInfo;

  return (
    <ZodiacContext.Provider value={{ 
      selectedSign, 
      setSelectedSign: handleSetSelectedSign,
      current 
    }}>
      {children}
    </ZodiacContext.Provider>
  );
};

export const useZodiac = () => {
  const context = useContext(ZodiacContext);
  if (context === undefined) {
    throw new Error('useZodiac must be used within a ZodiacProvider');
  }
  return context;
}; 