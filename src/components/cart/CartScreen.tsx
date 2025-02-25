import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import { cartStyles as styles } from './styles/CartStyles';
import { Button } from '../shared/Button';
import Layout from '../layout/Layout';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Cart = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { cart, isLoading } = useCart();

  useEffect(() => {
    console.log('Cart screen mounted, cart state:', cart);
  }, [cart]);

  const handleCheckout = () => {
    console.log('Navigating to checkout with cart:', cart);
    navigation.navigate('Checkout');
  };

  // Format price safely with fallback to 0
  const formatPrice = (price: number | undefined) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  const renderItem = ({ item }: { item: any }) => {
    if (!item) {
      console.warn('Attempted to render undefined cart item');
      return null;
    }
    
    console.log('Rendering cart item:', item);
    return <CartItem item={item} />;
  };

  if (isLoading) {
    console.log('Cart is loading...');
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a0e4e" />
          <Text style={styles.loadingText}>Loading cart...</Text>
        </View>
      </Layout>
    );
  }

  // Ensure cart and cart.items are defined
  const items = cart?.items || [];
  const totalPrice = cart?.totalPrice || 0;
  
  console.log('Rendering cart screen with items:', items);

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        
        {items.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <Button 
              variant="secondary"
              size="md"
              onPress={() => navigation.navigate('TarotReadings')}
            >
              Continue Shopping
            </Button>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item?.id || Math.random().toString()}
              style={styles.list}
            />
            
            <View style={styles.summary}>
              <Text style={styles.total}>
                Total: ${formatPrice(totalPrice)}
              </Text>
              <Button 
                variant="primary"
                size="lg"
                onPress={handleCheckout}
              >
                Checkout
              </Button>
            </View>
          </>
        )}
      </View>
    </Layout>
  );
};

export default Cart; 