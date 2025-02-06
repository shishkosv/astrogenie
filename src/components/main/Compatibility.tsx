import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../layout/Layout';

const Compatibility = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Compatibility Check</Text>
        <Text style={styles.subtitle}>Discover your astrological compatibility</Text>
        {/* Add compatibility content here */}
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

export default Compatibility; 