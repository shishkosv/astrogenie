interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number;
  state?: string; // Added for US cities
  population?: number;
}

interface LocationResponse {
  lat: number;
  lon: number;
  tzone: number;
}

const mockLocations: Record<string, Location> = {
  'New York-US': {
    city: 'New York',
    state: 'NY',
    country: 'US',
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: -5,
    population: 8804190
  },
  'Los Angeles-US': {
    city: 'Los Angeles',
    state: 'CA',
    country: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
    timezone: -8,
    population: 3898747
  },
  'Chicago-US': {
    city: 'Chicago',
    state: 'IL',
    country: 'US',
    latitude: 41.8781,
    longitude: -87.6298,
    timezone: -6,
    population: 2746388
  },
  'Houston-US': {
    city: 'Houston',
    state: 'TX',
    country: 'US',
    latitude: 29.7604,
    longitude: -95.3698,
    timezone: -6,
    population: 2304580
  },
  'Phoenix-US': {
    city: 'Phoenix',
    state: 'AZ',
    country: 'US',
    latitude: 33.4484,
    longitude: -112.0740,
    timezone: -7,
    population: 1608139
  },
  'London-GB': {
    city: 'London',
    country: 'GB',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 0
  },
  'Tokyo-JP': {
    city: 'Tokyo',
    country: 'JP',
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: 9
  },
  'Paris-FR': {
    city: 'Paris',
    country: 'FR',
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: 1
  },
  'Berlin-DE': {
    city: 'Berlin',
    country: 'DE',
    latitude: 52.5200,
    longitude: 13.4050,
    timezone: 1
  },
  'Philadelphia-US': {
    city: 'Philadelphia',
    state: 'PA',
    country: 'US',
    latitude: 39.9526,
    longitude: -75.1652,
    timezone: -5,
    population: 1603797
  },
  'San Antonio-US': {
    city: 'San Antonio',
    state: 'TX',
    country: 'US',
    latitude: 29.4241,
    longitude: -98.4936,
    timezone: -6,
    population: 1547253
  },
  'San Diego-US': {
    city: 'San Diego',
    state: 'CA',
    country: 'US',
    latitude: 32.7157,
    longitude: -117.1611,
    timezone: -8,
    population: 1423851
  },
  'Dallas-US': {
    city: 'Dallas',
    state: 'TX',
    country: 'US',
    latitude: 32.7767,
    longitude: -96.7970,
    timezone: -6,
    population: 1331000
  },
  'San Jose-US': {
    city: 'San Jose',
    state: 'CA',
    country: 'US',
    latitude: 37.3382,
    longitude: -121.8863,
    timezone: -8,
    population: 1021795
  }
};

// Enhanced error handling and validation
interface ValidationError {
  code: string;
  message: string;
  field?: string;
}

class LocationServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public validationErrors?: ValidationError[]
  ) {
    super(message);
    this.name = 'LocationServiceError';
  }
}

export const mockLocationService = {
  async getLocationData(city: string, country: string): Promise<LocationResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
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
      console.error('Error fetching mock location data:', error);
      throw error;
    }
  },

  // Enhanced search functionality
  async searchCities(query: string, country?: string): Promise<Location[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      if (!query) {
        throw new LocationServiceError(
          'Search query is required',
          'INVALID_QUERY'
        );
      }

      const normalizedQuery = query.toLowerCase().trim();
      
      if (normalizedQuery.length < 2) {
        return [];
      }

      const results = Object.values(mockLocations)
        .filter(location => {
          if (country && location.country !== country) return false;
          
          const cityMatch = location.city.toLowerCase().includes(normalizedQuery);
          const stateMatch = location.state?.toLowerCase().includes(normalizedQuery);
          
          return cityMatch || stateMatch;
        })
        .sort((a, b) => {
          // Prioritize exact matches
          const aExact = a.city.toLowerCase() === normalizedQuery;
          const bExact = b.city.toLowerCase() === normalizedQuery;
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
          
          // Then prioritize matches at start of city name
          const aStartsWith = a.city.toLowerCase().startsWith(normalizedQuery);
          const bStartsWith = b.city.toLowerCase().startsWith(normalizedQuery);
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          // Finally sort by population
          return (b.population || 0) - (a.population || 0);
        })
        .slice(0, 10);

      if (results.length === 0) {
        throw new LocationServiceError(
          'No cities found matching your search',
          'NO_RESULTS'
        );
      }

      return results;
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  },

  // Add fuzzy search capability
  async searchCitiesFuzzy(query: string, country?: string): Promise<Location[]> {
    const results = await this.searchCities(query, country);
    if (results.length === 0) {
      // Try searching with more lenient criteria
      const fuzzyQuery = query.replace(/[^a-zA-Z]/g, '').toLowerCase();
      return Object.values(mockLocations)
        .filter(location => {
          if (country && location.country !== country) return false;
          const cityNormalized = location.city.replace(/[^a-zA-Z]/g, '').toLowerCase();
          return cityNormalized.includes(fuzzyQuery);
        })
        .slice(0, 5);
    }
    return results;
  },

  // Add method to get nearby cities
  async getNearbyCities(lat: number, lon: number, radiusKm: number = 100): Promise<Location[]> {
    return Object.values(mockLocations)
      .filter(location => {
        const distance = calculateDistance(
          lat, lon,
          location.latitude,
          location.longitude
        );
        return distance <= radiusKm;
      })
      .sort((a, b) => (b.population || 0) - (a.population || 0));
  },

  countries: [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'JP', name: 'Japan' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' }
  ],

  // Helper method to get all available cities for a country
  getCitiesForCountry(countryCode: string): Location[] {
    return Object.values(mockLocations)
      .filter(location => location.country === countryCode)
      .sort((a, b) => (b.population || 0) - (a.population || 0));
  },

  // Helper method to validate if a city exists
  isCityValid(city: string, country: string): boolean {
    return mockLocations.hasOwnProperty(`${city}-${country}`);
  }
};

// Move the helper function outside the object
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
} 