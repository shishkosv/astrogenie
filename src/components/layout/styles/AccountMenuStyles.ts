import { StyleSheet } from 'react-native';

export const accountMenuStyles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  menuButton: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    padding: 12,
    borderRadius: 4,
  },
  menuText: {
    color: '#333',
    fontSize: 14,
  },
  logoutText: {
    color: '#dc3545',
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
    marginVertical: 8,
  },
}); 