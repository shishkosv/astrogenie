import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { logout } = useAuth();
  const { translations } = useLanguage();

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Landing');
    setIsOpen(false);
  };

  const handleNavigate = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuToggle}>
        <Text style={styles.menuButton}>{translations.account}</Text>
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleNavigate('Profile')}
          >
            <Text style={styles.menuText}>{translations.profile}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleNavigate('Settings')}
          >
            <Text style={styles.menuText}>{translations.settings}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleNavigate('Favorites')}
          >
            <Text style={styles.menuText}>{translations.favorites}</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <Text style={[styles.menuText, styles.logoutText]}>
              {translations.logout}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  menuButton: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    padding: 12,
    borderRadius: 4,
  },
  menuText: {
    color: '#333',
    fontSize: 14,
  },
  logoutText: {
    color: '#dc3545',
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
    marginVertical: 8,
  },
});

export default AccountMenu; 