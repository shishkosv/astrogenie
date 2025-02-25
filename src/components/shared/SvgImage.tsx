import React from 'react';
import { Platform, Image, View, Text } from 'react-native';

interface SvgImageProps {
  source: string | number;  // Allow both string (web) and number (require in RN)
  width?: number | string;
  height?: number | string;
  style?: any;
}

const SvgImage: React.FC<SvgImageProps> = ({ source, width, height, style }) => {
  // For web environment
  if (Platform.OS === 'web') {
    // If source is a string (URL or path)
    if (typeof source === 'string') {
      return (
        <img 
          src={source} 
          style={{ 
            width: width || '100%',
            height: height || 'auto',
            ...style 
          }} 
        />
      );
    }
    
    // If source is a number (from require), we need to handle it differently
    // This is a fallback for web when using require
    return (
      <div style={{ 
        width: typeof width === 'string' ? width : width ? `${width}px` : '100%',
        height: typeof height === 'string' ? height : height ? `${height}px` : '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        ...style
      }}>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Birth Chart Visualization
        </p>
      </div>
    );
  }
  
  // For React Native environment
  try {
    // If source is a number (from require), use it directly
    if (typeof source === 'number') {
      return (
        <Image
          source={source}
          style={[
            { 
              width: typeof width === 'string' ? '100%' : width || '100%',
              height: typeof height === 'string' ? 300 : height || 300,
            },
            style
          ]}
          resizeMode="contain"
        />
      );
    }
    
    // If source is a string (URL), use it as uri
    return (
      <Image
        source={{ uri: source }}
        style={[
          { 
            width: typeof width === 'string' ? '100%' : width || '100%',
            height: typeof height === 'string' ? 300 : height || 300,
          },
          style
        ]}
        resizeMode="contain"
      />
    );
  } catch (error) {
    // Fallback if image loading fails
    return (
      <View style={[
        { 
          width: '100%',
          height: 300,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          borderRadius: 8
        },
        style
      ]}>
        <Text style={{ textAlign: 'center', color: '#666' }}>
          Birth Chart Visualization{'\n'}
          (Image could not be loaded)
        </Text>
      </View>
    );
  }
};

export default SvgImage; 