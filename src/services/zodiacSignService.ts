import type { ZodiacSignInfo } from '../types/ZodiacSignInfo';
import type { ForecastInfo } from '../types/ForecastInfo';
import type { TraitsInfo } from '../types/TraitsInfo';

export const zodiacSignService = {
  Current(sign: string): ZodiacSignInfo {
    const forecast: ForecastInfo = {
      SunSign: "Today's planetary alignment brings positive energy to your endeavors.",
      Love: "Venus is in a favorable position for romance and connections.",
      Career: "Professional opportunities are highlighted today.",
      Money: "Financial prospects look promising.",
      Health: "Focus on balance and wellness today.",
      Chinese: "Your lucky elements are particularly strong.",
      Tarot: "The cards suggest growth and transformation.",
      Numerology: "Your numbers indicate new beginnings.",
      Planets: "Planetary positions favor your sign.",
      Celebrities: "You share positive energies with fellow zodiac celebrities."
    };

    const traits: TraitsInfo = {
      personality: "You are naturally adaptable and quick-witted.",
      friendship: "You form deep connections with like-minded individuals.",
      love: "You seek intellectual and emotional connections.",
      lifestyle: "Your lifestyle is marked by variety and learning.",
      health: "You benefit from diverse physical activities.",
      spirituality: "Your spiritual path is guided by curiosity."
    };

    return {
      forecast,
      traits
    };
  }
}; 