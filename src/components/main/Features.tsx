import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../layout/Layout';

const Features = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Our Features</Text>
        <View style={styles.featuresList}>
          <Text style={styles.subtitle}>Daily Horoscopes</Text>
          <Text style={styles.description}>
            Get personalized daily horoscopes based on your zodiac sign.
          </Text>
          
          <Text style={styles.subtitle}>Compatibility Check</Text>
          <Text style={styles.description}>
            Check your compatibility with friends and potential partners.
          </Text>
          
          <Text style={styles.subtitle}>Tarot Readings</Text>
          <Text style={styles.description}>
            Receive insightful tarot card readings at your fingertips.
          </Text>
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
  featuresList: {
    gap: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default Features; 