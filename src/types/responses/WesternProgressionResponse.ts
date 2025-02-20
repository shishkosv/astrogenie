export interface WesternProgressionResponse {
  progressedPlanets: ProgressedPlanet[];
  aspects: ProgressedAspect[];
}

interface ProgressedPlanet {
  planet: string;
  sign: string;
  degree: number;
  minute: number;
  retrograde?: boolean;
  house?: number;
}

interface ProgressedAspect {
  planet1: string;
  planet2: string;
  aspect: string;
  orb: number;
} 