import React from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
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
import { DailyHoroscopeCard } from '../DailyHoroscopeCard';
import HeroContent from './HeroContent';
import { COLORS } from '../../theme/colors';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

// Sample horoscope data
const SAMPLE_HOROSCOPE = {
  sign: 'Aries',
  horoscope: "Today is a great day to start new projects. Your creative energy is at its peak, and you'll find that ideas flow easily. Take advantage of this productive period to advance your goals.",
  luckyNumber: 7,
  luckyColor: "Blue",
  mood: "Inspired"
};

// Sample daily horoscope data
const DAILY_HOROSCOPE = {
  date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  horoscope: "The stars are aligned in your favor today. You may find unexpected opportunities coming your way, especially in your career. Take time to reflect on your goals and be open to new possibilities. Your intuition is particularly strong, so trust your instincts when making decisions."
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

  // Handle read full horoscope button click
  const handleReadFullHoroscope = () => {
    navigation.navigate('DailyHoroscopes');
  };

  // Handle start reading button click
  const handleStartReading = () => {
    navigation.navigate('DailyHoroscopes');
  };

  // Handle learn more button click
  const handleLearnMore = () => {
    navigation.navigate('About');
  };

  // Use a different container component for web to enable flexbox layout
  const TopSectionContainer = Platform.OS === 'web' 
    ? ({ children }: { children: React.ReactNode }) => (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          width: '100%',
          minHeight: '500px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)' }}>
          {children}
        </View>
      );

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.mainContent}>
          {/* Top section with Hero and Daily Horoscope side by side on web */}
          <TopSectionContainer>
            {/* Hero Section with HeroContent */}
            <View style={styles.hero}>
              <HeroContent 
                onStartReading={handleStartReading}
                onLearnMore={handleLearnMore}
              />
              <View style={styles.signSelectorContainer}>
                <SignSwitcher />
                <Button 
                  variant="ghost" 
                  size="sm"
                  onPress={handleWeeklyForecastClick}
                  style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <Text style={{ color: COLORS.text.light }}>Weekly Forecast</Text>
                </Button>
              </View>
            </View>

            {/* Daily Horoscope Card */}
            <View style={styles.dailyHoroscopeSection}>
              <DailyHoroscopeCard
                date={DAILY_HOROSCOPE.date}
                horoscope={DAILY_HOROSCOPE.horoscope}
                onReadFullHoroscope={handleReadFullHoroscope}
              />
            </View>
          </TopSectionContainer>

          {/* Horoscope Preview Section */}
          <View style={[styles.horoscopePreviewSection, { borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)' }]}>
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
                variant="ghost" 
                size="md" 
                onPress={handleWeeklyForecastClick}
                style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Text style={{ color: COLORS.text.light }}>Explore All Horoscopes</Text>
              </Button>
            </View>
          </View>

          {/* Features Cards Section */}
          <FeaturesCards />

          <View style={[styles.features, { borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.1)' }]}>
            <View style={styles.featureList}>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>{translations.compatibility}</Text>
                <Text style={styles.featureDescription}>
                  {translations.compatibilityDesc}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onPress={() => handleFeatureClick('Compatibility')}
                    style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Text style={{ color: COLORS.text.light }}>{translations.tryItNow}</Text>
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
                    variant="ghost"
                    size="sm"
                    onPress={() => handleFeatureClick('BirthChart')}
                    style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Text style={{ color: COLORS.text.light }}>{translations.tryItNow}</Text>
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
                    variant="ghost"
                    size="sm"
                    onPress={() => handleFeatureClick('TarotReadings')}
                    style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Text style={{ color: COLORS.text.light }}>{translations.tryItNow}</Text>
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