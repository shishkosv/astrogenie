import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 40,
  },
  downloadButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  features: {
    padding: 40,
    backgroundColor: '#ffffff',
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
    gap: 30,
  },
  featureItem: {
    width: '30%',
    minWidth: 300,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4a0e4e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 