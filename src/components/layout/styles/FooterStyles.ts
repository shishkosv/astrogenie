import { StyleSheet } from 'react-native';

export const footerStyles = StyleSheet.create({
  footer: {
    backgroundColor: '#CFA2FB',
    padding: 40,
  },
  content: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 40,
  },
  column: {
    flex: 1,
    minWidth: 250,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  copyright: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.8,
  },
}); 