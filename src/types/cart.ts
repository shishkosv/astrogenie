export interface CartItem {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  quantity: number;
  type: 'tarot' | 'horoscope' | 'compatibility' | 'other';
  image?: string;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
} 