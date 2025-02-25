import { House, Planet, Aspect } from '../types/base/WesternBaseTypes';
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
import type { ChartInterpretationResponse } from '../types/responses/ChartInterpretationResponse';

export const birthChartData: {
  houses: House[];
  aspects: Aspect[];
} = {
  houses: [
    { house_number: 1, sign: 'Aries', degree: 0, minute: 0, cusp: true, interpretation: 'House of self and personality' },
    { house_number: 2, sign: 'Taurus', degree: 5, minute: 15, cusp: true, interpretation: 'House of values and possessions' },
    { house_number: 3, sign: 'Gemini', degree: 10, minute: 30, cusp: true, interpretation: 'House of communication and learning' },
    { house_number: 4, sign: 'Cancer', degree: 15, minute: 45, cusp: true, interpretation: 'House of home and family' },
    { house_number: 5, sign: 'Leo', degree: 20, minute: 0, cusp: true, interpretation: 'House of creativity and pleasure' },
    { house_number: 6, sign: 'Virgo', degree: 25, minute: 15, cusp: true, interpretation: 'House of work and health' },
    { house_number: 7, sign: 'Libra', degree: 0, minute: 0, cusp: true, interpretation: 'House of partnerships' },
    { house_number: 8, sign: 'Scorpio', degree: 5, minute: 15, cusp: true, interpretation: 'House of transformation' },
    { house_number: 9, sign: 'Sagittarius', degree: 10, minute: 30, cusp: true, interpretation: 'House of higher learning' },
    { house_number: 10, sign: 'Capricorn', degree: 15, minute: 45, cusp: true, interpretation: 'House of career and status' },
    { house_number: 11, sign: 'Aquarius', degree: 20, minute: 0, cusp: true, interpretation: 'House of friendships and groups' },
    { house_number: 12, sign: 'Pisces', degree: 25, minute: 15, cusp: true, interpretation: 'House of spirituality and endings' }
  ],
  aspects: [
    { 
      planet1: 'Sun',
      planet2: 'Moon',
      aspect: 'Trine',
      orb: 2.5,
      applying: true,
      interpretation: 'Harmonious flow between conscious and unconscious mind'
    },
    { 
      planet1: 'Sun',
      planet2: 'Mercury',
      aspect: 'Conjunction',
      orb: 1.2,
      applying: true,
      interpretation: 'Strong mental clarity and communication skills'
    },
    { 
      planet1: 'Moon',
      planet2: 'Venus',
      aspect: 'Sextile',
      orb: 3.1,
      applying: true,
      interpretation: 'Easy expression of emotions in relationships'
    },
    { 
      planet1: 'Mars',
      planet2: 'Jupiter',
      aspect: 'Square',
      orb: 4.2,
      applying: false,
      interpretation: 'Dynamic tension between action and expansion'
    },
    { 
      planet1: 'Venus',
      planet2: 'Mars',
      aspect: 'Trine',
      orb: 2.8,
      applying: true,
      interpretation: 'Harmonious balance of feminine and masculine energies'
    },
    { 
      planet1: 'Saturn',
      planet2: 'Pluto',
      aspect: 'Conjunction',
      orb: 1.5,
      applying: true,
      interpretation: 'Profound transformation of structures and authority'
    },
    { 
      planet1: 'Jupiter',
      planet2: 'Uranus',
      aspect: 'Sextile',
      orb: 2.3,
      applying: true,
      interpretation: 'Opportunities for sudden breakthroughs and expansion'
    },
    { 
      planet1: 'Mercury',
      planet2: 'Neptune',
      aspect: 'Square',
      orb: 3.7,
      applying: false,
      interpretation: 'Challenge between logical thinking and intuition'
    },
    { 
      planet1: 'Sun',
      planet2: 'Saturn',
      aspect: 'Opposition',
      orb: 2.9,
      applying: false,
      interpretation: 'Tension between self-expression and responsibility'
    },
    { 
      planet1: 'Moon',
      planet2: 'Pluto',
      aspect: 'Trine',
      orb: 1.8,
      applying: true,
      interpretation: 'Deep emotional transformation flows naturally'
    }
  ]
};

