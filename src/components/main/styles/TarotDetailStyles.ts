import { StyleSheet } from 'react-native';

export const tarotDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 40,
    backgroundColor: '#4a0e4e',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    padding: 24,
    maxWidth: 800,
    marginHorizontal: 'auto',
    width: '100%',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
  },
  benefitsList: {
    gap: 12,
  },
  benefit: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
  },
  priceSection: {
    marginTop: 40,
    alignItems: 'center',
    gap: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 36,
    fontWeight: '700',
    color: '#4a0e4e',
  },
  yearlyPrice: {
    fontSize: 18,
    color: '#666',
  },
}); 