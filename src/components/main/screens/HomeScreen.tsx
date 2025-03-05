import React, { useState } from 'react';
import { View, Text, ScrollView, Platform, StyleSheet } from 'react-native';
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

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [activeFeature, setActiveFeature] = useState('daily');

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

  // Use a different container for the horoscope section on web
  const HoroscopeSectionContainer = Platform.OS === 'web'
    ? ({ children }: { children: React.ReactNode }) => (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 0'
        }}>
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <View style={{ 
          borderBottomWidth: 1, 
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
          paddingVertical: 16
        }}>
          {children}
        </View>
      );

  // Use different containers for the horoscope preview and grid on web
  const HoroscopePreviewContainer = Platform.OS === 'web'
    ? ({ children }: { children: React.ReactNode }) => (
        <div style={{
          flex: '1 1 400px',
          minWidth: '300px',
          padding: '0 8px',
          marginBottom: '16px'
        }}>
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <View style={{ marginBottom: 16 }}>
          {children}
        </View>
      );

  const HoroscopeGridContainer = Platform.OS === 'web'
    ? ({ children }: { children: React.ReactNode }) => (
        <div style={{
          flex: '1 1 600px',
          minWidth: '300px',
          padding: '0 8px',
          marginBottom: '16px'
        }}>
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <View>
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
            <View style={styles.hero}>
              <HeroContent 
                onStartReading={handleStartReading}
                onLearnMore={handleLearnMore}
              />
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