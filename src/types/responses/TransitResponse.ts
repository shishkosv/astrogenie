export interface TransitResponse {
  transits: Array<{
    planet: string;
    house: number;
    sign: string;
    aspect: string;
    orb: number;
  }>;
  interpretation: string[];
}

// Rename WesternTransitResponse to TransitResponse in imports 