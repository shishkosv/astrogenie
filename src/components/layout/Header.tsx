import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { AccountMenu } from './AccountMenu';
import { headerStyles as styles } from './styles/HeaderStyles';
import Icon from '../icons/Icon';
import { Button } from '../shared/Button';
import { useColors, useSpacing } from '../../theme/ThemeProvider';
import { useIsMobile } from '../../utils/responsive';

type NavigationProp = StackNavigationProp<RootStackParamList>;

// Helper function to apply web-specific props
const applyWebProps = (className: string) => {
  if (Platform.OS === 'web') {
    return { className };
  }
  return {};
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));
  const [backdropAnimation] = useState(new Animated.Value(0));
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();
  const colors = useColors();
  const spacing = useSpacing();
  const isMobile = useIsMobile();

  // Type-safe navigation function
  const navigateTo = (screen: keyof RootStackParamList) => {
    if (menuOpen) {
      setMenuOpen(false);
    }
    // @ts-ignore - Ignoring type error for navigation
    navigation.navigate(screen);
  };

  const toggleMenu = () => {
    const toValue = menuOpen ? 0 : 1;
    
    Animated.parallel([
      Animated.spring(menuAnimation, {
        toValue,
        useNativeDriver: true,
        tension: 65,
        friction: 10,
      }),
      Animated.timing(backdropAnimation, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
    
    setMenuOpen(!menuOpen);
  };

  // Mobile menu transform based on animation value
  const mobileMenuTransform = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  // Backdrop opacity based on animation value
  const backdropOpacity = backdropAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  // All menu items for mobile
  const renderMobileMenuItems = () => (
    <View style={styles.mobileMenuContent}>
      <View style={styles.mobileMenuHeader}>
        <Text style={styles.mobileMenuTitle}>Menu</Text>
        <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.mobileMenuItems}>
        <Button 
          variant="ghost" 
          size="sm" 
          onPress={() => navigateTo('Features')}
          style={styles.mobileNavButton}
        >
          {translations.features}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onPress={() => navigateTo('DailyHoroscopes')}
          style={styles.mobileNavButton}
        >
          {translations.dailyHoroscopes}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onPress={() => navigateTo('TarotReadings')}
          style={styles.mobileNavButton}
        >
          {translations.tarotReadings}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onPress={() => navigateTo('Subscription')}
          style={styles.mobileNavButton}
        >
          {translations.subscription}
        </Button>
        
        {/* Mobile auth buttons */}
        {!isAuthenticated ? (
          <View style={styles.mobileAuthButtons}>
            <Button 
              variant="ghost" 
              size="sm" 
              onPress={() => navigateTo('Login')}
              style={styles.mobileNavButton}
            >
              {translations.login}
            </Button>
            <Button 
              variant="white" 
              size="sm" 
              onPress={() => navigateTo('Registration')}
              style={styles.mobileNavButton}
            >
              {translations.getStarted}
            </Button>
          </View>
        ) : (
          <View style={styles.mobileAuthButtons}>
            <Button 
              variant="ghost" 
              size="sm" 
              onPress={() => navigateTo('Cart')}
              style={styles.mobileNavButton}
            >
              Cart
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onPress={() => navigateTo('Settings')}
              style={styles.mobileNavButton}
            >
              {translations.profile}
            </Button>
          </View>
        )}
      </View>
    </View>
  );

  // Navigation links for desktop
  const renderNavLinks = () => (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onPress={() => navigateTo('Features')}
        style={styles.navLinkItem}
      >
        {translations.features}
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onPress={() => navigateTo('DailyHoroscopes')}
        style={styles.navLinkItem}
      >
        {translations.dailyHoroscopes}
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onPress={() => navigateTo('TarotReadings')}
        style={styles.navLinkItem}
      >
        {translations.tarotReadings}
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onPress={() => navigateTo('Subscription')}
        style={styles.navLinkItem}
      >
        {translations.subscription}
      </Button>
    </>
  );

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <View style={styles.leftSection}>
            <TouchableOpacity onPress={() => navigateTo('Landing')}>
              <Text style={styles.logo}>AstroConnect</Text>
            </TouchableOpacity>
            
            {/* Navigation links - hidden on mobile */}
            {!isMobile && (
              <View 
                style={styles.navLinks}
                {...applyWebProps('header-nav-desktop')}
              >
                {renderNavLinks()}
              </View>
            )}
          </View>
          
          <View style={styles.rightSection}>
            <View style={styles.rightSectionItem}>
              <LanguageSwitcher />
            </View>
            
            {/* Desktop auth buttons or account menu - hidden on mobile */}
            {!isMobile && (
              <View 
                style={styles.desktopButtons}
                {...applyWebProps('header-nav-desktop')}
              >
                {!isAuthenticated ? (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onPress={() => navigateTo('Login')}
                      style={styles.desktopButtonItem}
                    >
                      {translations.login}
                    </Button>
                    <Button 
                      variant="white" 
                      size="sm" 
                      onPress={() => navigateTo('Registration')}
                    >
                      {translations.getStarted}
                    </Button>
                  </>
                ) : (
                  <>
                    <TouchableOpacity 
                      style={styles.cartButton}
                      onPress={() => navigateTo('Cart')}
                    >
                      <Icon name="cart" size={24} color="#fff" />
                    </TouchableOpacity>
                    <AccountMenu />
                  </>
                )}
              </View>
            )}
            
            {/* Hamburger menu button - only visible on mobile */}
            {isMobile && (
              <TouchableOpacity 
                style={styles.hamburgerButton}
                onPress={toggleMenu}
                {...applyWebProps('header-hamburger')}
              >
                <Icon 
                  name={menuOpen ? 'close' : 'menu'} 
                  size={24} 
                  color="#fff" 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      
      {/* Mobile menu - slide-in panel */}
      {isMobile && menuOpen && (
        <>
          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <Animated.View 
              style={[
                styles.mobileMenuBackdrop,
                { opacity: backdropOpacity }
              ]}
            />
          </TouchableWithoutFeedback>
          
          {/* Menu Panel */}
          <Animated.View 
            style={[
              styles.mobileMenu,
              {
                transform: [{ translateX: mobileMenuTransform }],
              }
            ]}
          >
            {renderMobileMenuItems()}
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default Header; 