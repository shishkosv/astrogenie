import React, { createContext, useState, useContext } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: typeof translations[Language];
}

const translations = {
  en: {
    welcome: 'Welcome to AstroConnect',
    subtitle: 'Your personal astrological companion',
    downloadAndroid: 'Download for Android',
    downloadIOS: 'Download for iOS',
    features: 'Features',
    dailyHoroscopes: 'Daily Horoscopes',
    horoscopesDesc: 'Get personalized daily horoscopes based on your zodiac sign.',
    compatibility: 'Compatibility Check',
    compatibilityDesc: 'Check your compatibility with friends and potential partners.',
    tarotReadings: 'Tarot Readings',
    tarotDesc: 'Receive insightful tarot card readings at your fingertips.',
    tryItNow: 'Try it Now',
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    registration: 'Registration',
    createAccount: 'Create your account to access all features',
    login: 'Login',
    signUp: 'Sign Up',
    password: 'Password',
    name: 'Name',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    resetPasswordDesc: 'Enter your email to receive reset instructions',
    resetPasswordSent: 'Password reset email sent',
    resetPasswordError: 'Failed to send reset email',
    noAccount: "Don't have an account? Sign up",
    haveAccount: 'Already have an account? Login',
    backToLogin: 'Back to Login',
    account: 'Account',
    profile: 'Profile',
    settings: 'Settings',
    favorites: 'Favorites',
    logout: 'Log Out',
    save: 'Save',
    edit: 'Edit',
    language: 'Language',
    notifications: 'Notifications',
    enableNotifications: 'Enable Notifications',
    dangerZone: 'Danger Zone',
    deleteAccount: 'Delete Account',
    deleteAccountConfirm: 'Are you sure you want to delete your account? This action cannot be undone.',
    noFavorites: 'No favorites yet',
    subscriptionPlans: 'Subscription Plans',
    choosePlan: 'Choose the plan that fits your needs',
    subscribe: 'Subscribe Now',
    premiumFeature: 'Premium Feature',
    upgradeForFullAccess: 'Upgrade to Premium to access detailed compatibility analysis and personalized insights.',
    upgradeToPremium: 'Upgrade to Premium',
  },
  es: {
    welcome: 'Bienvenido a AstroConnect',
    subtitle: 'Tu compañero astrológico personal',
    downloadAndroid: 'Descargar para Android',
    downloadIOS: 'Descargar para iOS',
    features: 'Características',
    dailyHoroscopes: 'Horóscopos Diarios',
    horoscopesDesc: 'Obtén horóscopos diarios personalizados según tu signo zodiacal.',
    compatibility: 'Verificación de Compatibilidad',
    compatibilityDesc: 'Comprueba tu compatibilidad con amigos y parejas potenciales.',
    tarotReadings: 'Lecturas de Tarot',
    tarotDesc: 'Recibe lecturas de tarot perspicaces al alcance de tu mano.',
    tryItNow: 'Pruébalo Ahora',
    home: 'Inicio',
    about: 'Acerca de',
    contact: 'Contacto',
    registration: 'Registro',
    createAccount: 'Crea tu cuenta para acceder a todas las funciones',
    login: 'Iniciar Sesión',
    signUp: 'Registrarse',
    password: 'Contraseña',
    name: 'Nombre',
    forgotPassword: '¿Olvidaste tu contraseña?',
    resetPassword: 'Restablecer Contraseña',
    resetPasswordDesc: 'Ingresa tu email para recibir instrucciones',
    resetPasswordSent: 'Email de restablecimiento enviado',
    resetPasswordError: 'Error al enviar el email',
    noAccount: '¿No tienes cuenta? Regístrate',
    haveAccount: '¿Ya tienes cuenta? Inicia sesión',
    backToLogin: 'Volver al inicio de sesión',
    account: 'Cuenta',
    profile: 'Perfil',
    settings: 'Configuración',
    favorites: 'Favoritos',
    logout: 'Cerrar Sesión',
    save: 'Guardar',
    edit: 'Editar',
    language: 'Idioma',
    notifications: 'Notificaciones',
    enableNotifications: 'Activar Notificaciones',
    dangerZone: 'Zona de Peligro',
    deleteAccount: 'Eliminar Cuenta',
    deleteAccountConfirm: '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
    noFavorites: 'Aún no hay favoritos',
    subscriptionPlans: 'Planes de Suscripción',
    choosePlan: 'Elige el plan que se adapte a tus necesidades',
    subscribe: 'Suscribirse Ahora',
    premiumFeature: 'Función Premium',
    upgradeForFullAccess: 'Actualiza a Premium para acceder a análisis de compatibilidad detallados y perspectivas personalizadas.',
    upgradeToPremium: 'Actualizar a Premium',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 