import { StyleSheet } from 'react-native';

export const languageSwitcherStyles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  flagEmoji: {
    fontSize: 20,
  },
  selectedText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 4,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 4,
    minWidth: 150,
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
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: 4,
  },
  activeOption: {
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    color: '#333',
    fontSize: 14,
  },
  activeText: {
    fontWeight: '600',
  },
}); 