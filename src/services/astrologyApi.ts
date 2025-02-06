import type { Horoscope, Compatibility, TarotCard } from '../types/astrology';

// Mock data
const horoscopes: Record<string, Horoscope> = {
  aries: {
    sign: 'aries',
    date: new Date().toISOString().split('T')[0],
    description:
      'Today is a great day for new beginnings. Trust your instincts and take that leap of faith.',
  },
  taurus: {
    sign: 'taurus',
    date: new Date().toISOString().split('T')[0],
    description:
      'Focus on your financial goals today. A steady approach will yield the best results.',
  },
  // ... add more signs
};

const compatibilityScores: Record<string, Compatibility> = {
  'aries-leo': {
    sign1: 'aries',
    sign2: 'leo',
    score: 85,
    description:
      'Aries and Leo make a dynamic and passionate pair. Their shared enthusiasm and zest for life create a strong bond.',
  },
  'taurus-virgo': {
    sign1: 'taurus',
    sign2: 'virgo',
    score: 90,
    description:
      'Taurus and Virgo share a practical approach to life. Their mutual respect and understanding form a solid foundation for a lasting relationship.',
  },
  // ... add more combinations
};

const tarotCards: TarotCard[] = [
  {
    name: 'The Fool',
    description: 'New beginnings, innocence, spontaneity',
    imageUrl: 'https://example.com/tarot/the_fool.jpg',
  },
  {
    name: 'The Magician',
    description: 'Manifestation, resourcefulness, power',
    imageUrl: 'https://example.com/tarot/the_magician.jpg',
  },
  {
    name: 'The High Priestess',
    description: 'Intuition, sacred knowledge, divine feminine',
    imageUrl: 'https://example.com/tarot/the_high_priestess.jpg',
  },
  // ... add more cards
];

const API_BASE_URL = 'https://aztro.sameerkumar.website';

export const getHoroscope = async (
  sign: string,
  day: 'today' | 'tomorrow' | 'yesterday' = 'today'
): Promise<Horoscope> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const horoscope = horoscopes[sign] || {
        sign,
        date: new Date().toISOString().split('T')[0],
        description: 'No horoscope available for this sign.',
      };
      resolve({
        ...horoscope,
        date: new Date(
          new Date().setDate(
            new Date().getDate() + (day === 'tomorrow' ? 1 : day === 'yesterday' ? -1 : 0)
          )
        )
          .toISOString()
          .split('T')[0],
      });
    }, 500);
  });
};

export const getCompatibilityScore = async (
  sign1: string,
  sign2: string
): Promise<Compatibility> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const key = `${sign1}-${sign2}`;
      const reversedKey = `${sign2}-${sign1}`;
      const compatibility = compatibilityScores[key] ||
        compatibilityScores[reversedKey] || {
          sign1,
          sign2,
          score: Math.floor(Math.random() * 100),
          description: `The compatibility between ${sign1} and ${sign2} is unique and complex. Explore their individual traits to understand their potential connection.`,
        };
      resolve(compatibility);
    }, 500);
  });
};

export const getTarotReading = async (): Promise<TarotCard[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const reading = tarotCards.sort(() => 0.5 - Math.random()).slice(0, 3);
      resolve(reading);
    }, 500);
  });
};
