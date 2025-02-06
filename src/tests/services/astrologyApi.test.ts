import axios from 'axios';
import { getHoroscope, getCompatibilityScore, getTarotReading } from '../../services/astrologyApi';

jest.mock('axios');

describe('astrologyApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches horoscope successfully', async () => {
    const mockResponse = { data: { description: 'Your horoscope for today' } };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getHoroscope('aries');
    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      'https://aztro.sameerkumar.website?sign=aries&day=today'
    );
  });

  it('returns a compatibility score', async () => {
    const score = await getCompatibilityScore('aries', 'leo');
    expect(typeof score).toBe('number');
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('returns tarot reading with 3 cards', async () => {
    const reading = await getTarotReading();
    expect(Array.isArray(reading)).toBe(true);
    expect(reading.length).toBe(3);
    reading.forEach(card => {
      expect(typeof card).toBe('string');
    });
  });
});
