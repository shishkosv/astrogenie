import { Planet, House, Aspect } from '../base/WesternBaseTypes';

export interface BirthChartResponse {
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
}

export interface SynastryResponse {
  person1_planets: Planet[];
  person2_planets: Planet[];
  synastry_aspects: Aspect[];
  compatibility_score: number;
}

export interface TransitResponse {
  transit_planets: Planet[];
  natal_planets: Planet[];
  transit_aspects: Aspect[];
}

export interface TropicalHousesResponse {
  houses: House[];
  ascendant: {
    sign: string;
    degree: number;
    minute: number;
  };
  midheaven: {
    sign: string;
    degree: number;
    minute: number;
  };
}

export interface TropicalPlanetsResponse {
  planets: Planet[];
  points?: {
    name: string;
    sign: string;
    degree: number;
    minute: number;
  }[];
}

export interface TropicalAspectsResponse {
  aspects: Aspect[];
  chart_power_score?: number;
  dominant_planets?: {
    planet: string;
    score: number;
  }[];
}

export interface TropicalTransitsResponse {
  transits: {
    transit_planet: Planet;
    natal_planet: Planet;
    aspect: string;
    orb: number;
    applying: boolean;
    date: string;
  }[];
  current_positions: Planet[];
}

export interface TropicalProgressionsResponse {
  progressed_planets: Planet[];
  progressed_aspects: Aspect[];
  progressed_houses?: House[];
  current_directions?: {
    planet: string;
    movement: 'direct' | 'retrograde';
    speed: number;
  }[];
}

export interface TropicalSynastryResponse {
  synastry_aspects: Aspect[];
  compatibility_scores: {
    overall: number;
    emotional: number;
    mental: number;
    physical: number;
    spiritual: number;
  };
  composite_planets?: Planet[];
  composite_houses?: House[];
  midpoints?: {
    point: string;
    sign: string;
    degree: number;
    minute: number;
  }[];
}

// Additional helper types
export interface ChartPoint {
  name: string;
  sign: string;
  degree: number;
  minute: number;
  speed?: number;
  latitude?: number;
  longitude?: number;
}

export interface ChartScore {
  element_scores: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  modality_scores: {
    cardinal: number;
    fixed: number;
    mutable: number;
  };
  house_scores: {
    angular: number;
    succedent: number;
    cadent: number;
  };
}

// Add more response types...

export interface RomanticCompatibilityResponse {
  overall_score: number;
  compatibility_aspects: Aspect[];
  detailed_analysis?: {
    emotional_score: number;
    physical_score: number;
    intellectual_score: number;
    spiritual_score: number;
    analysis_text: string[];
  };
  venus_mars_aspects: {
    person1_venus_aspects: Aspect[];
    person1_mars_aspects: Aspect[];
    person2_venus_aspects: Aspect[];
    person2_mars_aspects: Aspect[];
  };
}

export interface RomanticForecastResponse {
  period_start: string;
  period_end: string;
  venus_transits: {
    transit_date: string;
    aspect: string;
    interpretation: string;
  }[];
  mars_transits: {
    transit_date: string;
    aspect: string;
    interpretation: string;
  }[];
  general_forecast: string;
}

export interface RomanticTimingResponse {
  favorable_dates: {
    date: string;
    score: number;
    aspects: Aspect[];
    interpretation: string;
  }[];
  challenging_dates: {
    date: string;
    score: number;
    aspects: Aspect[];
    interpretation: string;
  }[];
  best_timing: {
    start_date: string;
    end_date: string;
    score: number;
  };
}

export interface RomanticSynastryResponse {
  synastry_aspects: Aspect[];
  composite_chart?: {
    planets: Planet[];
    houses: House[];
    aspects: Aspect[];
  };
  relationship_themes: {
    category: string;
    strength: number;
    description: string;
  }[];
  venus_mars_connections: {
    aspect: string;
    strength: number;
    interpretation: string;
  }[];
}

// Solar Response Types
export interface SolarReturnResponse {
  /** Solar return chart positions */
  return_chart: {
    planets: Planet[];
    houses: House[];
    aspects: Aspect[];
  };
  /** Key themes and interpretations for the solar return year */
  yearly_themes: {
    theme: string;
    description: string;
    strength: number;
  }[];
  /** Important dates during the solar return year */
  key_dates: {
    date: string;
    event: string;
    significance: string;
  }[];
}

