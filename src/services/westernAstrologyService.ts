import type { WesternChartRequest } from '../types/requests/WesternChartRequest';
import type { WesternChartResponse } from '../types/responses/WesternChartResponse';
import type { WesternTransitResponse } from '../types/responses/WesternTransitResponse';
import type { WesternProgressionResponse } from '../types/responses/WesternProgressionResponse';
import {
  TropicalHousesRequest,
  TropicalPlanetsRequest,
  TropicalAspectsRequest,
  TropicalTransitsRequest,
  TropicalProgressionsRequest,
  TropicalSynastryRequest
} from '../types/requests';
import {
  TropicalHousesResponse,
  TropicalPlanetsResponse,
  TropicalAspectsResponse,
  TropicalTransitsResponse,
  TropicalProgressionsResponse,
  TropicalSynastryResponse
} from '../types/responses';
import type { RomanticCompatibilityRequest, RomanticForecastRequest, RomanticTimingRequest, RomanticSynastryRequest } from '../types/requests';
import type { RomanticCompatibilityResponse, RomanticForecastResponse, RomanticTimingResponse, RomanticSynastryResponse, ProgressionResponse, TransitResponse } from '../types/responses';
import type { BaseRequest } from '../types/base/WesternBaseTypes';
import { IWesternAstrologyService } from './interfaces/IWesternAstrologyService';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
const MAX_RETRIES = 3;

// Retry logic
const fetchWithRetry = async (
  url: string, 
  options: RequestInit, 
  retries: number = MAX_RETRIES
): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

class AstrologyError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'AstrologyError';
  }
}

export const westernAstrologyService: IWesternAstrologyService = {
  async getBirthChart(params: WesternChartRequest): Promise<WesternChartResponse> {
    try {
      validateBirthData(params);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/birth-chart`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch birth chart',
          response.status,
          'BIRTH_CHART_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching birth chart:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching birth chart');
    }
  },

  async getTransits(params: WesternChartRequest): Promise<TransitResponse> {
    try {
      validateBirthData(params);
      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/transits`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError('Failed to fetch transits', response.status);
      }

      const data = await response.json();
      return {
        transit_planets: data.transit_planets,
        natal_planets: data.natal_planets,
        transit_aspects: data.transit_aspects
      };
    } catch (error) {
      console.error('Error fetching transits:', error);
      throw error;
    }
  },

  async getProgressions(params: WesternChartRequest): Promise<ProgressionResponse> {
    try {
      validateBirthData(params);
      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/progressions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError('Failed to fetch progressions', response.status);
      }

      const data = await response.json();
      return {
        progressedPlanets: data.progressedPlanets,
        interpretation: data.interpretation || []
      };
    } catch (error) {
      console.error('Error fetching progressions:', error);
      throw error;
    }
  },

  // Helper method to get all chart data at once
  async getFullChart(params: WesternChartRequest): Promise<{
    birthChart: WesternChartResponse;
    transits: TransitResponse;
    progressions: ProgressionResponse;
  }> {
    try {
      const [birthChart, transits, progressions] = await Promise.all([
        this.getBirthChart(params),
        this.getTransits(params),
        this.getProgressions(params)
      ]);

      return {
        birthChart,
        transits,
        progressions
      };
    } catch (error) {
      console.error('Error fetching full chart:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching full chart');
    }
  },

  // New helper methods
  async getCompatibility(
    person1: WesternChartRequest,
    person2: WesternChartRequest
  ): Promise<number> {
    validateBirthData(person1);
    validateBirthData(person2);
    
    const [chart1, chart2] = await Promise.all([
      this.getBirthChart(person1),
      this.getBirthChart(person2)
    ]);
    
    // Implement compatibility calculation logic
    return calculateCompatibility(chart1, chart2);
  },

  async getDominantPlanets(
    params: WesternChartRequest
  ): Promise<Array<{ planet: string; strength: number }>> {
    const chart = await this.getBirthChart(params);
    return calculateDominantPlanets(chart);
  },

  // Helper method to get chart interpretations
  async getChartInterpretation(
    params: WesternChartRequest
  ): Promise<{ aspects: string[]; houses: string[]; planets: string[] }> {
    const chart = await this.getBirthChart(params);
    return interpretChart(chart);
  },

  // Tropical Houses
  async getTropicalHouses(params: TropicalHousesRequest): Promise<TropicalHousesResponse> {
    try {
      validateBirthData(params);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/tropical/houses`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch tropical houses',
          response.status,
          'TROPICAL_HOUSES_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tropical houses:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching tropical houses');
    }
  },

  // Tropical Planets
  async getTropicalPlanets(params: TropicalPlanetsRequest): Promise<TropicalPlanetsResponse> {
    try {
      validateBirthData(params);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/tropical/planets`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch tropical planets',
          response.status,
          'TROPICAL_PLANETS_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tropical planets:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching tropical planets');
    }
  },

  // Tropical Aspects
  async getTropicalAspects(params: TropicalAspectsRequest): Promise<TropicalAspectsResponse> {
    try {
      validateBirthData(params);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/tropical/aspects`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch tropical aspects',
          response.status,
          'TROPICAL_ASPECTS_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tropical aspects:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching tropical aspects');
    }
  },

  // Tropical Transits
  async getTropicalTransits(params: TropicalTransitsRequest): Promise<TropicalTransitsResponse> {
    try {
      validateBirthData(params);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/tropical/transits`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch tropical transits',
          response.status,
          'TROPICAL_TRANSITS_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tropical transits:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching tropical transits');
    }
  },

  // Tropical Progressions
  async getTropicalProgressions(params: TropicalProgressionsRequest): Promise<TropicalProgressionsResponse> {
    try {
      validateBirthData(params);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/tropical/progressions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch tropical progressions',
          response.status,
          'TROPICAL_PROGRESSIONS_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tropical progressions:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching tropical progressions');
    }
  },

  // Tropical Synastry
  async getTropicalSynastry(params: TropicalSynastryRequest): Promise<TropicalSynastryResponse> {
    try {
      validateBirthData(params.person1);
      validateBirthData(params.person2);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/tropical/synastry`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch tropical synastry',
          response.status,
          'TROPICAL_SYNASTRY_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tropical synastry:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching tropical synastry');
    }
  },

  // Helper method to get all tropical data
  async getFullTropicalChart(params: TropicalPlanetsRequest): Promise<{
    houses: TropicalHousesResponse;
    planets: TropicalPlanetsResponse;
    aspects: TropicalAspectsResponse;
  }> {
    try {
      const [houses, planets, aspects] = await Promise.all([
        this.getTropicalHouses(params),
        this.getTropicalPlanets(params),
        this.getTropicalAspects(params)
      ]);

      return {
        houses,
        planets,
        aspects
      };
    } catch (error) {
      console.error('Error fetching full tropical chart:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching full tropical chart');
    }
  },

  // Romantic Compatibility
  async getRomanticCompatibility(
    params: RomanticCompatibilityRequest
  ): Promise<RomanticCompatibilityResponse> {
    try {
      validateBirthData(params.person1);
      validateBirthData(params.person2);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/romantic/compatibility`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch romantic compatibility',
          response.status,
          'ROMANTIC_COMPATIBILITY_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching romantic compatibility:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching romantic compatibility');
    }
  },

  // Romantic Forecast
  async getRomanticForecast(
    params: RomanticForecastRequest
  ): Promise<RomanticForecastResponse> {
    try {
      validateBirthData(params);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/romantic/forecast`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch romantic forecast',
          response.status,
          'ROMANTIC_FORECAST_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching romantic forecast:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching romantic forecast');
    }
  },

  // Romantic Timing
  async getRomanticTiming(
    params: RomanticTimingRequest
  ): Promise<RomanticTimingResponse> {
    try {
      validateBirthData(params);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/romantic/timing`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch romantic timing',
          response.status,
          'ROMANTIC_TIMING_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching romantic timing:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching romantic timing');
    }
  },

  // Romantic Synastry
  async getRomanticSynastry(
    params: RomanticSynastryRequest
  ): Promise<RomanticSynastryResponse> {
    try {
      validateBirthData(params.person1);
      validateBirthData(params.person2);

      const response = await fetchWithRetry(
        `${API_BASE_URL}/western/romantic/synastry`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new AstrologyError(
          'Failed to fetch romantic synastry',
          response.status,
          'ROMANTIC_SYNASTRY_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching romantic synastry:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching romantic synastry');
    }
  },

  // Helper method to get comprehensive romantic analysis
  async getFullRomanticAnalysis(
    person1: BaseRequest,
    person2: BaseRequest
  ): Promise<{
    compatibility: RomanticCompatibilityResponse;
    synastry: RomanticSynastryResponse;
    timing: RomanticTimingResponse;
  }> {
    try {
      const [compatibility, synastry, timing] = await Promise.all([
        this.getRomanticCompatibility({ person1, person2 }),
        this.getRomanticSynastry({ person1, person2 }),
        this.getRomanticTiming({
          ...person1,
          start_date: new Date().toISOString().split('T')[0],
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
        })
      ]);

      return {
        compatibility,
        synastry,
        timing
      };
    } catch (error) {
      console.error('Error fetching full romantic analysis:', error);
      if (error instanceof AstrologyError) throw error;
      throw new AstrologyError('Unexpected error fetching full romantic analysis');
    }
  }
};

