import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../layout/Layout';

const DailyHoroscopes = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Daily Horoscopes</Text>
        <Text style={styles.subtitle}>Get your daily astrological insights</Text>
        {/* Add horoscope content here */}
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
});

export default DailyHoroscopes; 