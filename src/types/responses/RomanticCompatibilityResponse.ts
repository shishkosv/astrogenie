export interface RomanticCompatibilityResponse {
  overall_score: number;
  compatibility_aspects: Array<{
    planet1: string;
    planet2: string;
    aspect: string;
    interpretation: string;
  }>;
  venus_mars_aspects: Array<{
    planet1: string;
    planet2: string;
    aspect: string;
    interpretation: string;
  }>;
} 