export interface RomanticForecastResponse {
  period_start: string;
  period_end: string;
  venus_transits: Array<{
    planet: string;
    aspect: string;
    date: string;
  }>;
  mars_transits: Array<{
    planet: string;
    aspect: string;
    date: string;
  }>;
  general_forecast: string[];
  upcoming_transits: Array<{
    planet: string;
    aspect: string;
    date: string;
  }>;
  favorable_periods: Array<{
    start_date: string;
    end_date: string;
    rating: number;
  }>;
} 