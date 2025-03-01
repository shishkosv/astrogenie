// Export all theme elements from a single location
import { COLORS, createGradient, rgba } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';
import { 
  DURATIONS, 
  EASINGS, 
  WEB_KEYFRAMES, 
  injectKeyframes, 
  ANIMATION_PRESETS, 
  WEB_ANIMATIONS 
} from './animations';

// Main theme object
export const theme = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  animations: {
    durations: DURATIONS,
    easings: EASINGS,
    presets: ANIMATION_PRESETS,
    webAnimations: WEB_ANIMATIONS,
  },
};

// Helper functions
export {
  createGradient,
  rgba,
  injectKeyframes,
  WEB_KEYFRAMES,
};

// Individual exports for direct imports
export { COLORS } from './colors';
export { TYPOGRAPHY } from './typography';
export { SPACING } from './spacing';
export { 
  DURATIONS, 
  EASINGS, 
  ANIMATION_PRESETS, 
  WEB_ANIMATIONS 
} from './animations';

// Default export
export default theme; 