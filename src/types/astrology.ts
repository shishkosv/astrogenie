export interface Horoscope {
  sign: string;
  date: string;
  description: string;
}

export interface Compatibility {
  sign1: string;
  sign2: string;
  score: number;
  description: string;
}

export interface TarotCard {
  name: string;
  description: string;
  imageUrl: string;
}
