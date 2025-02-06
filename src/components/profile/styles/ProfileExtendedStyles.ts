import { StyleSheet } from 'react-native';

export const profileExtendedStyles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    flexShrink: 0,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#18181b',
  },
  role: {
    fontSize: 14,
    color: '#71717a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 24,
  },
  menuContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    minHeight: 44,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 8,
  },
  menuItemLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#18181b',
  },
  menuItemValue: {
    fontSize: 14,
    color: '#71717a',
    marginRight: 8,
  },
  logoutItem: {
    marginTop: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    minHeight: 44,
  },
  logoutText: {
    color: '#dc3545',
  },
}); 