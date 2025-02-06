import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import { styles } from './styles';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// Import images
import androidBadge from '../../assets/images/download_ android.png';
import iosBadge from '../../assets/images/download_ios.png';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();

  const handleNavigation = (route: keyof RootStackParamList) => {
    if (!isAuthenticated) {
      navigation.navigate('Registration');
    } else {
      navigation.navigate(route);
    }
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
          <Text style={styles.sectionTitle}>{translations.features}</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>{translations.dailyHoroscopes}</Text>
              <Text style={styles.featureDescription}>
                {translations.horoscopesDesc}
              </Text>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigation('DailyHoroscopes')}
              >
                <Text style={styles.buttonText}>{translations.tryItNow}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>{translations.compatibility}</Text>
              <Text style={styles.featureDescription}>
                {translations.compatibilityDesc}
              </Text>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigation('Compatibility')}
              >
                <Text style={styles.buttonText}>{translations.tryItNow}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>{translations.tarotReadings}</Text>
              <Text style={styles.featureDescription}>
                {translations.tarotDesc}
              </Text>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigation('TarotReadings')}
              >
                <Text style={styles.buttonText}>{translations.tryItNow}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Home; 