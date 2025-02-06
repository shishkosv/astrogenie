import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContext';
import Layout from '../layout/Layout';
import { tarotReadingsStyles as styles } from './styles/TarotCardsScreenStyles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const TarotReadings = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Login');
    }
  }, [isAuthenticated, navigation]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Tarot Readings</Text>
      </View>
    </Layout>
  );
};

export default TarotReadings; 