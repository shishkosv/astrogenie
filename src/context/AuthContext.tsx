import React, { createContext, useState, useContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  notifications: boolean;
  favorites: any[];
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  toggleNotifications: () => void;
  deleteAccount: () => Promise<void>;
  removeFavorite: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);

  const login = async (email: string, password: string) => {
    // Implement actual login logic here
    setIsAuthenticated(true);
  };

  const signup = async (email: string, password: string, name: string) => {
    // Implement actual signup logic here
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const resetPassword = async (email: string) => {
    // Implement actual password reset logic here
  };

  const updateProfile = async (data: Partial<User>) => {
    // Implement actual profile update logic here
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  const toggleNotifications = () => {
    setNotifications(prev => !prev);
  };

  const deleteAccount = async () => {
    // Implement actual account deletion logic here
    setIsAuthenticated(false);
    setUser(null);
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        notifications,
        favorites,
        login,
        signup,
        logout,
        resetPassword,
        updateProfile,
        toggleNotifications,
        deleteAccount,
        removeFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
