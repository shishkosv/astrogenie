import { Aspect } from '../base/WesternBaseTypes';

export interface RomanticCompatibilityResponse {
  overall_score: number;
  compatibility_aspects: Aspect[];
  venus_mars_aspects: Aspect[];
} 