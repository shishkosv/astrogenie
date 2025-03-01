import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useLanguage } from '../../context/LanguageContext';
import { footerStyles as styles } from './styles/FooterStyles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

// Custom Link component to replace Next.js Link
const Link = ({ 
  href, 
  children, 
  style 
}: { 
  href: keyof RootStackParamList | string; 
  children: React.ReactNode;
  style?: any;
}) => {
  const navigation = useNavigation<NavigationProp>();
  
  const handlePress = () => {
    // Check if the href is a valid route in our navigation
    if (typeof href === 'string' && href !== '#') {
      try {
        // @ts-ignore - We're handling this safely
        navigation.navigate(href);
      } catch (error) {
        console.log('Navigation error:', error);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );
};

const Footer = () => {
  const { translations } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        <View style={styles.gridContainer}>
          <View style={styles.gridColumn}>
            <Text style={styles.columnTitle}>AstroConnect</Text>
            <View style={styles.linkList}>
              <Link href="About" style={styles.link}>
                About Us
              </Link>
              <Link href="#" style={styles.link}>
                Our Team
              </Link>
              <Link href="#" style={styles.link}>
                Careers
              </Link>
              <Link href="Contact" style={styles.link}>
                Contact
              </Link>
            </View>
          </View>

          <View style={styles.gridColumn}>
            <Text style={styles.columnTitle}>Features</Text>
            <View style={styles.linkList}>
              <Link href="DailyHoroscopes" style={styles.link}>
                Daily Horoscopes
              </Link>
              <Link href="Compatibility" style={styles.link}>
                Compatibility
              </Link>
              <Link href="BirthChart" style={styles.link}>
                Birth Charts
              </Link>
              <Link href="TarotReadings" style={styles.link}>
                Tarot Readings
              </Link>
            </View>
          </View>

          <View style={styles.gridColumn}>
            <Text style={styles.columnTitle}>Resources</Text>
            <View style={styles.linkList}>
              <Link href="#" style={styles.link}>
                Blog
              </Link>
              <Link href="#" style={styles.link}>
                Guides
              </Link>
              <Link href="#" style={styles.link}>
                FAQ
              </Link>
              <Link href="#" style={styles.link}>
                Support
              </Link>
            </View>
          </View>

          <View style={styles.gridColumn}>
            <Text style={styles.columnTitle}>Legal</Text>
            <View style={styles.linkList}>
              <Link href="#" style={styles.link}>
                Terms of Service
              </Link>
              <Link href="#" style={styles.link}>
                Privacy Policy
              </Link>
              <Link href="#" style={styles.link}>
                Cookie Policy
              </Link>
            </View>
          </View>
        </View>

        <View style={styles.footerBottom}>
          <Text style={styles.copyright}>
            © {currentYear} AstroConnect. All rights reserved.
          </Text>
          <View style={styles.socialLinks}>
            <Link href="#" style={styles.socialLink}>
              <Text>Twitter</Text>
            </Link>
            <Link href="#" style={styles.socialLink}>
              <Text>Instagram</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Footer; 