// Helper functions for calculations
function calculateCompatibility(chart1: WesternChartResponse, chart2: WesternChartResponse): number {
  // Implement compatibility calculation logic
  return 0;
}

function calculateDominantPlanets(chart: WesternChartResponse): Array<{ planet: string; strength: number }> {
  // Implement dominant planets calculation
  return [];
}

function interpretChart(chart: WesternChartResponse): { aspects: string[]; houses: string[]; planets: string[] } {
  // Implement chart interpretation logic
  return {
    aspects: [],
    houses: [],
    planets: []
  };
}

function validateBirthData(params: WesternChartRequest) {
  // Basic range checks
  if (params.day < 1 || params.day > 31) throw new Error('Invalid day');
  if (params.month < 1 || params.month > 12) throw new Error('Invalid month');
  if (params.hour < 0 || params.hour > 23) throw new Error('Invalid hour');
  if (params.min < 0 || params.min > 59) throw new Error('Invalid minute');
  if (params.lat < -90 || params.lat > 90) throw new Error('Invalid latitude');
  if (params.lon < -180 || params.lon > 180) throw new Error('Invalid longitude');
  if (params.tzone < -12 || params.tzone > 14) throw new Error('Invalid timezone');

  // Advanced validations
  const date = new Date(params.year, params.month - 1, params.day);
  if (date.getDate() !== params.day) throw new Error('Invalid date combination');
  
  if (date > new Date()) throw new Error('Birth date cannot be in the future');
  
  const minYear = 1900;
  if (params.year < minYear) throw new Error(`Year must be ${minYear} or later`);
}      