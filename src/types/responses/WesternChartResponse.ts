import { House, Planet } from '../base/WesternBaseTypes';

export interface WesternChartResponse {
  houses: House[];
  planets: Planet[];
}

interface House {
  house_number: number;
  sign: string;
  degree: number;
  minute: number;
  cusp?: boolean;
}

interface Planet {
  name: string;
  sign: string;
  degree: number;
  minute: number;
  retrograde?: boolean;
  house?: number;
} 