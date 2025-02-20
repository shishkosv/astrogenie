export interface WesternTransitResponse {
  transits: Transit[];
  aspects: Aspect[];
}

interface Transit {
  planet: string;
  sign: string;
  degree: number;
  minute: number;
  retrograde?: boolean;
  house?: number;
}

interface Aspect {
  planet1: string;
  planet2: string;
  aspect: string;
  orb: number;
  applying: boolean;
} 