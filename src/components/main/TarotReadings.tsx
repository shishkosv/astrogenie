import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Layout from '../layout/Layout';
import { Button } from '../shared/Button';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { tarotStyles as styles } from './styles/TarotStyles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const tarotReadings = [
  {
    id: 'career-change',
    title: 'Career Change Tarot Reading',
    subtitle: 'Career Change Tarot',
    price: 10.95,
  },
  {
    id: 'celtic-cross',
    title: 'Career Tarot Reading: Celtic Cross',
    subtitle: 'Career Tarot Reading: Celtic Cross',
    price: 18.95,
  },
  {
    id: '2025-tarot',
    title: '2025 Tarot Reading',
    subtitle: '2025 Tarot',
    price: 21.99,
    yearlyPrice: 15.99,
  },
  {
    id: '2025-love',
    title: '2025 Love Tarot',
    subtitle: '2025 Love Tarot',
    price: 21.99,
    yearlyPrice: 15.99,
  },
  {
    id: 'astrological',
    title: 'Astrological Houses Tarot Reading',
    subtitle: 'Astrological Houses Tarot Reading',
    price: 18.95,
  },
  {
    id: 'vision-quest',
    title: 'Follow Your Dreams Tarot Reading',
    subtitle: 'Vision Quest Tarot',
    price: 12.99,
  },
  {
    id: 'egyptian',
    title: 'Egyptian Tarot Personality',
    subtitle: 'Egyptian Tarot Personality Reading',
    price: 15.99,
  },
  {
    id: 'money-tree',
    title: 'Money Tree Tarot',
    subtitle: 'Money Tree Tarot',
    price: 27.99,
  },
  {
    id: 'past-life',
    title: 'Past Life Reading',
    subtitle: 'Past Life Reading',
    price: 12.99,
  },
  {
    id: 'spirit-animal',
    title: 'Spirit Animal Love Tarot',
    subtitle: 'Spirit Animal Love Tarot',
    price: 16.95,
  },
  {
    id: 'unlock-love',
    title: 'Unlock Love Tarot',
    subtitle: 'Unlock Love Tarot',
    price: 12.95,
  },
  {
    id: 'finding-love',
    title: 'Finding Love Tarot',
    subtitle: 'Finding Love Tarot',
    price: 16.95,
  },
  {
    id: 'yes-no',
    title: 'Yes/No Tarot',
    subtitle: 'Yes No Tarot',
    price: 9.95,
  },
  {
    id: 'true-love',
    title: 'True Love Tarot Reading',
    subtitle: 'True Love Tarot Reading',
    price: 12.99,
  },
  {
    id: 'crystal-ball',
    title: 'Crystal Ball Tarot',
    subtitle: 'Crystal Ball Tarot',
    price: 10.99,
  },
  {
    id: 'guardian-angel',
    title: 'Guardian Angel Tarot',
    subtitle: 'Tarot of Angels',
    price: 11.99,
  },
  {
    id: 'magic-genie',
    title: 'Magic Genie Tarot',
    subtitle: 'Magic Genie Tarot',
    price: 10.99,
  },
];

const TarotReadings = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleReadingPress = (reading: typeof tarotReadings[0]) => {
    navigation.navigate('TarotReadingDetail', { reading });
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Tarot Readings</Text>
        <View style={styles.grid}>
          {tarotReadings.map((reading) => (
            <View key={reading.id} style={styles.card}>
              <Text style={styles.cardTitle}>{reading.title}</Text>
              <Text style={styles.cardSubtitle}>{reading.subtitle}</Text>
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
                size="sm"
                onPress={() => handleReadingPress(reading)}
              >
                View Details
              </Button>
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default TarotReadings; 