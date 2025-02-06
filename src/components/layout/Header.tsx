import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import AccountMenu from './AccountMenu';
import { headerStyles as styles } from './styles/HeaderStyles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Header = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => handleNavigation('Landing')}>
        <Image source={{ uri: '/placeholder.svg?height=40&width=40' }} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => handleNavigation('Landing')}>
          <Text style={styles.navItem}>{translations.home}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('Features')}>
          <Text style={styles.navItem}>{translations.features}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('About')}>
          <Text style={styles.navItem}>{translations.about}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('Contact')}>
          <Text style={styles.navItem}>{translations.contact}</Text>
        </TouchableOpacity>
        <LanguageSwitcher />
        {isAuthenticated && <AccountMenu />}
      </View>
    </View>
  );
};

export default Header; 