export interface SolarArcResponse {
  /** Current solar arc positions */
  arc_positions: Planet[];
  /** Aspects formed by solar arc directions */
  arc_aspects: Aspect[];
  /** Interpretations of major solar arc aspects */
  interpretations: {
    aspect: string;
    meaning: string;
    timing: string;
  }[];
}

export interface SolarEclipseResponse {
  /** List of solar eclipses in the specified period */
  eclipses: {
    date: string;
    type: 'total' | 'partial' | 'annular';
    degree: number;
    sign: string;
    house?: number;
    aspects: Aspect[];
    impact_areas: string[];
  }[];
}

// Lunar Response Types
export interface LunarReturnResponse {
  /** Lunar return chart positions */
  return_chart: {
    planets: Planet[];
    houses: House[];
    aspects: Aspect[];
  };
  /** Emotional themes for the lunar month */
  monthly_themes: {
    theme: string;
    description: string;
  }[];
  /** Key dates during the lunar return period */
  significant_dates: {
    date: string;
    event: string;
    emotional_impact: string;
  }[];
}

export interface LunarPhaseResponse {
  /** Lunar phase details */
  phases: {
    date: string;
    phase: string;
    degree: number;
    sign: string;
    aspects: Aspect[];
    interpretation: string;
  }[];
}

// General Response Types
export interface GeneralForecastResponse {
  /** Overall forecast period information */
  period: {
    start_date: string;
    end_date: string;
    general_theme: string;
  };
  /** Specific predictions and timings */
  predictions: {
    date: string;
    aspect: string;
    area_of_life: string;
    interpretation: string;
  }[];
  /** Transits during the period */
  transits?: {
    planet: string;
    aspect: string;
    date: string;
    impact: string;
  }[];
}

export interface GeneralCompatibilityResponse {
  /** Overall compatibility scores */
  scores: {
    overall: number;
    communication: number;
    values: number;
    activities: number;
    growth: number;
  };
  /** Detailed aspect analysis */
  aspects: {
    aspect: string;
    strength: number;
    interpretation: string;
  }[];
  /** Composite chart if requested */
  composite_chart?: {
    planets: Planet[];
    houses: House[];
    aspects: Aspect[];
  };
}

// Life Area Response Types
export interface LifePathResponse {
  /** Core life path themes */
  themes: {
    area: string;
    strength: number;
    challenges: string[];
    opportunities: string[];
  }[];
  /** Timing of important developments */
  timing: {
    period: string;
    focus: string;
    recommendation: string;
  }[];
  /** Key planetary influences */
  influences: {
    planet: string;
    impact: string;
    duration: string;
  }[];
}

export interface LifePurposeResponse {
  /** Core purpose indicators */
  purpose_indicators: {
    factor: string;
    significance: string;
    expression: string;
  }[];
  /** North and South Node analysis */
  nodes?: {
    north_node: {
      sign: string;
      house: number;
      aspects: Aspect[];
      path: string;
    };
    south_node: {
      sign: string;
      house: number;
      aspects: Aspect[];
      past_patterns: string;
    };
  };
  /** Arabic parts analysis */
  parts?: {
    name: string;
    position: {
      sign: string;
      degree: number;
    };
    interpretation: string;
  }[];
}

// Friendship & Love Response Types
export interface FriendshipCompatibilityResponse {
  /** Overall friendship compatibility */
  compatibility: {
    overall_score: number;
    strengths: string[];
    challenges: string[];
  };
  /** Key interaction aspects */
  interactions: {
    aspect: string;
    quality: string;
    recommendation: string;
  }[];
  /** Long-term friendship potential */
  potential: {
    growth_areas: string[];
    shared_activities: string[];
    communication_style: string;
  };
}

export interface LoveCompatibilityResponse {
  /** Overall romantic compatibility */
  compatibility: {
    overall_score: number;
    emotional_score: number;
    physical_score: number;
    intellectual_score: number;
    spiritual_score: number;
  };
  /** Venus-Mars dynamics */
  venus_mars_dynamics?: {
    attraction_patterns: string[];
    compatibility_aspects: Aspect[];
    recommendations: string[];
  };
  /** Composite chart analysis */
  composite_analysis?: {
    chart: {
      planets: Planet[];
      houses: House[];
      aspects: Aspect[];
    };
    interpretation: string[];
  };
}

export * from './TransitResponse';
export * from './ProgressionResponse';
export * from './TropicalTransitsResponse';
export * from './RomanticCompatibilityResponse';
export * from './RomanticSynastryResponse';
export * from './RomanticTimingResponse';
// ... other exports 