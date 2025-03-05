import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Layout from '../../layout/Layout';
import { Button } from '../../shared/Button';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { tarotStyles as styles } from '../tarot/styles/TarotStyles';
import { COLORS } from '../../../theme/colors';
import { ErrorBoundary } from '../../shared/ErrorBoundary';
import { TarotCard } from '../tarot/TarotCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface TarotReading {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  yearlyPrice?: number;
  icon: React.JSX.Element;
}

const tarotReadings: TarotReading[] = [
  {
    id: 'career-change',
    title: 'Career Change Tarot Reading',
    subtitle: 'Career Change Tarot',
    price: 10.95,
    icon: <MaterialCommunityIcons name="briefcase" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'celtic-cross',
    title: 'Career Tarot Reading: Celtic Cross',
    subtitle: 'Career Tarot Reading: Celtic Cross',
    price: 18.95,
    icon: <FontAwesome5 name="cross" size={24} color={COLORS.text.light} />,
  },
  {
    id: '2025-tarot',
    title: '2025 Tarot Reading',
    subtitle: '2025 Tarot',
    price: 21.99,
    yearlyPrice: 15.99,
    icon: <MaterialCommunityIcons name="calendar" size={24} color={COLORS.text.light} />,
  },
  {
    id: '2025-love',
    title: '2025 Love Tarot',
    subtitle: '2025 Love Tarot',
    price: 21.99,
    yearlyPrice: 15.99,
    icon: <MaterialCommunityIcons name="heart" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'astrological',
    title: 'Astrological Houses Tarot Reading',
    subtitle: 'Astrological Houses Tarot Reading',
    price: 18.95,
    icon: <MaterialCommunityIcons name="home" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'vision-quest',
    title: 'Follow Your Dreams Tarot Reading',
    subtitle: 'Vision Quest Tarot',
    price: 12.99,
    icon: <MaterialCommunityIcons name="eye" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'egyptian',
    title: 'Egyptian Tarot Personality',
    subtitle: 'Egyptian Tarot Personality Reading',
    price: 15.99,
    icon: <MaterialCommunityIcons name="pyramid" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'money-tree',
    title: 'Money Tree Tarot',
    subtitle: 'Money Tree Tarot',
    price: 27.99,
    icon: <MaterialCommunityIcons name="pine-tree" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'past-life',
    title: 'Past Life Reading',
    subtitle: 'Past Life Reading',
    price: 12.99,
    icon: <MaterialCommunityIcons name="history" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'spirit-animal',
    title: 'Spirit Animal Love Tarot',
    subtitle: 'Spirit Animal Love Tarot',
    price: 16.95,
    icon: <MaterialCommunityIcons name="bird" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'unlock-love',
    title: 'Unlock Love Tarot',
    subtitle: 'Unlock Love Tarot',
    price: 12.95,
    icon: <MaterialCommunityIcons name="key" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'finding-love',
    title: 'Finding Love Tarot',
    subtitle: 'Finding Love Tarot',
    price: 16.95,
    icon: <MaterialCommunityIcons name="magnify" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'yes-no',
    title: 'Yes/No Tarot',
    subtitle: 'Yes No Tarot',
    price: 9.95,
    icon: <MaterialCommunityIcons name="help-circle" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'true-love',
    title: 'True Love Tarot Reading',
    subtitle: 'True Love Tarot Reading',
    price: 12.99,
    icon: <MaterialCommunityIcons name="heart-multiple" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'crystal-ball',
    title: 'Crystal Ball Tarot',
    subtitle: 'Crystal Ball Tarot',
    price: 10.99,
    icon: <MaterialCommunityIcons name="diamond-stone" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'guardian-angel',
    title: 'Guardian Angel Tarot',
    subtitle: 'Tarot of Angels',
    price: 11.99,
    icon: <MaterialCommunityIcons name="star" size={24} color={COLORS.text.light} />,
  },
  {
    id: 'magic-genie',
    title: 'Magic Genie Tarot',
    subtitle: 'Magic Genie Tarot',
    price: 10.99,
    icon: <MaterialCommunityIcons name="lamp" size={24} color={COLORS.text.light} />,
  },
];

const TarotScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleReadingPress = (reading: typeof tarotReadings[0]) => {
    navigation.navigate('TarotReadingDetail', { reading });
  };

  return (
    <Layout>
      <ErrorBoundary
        fallback={({ error, resetError }) => (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Something went wrong: {error.message}
            </Text>
            <Button 
              variant="secondary"
              size="sm"
              onPress={resetError}
            >
              Try Again
            </Button>
          </View>
        )}
      >
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Tarot Readings</Text>
          <View style={styles.grid}>
            {tarotReadings.map((reading, index) => (
              <TarotCard
                key={reading.id}
                reading={reading}
                index={index}
                onPress={handleReadingPress}
              />
            ))}
          </View>
        </ScrollView>
      </ErrorBoundary>
    </Layout>
  );
};

export default TarotScreen; 