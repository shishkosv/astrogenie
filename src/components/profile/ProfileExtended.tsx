import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { profileExtendedStyles as styles } from './styles/ProfileExtendedStyles';
import Icon from '../icons/Icon';

interface MenuItem {
  label: string;
  value?: string;
  route?: keyof RootStackParamList;
  icon: string;
  external?: boolean;
  action?: () => void;
}

interface ProfileExtendedProps {
  name?: string;
  role?: string;
  avatar?: string;
  subscription?: string;
  onClose?: () => void;
}

const defaultProfile = {
  name: "Eugene An",
  role: "Prompt Engineer",
  avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
  subscription: "Free Trial",
};

const ProfileExtended = ({
  name = defaultProfile.name,
  role = defaultProfile.role,
  avatar = defaultProfile.avatar,
  subscription = defaultProfile.subscription,
  onClose,
}: ProfileExtendedProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { logout } = useAuth();
  const { translations } = useLanguage();

  const handleLogout = () => {
    logout();
    onClose?.();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Landing' }],
    });
  };

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
    onClose?.();
  };

  const menuItems: MenuItem[] = [
    {
      label: translations.profile || "Profile",
      icon: 'user',
      route: 'Profile',
    },
    {
      label: translations.settings || "Settings",
      icon: 'settings',
      route: 'Settings',
    },
    {
      label: translations.favorites || "Favorites",
      icon: 'heart',
      route: 'Favorites',
    },
    {
      label: translations.subscription || "Subscription",
      value: subscription,
      icon: 'credit-card',
      action: () => handleNavigation('Subscription'),
    },
    {
      label: translations.termsAndPolicies || "Terms & Policies",
      icon: 'file-text',
      external: true,
      action: () => {
        // Handle external link - could open in browser or show modal
        console.log('Opening terms and policies');
        onClose?.();
      },
    },
  ];

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.action) {
      item.action();
    } else if (item.route) {
      handleNavigation(item.route);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
            />
            <View style={styles.statusDot} />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item)}
            >
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={16} color="#666" />
                <Text style={styles.menuItemLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.value && (
                  <Text style={styles.menuItemValue}>{item.value}</Text>
                )}
                {item.external && (
                  <Icon name="external-link" size={16} color="#666" />
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <View style={styles.menuItemLeft}>
              <Icon name="log-out" size={16} color="#dc3545" />
              <Text style={[styles.menuItemLabel, styles.logoutText]}>
                {translations.logout}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileExtended; 