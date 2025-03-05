import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Platform, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import Layout from '../../layout/Layout';
import { homeStyles as styles } from '../styles/HomeStyles';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../shared/Button';
import SignLists from '../horoscope/SignLists';
import { useWebNavigation } from '../../../hooks/useWebNavigation';
import BirthChart from '../horoscope/BirthChart';
import SignSwitcher from '../../layout/SignSwitcher';
import { HoroscopePreview } from '../HoroscopePreview';
import FeaturesCards from '../FeaturesCards';
import { DailyHoroscopeCard } from '../horoscope/DailyHoroscopeCard';
import HeroContent from '../HeroContent';
import { COLORS } from '../../../theme/colors';
import DailyForecast from '../horoscope/DailyForecast';
import DailyHoroscopesGrid from '../horoscope/DailyHoroscopesGrid';
import { FeatureSelector } from '../FeatureSelector';
import CompatibilityControl from '../horoscope/CompatibilityControl';
import cssStyles from '../styles/HomeScreen.module.css';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

const useResponsiveLayout = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const { width } = Dimensions.get('window');
      setIsLargeScreen(width >= 1024);
    };

    checkScreenSize();
    const subscription = Dimensions.addEventListener('change', checkScreenSize);
    return () => subscription.remove();
  }, []);

  return isLargeScreen;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [activeFeature, setActiveFeature] = useState('daily');
  const isLargeScreen = useResponsiveLayout();

  // Sample horoscope data
  const SAMPLE_HOROSCOPE = {
    sign: 'Aries',
    horoscope: translations.sampleHoroscope,
    luckyNumber: 7,
    luckyColor: "Blue",
    mood: "Inspired"
  };

  // Sample daily horoscope data
  const DAILY_HOROSCOPE = {
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    horoscope: translations.sampleDailyHoroscope
  };

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

  // Handle feature change from FeatureSelector
  const handleFeatureChange = (feature: string) => {
    setActiveFeature(feature);
  };

  const webStyles = StyleSheet.create({
    topSection: {
      display: 'flex',
      flexDirection: isLargeScreen ? 'row' : 'column',
      width: '100%',
      minHeight: 500,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    heroSection: {
      flex: isLargeScreen ? 1 : 0,
      minWidth: isLargeScreen ? 300 : '100%',
      width: isLargeScreen ? 'auto' : '100%',
      paddingHorizontal: 8,
    },
    dailyHoroscopeSection: {
      flex: isLargeScreen ? 1 : 0,
      minWidth: isLargeScreen ? 300 : '100%',
      width: isLargeScreen ? 'auto' : '100%',
      paddingHorizontal: 8,
      marginTop: isLargeScreen ? 0 : 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    horoscopeSection: {
      display: 'flex',
      flexDirection: isLargeScreen ? 'row' : 'column',
      flexWrap: isLargeScreen ? 'wrap' : 'nowrap',
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
      padding: 16,
    },
    horoscopePreview: {
      flex: isLargeScreen ? 1 : 0,
      minWidth: isLargeScreen ? 300 : '100%',
      width: isLargeScreen ? 'auto' : '100%',
      padding: 8,
      marginBottom: 16,
    },
    horoscopeGrid: {
      flex: isLargeScreen ? 1 : 0,
      minWidth: isLargeScreen ? 300 : '100%',
      width: isLargeScreen ? 'auto' : '100%',
      padding: 8,
      marginBottom: 16,
    }
  });

  const mobileStyles = StyleSheet.create({
    topSection: {
      flexDirection: 'column',
      width: '100%',
      minHeight: 500,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    heroSection: {
      width: '100%',
      paddingHorizontal: 8,
    },
    dailyHoroscopeSection: {
      width: '100%',
      paddingHorizontal: 8,
      marginTop: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    horoscopeSection: {
      flexDirection: 'column',
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
      paddingVertical: 16,
    },
    horoscopePreview: {
      width: '100%',
      marginBottom: 16,
    },
    horoscopeGrid: {
      width: '100%',
    }
  });

  // Use a different container component for web to enable flexbox layout
  const TopSectionContainer = Platform.OS === 'web' 
    ? ({ children }: { children: React.ReactNode }) => (
        <div style={webStyles.topSection}>
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <View style={mobileStyles.topSection}>
          {children}
        </View>
      );

  // Use a different container for the hero section on web
  const HeroContainer = Platform.OS === 'web'
    ? ({ children }: { children: React.ReactNode }) => (
        <div style={webStyles.heroSection}>
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <View style={mobileStyles.heroSection}>
          {children}
        </View>
      );

  // Use a different container for the daily horoscope section on web
  const DailyHoroscopeContainer = Platform.OS === 'web'
    ? ({ children }: { children: React.ReactNode }) => (
        <div style={webStyles.dailyHoroscopeSection}>
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <View style={mobileStyles.dailyHoroscopeSection}>
          {children}
        </View>
      );

  // Use a different container for the horoscope section on web
  const HoroscopeSectionContainer = Platform.OS === 'web'
    ? ({ children }: { children: React.ReactNode }) => (
        <div style={webStyles.horoscopeSection}>
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <View style={mobileStyles.horoscopeSection}>
          {children}
        </View>
      );

  // Use different containers for the horoscope preview and grid on web
  const HoroscopePreviewContainer = Platform.OS === 'web'
    ? ({ children }: { children: React.ReactNode }) => (
        <div style={webStyles.horoscopePreview}>
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <View style={mobileStyles.horoscopePreview}>
          {children}
        </View>
      );

  const HoroscopeGridContainer = Platform.OS === 'web'
    ? ({ children }: { children: React.ReactNode }) => (
        <div style={webStyles.horoscopeGrid}>
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <View style={mobileStyles.horoscopeGrid}>
          {children}
        </View>
      );

  // Render content based on active feature
  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'daily':
        return (
          <>
            {/* HoroscopePreview */}
            <HoroscopePreviewContainer>
              <View style={styles.featureContentContainer}>
                <HoroscopePreview onSignPress={handleSignPress} />
              </View>
            </HoroscopePreviewContainer>
            
            {/* DailyHoroscopesGrid */}
            <HoroscopeGridContainer>
              <View style={styles.featureContentContainer}>
                <DailyHoroscopeCard 
                  date={DAILY_HOROSCOPE.date}
                  horoscope={DAILY_HOROSCOPE.horoscope}
                  onReadFullHoroscope={handleReadFullHoroscope}
                />
              </View>
            </HoroscopeGridContainer>
          </>
        );
      case 'compatibility':
        return (
          <View style={styles.featureContentContainer}>
            <CompatibilityControl 
              onNavigateToResults={(result, person1Name, person2Name) => {
                navigation.navigate('CompatibilityScoreScreen', {
                  result,
                  person1Name,
                  person2Name
                });
              }}
            />
          </View>
        );
      case 'birthchart':
        return (
          <View style={styles.featureContentContainer}>
            <BirthChart />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.mainContent}>
          {/* Top section with Hero and Daily Horoscope side by side on web */}
          <TopSectionContainer>
            {/* Hero Section with HeroContent */}
            <HeroContainer>
              <View style={styles.hero}>
                <HeroContent 
                  onStartReading={handleStartReading}
                  onLearnMore={handleLearnMore}
                />
              </View>
            </HeroContainer>

            {/* Daily Horoscope Card */}
            <DailyHoroscopeContainer>
              <View style={styles.dailyHoroscopeSection}>
                <DailyHoroscopeCard
                  date={DAILY_HOROSCOPE.date}
                  horoscope={DAILY_HOROSCOPE.horoscope}
                  onReadFullHoroscope={handleReadFullHoroscope}
                />
              </View>
            </DailyHoroscopeContainer>
          </TopSectionContainer>

          {/* Horoscope Section with Feature Selector */}
          <HoroscopeSectionContainer>
            <View style={{ width: '100%', marginBottom: 16 }}>
              <FeatureSelector 
                activeFeature={activeFeature} 
                onFeatureChange={handleFeatureChange} 
              />
            </View>
            
            {renderFeatureContent()}
          </HoroscopeSectionContainer>

          {/* Features Cards Section */}
          <FeaturesCards />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen; 