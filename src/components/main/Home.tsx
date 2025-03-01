import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import { homeStyles as styles } from './styles/HomeStyles';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../shared/Button';
import SignLists from './horoscope/SignLists';
import TarotReadings from './tarot/TarotReadings';
import { useWebNavigation } from '../../hooks/useWebNavigation';
import BirthChart from './BirthChart';
import SignSwitcher from '../layout/SignSwitcher';
import { HoroscopePreview } from './HoroscopePreview';
import FeaturesCards from './FeaturesCards';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

// Sample horoscope data
const SAMPLE_HOROSCOPE = {
  sign: 'Aries',
  horoscope: "Today is a great day to start new projects. Your creative energy is at its peak, and you'll find that ideas flow easily. Take advantage of this productive period to advance your goals.",
  luckyNumber: 7,
  luckyColor: "Blue",
  mood: "Inspired"
};

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();

  const handleFeatureClick = (route: keyof RootStackParamList) => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }
    navigation.navigate(route as any);
  };

  // Handle Weekly Forecast button click - navigate to DailyHoroscopes
  const handleWeeklyForecastClick = () => {
    navigation.navigate('DailyHoroscopes');
  };

  // Handle sign press in HoroscopePreview
  const handleSignPress = () => {
    navigation.navigate('DailyHoroscopes');
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.mainContent}>
          <View style={styles.hero}>
            <View style={styles.signSelectorContainer}>
              <SignSwitcher />
              <Button 
                variant="primary"
                size="sm"
                onPress={handleWeeklyForecastClick}
              >
                Weekly Forecast
              </Button>
            </View>
          </View>

          {/* Horoscope Preview Section */}
          <View style={styles.horoscopePreviewSection}>
            <Text style={styles.sectionTitle}>Your Daily Horoscope</Text>
            
            <HoroscopePreview
              sign={SAMPLE_HOROSCOPE.sign}
              horoscope={SAMPLE_HOROSCOPE.horoscope}
              luckyNumber={SAMPLE_HOROSCOPE.luckyNumber}
              luckyColor={SAMPLE_HOROSCOPE.luckyColor}
              mood={SAMPLE_HOROSCOPE.mood}
              onSignPress={handleSignPress}
            />
            
            <View style={styles.ctaContainer}>
              <Button 
                variant="secondary" 
                size="md" 
                onPress={handleWeeklyForecastClick}
              >
                Explore All Horoscopes
              </Button>
            </View>
          </View>

          {/* Features Cards Section */}
          <FeaturesCards />

          <View style={styles.features}>
            <View style={styles.featureList}>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>{translations.compatibility}</Text>
                <Text style={styles.featureDescription}>
                  {translations.compatibilityDesc}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button 
                    variant="secondary"
                    size="sm"
                    onPress={() => handleFeatureClick('Compatibility')}
                  >
                    {translations.tryItNow}
                  </Button>
                </View>
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>{translations.birthChart}</Text>
                <Text style={styles.featureDescription}>
                  {translations.compatibilityDesc}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button 
                    variant="secondary"
                    size="sm"
                    onPress={() => handleFeatureClick('BirthChart')}
                  >
                    {translations.tryItNow}
                  </Button>
                </View>
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>{translations.tarotReadings}</Text>
                <Text style={styles.featureDescription}>
                  {translations.tarotDesc}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button 
                    variant="secondary"
                    size="sm"
                    onPress={() => handleFeatureClick('TarotReadings')}
                  >
                    {translations.tryItNow}
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Home; 