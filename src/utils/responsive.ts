import { Dimensions, Platform, ScaledSize } from 'react-native';
import { useEffect, useState } from 'react';
import { SPACING } from '../theme/spacing';

// Get the window dimensions
const window = Dimensions.get('window');

// Define screen size breakpoints
export const SCREEN_SIZES = {
  xs: SPACING.breakpoints.xs,
  sm: SPACING.breakpoints.sm,
  md: SPACING.breakpoints.md,
  lg: SPACING.breakpoints.lg,
  xl: SPACING.breakpoints.xl,
};

// Screen size types
export type ScreenSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Get the current screen size based on width
 */
export const getScreenSize = (width: number): ScreenSizeType => {
  if (width < SCREEN_SIZES.xs) return 'xs';
  if (width < SCREEN_SIZES.sm) return 'sm';
  if (width < SCREEN_SIZES.md) return 'md';
  if (width < SCREEN_SIZES.lg) return 'lg';
  return 'xl';
};

/**
 * Check if the current screen size is mobile
 */
export const isMobileSize = (width: number): boolean => {
  return width < SCREEN_SIZES.md;
};

/**
 * Check if the current screen size is tablet
 */
export const isTabletSize = (width: number): boolean => {
  return width >= SCREEN_SIZES.md && width < SCREEN_SIZES.lg;
};

/**
 * Check if the current screen size is desktop
 */
export const isDesktopSize = (width: number): boolean => {
  return width >= SCREEN_SIZES.lg;
};

/**
 * Hook to get and observe window dimensions
 */
export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState<ScaledSize>(window);

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      // For React Native 0.65+
      subscription.remove();
    };
  }, []);

  return dimensions;
};

/**
 * Hook to get the current screen size
 */
export const useScreenSize = (): ScreenSizeType => {
  const { width } = useWindowDimensions();
  return getScreenSize(width);
};

/**
 * Hook to check if the current screen is mobile size
 */
export const useIsMobile = (): boolean => {
  const { width } = useWindowDimensions();
  return isMobileSize(width);
};

/**
 * Hook to check if the current screen is tablet size
 */
export const useIsTablet = (): boolean => {
  const { width } = useWindowDimensions();
  return isTabletSize(width);
};

/**
 * Hook to check if the current screen is desktop size
 */
export const useIsDesktop = (): boolean => {
  const { width } = useWindowDimensions();
  return isDesktopSize(width);
};

/**
 * Helper to apply styles conditionally based on screen size
 */
export const responsiveStyle = <T extends object>(
  styles: {
    base?: T;
    xs?: Partial<T>;
    sm?: Partial<T>;
    md?: Partial<T>;
    lg?: Partial<T>;
    xl?: Partial<T>;
  }
): T => {
  const screenSize = getScreenSize(window.width);
  
  // Start with base styles
  let result = { ...(styles.base || {}) } as T;
  
  // Apply styles for current screen size and below
  if (screenSize === 'xs' && styles.xs) {
    result = { ...result, ...styles.xs };
  } else if (screenSize === 'sm' && styles.sm) {
    result = { ...result, ...styles.sm };
  } else if (screenSize === 'md' && styles.md) {
    result = { ...result, ...styles.md };
  } else if (screenSize === 'lg' && styles.lg) {
    result = { ...result, ...styles.lg };
  } else if (screenSize === 'xl' && styles.xl) {
    result = { ...result, ...styles.xl };
  }
  
  return result;
};

/**
 * Helper to apply web-specific styles
 */
export const applyWebProps = (props: any) => {
  if (Platform.OS !== 'web') return {};
  return props;
}; 