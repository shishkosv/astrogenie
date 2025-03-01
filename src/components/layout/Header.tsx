import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Animated, Dimensions, StyleSheet } from 'react-native';
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

type NavigationProp = StackNavigationProp<RootStackParamList>;

// Helper function to apply web-specific props
const applyWebProps = (className: string) => {
  if (Platform.OS === 'web') {
    return { className, style: { display: className.includes('hamburger') ? 'flex' : undefined } };
  }
  return {};
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));
  const [windowWidth, setWindowWidth] = useState(
    Platform.OS === 'web' ? window.innerWidth : Dimensions.get('window').width
  );
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { isAuthenticated } = useAuth();

  // Check if we're in mobile view
  const isMobileView = windowWidth <= 768;

  // Update window width on resize
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleNavigation = (route: keyof RootStackParamList) => {
    if (menuOpen) {
      setMenuOpen(false);
    }
    navigation.navigate(route);
  };

  const toggleMenu = () => {
    const toValue = menuOpen ? 0 : 1;
    
    Animated.timing(menuAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    setMenuOpen(!menuOpen);
  };

  // Blob animation elements for web only
  const renderBlobs = () => {
    if (Platform.OS !== 'web') return null;
    
    return (
      <>
        <View 
          style={[
            styles.blob, 
            { backgroundColor: '#4040C0', left: '20%', top: '-50%' }
          ]} 
        />
        <View 
          style={[
            styles.blob, 
            styles.blobDelayed2s, 
            { backgroundColor: '#C040C0', right: '15%', top: '-30%' }
          ]} 
        />
        <View 
          style={[
            styles.blob, 
            styles.blobDelayed4s, 
            { backgroundColor: '#C04080', left: '30%', bottom: '-50%' }
          ]} 
        />
      </>
    );
  };

  // Mobile menu height based on animation value
  const mobileMenuHeight = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], // Adjust based on content
  });

  // Navigation links for both desktop and mobile
  const renderNavLinks = (forMobile = false) => (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onPress={() => handleNavigation('Features')}
        style={forMobile ? styles.mobileNavButton : undefined}
      >
        {translations.products}
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onPress={() => handleNavigation('Features')}
        style={forMobile ? styles.mobileNavButton : undefined}
      >
        {translations.features}
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onPress={() => handleNavigation('Features')}
        style={forMobile ? styles.mobileNavButton : undefined}
      >
        {translations.resources}
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onPress={() => handleNavigation('Subscription')}
        style={forMobile ? styles.mobileNavButton : undefined}
      >
        {translations.pricing}
      </Button>
    </>
  );

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        {renderBlobs()}
        
        <View style={styles.headerInner}>
          <View style={styles.leftSection}>
            <TouchableOpacity onPress={() => handleNavigation('Landing')}>
              <Text style={styles.logo}>AstroConnect</Text>
            </TouchableOpacity>
            
            {/* Navigation links - hidden on mobile */}
            <View 
              style={styles.navLinks}
              {...applyWebProps('header-nav-desktop')}
            >
              {renderNavLinks()}
            </View>
          </View>
          
          <View style={styles.rightSection}>
            <LanguageSwitcher />
            
            {/* Desktop auth buttons or account menu */}
            <View 
              style={styles.desktopButtons}
              {...applyWebProps('header-nav-desktop')}
            >
              {!isAuthenticated ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onPress={() => handleNavigation('Login')}
                  >
                    {translations.login}
                  </Button>
                  <Button 
                    variant="white" 
                    size="sm" 
                    onPress={() => handleNavigation('Signup')}
                  >
                    {translations.getStarted}
                  </Button>
                </>
              ) : (
                <>
                  <TouchableOpacity 
                    onPress={() => handleNavigation('Cart')} 
                    style={styles.cartButton}
                  >
                    <Icon name="shopping-cart" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <AccountMenu />
                </>
              )}
            </View>
            
            {/* Hamburger menu button - visible only on mobile */}
            <TouchableOpacity 
              style={[
                styles.hamburgerButton,
                Platform.OS === 'web' && { display: isMobileView ? 'flex' : 'none' }
              ]}
              {...applyWebProps('header-hamburger')}
              onPress={toggleMenu}
              accessibilityRole="button"
              accessibilityLabel="Menu"
            >
              <Icon 
                name={menuOpen ? "x" : "menu"} 
                size={24} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Mobile menu - slides down when open */}
      <Animated.View style={[styles.mobileMenu, { height: mobileMenuHeight }]}>
        <View style={styles.mobileMenuContent}>
          {renderNavLinks(true)}
          
          {/* Mobile auth buttons */}
          {!isAuthenticated ? (
            <View style={styles.mobileAuthButtons}>
              <Button 
                variant="ghost" 
                size="sm" 
                onPress={() => handleNavigation('Login')}
                style={styles.mobileNavButton}
              >
                {translations.login}
              </Button>
              <Button 
                variant="white" 
                size="sm" 
                onPress={() => handleNavigation('Signup')}
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
                onPress={() => handleNavigation('Cart')}
                style={styles.mobileNavButton}
              >
                {translations.cart}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onPress={() => handleNavigation('Profile')}
                style={styles.mobileNavButton}
              >
                {translations.profile}
              </Button>
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default Header; 