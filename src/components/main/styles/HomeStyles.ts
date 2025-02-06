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
    padding: 40,
    backgroundColor: '#4a0e4e',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 32,
  },
  downloadButtons: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  downloadItem: {
    alignItems: 'center',
  },
  storeButton: {
    height: 40,
    width: 135,
  },
  downloadText: {
    color: '#FFFFFF',
    marginTop: 8,
    opacity: 0.8,
  },
  zodiacSection: {
    padding: 40,
  },
  features: {
    padding: 40,
    backgroundColor: '#f8f9fa',
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