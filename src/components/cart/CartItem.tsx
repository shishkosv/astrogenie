import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { cartItemStyles as styles } from './styles/CartItemStyles';
import { CartItem as CartItemType } from '../../types/cart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { translations } = useLanguage();
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = async (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      await updateQuantity(item.id, newQuantity);
    } else {
      await removeItem(item.id);
    }
  };

  const handleRemove = async () => {
    await removeItem(item.id);
  };

  // Format price safely with fallback to 0
  const formatPrice = (price: number | undefined) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  console.log('Rendering cart item with data:', item);

  return (
    <View style={styles.container}>
      {item.image && (
        <Image 
          source={{ uri: item.image }} 
          style={styles.image}
        />
      )}
      
      <View style={styles.details}>
        <Text style={styles.title}>{item.title || 'Unnamed Item'}</Text>
        {item.subtitle && (
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        )}
        <Text style={styles.price}>${formatPrice(item.price)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(-1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity || 1}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={handleRemove}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem; 