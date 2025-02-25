import { StyleSheet, Dimensions, Platform } from 'react-native';

// Get screen width for responsive design
const windowWidth = Dimensions.get('window').width;

export const checkoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a0e4e',
    marginBottom: 30,
  },
  columnsContainer: {
    flexDirection: windowWidth > 768 ? 'row' : 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    width: windowWidth > 768 ? '48%' : '100%',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  halfInput: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#4a0e4e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  orderSummary: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4a0e4e',
  },
  errorText: {
    color: '#e53935',
    fontSize: 14,
    marginTop: 5,
  },
}); 