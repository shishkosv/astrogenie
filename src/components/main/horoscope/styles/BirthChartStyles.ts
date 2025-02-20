import { StyleSheet } from 'react-native';

export const birthChartStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  planetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  planetName: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    width: 100,
  },
  planetInfo: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  houseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  houseNumber: {
    width: 100,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  houseInfo: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    padding: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 24,
    position: 'relative',
    zIndex: 1,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    color: '#333',
  },
  dateInputs: {
    flexDirection: 'row',
    gap: 8,
  },
  dateInput: {
    flex: 1,
  },
  yearInput: {
    flex: 2,
  },
  timeInputs: {
    flexDirection: 'row',
    gap: 8,
  },
  timeInput: {
    flex: 1,
  },
  locationInputs: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 8,
    position: 'relative',
    zIndex: 2,
  },
  cityInput: {
    flex: 1,
  },
  countryPicker: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    zIndex: 1,
  },
  picker: {
    height: 50,
  },
  locationDetails: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    zIndex: 1,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: '#CFA2FB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#666',
  },
  dateButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
}); 