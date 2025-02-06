import { StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: 'hsl(var(--background))',
  },
  
  // Content wrapper
  contentWrapper: {
    flex: 1,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: 16,
  },

  // Card styles
  card: {
    backgroundColor: 'hsl(var(--card))',
    borderRadius: 'var(--radius)',
    borderWidth: 1,
    borderColor: 'hsl(var(--border))',
    padding: 16,
  },

  // Text styles
  heading1: {
    fontSize: 24,
    fontWeight: '700',
    color: 'hsl(var(--foreground))',
  },
  heading2: {
    fontSize: 20,
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
  },
  bodyText: {
    fontSize: 16,
    color: 'hsl(var(--foreground))',
  },
  mutedText: {
    fontSize: 14,
    color: 'hsl(var(--muted-foreground))',
  },

  // Button styles
  button: {
    backgroundColor: 'hsl(var(--primary))',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 'var(--radius)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'hsl(var(--primary-foreground))',
    fontSize: 16,
    fontWeight: '500',
  },
}); 