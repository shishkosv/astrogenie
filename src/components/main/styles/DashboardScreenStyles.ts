import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  horoscopeSection: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    marginTop: 5,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureButton: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});
