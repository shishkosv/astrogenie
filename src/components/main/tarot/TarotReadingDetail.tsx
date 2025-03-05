import React from 'react';
import { View, Text, ScrollView, Alert, Image } from 'react-native';
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
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.title}>{reading.title}</Text>
            <Text style={styles.subtitle}>{reading.subtitle}</Text>
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
              style={styles.ctaButton}
            >
              Get Reading Now
            </Button>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About This Reading</Text>
            <Text style={styles.description}>
              Discover deep insights about your situation through our personalized tarot reading.
              Our experienced readers will guide you through the cards' meanings and their significance
              in your life. Each reading is carefully crafted to provide you with meaningful guidance and clarity.
              We use traditional tarot decks and intuitive techniques to ensure accurate and helpful readings
              that resonate with your unique journey.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What You'll Get</Text>
            <View style={styles.benefitsGrid}>
              <View style={styles.benefitCard}>
                <View style={styles.benefitIcon}>🎴</View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Detailed Interpretation</Text>
                  <Text style={styles.benefitDescription}>Comprehensive analysis of your cards and their meanings</Text>
                </View>
              </View>
              <View style={styles.benefitCard}>
                <View style={styles.benefitIcon}>✨</View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Personal Guidance</Text>
                  <Text style={styles.benefitDescription}>Tailored insights specific to your situation</Text>
                </View>
              </View>
              <View style={styles.benefitCard}>
                <View style={styles.benefitIcon}>🔮</View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Future Insights</Text>
                  <Text style={styles.benefitDescription}>Clear predictions and actionable advice</Text>
                </View>
              </View>
              <View style={styles.benefitCard}>
                <View style={styles.benefitIcon}>📄</View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>PDF Report</Text>
                  <Text style={styles.benefitDescription}>Detailed reading report for future reference</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default TarotReadingDetail; 