import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Layout from '../layout/Layout';

interface ScreenBaseProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: any;
}

const ScreenBase: React.FC<ScreenBaseProps> = ({ 
  children, 
  scrollable = true,
  style 
}) => {
  const Container = scrollable ? ScrollView : View;

  return (
    <Layout>
      <Container style={[styles.container, style]}>
        {children}
      </Container>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  }
});

export default ScreenBase; 