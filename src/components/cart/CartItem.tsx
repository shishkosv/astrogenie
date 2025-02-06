import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { cartItemStyles as styles } from './styles/CartItemStyles';

interface CartItemProps {
  item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const { translations } = useLanguage();

  const handleQuantityChange = (change: number) => {
    // Implement quantity change logic
  };

  const handleRemove = () => {
    // Implement remove item logic
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(-1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
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