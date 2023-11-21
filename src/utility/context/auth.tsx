'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../../firebase/clientApp';
import firebase from 'firebase/compat/app';
import { usePathname } from 'next/navigation';

interface AuthContextProps {
  user: firebase.User | null;
  loading: boolean;
  pathname: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextProps = {
    user,
    loading,
    pathname,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProviders');
  }

  return context;
};
