import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import Layout from '../../layout/Layout';
import { Button } from '../../shared/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { tarotDetailStyles as styles } from './styles/TarotDetailStyles';
import { useCart } from '../../../context/CartContext';
import { CartItem } from '../../../types/cart';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type TarotDetailRouteProp = RouteProp<RootStackParamList, 'TarotReadingDetail'>;

const TarotReadingDetail = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TarotDetailRouteProp>();
  const reading = route.params.reading;
  const { addItem, isLoading, cart } = useCart();

  console.log('Current cart state:', cart);

  const handleAddToCart = () => {
    console.log('Adding to cart and navigating:', reading);
    
    // Navigate to Cart screen immediately
    navigation.navigate('Cart');
    
    // Add to cart in the background
    const cartItem: Omit<CartItem, 'quantity'> = {
      id: reading.id,
      title: reading.title,
      subtitle: reading.subtitle,
      price: reading.price,
      type: 'tarot',
      image: 'https://via.placeholder.com/150'
    };
    
    addItem(cartItem).catch(error => {
      console.error('Error adding item to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart. Please try again.');
    });
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{reading.title}</Text>
          <Text style={styles.subtitle}>{reading.subtitle}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Discover deep insights about your situation through our personalized tarot reading.
              Our experienced readers will guide you through the cards' meanings and their significance
              in your life.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What You'll Get</Text>
            <View style={styles.benefitsList}>
              <Text style={styles.benefit}>• Detailed card interpretation</Text>
              <Text style={styles.benefit}>• Personal guidance and insights</Text>
              <Text style={styles.benefit}>• Future predictions and advice</Text>
              <Text style={styles.benefit}>• PDF report of your reading</Text>
            </View>
          </View>

          <View style={styles.priceSection}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${reading.price}</Text>
              {reading.yearlyPrice && (
                <Text style={styles.yearlyPrice}>
                  — or ${reading.yearlyPrice} / year
                </Text>
              )}
            </View>
            <Button 
              variant="secondary" 
              size="lg"
              onPress={handleAddToCart}
              loading={isLoading}
            >
              Get Reading Now
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default TarotReadingDetail; 