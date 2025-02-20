export interface TropicalTransitsResponse {
  transits: Array<{
    planet: string;
    sign: string;
    degree: number;
    minute: number;
    aspect: string;
    orb: number;
  }>;
  current_positions: Array<{
    planet: string;
    sign: string;
    degree: number;
    minute: number;
  }>;
  date: string;
} 