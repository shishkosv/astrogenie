import React, { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
}

export const SafeAreaWrapper: React.FC<Props> = ({ children }): JSX.Element => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};
