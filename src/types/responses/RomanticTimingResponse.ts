export interface RomanticTimingResponse {
  current_transits: Array<{
    planet: string;
    aspect: string;
    date: string;
    interpretation: string;
  }>;
  favorable_dates: Array<{
    date: string;
    score: number;
    aspects: Array<{
      planet1: string;
      planet2: string;
      aspect: string;
      orb: number;
      applying: boolean;
    }>;
    interpretation: string;
  }>;
  challenging_dates: Array<{
    date: string;
    score: number;
    aspects: Array<{
      planet1: string;
      planet2: string;
      aspect: string;
      orb: number;
      applying: boolean;
    }>;
    interpretation: string;
  }>;
  best_timing: {
    start_date: string;
    end_date: string;
    score: number;
    description: string;
  };
} 