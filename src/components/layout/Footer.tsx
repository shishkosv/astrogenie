import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useLanguage } from '../../context/LanguageContext';
import { footerStyles as styles } from './styles/FooterStyles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Footer = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        <View style={styles.row}>
          {/* Company Section */}
          <View style={styles.column}>
            <Text style={styles.title}>Company</Text>
            <TouchableOpacity onPress={() => handleNavigation('About')}>
              <Text style={styles.link}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('Contact')}>
              <Text style={styles.link}>Contact</Text>
            </TouchableOpacity>
          </View>

          {/* Features Section */}
          <View style={styles.column}>
            <Text style={styles.title}>Features</Text>
            <TouchableOpacity onPress={() => handleNavigation('DailyHoroscopes')}>
              <Text style={styles.link}>Daily Horoscopes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('Compatibility')}>
              <Text style={styles.link}>Compatibility</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('TarotReadings')}>
              <Text style={styles.link}>Tarot Readings</Text>
            </TouchableOpacity>
          </View>

          {/* Support Section */}
          <View style={styles.column}>
            <Text style={styles.title}>Support</Text>
            <TouchableOpacity onPress={() => handleNavigation('Login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('Registration')}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.copyright}>
          © {new Date().getFullYear()} AstroConnect. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

export default Footer; 