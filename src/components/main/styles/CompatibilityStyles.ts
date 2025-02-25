import { StyleSheet, Platform, Dimensions } from 'react-native';

// Get the window width for responsive design
const windowWidth = Dimensions.get('window').width;

export const compatibilityStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a0e4e',
    marginBottom: 30,
    textAlign: 'center',
  },
  partnersContainer: {
    flexDirection: Platform.OS === 'web' || windowWidth >= 768 ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  partnerColumn: {
    flex: 1,
    width: Platform.OS === 'web' || windowWidth >= 768 ? '48%' : '100%',
    marginHorizontal: Platform.OS === 'web' || windowWidth >= 768 ? 8 : 0,
  },
  formSection: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  personHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4a0e4e',
    marginLeft: 8,
  },
  inputRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#721c24',
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: '#6B46C1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  calculateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: Platform.OS === 'web' || windowWidth >= 768 ? 'auto' : 1,
    width: Platform.OS === 'web' || windowWidth >= 768 ? 1 : '100%',
    backgroundColor: Platform.OS === 'web' || windowWidth >= 768 ? '#e0e0e0' : 'transparent',
    marginVertical: Platform.OS === 'web' || windowWidth >= 768 ? 0 : 10,
    marginHorizontal: Platform.OS === 'web' || windowWidth >= 768 ? 20 : 0,
  },
  orText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginVertical: 10,
    textAlign: 'center',
  },
  premiumBanner: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
  },
  premiumText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  premiumDescription: {
    fontSize: 16,
    color: '#856404',
    marginBottom: 15,
  },
  upgradeButton: {
    backgroundColor: '#4a0e4e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 