import React from 'react';
import { View } from 'react-native';
import { layoutStyles as styles } from '../../styles/layoutStyles';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentWrapper}>
        {children}
      </View>
      <Footer />
    </View>
  );
};

export default Layout; 