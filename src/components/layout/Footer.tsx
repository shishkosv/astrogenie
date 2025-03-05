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
                {translations.footerAboutUs}
              </Link>
              <Link href="#" style={styles.link}>
                {translations.footerOurTeam}
              </Link>
              <Link href="#" style={styles.link}>
                {translations.footerCareers}
              </Link>
              <Link href="Contact" style={styles.link}>
                {translations.footerContact}
              </Link>
            </View>
          </View>

          <View style={styles.gridColumn}>
            <Text style={styles.columnTitle}>{translations.footerFeatures}</Text>
            <View style={styles.linkList}>
              <Link href="DailyHoroscopes" style={styles.link}>
                {translations.footerDailyHoroscopes}
              </Link>
              <Link href="Compatibility" style={styles.link}>
                {translations.footerCompatibility}
              </Link>
              <Link href="BirthChart" style={styles.link}>
                {translations.footerBirthCharts}
              </Link>
              <Link href="TarotReadings" style={styles.link}>
                {translations.footerTarotReadings}
              </Link>
            </View>
          </View>

          <View style={styles.gridColumn}>
            <Text style={styles.columnTitle}>{translations.footerResources}</Text>
            <View style={styles.linkList}>
              <Link href="#" style={styles.link}>
                {translations.footerBlog}
              </Link>
              <Link href="#" style={styles.link}>
                {translations.footerGuides}
              </Link>
              <Link href="#" style={styles.link}>
                {translations.footerFAQ}
              </Link>
              <Link href="#" style={styles.link}>
                {translations.footerSupport}
              </Link>
            </View>
          </View>

          <View style={styles.gridColumn}>
            <Text style={styles.columnTitle}>{translations.footerLegal}</Text>
            <View style={styles.linkList}>
              <Link href="#" style={styles.link}>
                {translations.footerTermsOfService}
              </Link>
              <Link href="#" style={styles.link}>
                {translations.footerPrivacyPolicy}
              </Link>
              <Link href="#" style={styles.link}>
                {translations.footerCookiePolicy}
              </Link>
            </View>
          </View>
        </View>

        <View style={styles.footerBottom}>
          <Text style={styles.copyright}>
            {translations.footerCopyright.replace('{year}', currentYear.toString())}
          </Text>
          <View style={styles.socialLinks}>
            <Link href="#" style={styles.socialLink}>
              <Text>{translations.footerTwitter}</Text>
            </Link>
            <Link href="#" style={styles.socialLink}>
              <Text>{translations.footerInstagram}</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Footer; 