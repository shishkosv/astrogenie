import { Platform } from 'react-native';

export const globalStyles = Platform.OS === 'web' ? `
  @font-face {
    font-family: 'Feather';
    src: url(${require('react-native-vector-icons/Fonts/Feather.ttf')});
  }
` : ''; 