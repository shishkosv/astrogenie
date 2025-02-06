import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>&copy; 2023 AstroConnect. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});

export default Footer; 