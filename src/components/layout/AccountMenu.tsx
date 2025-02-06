import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { accountMenuStyles as styles } from './styles/AccountMenuStyles';

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

export default AccountMenu; 