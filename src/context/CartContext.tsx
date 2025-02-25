import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Cart } from '../types/cart';
import * as cartItemService from '../services/cartItemService';

interface CartContextType {
  cart: Cart;
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const defaultCart: Cart = {
  items: [],
  totalPrice: 0
};

const CartContext = createContext<CartContextType>({
  cart: defaultCart,
  addItem: async () => {},
  removeItem: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  isLoading: false
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load cart from storage on initial render
  useEffect(() => {
    const loadCart = async () => {
      try {
        console.log('Loading cart from storage...');
        setIsLoading(true);
        const items = await cartItemService.getCartItems();
        console.log('Items loaded from storage:', items);
        
        // Validate items to ensure they have all required properties
        const validItems = items.filter(item => {
          const isValid = item && 
                         typeof item === 'object' && 
                         typeof item.id === 'string' && 
                         typeof item.title === 'string';
          if (!isValid) {
            console.warn('Filtered out invalid cart item:', item);
          }
          return isValid;
        });
        
        const totalPrice = cartItemService.calculateCartTotal(validItems);
        console.log('Total price calculated:', totalPrice);
        setCart({ items: validItems, totalPrice });
      } catch (error) {
        console.error('Error loading cart:', error);
        // Reset to default cart on error
        setCart(defaultCart);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const addItem = async (item: Omit<CartItem, 'quantity'>) => {
    console.log('Adding item to cart:', item);
    if (!item || !item.id || !item.title || typeof item.price !== 'number') {
      console.error('Invalid item data:', item);
      return;
    }
    
    setIsLoading(true);
    try {
      const updatedItems = await cartItemService.addItemToCart(item);
      console.log('Updated items after adding:', updatedItems);
      const totalPrice = cartItemService.calculateCartTotal(updatedItems);
      console.log('New total price:', totalPrice);
      setCart({ items: updatedItems, totalPrice });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    console.log('Removing item from cart:', itemId);
    if (!itemId) {
      console.error('Invalid item ID for removal');
      return;
    }
    
    setIsLoading(true);
    try {
      const updatedItems = await cartItemService.removeItemFromCart(itemId);
      console.log('Updated items after removal:', updatedItems);
      const totalPrice = cartItemService.calculateCartTotal(updatedItems);
      console.log('New total price:', totalPrice);
      setCart({ items: updatedItems, totalPrice });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    console.log('Updating quantity for item:', itemId, 'to', quantity);
    if (!itemId || typeof quantity !== 'number' || quantity < 0) {
      console.error('Invalid parameters for quantity update:', { itemId, quantity });
      return;
    }
    
    setIsLoading(true);
    try {
      const updatedItems = await cartItemService.updateItemQuantity(itemId, quantity);
      console.log('Updated items after quantity change:', updatedItems);
      const totalPrice = cartItemService.calculateCartTotal(updatedItems);
      console.log('New total price:', totalPrice);
      setCart({ items: updatedItems, totalPrice });
    } catch (error) {
      console.error('Error updating item quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    console.log('Clearing cart');
    setIsLoading(true);
    try {
      await cartItemService.clearCart();
      setCart(defaultCart);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 