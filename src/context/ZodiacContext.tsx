import React, { createContext, useContext, useState } from 'react';

export type ZodiacSign = {
  name: string;
  dateRange: string;
  period: string;
};

type ZodiacContextType = {
  selectedSign: ZodiacSign | null;
  setSelectedSign: (sign: ZodiacSign) => void;
};

const ZodiacContext = createContext<ZodiacContextType | undefined>(undefined);

export const ZodiacProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  return (
    <ZodiacContext.Provider value={{ selectedSign, setSelectedSign }}>
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