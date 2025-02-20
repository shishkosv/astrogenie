import { BaseRequest } from '../base/WesternBaseTypes';

export interface SynastryRequest {
  person1: BaseRequest;
  person2: BaseRequest;
}

export interface TransitRequest extends BaseRequest {
  transit_day: number;
  transit_month: number;
  transit_year: number;
}

export interface ProgressionRequest extends BaseRequest {
  progression_date: string; // YYYY-MM-DD
}

export interface TropicalHousesRequest extends BaseRequest {
  house_system?: 'placidus' | 'koch' | 'equal' | 'whole_sign';
}

export interface TropicalPlanetsRequest extends BaseRequest {
  planets?: string[]; // Optional list of specific planets to get
}

export interface TropicalAspectsRequest extends BaseRequest {
  aspects?: string[]; // Optional list of specific aspects to calculate
  orb_factors?: {
    conjunction?: number;
    opposition?: number;
    trine?: number;
    square?: number;
    sextile?: number;
  };
}

export interface TropicalTransitsRequest extends BaseRequest {
  transit_time: {
    day: number;
    month: number;
    year: number;
    hour?: number;
    minute?: number;
  };
  planets?: string[]; // Optional specific transit planets
}

export interface TropicalProgressionsRequest extends BaseRequest {
  progression_date: string; // YYYY-MM-DD
  calculation_method?: 'secondary' | 'tertiary' | 'minor';
}

export interface TropicalSynastryRequest {
  person1: BaseRequest;
  person2: BaseRequest;
  aspects?: string[]; // Optional specific aspects to consider
  orb_factors?: {
    conjunction?: number;
    opposition?: number;
    trine?: number;
    square?: number;
    sextile?: number;
  };
}

export interface RomanticCompatibilityRequest {
  person1: BaseRequest;
  person2: BaseRequest;
  aspects?: string[];
  include_detailed_analysis?: boolean;
}

export interface RomanticForecastRequest extends BaseRequest {
  forecast_period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  venus_aspects?: boolean;
  mars_aspects?: boolean;
}

export interface RomanticTimingRequest extends BaseRequest {
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  include_transits?: boolean;
}

export interface RomanticSynastryRequest {
  person1: BaseRequest;
  person2: BaseRequest;
  include_composite?: boolean;
  aspects?: string[];
}

// Solar Requests
export interface SolarReturnRequest extends BaseRequest {
  return_year: number;
  location?: {
    lat: number;
    lon: number;
  };
}

export interface SolarArcRequest extends BaseRequest {
  target_date: string; // YYYY-MM-DD
  aspects?: string[];
}

export interface SolarEclipseRequest extends BaseRequest {
  start_date: string; // YYYY-MM-DD
  end_date: string;
}

// Lunar Requests
export interface LunarReturnRequest extends BaseRequest {
  return_date: string; // YYYY-MM-DD
  location?: {
    lat: number;
    lon: number;
  };
}

export interface LunarPhaseRequest extends BaseRequest {
  phase_type?: 'new' | 'full' | 'first_quarter' | 'last_quarter' | 'all';
  start_date?: string;
  end_date?: string;
}

// General Requests
export interface GeneralForecastRequest extends BaseRequest {
  forecast_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  start_date: string;
  include_transits?: boolean;
}

export interface GeneralCompatibilityRequest {
  person1: BaseRequest;
  person2: BaseRequest;
  aspects?: string[];
  include_composite?: boolean;
}

// Life Area Requests
export interface LifePathRequest extends BaseRequest {
  area: 'career' | 'health' | 'spirituality' | 'personal_growth';
  timeframe?: 'short' | 'medium' | 'long';
}

export interface LifePurposeRequest extends BaseRequest {
  include_nodes?: boolean;
  include_parts?: boolean;
}

// Friendship & Love Requests
export interface FriendshipCompatibilityRequest {
  person1: BaseRequest;
  person2: BaseRequest;
  aspects?: string[];
}

export interface LoveCompatibilityRequest {
  person1: BaseRequest;
  person2: BaseRequest;
  include_composite?: boolean;
  venus_aspects?: boolean;
  mars_aspects?: boolean;
}

// Add more request types... 