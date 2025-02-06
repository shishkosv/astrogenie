import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Layout from '../../layout/Layout';
import { Button } from '../../shared/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { tarotDetailStyles as styles } from './styles/TarotDetailStyles';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type TarotDetailRouteProp = RouteProp<RootStackParamList, 'TarotReadingDetail'>;

const TarotReadingDetail = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TarotDetailRouteProp>();
  const reading = route.params.reading;

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    navigation.navigate('Cart');
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
            <Button variant="default" size="lg"
              onPress={handleAddToCart}
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