import type React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { loadingSpinnerStyles as styles } from './styles/LoadingSpinnerStyles';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'large', color = '#007AFF' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingSpinner;
