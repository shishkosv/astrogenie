export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  displayName?: string;
  dateOfBirth?: Date;
  country: string;
  city: string;
  gender?: string;
  zodiacSign?: string;
  isPremium?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
}
