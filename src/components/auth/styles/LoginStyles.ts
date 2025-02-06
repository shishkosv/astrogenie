import { StyleSheet, Platform, Dimensions } from 'react-native';

const isWeb = Platform.OS === 'web';
const windowWidth = Dimensions.get('window').width;

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  columns: {
    flexDirection: isWeb && windowWidth > 768 ? 'row' : 'column',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
    gap: 40,
    alignItems: 'flex-start',
    paddingTop: 40,
  },
  column: {
    flex: 1,
    width: isWeb && windowWidth > 768 ? '50%' : '100%',
  },
  formWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formContent: {
    gap: 24,
  },
  inputField: {
    marginBottom: 24,
  },
  fieldRow: {
    flexDirection: isWeb && windowWidth > 768 ? 'row' : 'column',
    alignItems: isWeb && windowWidth > 768 ? 'center' : 'flex-start',
    gap: isWeb && windowWidth > 768 ? 16 : 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    width: isWeb && windowWidth > 768 ? 120 : 'auto',
    marginBottom: isWeb && windowWidth > 768 ? 0 : 8,
  },
  inputContainer: {
    flex: 1,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 12,
  },
  eyeButton: {
    padding: 8,
    position: 'absolute',
    right: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
  },
  socialWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  socialButtons: {
    gap: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    flex: 1,
    color: '#111827',
    fontSize: 14,
    fontWeight: '500',
  },
}); 