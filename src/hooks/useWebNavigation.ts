import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

export const useWebNavigation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handlePopState = (event: PopStateEvent) => {
        if (event.state?.routes?.length > 0) {
          const lastRoute = event.state.routes[event.state.routes.length - 1];
          navigation.navigate(lastRoute.name, lastRoute.params);
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [navigation]);

  return navigation;
}; 