import { Platform } from 'react-native';
import { Animated, Easing } from 'react-native';

// Animation durations
export const DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
};

// Animation easings
export const EASINGS = {
  default: Easing.bezier(0.4, 0.0, 0.2, 1), // Material Design standard curve
  accelerate: Easing.bezier(0.4, 0.0, 1, 1),
  decelerate: Easing.bezier(0.0, 0.0, 0.2, 1),
  sharp: Easing.bezier(0.4, 0.0, 0.6, 1),
  bounce: Easing.bounce,
  elastic: Easing.elastic(1),
};

// Web-specific keyframes
export const WEB_KEYFRAMES = Platform.OS === 'web' ? {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `,
  slideInUp: `
    @keyframes slideInUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  slideInDown: `
    @keyframes slideInDown {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
} : null;

// Helper function to inject keyframes into document head (web only)
export const injectKeyframes = () => {
  if (Platform.OS === 'web' && WEB_KEYFRAMES) {
    // Check if keyframes are already injected
    if (!document.getElementById('astrogenie-keyframes')) {
      const style = document.createElement('style');
      style.id = 'astrogenie-keyframes';
      style.type = 'text/css';
      
      // Combine all keyframes
      const keyframesContent = Object.values(WEB_KEYFRAMES).join('\n');
      
      style.appendChild(document.createTextNode(keyframesContent));
      document.head.appendChild(style);
    }
  }
};

// Animation presets for React Native Animated
export const ANIMATION_PRESETS = {
  fadeIn: (duration = DURATIONS.normal) => ({
    opacity: new Animated.Value(0),
    config: {
      toValue: 1,
      duration,
      easing: EASINGS.default,
      useNativeDriver: true,
    },
  }),
  fadeOut: (duration = DURATIONS.normal) => ({
    opacity: new Animated.Value(1),
    config: {
      toValue: 0,
      duration,
      easing: EASINGS.default,
      useNativeDriver: true,
    },
  }),
  slideInUp: (duration = DURATIONS.normal) => ({
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(20),
    config: {
      toValue: 1,
      duration,
      easing: EASINGS.default,
      useNativeDriver: true,
    },
  }),
  slideInDown: (duration = DURATIONS.normal) => ({
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(-20),
    config: {
      toValue: 1,
      duration,
      easing: EASINGS.default,
      useNativeDriver: true,
    },
  }),
};

// Web animation styles (for use with className or style props)
export const WEB_ANIMATIONS = Platform.OS === 'web' ? {
  fadeIn: {
    animation: `fadeIn ${DURATIONS.normal}ms ${EASINGS.default} forwards`,
  },
  fadeOut: {
    animation: `fadeOut ${DURATIONS.normal}ms ${EASINGS.default} forwards`,
  },
  slideInUp: {
    animation: `slideInUp ${DURATIONS.normal}ms ${EASINGS.default} forwards`,
  },
  slideInDown: {
    animation: `slideInDown ${DURATIONS.normal}ms ${EASINGS.default} forwards`,
  },
} : {}; 