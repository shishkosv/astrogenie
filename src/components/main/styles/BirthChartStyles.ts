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
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 16,
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
  resetButton: {
    backgroundColor: '#CFA2FB',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 