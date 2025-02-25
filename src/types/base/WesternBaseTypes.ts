export interface Planet {
  name: string;
  sign: string;
  degree: number;
  minute: number;
  retrograde?: boolean;
  interpretation?: string;
  full_degree?: number;
  norm_degree?: number;
  speed?: number;
  is_retro?: string;
  sign_id?: number;
  house?: number;
}

export interface House {
  house_number: number;
  sign: string;
  degree: number;
  minute: number;
  cusp?: boolean;
  interpretation?: string;
  id?: number;
  start_degree?: number;
  end_degree?: number;
  planets?: string[];
}

export interface Aspect {
  planet1: string;
  planet2: string;
  aspect: string;
  orb: number;
  applying: boolean;
  interpretation?: string;
  aspecting_planet_id?: number;
  aspected_planet_id?: number;
  aspecting_planet?: string;
  aspectied_planet?: string;
  type?: string;
  diff?: number;
}

export interface BaseRequest {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
} 