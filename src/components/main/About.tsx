import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../layout/Layout';

const About = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>About AstroConnect</Text>
        <Text style={styles.content}>
          AstroConnect is your personal astrological companion, designed to help you explore the mysteries
          of the cosmos and understand the energies that influence your daily life.
        </Text>
        <Text style={styles.content}>
          Our team of experienced astrologers and developers work together to provide you with accurate,
          insightful readings and a seamless user experience.
        </Text>
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
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default About; 