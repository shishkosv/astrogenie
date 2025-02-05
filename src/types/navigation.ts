import type { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Dashboard: undefined;
  CompatibilityScore: undefined;
  FriendshipScore: undefined;
  TarotCards: undefined;
  PersonalizedForecast: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
