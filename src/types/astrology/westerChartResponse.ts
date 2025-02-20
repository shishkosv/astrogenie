import type { House } from './house';
import type { Aspect } from './aspect';
export interface WesterChartResponse {
  houses: House[];
  planets: Aspect[];
}
