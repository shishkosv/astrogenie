export interface TropicalSynastryResponse {
  synastry_aspects: Array<{
    planet1: string;
    planet2: string;
    aspect: string;
    orb: number;
  }>;
  composite_planets: Array<{
    name: string;
    sign: string;
    degree: number;
    house: number;
  }>;
  compatibility_scores: {
    overall: number;
    emotional: number;
    spiritual: number;
    physical: number;
  };
} 