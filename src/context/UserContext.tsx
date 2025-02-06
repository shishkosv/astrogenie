import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFirebase } from './FirebaseContext';
import { firebaseService } from '../services/firebase';

interface UserData {
  name: string;
  email: string;
  country?: string;
  city?: string;
  dateOfBirth?: string;
  birthHour?: number;
  createdAt?: string;
}

interface UserContextType {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useFirebase();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          setLoading(true);
          const data = await firebaseService.getUserData(user.uid);
          if (data) {
            setUserData(data as UserData);
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to fetch user data');
        } finally {
          setLoading(false);
        }
      } else {
        setUserData(null);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) return;

    try {
      setLoading(true);
      await firebaseService.updateUserData(user.uid, data);
      setUserData(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('Failed to update user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        error,
        updateUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 