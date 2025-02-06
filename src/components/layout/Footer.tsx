import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useLanguage } from '../../context/LanguageContext';
import { footerStyles as styles } from './styles/FooterStyles';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>&copy; 2023 AstroConnect. All rights reserved.</Text>
    </View>
  );
};

export default Footer; 