interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number;
}

interface LocationResponse {
  lat: number;
  lon: number;
  tzone: number;
}

export const locationService = {
  async getLocationData(city: string, country: string): Promise<LocationResponse> {
    try {
      // In production, this would call a geocoding API like Google Maps or OpenStreetMap
      // For now, using mock data
      const mockLocations: Record<string, Location> = {
        'London-GB': {
          city: 'London',
          country: 'GB',
          latitude: 51.5074,
          longitude: -0.1278,
          timezone: 0
        },
        'New York-US': {
          city: 'New York',
          country: 'US',
          latitude: 40.7128,
          longitude: -74.0060,
          timezone: -5
        },
        'Tokyo-JP': {
          city: 'Tokyo',
          country: 'JP',
          latitude: 35.6762,
          longitude: 139.6503,
          timezone: 9
        },
        // Add more cities as needed
      };

      const key = `${city}-${country}`;
      const location = mockLocations[key];

      if (!location) {
        throw new Error('Location not found');
      }

      return {
        lat: location.latitude,
        lon: location.longitude,
        tzone: location.timezone
      };
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  },

  // List of supported countries
  countries: [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'JP', name: 'Japan' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    // Add more countries as needed
  ]
}; 