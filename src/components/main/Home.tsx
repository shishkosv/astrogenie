import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import { styles } from './styles';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../shared/Button';
import SignLists from './horoscope/SignLists';
import TarotReadings from './tarot/TarotReadings';

// Import images
import androidBadge from '../../assets/images/download_ android.png';
import iosBadge from '../../assets/images/download_ios.png';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();

  const handleFeatureClick = (route: keyof RootStackParamList) => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }
    navigation.navigate(route);
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
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

          <View style={styles.zodiacSection}>
            <SignLists standalone={false} />
          </View>

          <View style={styles.features}>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>{translations.dailyHoroscopes}</Text>
                <Text style={styles.featureDescription}>
                  {translations.horoscopesDesc}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button 
                    variant="default"
                    size="sm"
                    onPress={() => handleFeatureClick('DailyHoroscopes')}
                  >
                    {translations.tryItNow}
                  </Button>
                </View>
              </View>

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
                    variant="default"
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