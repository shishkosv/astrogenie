export interface RomanticSynastryResponse {
  synastry_aspects: Array<{
    planet1: string;
    planet2: string;
    aspect: string;
    orb: number;
    interpretation: string;
  }>;
  relationship_themes: Array<{
    theme: string;
    strength: number;
    description: string;
  }>;
  venus_mars_connections: Array<{
    aspect: string;
    interpretation: string;
  }>;
} 