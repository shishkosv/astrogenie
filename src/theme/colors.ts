// Theme colors for the entire application
export const COLORS = {
  // Primary gradient colors
  gradient: {
    from: '#4040C0', // hsl(240, 70%, 50%)
    via: '#C040C0', // hsl(280, 70%, 50%)
    to: '#C04080',  // hsl(320, 70%, 50%)
  },
  
  // Background colors
  background: {
    primary: '#f8f9fa',
    dark: '#1A1A1A',
    card: '#FFFFFF',
    feature: 'rgba(111, 76, 255, 0.1)',
    featureAlt: 'rgba(76, 111, 255, 0.1)',
  },
  
  // Text colors
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.6)',
    mutedDark: 'rgba(0, 0, 0, 0.6)',
  },
  
  // Accent colors
  accent: {
    yellow: '#F59E0B',
    purple: '#6F4CFF',
    blue: '#4C6FFF',
  },
  
  // Border colors
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    dark: '#ddd',
  },
  
  // Overlay colors
  overlay: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(0, 0, 0, 0.1)',
  },
  
  // Status colors
  status: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  }
};

// Helper function to create linear gradient string for web
export const createGradient = (direction = '135deg') => 
  `linear-gradient(${direction}, ${COLORS.gradient.from}, ${COLORS.gradient.via}, ${COLORS.gradient.to})`;

// Helper function to create rgba color with opacity
export const rgba = (hex: string, alpha: number) => {
  // Convert hex to rgb
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}; 