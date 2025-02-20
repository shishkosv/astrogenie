import type { WesternChartResponse } from '../types/responses/WesternChartResponse';
import type { 
  TropicalHousesResponse, 
  TropicalPlanetsResponse, 
  TropicalAspectsResponse,
  TropicalTransitsResponse,
  TransitResponse,
  ProgressionResponse,
  RomanticCompatibilityResponse,
  RomanticSynastryResponse,
  RomanticTimingResponse,
  TropicalProgressionsResponse,
  TropicalSynastryResponse,
  RomanticForecastResponse
} from '../types/responses';

export const mockWesternAstrologyData = {
  birthChart: {
    planets: [
      { name: 'Sun', sign: 'Aries', degree: 15, minute: 30, retrograde: false, house: 1 },
      { name: 'Moon', sign: 'Taurus', degree: 22, minute: 45, retrograde: false, house: 2 },
      { name: 'Mercury', sign: 'Pisces', degree: 8, minute: 15, retrograde: true, house: 12 },
      { name: 'Venus', sign: 'Gemini', degree: 3, minute: 20, retrograde: false, house: 3 },
      { name: 'Mars', sign: 'Leo', degree: 17, minute: 55, retrograde: false, house: 5 },
      { name: 'Jupiter', sign: 'Libra', degree: 28, minute: 10, retrograde: false, house: 7 },
      { name: 'Saturn', sign: 'Capricorn', degree: 11, minute: 5, retrograde: true, house: 10 }
    ],
    houses: [
      { house_number: 1, sign: 'Aries', degree: 0, minute: 0, cusp: true },
      { house_number: 2, sign: 'Taurus', degree: 5, minute: 15, cusp: true },
      { house_number: 3, sign: 'Gemini', degree: 10, minute: 30, cusp: true },
      { house_number: 4, sign: 'Cancer', degree: 15, minute: 45, cusp: true },
      { house_number: 5, sign: 'Leo', degree: 20, minute: 0, cusp: true },
      { house_number: 6, sign: 'Virgo', degree: 25, minute: 15, cusp: true },
      { house_number: 7, sign: 'Libra', degree: 0, minute: 0, cusp: true },
      { house_number: 8, sign: 'Scorpio', degree: 5, minute: 15, cusp: true },
      { house_number: 9, sign: 'Sagittarius', degree: 10, minute: 30, cusp: true },
      { house_number: 10, sign: 'Capricorn', degree: 15, minute: 45, cusp: true },
      { house_number: 11, sign: 'Aquarius', degree: 20, minute: 0, cusp: true },
      { house_number: 12, sign: 'Pisces', degree: 25, minute: 15, cusp: true }
    ]
  } as WesternChartResponse,

  tropicalHouses: {
    houses: [
      { house_number: 1, sign: 'Aries', degree: 0, minute: 0, cusp: true },
      // ... same as birthChart houses
    ],
    ascendant: {
      sign: 'Aries',
      degree: 0,
      minute: 0
    },
    midheaven: {
      sign: 'Capricorn',
      degree: 15,
      minute: 45
    }
  } as TropicalHousesResponse,

  tropicalPlanets: {
    planets: [
      { name: 'Sun', sign: 'Aries', degree: 15, minute: 30, retrograde: false, house: 1 },
      // ... same as birthChart planets
    ],
    points: [
      { name: 'Vertex', sign: 'Scorpio', degree: 12, minute: 34 },
      { name: 'Part of Fortune', sign: 'Sagittarius', degree: 23, minute: 45 }
    ]
  } as TropicalPlanetsResponse,

  tropicalAspects: {
    aspects: [
      { planet1: 'Sun', planet2: 'Moon', aspect: 'Trine', orb: 2.5, applying: true },
      { planet1: 'Venus', planet2: 'Mars', aspect: 'Square', orb: 1.8, applying: false },
      { planet1: 'Jupiter', planet2: 'Saturn', aspect: 'Opposition', orb: 3.2, applying: true }
    ],
    chart_power_score: 85,
    dominant_planets: [
      { planet: 'Sun', score: 45 },
      { planet: 'Moon', score: 38 },
      { planet: 'Mars', score: 32 }
    ]
  } as TropicalAspectsResponse,

  tropicalTransits: {
    transits: [{
      transit_planet: { name: 'Sun', sign: 'Leo', degree: 15, minute: 30 },
      natal_planet: { name: 'Sun', sign: 'Aries', degree: 0, minute: 0 },
      aspect: 'Conjunction',
      orb: 2,
      applying: true,
      date: new Date().toISOString()
    }],
    current_positions: [
      { name: 'Sun', sign: 'Leo', degree: 15, minute: 30 }
    ]
  } as TropicalTransitsResponse,

  transits: {
    transit_planets: [
      { name: 'Jupiter', sign: 'Capricorn', degree: 10, house: 10 }
    ],
    natal_planets: [
      { name: 'Sun', sign: 'Aries', degree: 15, house: 1 }
    ],
    transit_aspects: [
      { planet1: 'Jupiter', planet2: 'Sun', aspect: 'Trine', orb: 2 }
    ]
  } as TransitResponse,

  progressions: {
    progressedPlanets: [
      { planet: 'Sun', sign: 'Taurus', degree: 5, house: 2 }
    ],
    interpretation: ['Progressed Sun indicates financial focus']
  } as ProgressionResponse,

  romanticCompatibility: {
    overall_score: 85,
    compatibility_aspects: [{
      planet1: 'Venus',
      planet2: 'Mars',
      aspect: 'Trine',
      interpretation: 'Strong romantic compatibility'
    }],
    venus_mars_aspects: [{
      planet1: 'Venus',
      planet2: 'Mars',
      aspect: 'Trine',
      interpretation: 'Good emotional understanding'
    }]
  } as RomanticCompatibilityResponse,

  romanticSynastry: {
    synastry_aspects: [{
      planet1: 'Sun',
      planet2: 'Moon',
      aspect: 'Conjunction',
      orb: 2,
      interpretation: 'Strong emotional bond'
    }],
    relationship_themes: [{
      theme: 'Partnership',
      strength: 8,
      description: 'Strong partnership potential'
    }],
    venus_mars_connections: [{
      aspect: 'Trine',
      interpretation: 'Natural romantic attraction'
    }]
  } as RomanticSynastryResponse,

  romanticTiming: {
    current_transits: [{
      planet: 'Venus',
      aspect: 'Conjunction',
      date: new Date().toISOString(),
      interpretation: 'Favorable for romance'
    }],
    favorable_dates: [{
      date: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
      score: 8,
      aspects: [{ 
        planet1: 'Venus',
        planet2: 'Sun',
        aspect: 'Trine',
        orb: 2,
        applying: true
      }],
      interpretation: 'Excellent for romantic initiatives'
    }],
    challenging_dates: [{
      date: new Date(Date.now() + 14*24*60*60*1000).toISOString(),
      score: 3,
      aspects: [{
        planet1: 'Saturn',
        planet2: 'Venus',
        aspect: 'Square',
        orb: 1,
        applying: true
      }],
      interpretation: 'Better to wait'
    }],
    best_timing: {
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
      score: 9,
      description: 'Ideal period for romance'
    }
  } as RomanticTimingResponse,

  tropicalProgressions: {
    progressed_planets: [
      { name: 'Sun', sign: 'Taurus', degree: 15, minute: 30, house: 2 },
      { name: 'Moon', sign: 'Cancer', degree: 25, minute: 45, house: 4 }
    ],
    progressed_aspects: [
      { planet1: 'Sun', planet2: 'Moon', aspect: 'Trine', orb: 2, applying: true }
    ],
    current_directions: [
      { planet: 'Mars', movement: 'direct', speed: 1.2 }
    ]
  } as TropicalProgressionsResponse,

  tropicalSynastry: {
    synastry_aspects: [
      { planet1: 'Sun', planet2: 'Moon', aspect: 'Conjunction', orb: 2 }
    ],
    composite_planets: [
      { name: 'Venus', sign: 'Libra', degree: 15, house: 7 }
    ],
    compatibility_score: 85
  } as TropicalSynastryResponse,

  romanticForecast: {
    upcoming_transits: [
      { planet: 'Venus', aspect: 'Conjunction', date: new Date().toISOString() }
    ],
    favorable_periods: [
      { start_date: new Date().toISOString(), end_date: new Date().toISOString(), rating: 8 }
    ],
    interpretation: ['Good period for romance']
  } as RomanticForecastResponse
};  