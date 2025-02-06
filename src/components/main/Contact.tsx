import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../layout/Layout';

const Contact = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Contact Us</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.subtitle}>Get in Touch</Text>
          <Text style={styles.text}>Email: support@astroconnect.com</Text>
          <Text style={styles.text}>Phone: +1 (555) 123-4567</Text>
          <Text style={styles.text}>Address: 123 Astrology Lane, Cosmic City, CC 12345</Text>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a0e4e',
    marginBottom: 30,
  },
  contactInfo: {
    gap: 15,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default Contact; 