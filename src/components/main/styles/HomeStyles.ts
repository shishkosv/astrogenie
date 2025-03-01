import { StyleSheet, Platform } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mainContent: {
    flex: 1,
  },
  hero: {
    padding: 20,
    backgroundColor: '#4a0e4e',
    alignItems: 'center',
  },
  signSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 16,
    width: '100%',
    flexWrap: 'wrap',
  },
  // Horoscope Preview Section
  horoscopePreviewSection: {
    padding: 40,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  zodiacSection: {
    padding: 40,
  },
  features: {
    padding: 40,
    backgroundColor: '#f8f9fa',
    marginTop: 0,
  },
  featureList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    ...(Platform.OS === 'web' && {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    }),
  },
  featureItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    flex: 1,
    minWidth: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  featureDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: 'flex-start',
  },
}); 