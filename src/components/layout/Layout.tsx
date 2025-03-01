import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import ChatBot from '../chat/ChatBot';
import { COLORS, createGradient } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';

type LayoutProps = {
  children: React.ReactNode;
  className?: string; // Keep for compatibility with web version
};

const Layout = ({ children, className = "" }: LayoutProps) => {
  // Create a style object for web-specific properties
  const webStyles = Platform.OS === 'web' ? {
    // @ts-ignore - These are web-specific styles
    background: createGradient('90deg'), // Changed to horizontal gradient (left to right)
    minHeight: '100vh',
    position: 'relative',
  } : {};

  return (
    <View style={[styles.container, webStyles as any]}>
      <Header />
      <View style={styles.contentWrapper}>
        {children}
      </View>
      <Footer />
      <ChatBot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gradient.via, // Fallback for non-web platforms
  },
  contentWrapper: {
    flex: 1,
    maxWidth: SPACING.container.xl,
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: SPACING.md,
    zIndex: SPACING.zIndex.content,
  },
});

export default Layout; 