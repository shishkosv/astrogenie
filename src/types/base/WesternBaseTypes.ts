export interface Planet {
  name: string;
  sign: string;
  degree: number;
  minute: number;
  retrograde?: boolean;
  interpretation?: string;
}

export interface House {
  house_number: number;
  sign: string;
  degree: number;
  minute: number;
  cusp?: boolean;
  interpretation?: string;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  aspect: string;
  orb: number;
  applying: boolean;
  interpretation?: string;
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