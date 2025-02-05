import type { User } from './user';
import type { Horoscope, Compatibility, TarotCard } from './astrology';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
}

export interface LocalizationContextType {
  t: (key: string, params?: Record<string, string | number>) => string;
  locale: string;
  setLocale: (locale: string) => void;
}

export interface AstrologyContextType {
  getHoroscope: (sign: string, day?: 'today' | 'tomorrow' | 'yesterday') => Promise<Horoscope>;
  getCompatibility: (sign1: string, sign2: string) => Promise<Compatibility>;
  getTarotCards: () => Promise<TarotCard[]>;
}
