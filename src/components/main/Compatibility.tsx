import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Layout from '../layout/Layout';
import { compatibilityStyles as styles } from './styles/CompatibilityStyles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Compatibility = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const isPremiumUser = false; // Replace with actual premium status check

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Login');
    }
  }, [isAuthenticated, navigation]);

  const handleUpgrade = () => {
    navigation.navigate('Subscription');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>{translations.compatibility}</Text>

        {!isPremiumUser && (
          <View style={styles.premiumBanner}>
            <Text style={styles.premiumText}>
              {translations.premiumFeature}
            </Text>
            <Text style={styles.premiumDescription}>
              {translations.upgradeForFullAccess}
            </Text>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={handleUpgrade}
            >
              <Text style={styles.upgradeButtonText}>
                {translations.upgradeToPremium}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Rest of your compatibility component */}
      </View>
    </Layout>
  );
};

export default Compatibility; 