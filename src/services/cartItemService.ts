import { CartItem } from '../types/cart';
import { Platform } from 'react-native';

// Local storage key for cart
const CART_STORAGE_KEY = 'astrogenie_cart';

// In-memory fallback for testing and mobile environments
let inMemoryCart: CartItem[] = [];

/**
 * Get cart items from storage
 */
export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    // For web platform, use localStorage
    if (Platform.OS === 'web') {
      try {
        const cartJson = localStorage.getItem(CART_STORAGE_KEY);
        if (cartJson) {
          const parsedItems = JSON.parse(cartJson);
          
          // Validate parsed items
          if (Array.isArray(parsedItems)) {
            // Filter out invalid items
            const validItems = parsedItems.filter(item => 
              item && 
              typeof item === 'object' && 
              typeof item.id === 'string' && 
              typeof item.title === 'string' && 
              typeof item.price === 'number' && 
              typeof item.quantity === 'number'
            );
            
            if (validItems.length !== parsedItems.length) {
              console.warn(`Filtered out ${parsedItems.length - validItems.length} invalid cart items`);
            }
            
            return validItems;
          } else {
            console.error('Invalid cart data format in localStorage:', parsedItems);
            return [];
          }
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    }
    
    // For mobile or if localStorage fails, use in-memory storage
    return inMemoryCart;
  } catch (error) {
    console.error('Error getting cart items:', error);
    return [];
  }
};

/**
 * Save cart items to storage
 */
export const saveCartItems = async (items: CartItem[]): Promise<void> => {
  try {
    // Validate items before saving
    if (!Array.isArray(items)) {
      console.error('Invalid items array:', items);
      return;
    }
    
    // Filter out invalid items
    const validItems = items.filter(item => 
      item && 
      typeof item === 'object' && 
      typeof item.id === 'string' && 
      typeof item.title === 'string' && 
      typeof item.price === 'number' && 
      typeof item.quantity === 'number'
    );
    
    if (validItems.length !== items.length) {
      console.warn(`Filtered out ${items.length - validItems.length} invalid cart items before saving`);
    }
    
    // Update in-memory cart first (for all platforms)
    inMemoryCart = [...validItems];
    
    // For web platform, also use localStorage
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(validItems));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  } catch (error) {
    console.error('Error saving cart items:', error);
  }
};

/**
 * Add item to cart
 */
export const addItemToCart = async (item: Omit<CartItem, 'quantity'>): Promise<CartItem[]> => {
  try {
    // Validate item
    if (!item || !item.id || !item.title || typeof item.price !== 'number') {
      console.error('Invalid item data:', item);
      return await getCartItems();
    }
    
    const currentItems = await getCartItems();
    
    // Check if item already exists in cart
    const existingItemIndex = currentItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Increment quantity if item already exists
      currentItems[existingItemIndex].quantity += 1;
    } else {
      // Add new item with quantity 1
      currentItems.push({ ...item, quantity: 1 });
    }
    
    await saveCartItems(currentItems);
    return currentItems;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return await getCartItems();
  }
};

/**
 * Remove item from cart
 */
export const removeItemFromCart = async (itemId: string): Promise<CartItem[]> => {
  try {
    if (!itemId) {
      console.error('Invalid item ID for removal');
      return await getCartItems();
    }
    
    let currentItems = await getCartItems();
    currentItems = currentItems.filter(item => item.id !== itemId);
    await saveCartItems(currentItems);
    return currentItems;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return await getCartItems();
  }
};

/**
 * Update item quantity in cart
 */
export const updateItemQuantity = async (itemId: string, quantity: number): Promise<CartItem[]> => {
  try {
    if (!itemId || typeof quantity !== 'number') {
      console.error('Invalid parameters for quantity update:', { itemId, quantity });
      return await getCartItems();
    }
    
    const currentItems = await getCartItems();
    const itemIndex = currentItems.findIndex(item => item.id === itemId);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return removeItemFromCart(itemId);
      } else {
        // Update quantity
        currentItems[itemIndex].quantity = quantity;
        await saveCartItems(currentItems);
      }
    }
    
    return currentItems;
  } catch (error) {
    console.error('Error updating item quantity:', error);
    return await getCartItems();
  }
};

/**
 * Clear cart
 */
export const clearCart = async (): Promise<void> => {
  try {
    await saveCartItems([]);
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};

/**
 * Calculate cart total
 */
export const calculateCartTotal = (items: CartItem[]): number => {
  if (!Array.isArray(items)) {
    console.error('Invalid items array for total calculation:', items);
    return 0;
  }
  
  try {
    return items.reduce((total, item) => {
      // Ensure price and quantity are valid numbers
      const price = typeof item.price === 'number' ? item.price : 0;
      const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
      return total + (price * quantity);
    }, 0);
  } catch (error) {
    console.error('Error calculating cart total:', error);
    return 0;
  }
}; 