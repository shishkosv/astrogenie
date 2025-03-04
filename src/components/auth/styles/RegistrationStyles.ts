import { StyleSheet, Platform, Dimensions } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';

const isWeb = Platform.OS === 'web';
const windowWidth = Dimensions.get('window').width;

export const registrationStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  formWrapper: {
    maxWidth: 1000,
    width: '100%',
    marginHorizontal: 'auto',
    padding: 24,
    backgroundColor: 'transparent',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 40,
    marginBottom: 40,
    position: 'relative',
  },
  columnsWrapper: {
    flexDirection: isWeb && windowWidth > 768 ? 'row' : 'column',
    gap: 24,
    marginBottom: 24,
  },
  column: {
    flex: 1,
    width: isWeb && windowWidth > 768 ? '50%' : '100%',
    position: 'relative',
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text.light,
    marginBottom: 24,
  },
  error: {
    color: COLORS.status.error,
    marginBottom: 16,
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  inputField: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.light,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLORS.text.light,
    backgroundColor: 'transparent',
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.text.light,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    marginTop: 4,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.text.light,
  },
  datePickerButton: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  datePickerText: {
    fontSize: 16,
    color: COLORS.text.light,
  },
  errorText: {
    color: COLORS.status.error,
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  inputError: {
    borderColor: COLORS.status.error,
    borderWidth: 1,
  },
  required: {
    color: COLORS.status.error,
    marginLeft: 4,
  },
  socialWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.light,
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
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'transparent',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    flex: 1,
    color: COLORS.text.light,
    fontSize: 14,
    fontWeight: '500',
  },
  dateInput: {
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  spacer: {
    height: 12,
  },
}); 