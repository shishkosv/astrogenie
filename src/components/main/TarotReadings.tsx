import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../layout/Layout';

const TarotReadings = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Tarot Readings</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a0e4e',
  },
});

export default TarotReadings; 