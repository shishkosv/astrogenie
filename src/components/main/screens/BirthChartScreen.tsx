import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import BirthChartForm from '../horoscope/BirthChart';
import type { WesternChartResponse } from '../../../types/responses/WesternChartResponse';
import { ErrorBoundary } from '../../shared/ErrorBoundary';
import { View, Text, TouchableOpacity } from 'react-native';
import { birthChartStyles as styles } from '../styles/BirthChartStyles';

const BirthChartScreen = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: WesternChartResponse) => {
    console.log('Birth chart calculated:', data);
    // Handle the response data
  };

  const handleError = (error: Error) => {
    console.error('Birth chart calculation failed:', error);
    // Handle the error
  };

  return (
    <Layout>
      <ErrorBoundary
        fallback={({ error, resetError }) => (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Something went wrong: {error.message}
            </Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={resetError}
            >
              <Text style={styles.resetButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <BirthChartForm
          initialData={{
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
          }}
          onSubmit={handleSubmit}
          onError={handleError}
          onLoadingChange={setLoading}
          isLoading={loading}
          defaultHouseSystem="placidus"
        />
      </ErrorBoundary>
    </Layout>
  );
};

export default BirthChartScreen; 