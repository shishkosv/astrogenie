import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import LanguageSwitcher from './LanguageSwitcher';
import SignSwitcher from './SignSwitcher';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { AccountMenu } from './AccountMenu';
import { headerStyles as styles } from './styles/HeaderStyles';
import Icon from '../icons/Icon';

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
        {/* <Image source={{ uri: '/placeholder.svg?height=40&width=40' }} style={styles.logo} />  */}
        <Text style={styles.navItem}>{translations.home}</Text>
      </TouchableOpacity>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => handleNavigation('Features')}>
          <Text style={styles.navItem}>{translations.getStarted}</Text>
        </TouchableOpacity>
        {!isAuthenticated && (
          <TouchableOpacity onPress={() => handleNavigation('Login')}>
            <Text style={styles.navItem}>{translations.login}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleNavigation('Subscription')}>
          <Text style={styles.navItem}>{translations.subscribe}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('Cart')} style={styles.cartButton}>
          <Icon name="shopping-cart" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <SignSwitcher />
        <LanguageSwitcher />
        {isAuthenticated && <AccountMenu />}
      </View>
    </View>
  );
};

export default Header; 