import React, { createContext, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import theme, { injectKeyframes } from './index';

// Create theme context
const ThemeContext = createContext(theme);

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  customTheme?: typeof theme;
}

/**
 * ThemeProvider component that provides theme values to all child components
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  customTheme 
}) => {
  const themeValue = customTheme || theme;
  
  // Inject keyframes for web platform
  useEffect(() => {
    if (Platform.OS === 'web') {
      injectKeyframes();
    }
  }, []);
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme values
 */
export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return themeContext;
};

/**
 * Hook to access only color values
 */
export const useColors = () => {
  const { colors } = useTheme();
  return colors;
};

/**
 * Hook to access only typography values
 */
export const useTypography = () => {
  const { typography } = useTheme();
  return typography;
};

/**
 * Hook to access only spacing values
 */
export const useSpacing = () => {
  const { spacing } = useTheme();
  return spacing;
};

/**
 * Hook to access only animation values
 */
export const useAnimations = () => {
  const { animations } = useTheme();
  return animations;
};

export default ThemeProvider; 