export const chartInterpretationData = {
  planets: [
    { 
      name: 'Sun', 
      sign: 'Aries', 
      degree: 15, 
      minute: 30, 
      retrograde: false, 
      house: 1,
      interpretation: 'Strong leadership qualities and self-expression'
    },
    { 
      name: 'Moon', 
      sign: 'Taurus', 
      degree: 22, 
      minute: 45, 
      retrograde: false, 
      house: 2,
      interpretation: 'Emotional security through material comfort'
    },
    { 
      name: 'Mercury', 
      sign: 'Pisces', 
      degree: 8, 
      minute: 15, 
      retrograde: true, 
      house: 12,
      interpretation: 'Intuitive thinking and creative communication'
    },
    { 
      name: 'Venus', 
      sign: 'Gemini', 
      degree: 3, 
      minute: 20, 
      retrograde: false, 
      house: 3,
      interpretation: 'Versatile approach to relationships and values'
    },
    { 
      name: 'Mars', 
      sign: 'Leo', 
      degree: 17, 
      minute: 55, 
      retrograde: false, 
      house: 5,
      interpretation: 'Dynamic self-expression and creative energy'
    }
  ],
  houses: birthChartData.houses,
  ascendant: 0,
  midheaven: 270,
  vertex: 180,
  lilith: {
    name: 'Lilith',
    sign: 'Scorpio',
    degree: 15,
    minute: 30,
    retrograde: false,
    house: 8
  },
  aspects: birthChartData.aspects,
  moon_phase: {
    moon_phase_name: 'Waxing Gibbous',
    moon_phase_id: 5,
    moon_phase_calc: '75% illuminated',
    moon_phase_description: 'The Waxing Gibbous phase represents a time of refinement and perfection. This is a period to review and edit your work, making final adjustments before the culmination of your efforts. It\'s a time of anticipation and preparation.'
  },
  hemisphere: {
    east_west: {
      description: 'Your chart has a slight Eastern emphasis, suggesting you tend to create your own opportunities rather than waiting for them to come to you. You prefer to take initiative and shape your own destiny.',
      id: 1
    },
    north_south: {
      description: 'Your chart has a balanced North-South distribution, indicating you maintain equilibrium between your public and private life. You can navigate both personal and professional spheres with equal comfort.',
      id: 3
    }
  },
  elements: {
    elements: [
      { name: 'Fire', percentage: 35 },
      { name: 'Earth', percentage: 25 },
      { name: 'Air', percentage: 20 },
      { name: 'Water', percentage: 20 }
    ],
    description: 'Your chart shows a relatively balanced elemental distribution with a slight emphasis on Fire. This suggests you have access to all four elemental energies, with a natural inclination toward enthusiasm, inspiration, and action.',
    dominant_element_id: 1
  },
  modes: {
    modes: [
      { name: 'Cardinal', percentage: 40 },
      { name: 'Fixed', percentage: 35 },
      { name: 'Mutable', percentage: 25 }
    ],
    description: 'Your chart has a slight emphasis on Cardinal modality, suggesting you\'re naturally inclined toward initiating action and starting new projects. You have leadership qualities and enjoy being at the forefront of new endeavors.',
    dominant_mode_id: 1
  },
  dominant_sign: {
    sign_id: 1,
    sign_name: 'Aries',
    percentage: 25
  }
};

export const mockWesternAstrologyData = {
  birthChart: {
    planets: [
      { 
        name: 'Sun', 
        sign: 'Aries', 
        degree: 15, 
        minute: 30, 
        retrograde: false, 
        house: 1,
        interpretation: 'Strong leadership qualities and self-expression'
      },
      { 
        name: 'Moon', 
        sign: 'Taurus', 
        degree: 22, 
        minute: 45, 
        retrograde: false, 
        house: 2,
        interpretation: 'Emotional security through material comfort'
      },
      { 
        name: 'Mercury', 
        sign: 'Pisces', 
        degree: 8, 
        minute: 15, 
        retrograde: true, 
        house: 12,
        interpretation: 'Intuitive thinking and creative communication'
      },
      { 
        name: 'Venus', 
        sign: 'Gemini', 
        degree: 3, 
        minute: 20, 
        retrograde: false, 
        house: 3,
        interpretation: 'Versatile approach to relationships and values'
      },
      { 
        name: 'Mars', 
        sign: 'Leo', 
        degree: 17, 
        minute: 55, 
        retrograde: false, 
        house: 5,
        interpretation: 'Dynamic self-expression and creative energy'
      },
      { 
        name: 'Jupiter', 
        sign: 'Libra', 
        degree: 28, 
        minute: 10, 
        retrograde: false, 
        house: 7,
        interpretation: 'Growth through partnerships and relationships'
      },
      { 
        name: 'Saturn', 
        sign: 'Capricorn', 
        degree: 11, 
        minute: 5, 
        retrograde: true, 
        house: 10,
        interpretation: 'Career discipline and authority'
      },
      { 
        name: 'Uranus', 
        sign: 'Taurus', 
        degree: 14, 
        minute: 25, 
        retrograde: false, 
        house: 2,
        interpretation: 'Revolutionary approach to finances and values'
      },
      { 
        name: 'Neptune', 
        sign: 'Pisces', 
        degree: 24, 
        minute: 30, 
        retrograde: false, 
        house: 12,
        interpretation: 'Spiritual inspiration and artistic sensitivity'
      },
      { 
        name: 'Pluto', 
        sign: 'Capricorn', 
        degree: 26, 
        minute: 45, 
        retrograde: false, 
        house: 10,
        interpretation: 'Transformative power in career and public image'
      }
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
  } as RomanticForecastResponse,

  chartInterpretation: chartInterpretationData as ChartInterpretationResponse
};  