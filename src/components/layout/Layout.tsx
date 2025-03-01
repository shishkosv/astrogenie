import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import ChatBot from '../chat/ChatBot';

// Define gradient colors to match the CSS variables
const GRADIENT_COLORS = {
  from: '#4040C0', // hsl(240, 70%, 50%)
  via: '#C040C0', // hsl(280, 70%, 50%)
  to: '#C04080',  // hsl(320, 70%, 50%)
};

// Define keyframes animation for web
const blobKeyframes = Platform.OS === 'web' ? `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
` : '';

// Inject keyframes into the document if on web
if (Platform.OS === 'web') {
  // Check if the style element already exists to avoid duplicates
  if (typeof document !== 'undefined' && !document.getElementById('blob-keyframes')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'blob-keyframes';
    styleElement.textContent = blobKeyframes;
    document.head.appendChild(styleElement);
  }
}

type LayoutProps = {
  children: React.ReactNode;
  className?: string; // Keep for compatibility with web version
};

const Layout = ({ children, className = "" }: LayoutProps) => {
  // Create a style object for web-specific properties
  const webStyles = Platform.OS === 'web' ? {
    // @ts-ignore - These are web-specific styles
    background: `linear-gradient(135deg, ${GRADIENT_COLORS.from}, ${GRADIENT_COLORS.via}, ${GRADIENT_COLORS.to})`,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
  } : {};

  // Blob animation elements for web only
  const renderBlobs = () => {
    if (Platform.OS !== 'web') return null;
    
    return (
      <>
        <View 
          style={[
            styles.blob as any, 
            { backgroundColor: GRADIENT_COLORS.from, left: '10%', top: '5%' } as any
          ]} 
        />
        <View 
          style={[
            styles.blob as any, 
            styles.blobDelayed2s as any, 
            { backgroundColor: GRADIENT_COLORS.via, right: '15%', top: '30%' } as any
          ]} 
        />
        <View 
          style={[
            styles.blob as any, 
            styles.blobDelayed4s as any, 
            { backgroundColor: GRADIENT_COLORS.to, left: '20%', bottom: '10%' } as any
          ]} 
        />
      </>
    );
  };

  return (
    <View style={[styles.container, webStyles as any]}>
      {renderBlobs()}
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
    backgroundColor: GRADIENT_COLORS.via, // Fallback for non-web platforms
  },
  contentWrapper: {
    flex: 1,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: 16,
    zIndex: 1, // Ensure content is above the blobs
  },
  // Define basic styles that will be extended with web-specific properties
  blob: {
    position: 'absolute',
    width: '40%',
    height: '40%',
    zIndex: 0,
    opacity: 0.5,
  },
  blobDelayed2s: {},
  blobDelayed4s: {},
});

// Add web-specific styles
if (Platform.OS === 'web') {
  Object.assign(styles.blob, {
    // @ts-ignore - These are web-specific styles
    borderRadius: '100%',
    filter: 'blur(80px)',
    animation: 'blob 15s infinite ease-in-out',
  });
  
  Object.assign(styles.blobDelayed2s, {
    // @ts-ignore - These are web-specific styles
    animationDelay: '2s',
  });
  
  Object.assign(styles.blobDelayed4s, {
    // @ts-ignore - These are web-specific styles
    animationDelay: '4s',
  });
}

export default Layout; 