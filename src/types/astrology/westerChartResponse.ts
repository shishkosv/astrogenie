import { House, Planet, Aspect } from '../base/WesternBaseTypes';

export interface WesterChartResponse {
  houses: House[];
  planets: Planet[];
  aspects?: Aspect[];
}
