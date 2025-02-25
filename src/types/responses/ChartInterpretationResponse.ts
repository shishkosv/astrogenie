import { Aspect, House, Planet } from '../base/WesternBaseTypes';

export interface ChartInterpretationResponse {
  planets: Planet[];
  houses: House[];
  ascendant: number;
  midheaven: number;
  vertex: number;
  lilith: Planet;
  aspects: Aspect[];
  moon_phase: MoonPhase;
  hemisphere: Hemisphere;
  elements: ElementAnalysis;
  modes: ModeAnalysis;
  dominant_sign: DominantSign;
}

export interface MoonPhase {
  moon_phase_name: string;
  moon_phase_id: number;
  moon_phase_calc: string;
  moon_phase_description: string;
}

export interface Hemisphere {
  east_west: HemisphereDescription;
  north_south: HemisphereDescription;
}

export interface HemisphereDescription {
  description: string;
  id: number;
}

export interface ElementAnalysis {
  elements: ElementPercentage[];
  description: string;
  dominant_element_id: number;
}

export interface ElementPercentage {
  name: string;
  percentage: number;
}

export interface ModeAnalysis {
  modes: ModePercentage[];
  description: string;
  dominant_mode_id: number;
}

export interface ModePercentage {
  name: string;
  percentage: number;
}

export interface DominantSign {
  sign_id: number;
  sign_name: string;
  percentage: number;
} 