import { StyleSheet } from 'react-native';

export const accountMenuStyles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 9999,
  },
  avatarContainer: {
    padding: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    width: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 9999,
  },
}); 