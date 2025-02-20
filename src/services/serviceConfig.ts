import { mockWesternAstrologyService } from './mockWesternAstrologyService';
import { westernAstrologyService } from './westernAstrologyService';
import { mockLocationService } from './mockLocationService';
import { locationService as realLocationService } from './locationService';

// Use mock services by default to avoid API errors
const USE_MOCK_SERVICES = true;

export const astrologyService = USE_MOCK_SERVICES ? mockWesternAstrologyService : westernAstrologyService;
export const locationService = USE_MOCK_SERVICES ? mockLocationService : realLocationService;

// Configuration object for easy access
export const serviceConfig = {
  useMockServices: USE_MOCK_SERVICES,
  services: {
    astrology: astrologyService,
    location: locationService
  }
}; 