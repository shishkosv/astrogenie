import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import { styles } from './styles';
import { useLanguage } from '../../context/LanguageContext';

// Import images
import androidBadge from '../../assets/images/download_ android.png';
import iosBadge from '../../assets/images/download_ios.png';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();

  const handleTarotNavigation = () => {
    navigation.navigate('TarotReadings');
  };

  const handleHoroscopeNavigation = () => {
    navigation.navigate('DailyHoroscopes');
  };

  const handleCompatibilityNavigation = () => {
    navigation.navigate('Compatibility');
  };

  return (
    <Layout>
      <View style={styles.mainContent}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{translations.welcome}</Text>
          <Text style={styles.heroSubtitle}>{translations.subtitle}</Text>
          <View style={styles.downloadButtons}>
            <View style={styles.downloadItem}>
              <TouchableOpacity>
                <Image 
                  source={androidBadge}
                  style={styles.storeButton}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.downloadText}>{translations.downloadAndroid}</Text>
            </View>
            <View style={styles.downloadItem}>
              <TouchableOpacity>
                <Image 
                  source={iosBadge}
                  style={styles.storeButton}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.downloadText}>{translations.downloadIOS}</Text>
            </View>
          </View>
        </View>

        <View style={styles.features}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>Daily Horoscopes</Text>
              <Text style={styles.featureDescription}>
                Get personalized daily horoscopes based on your zodiac sign.
              </Text>
              <TouchableOpacity 
                style={styles.button} 
                onPress={handleHoroscopeNavigation}
              >
                <Text style={styles.buttonText}>Try it Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>Compatibility Check</Text>
              <Text style={styles.featureDescription}>
                Check your compatibility with friends and potential partners.
              </Text>
              <TouchableOpacity 
                style={styles.button} 
                onPress={handleCompatibilityNavigation}
              >
                <Text style={styles.buttonText}>Try it Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>Tarot Readings</Text>
              <Text style={styles.featureDescription}>
                Receive insightful tarot card readings at your fingertips.
              </Text>
              <TouchableOpacity style={styles.button} onPress={handleTarotNavigation}>
                <Text style={styles.buttonText}>Try Tarot Reading</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Home; 