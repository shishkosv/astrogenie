import type { WesternChartRequest } from '../../types/requests/WesternChartRequest';
import type { WesternChartResponse } from '../../types/responses/WesternChartResponse';
import type { WesternTransitResponse } from '../../types/responses/WesternTransitResponse';
import type { WesternProgressionResponse } from '../../types/responses/WesternProgressionResponse';
import type {
  TropicalHousesRequest,
  TropicalPlanetsRequest,
  TropicalAspectsRequest,
  TropicalTransitsRequest,
  RomanticCompatibilityRequest,
  RomanticForecastRequest,
  RomanticTimingRequest,
  RomanticSynastryRequest,
  TropicalProgressionsRequest,
  TropicalSynastryRequest
} from '../../types/requests';
import type {
  TropicalHousesResponse,
  TropicalPlanetsResponse,
  TropicalAspectsResponse,
  TropicalTransitsResponse,
  RomanticCompatibilityResponse,
  RomanticForecastResponse,
  RomanticTimingResponse,
  RomanticSynastryResponse,
  TropicalProgressionsResponse,
  TropicalSynastryResponse
} from '../../types/responses';
import type { 
  TransitResponse,
  ProgressionResponse
} from '../../types/responses';

export interface IWesternAstrologyService {
  getBirthChart(params: WesternChartRequest): Promise<WesternChartResponse>;
  getTransits(params: WesternChartRequest): Promise<TransitResponse>;
  getProgressions(params: WesternChartRequest): Promise<ProgressionResponse>;
  
  getTropicalHouses(params: TropicalHousesRequest): Promise<TropicalHousesResponse>;
  getTropicalPlanets(params: TropicalPlanetsRequest): Promise<TropicalPlanetsResponse>;
  getTropicalAspects(params: TropicalAspectsRequest): Promise<TropicalAspectsResponse>;
  getTropicalTransits(params: TropicalTransitsRequest): Promise<TropicalTransitsResponse>;
  
  getFullTropicalChart(params: TropicalPlanetsRequest): Promise<{
    houses: TropicalHousesResponse;
    planets: TropicalPlanetsResponse;
    aspects: TropicalAspectsResponse;
  }>;

  getRomanticCompatibility(params: RomanticCompatibilityRequest): Promise<RomanticCompatibilityResponse>;
  getRomanticSynastry(params: RomanticSynastryRequest): Promise<RomanticSynastryResponse>;
  getRomanticTiming(params: RomanticTimingRequest): Promise<RomanticTimingResponse>;

  getFullChart(params: WesternChartRequest): Promise<{
    birthChart: WesternChartResponse;
    transits: TransitResponse;
    progressions: ProgressionResponse;
  }>;

  getCompatibility(
    person1: WesternChartRequest,
    person2: WesternChartRequest
  ): Promise<number>;

  getDominantPlanets(
    params: WesternChartRequest
  ): Promise<Array<{ planet: string; strength: number }>>;

  getChartInterpretation(
    params: WesternChartRequest
  ): Promise<{ aspects: string[]; houses: string[]; planets: string[] }>;

  getTropicalProgressions(
    params: TropicalProgressionsRequest
  ): Promise<TropicalProgressionsResponse>;

  getTropicalSynastry(
    params: TropicalSynastryRequest
  ): Promise<TropicalSynastryResponse>;

  getRomanticForecast(
    params: RomanticForecastRequest
  ): Promise<RomanticForecastResponse>;

  getFullRomanticAnalysis(
    person1: WesternChartRequest,
    person2: WesternChartRequest
  ): Promise<{
    compatibility: RomanticCompatibilityResponse;
    synastry: RomanticSynastryResponse;
    timing: RomanticTimingResponse;
  }>;
} 