import type { Horoscope, Compatibility, TarotCard } from '../types';

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

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const fetchHoroscope = async (sign: string): Promise<Horoscope> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/horoscope/${sign}`);
    if (!response.ok) throw new Error('Failed to fetch horoscope');
    const data: Horoscope = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    throw error;
  }
};

export const getCompatibilityScore = async (sign1: string, sign2: string): Promise<number> => {
  try {
    const compatibility = await fetchCompatibility(sign1, sign2);
    return compatibility.score;
  } catch (error) {
    console.error('Error getting compatibility score:', error);
    throw error;
  }
};

export const fetchCompatibility = async (sign1: string, sign2: string): Promise<Compatibility> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/compatibility/${sign1}/${sign2}`);
    if (!response.ok) throw new Error('Failed to fetch compatibility');
    const data: Compatibility = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching compatibility:', error);
    throw error;
  }
};

export const fetchTarotCard = async (): Promise<TarotCard> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tarot/daily`);
    if (!response.ok) throw new Error('Failed to fetch tarot card');
    const data: TarotCard = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tarot card:', error);
    throw error;
  }
};
