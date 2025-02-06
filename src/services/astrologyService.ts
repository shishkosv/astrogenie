// Mock data
const horoscopes = {
  aries:
    'Today is a great day for new beginnings. Trust your instincts and take that leap of faith.',
  taurus: 'Focus on your financial goals today. A steady approach will yield the best results.',
  // ... add more signs
};

const compatibilityScores = {
  'aries-leo': 85,
  'taurus-virgo': 90,
  // ... add more combinations
};

const tarotCards = [
  'The Fool',
  'The Magician',
  'The High Priestess',
  // ... add more cards
];

export const getHoroscope = async (sign: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(horoscopes[sign] || 'No horoscope available for this sign.');
    }, 500);
  });
};

export const getCompatibilityScore = async (sign1: string, sign2: string): Promise<number> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const key = `${sign1}-${sign2}`;
      resolve(compatibilityScores[key] || Math.floor(Math.random() * 100));
    }, 500);
  });
};

export const getTarotReading = async (): Promise<string[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const reading = tarotCards.sort(() => 0.5 - Math.random()).slice(0, 3);
      resolve(reading);
    }, 500);
  });
};
