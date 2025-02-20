export interface ProgressionResponse {
  progressedPlanets: Array<{
    planet: string;
    sign: string;
    degree: number;
    house: number;
  }>;
  interpretation: string[];
}

// Rename WesternProgressionResponse to ProgressionResponse in imports 