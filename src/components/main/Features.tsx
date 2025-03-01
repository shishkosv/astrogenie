import React from 'react';
import { View, Text, ScrollView, useWindowDimensions, Platform } from 'react-native';
import Layout from '../layout/Layout';
import { Button } from '../shared/Button';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { featureStyles as styles } from './styles/FeatureStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignLists from './horoscope/SignLists';
import SignTraits from './horoscope/SignTraits';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Features = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { width } = useWindowDimensions();
  
  const isWeb = Platform.OS === 'web';
  const isWideScreen = isWeb && width > 768;

  const handleFeatureClick = (route: keyof RootStackParamList) => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }
    navigation.navigate(route);
  };

  const features = [
    {
      title: translations.dailyHoroscopes,
      description: "Get personalized daily horoscopes based on your zodiac sign. Our advanced astrological algorithms analyze planetary positions and celestial events to provide you with accurate and insightful predictions. Understand how cosmic energies influence your day-to-day life, relationships, career, and personal growth.",
      route: 'DailyHoroscopes',
      highlights: [
        "Detailed daily predictions",
        "Planetary influences",
        "Lucky numbers and colors",
        "Compatible zodiac signs"
      ]
    },
    {
      title: translations.compatibility,
      description: "Discover your compatibility with friends, family, and potential partners through our comprehensive astrological analysis. Our compatibility checker goes beyond sun signs to examine the complex interplay of planetary positions in both birth charts, providing deep insights into relationship dynamics.",
      route: 'Compatibility',
      highlights: [
        "Deep relationship insights",
        "Multiple aspect analysis",
        "Personalized advice",
        "Synastry reports"
      ]
    },
    {
      title: "Birth Chart Analysis",
      description: "Discover the unique planetary positions at your birth moment and understand their profound influence on your life path. Our detailed natal chart analysis reveals your cosmic blueprint, helping you understand your strengths, challenges, and life purpose.",
      route: 'BirthChart',
      highlights: [
        "Detailed planetary positions",
        "House placements analysis",
        "Aspect interpretations",
        "Personal strengths & challenges"
      ]
    }
  ];

  const renderFeatureCard = (feature: typeof features[0], index: number) => (
    <View 
      key={index} 
      style={[
        styles.card,
        isWideScreen && {
          width: `calc(50% - 12px)`,
        }
      ]}
    >
      <Text style={styles.cardTitle}>{feature.title}</Text>
      <Text style={styles.description}>{feature.description}</Text>
      
      <View style={styles.highlightsContainer}>
        {feature.highlights.map((highlight, idx) => (
          <View key={idx} style={styles.highlightItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.highlightText}>{highlight}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          size="md"
          onPress={() => handleFeatureClick(feature.route as keyof RootStackParamList)}
        >
          {translations.tryItNow}
        </Button>
      </View>
    </View>
  );

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{translations.features}</Text>
        <Text style={styles.subtitle}>
          Explore our comprehensive suite of astrological tools and services
        </Text>
        
        <View style={[
          styles.cardsContainer,
          isWideScreen && styles.cardsContainerWeb
        ]}>
          {features.map((feature, index) => renderFeatureCard(feature, index))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Features; 