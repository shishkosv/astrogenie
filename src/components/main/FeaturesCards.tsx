import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { FeatureCard } from './FeatureCard';
import { DownloadButton } from './download-button';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

export function FeaturesCards() {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { width } = useWindowDimensions();

  const handleFeatureClick = (route: keyof RootStackParamList) => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }
    navigation.navigate(route as any);
  };

  const features = [
    {
      title: translations.compatibility,
      description: translations.compatibilityDesc,
      route: 'Compatibility' as const,
    },
    {
      title: translations.birthChart,
      description: translations.compatibilityDesc,
      route: 'BirthChart' as const,
    },
    {
      title: translations.tarotReadings,
      description: translations.tarotDesc,
      route: 'TarotReadings' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.textSection}>
            <Text style={styles.heading}>Take AstroConnect with you</Text>
            <Text style={styles.description}>
              Get personalized astrological insights wherever you go with our mobile app.
            </Text>
            <View style={[styles.downloadButtons, { flexDirection: width < 640 ? 'column' : 'row' }]}>
              <DownloadButton platform="iOS" variant="default" />
              <DownloadButton platform="Android" variant="outline" />
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.features, { borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.1)' }]}>
        <View style={[styles.featureList, { flexDirection: width < 768 ? 'column' : 'row' }]}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.route}
              title={feature.title}
              description={feature.description}
              onTryNow={() => handleFeatureClick(feature.route)}
              tryNowText={translations.tryItNow}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flexDirection: 'column',
  },
  textSection: {
    marginBottom: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
    fontSize: 16,
  },
  downloadButtons: {
    marginTop: 16,
    gap: 16,
  },
  features: {
    marginTop: 48,
  },
  featureList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -16,
  },
});

export default FeaturesCards; 