import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useLanguage } from '../../context/LanguageContext';
import CartItem from './CartItem';
import { cartStyles as styles } from './styles/CartStyles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Cart = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const cartItems = []; // Replace with actual cart items from context

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const renderItem = ({ item }: { item: any }) => (
    <CartItem item={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translations.cart}</Text>
      
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>{translations.emptyCart}</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
          
          <View style={styles.summary}>
            <Text style={styles.total}>
              {translations.total}: $99.99
            </Text>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>
                {translations.checkout}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart; 