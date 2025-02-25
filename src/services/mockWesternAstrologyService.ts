import { mockWesternAstrologyData } from './mockWesternAstrologyData';
import type { WesternChartRequest } from '../types/requests/WesternChartRequest';
import type { WesternChartResponse } from '../types/responses/WesternChartResponse';
import type { TropicalHousesRequest, TropicalPlanetsRequest, TropicalAspectsRequest, RomanticTimingRequest, RomanticSynastryRequest, RomanticCompatibilityRequest, TropicalTransitsRequest, TropicalProgressionsRequest, TropicalSynastryRequest, RomanticForecastRequest } from '../types/requests';
import type { TropicalHousesResponse, TropicalPlanetsResponse, TropicalAspectsResponse, RomanticForecastResponse, ChartInterpretationResponse } from '../types/responses';
import { IWesternAstrologyService } from './interfaces/IWesternAstrologyService';
import type { 
  TransitResponse,
  ProgressionResponse,
  TropicalTransitsResponse,
  RomanticCompatibilityResponse,
  RomanticSynastryResponse,
  RomanticTimingResponse,
  TropicalSynastryResponse
} from '../types/responses';
import { BaseRequest } from 'types/base/WesternBaseTypes';
import { ChartInterpretationRequest } from '../types/requests/ChartInterpretationRequest';

const MOCK_DELAY = 1000; // Simulate network delay

export const mockWesternAstrologyService: IWesternAstrologyService = {
  async getBirthChart(params: WesternChartRequest): Promise<WesternChartResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.birthChart;
  },

  async getTropicalHouses(params: TropicalHousesRequest): Promise<TropicalHousesResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.tropicalHouses;
  },

  async getTropicalPlanets(params: TropicalPlanetsRequest): Promise<TropicalPlanetsResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.tropicalPlanets;
  },

  async getTropicalAspects(params: TropicalAspectsRequest): Promise<TropicalAspectsResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.tropicalAspects;
  },

  // Helper method to get all tropical data
  async getFullTropicalChart(params: TropicalPlanetsRequest): Promise<{
    houses: TropicalHousesResponse;
    planets: TropicalPlanetsResponse;
    aspects: TropicalAspectsResponse;
  }> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      houses: mockWesternAstrologyData.tropicalHouses,
      planets: mockWesternAstrologyData.tropicalPlanets,
      aspects: mockWesternAstrologyData.tropicalAspects
    };
  },


  async getTropicalTransits(params: TropicalTransitsRequest): Promise<TropicalTransitsResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.tropicalTransits;
  },

  async getTransits(params: WesternChartRequest): Promise<TransitResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.transits;
  },

  async getProgressions(params: WesternChartRequest): Promise<ProgressionResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.progressions;
  },

  async getRomanticCompatibility(params: RomanticCompatibilityRequest): Promise<RomanticCompatibilityResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.romanticCompatibility;
  },

  async getRomanticSynastry(params: RomanticSynastryRequest): Promise<RomanticSynastryResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.romanticSynastry;
  },

  async getRomanticTiming(params: RomanticTimingRequest): Promise<RomanticTimingResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.romanticTiming;
  },

  async getFullChart(params: WesternChartRequest) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      birthChart: mockWesternAstrologyData.birthChart,
      transits: mockWesternAstrologyData.transits,
      progressions: mockWesternAstrologyData.progressions
    };
  },

  async getCompatibility(person1: WesternChartRequest, person2: WesternChartRequest) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return 85; // Mock compatibility score
  },

  async getDominantPlanets(params: WesternChartRequest) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return [
      { planet: 'Sun', strength: 45 },
      { planet: 'Moon', strength: 38 }
    ];
  },

  async getChartInterpretation(params: WesternChartRequest) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      aspects: ['Sun trine Moon'],
      houses: ['Mars in 1st house'],
      planets: ['Venus in Taurus']
    };
  },

  async getTropicalProgressions(params: TropicalProgressionsRequest) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.tropicalProgressions;
  },

  async getTropicalSynastry(params: TropicalSynastryRequest): Promise<TropicalSynastryResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.tropicalSynastry;
  },

  async getRomanticForecast(params: RomanticForecastRequest): Promise<RomanticForecastResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.romanticForecast;
  },

  async getFullRomanticAnalysis(person1: BaseRequest, person2: BaseRequest) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      compatibility: mockWesternAstrologyData.romanticCompatibility,
      synastry: mockWesternAstrologyData.romanticSynastry,
      timing: mockWesternAstrologyData.romanticTiming
    };
  },

  async getChartInterpretationData(params: ChartInterpretationRequest): Promise<ChartInterpretationResponse> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockWesternAstrologyData.chartInterpretation;
  }
}; 