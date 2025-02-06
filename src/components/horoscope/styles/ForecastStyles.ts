import { StyleSheet } from 'react-native';

export const forecastStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  cardContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tabsWrapper: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    gap: 8,
    minWidth: 100,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeTab: {
    backgroundColor: '#F3E8FF',
    borderColor: '#CFA2FB',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabLabel: {
    color: '#CFA2FB',
  },
}); 