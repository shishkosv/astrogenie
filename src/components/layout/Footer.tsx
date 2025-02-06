import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Icon from '../icons/Icon';
import { useLanguage } from '../../context/LanguageContext';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Footer = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <View style={styles.grid}>
          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.linkList}>
              <TouchableOpacity onPress={() => handleNavigation('About')}>
                <Text style={styles.link}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigation('Team')}>
                <Text style={styles.link}>Team</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigation('Careers')}>
                <Text style={styles.link}>Careers</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Resources Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>
            <View style={styles.linkList}>
              <TouchableOpacity onPress={() => handleNavigation('Documentation')}>
                <Text style={styles.link}>Documentation</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigation('Blog')}>
                <Text style={styles.link}>Blog</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigation('Support')}>
                <Text style={styles.link}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Legal Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal</Text>
            <View style={styles.linkList}>
              <TouchableOpacity onPress={() => handleNavigation('Privacy')}>
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigation('Terms')}>
                <Text style={styles.link}>Terms of Service</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Connect Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Connect</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="twitter" size={16} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="message-circle" size={16} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="github" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} AstroConnect. All rights reserved.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
  },
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -16,
  },
  section: {
    flex: 1,
    minWidth: 250,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#18181b',
  },
  linkList: {
    gap: 8,
  },
  link: {
    fontSize: 14,
    color: '#71717a',
    marginBottom: 8,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  bottom: {
    marginTop: 40,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  copyright: {
    fontSize: 14,
    color: '#71717a',
  },
});

export default Footer; 