import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Layout from '../layout/Layout';
import { birthChartStyles as styles } from './styles/BirthChartStyles';

const BirthChart = () => {
  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Birth Chart Analysis</Text>
          <Text style={styles.subtitle}>
            Discover the unique planetary positions at the time of your birth
          </Text>
          
          {/* Add birth chart content here */}
          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>Your Natal Chart</Text>
            <Text style={styles.description}>
              A birth chart, also known as a natal chart, is a map of the sky at the exact moment you were born. 
              It reveals the precise positions of the sun, moon, planets, and other astrological aspects at the time of your birth.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default BirthChart; 