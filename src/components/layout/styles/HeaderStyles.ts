import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#CFA2FB',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    position: 'relative',
    zIndex: 1000,
  },
  logo: {
    width: 40,
    height: 40,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navItem: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 