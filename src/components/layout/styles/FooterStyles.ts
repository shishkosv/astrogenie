import { StyleSheet } from 'react-native';

export const footerStyles = StyleSheet.create({
  footer: {
    backgroundColor: '#1A1A1A', // Dark background
    padding: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 32,
  },
  gridColumn: {
    flex: 1,
    minWidth: 150,
    marginBottom: 20,
  },
  columnTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  linkList: {
    gap: 8,
  },
  link: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
    fontSize: 16,
  },
  footerBottom: {
    marginTop: 48,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 16,
    fontSize: 14,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  socialLink: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  // Keep these for backward compatibility
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
}); 