import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  hero: {
    padding: 40,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4a0e4e',
    marginBottom: 20,
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#666',
    marginBottom: 40,
  },
  downloadButtons: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 20,
  },
  downloadItem: {
    alignItems: 'center',
  },
  storeButton: {
    width: 180,
    height: 60,
    marginBottom: 10,
  },
  downloadText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  features: {
    padding: 40,
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4a0e4e',
    marginBottom: 40,
    textAlign: 'center',
  },
  featureList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 24,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  featureItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '30%',
    minWidth: 280,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4a0e4e',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 15,
    color: '#444',
    textAlign: 'left',
    marginBottom: 16,
    lineHeight: 22,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
}); 