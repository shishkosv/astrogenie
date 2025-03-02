import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Layout from '../layout/Layout';
import { compatibilityStyles as styles } from './styles/CompatibilityStyles';
import { RomanticCompatibilityResponse } from '../../types/responses/RomanticCompatibilityResponse';
import CompatibilityControl from './horoscope/CompatibilityControl';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Compatibility = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Login');
    }
  }, [isAuthenticated, navigation]);

  const handleNavigateToResults = (
    result: RomanticCompatibilityResponse, 
    person1Name: string, 
    person2Name: string
  ) => {
    navigation.navigate('CompatibilityScoreScreen', { 
      result,
      person1Name,
      person2Name
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{translations.compatibility || 'Compatibility'}</Text>
          <CompatibilityControl onNavigateToResults={handleNavigateToResults} />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Compatibility; 