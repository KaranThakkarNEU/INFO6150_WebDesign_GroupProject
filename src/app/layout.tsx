'use client';

import { ReactNode, useEffect, useState } from 'react';
import './globals.css';
import ThemeRegistry from './../utility/ThemeRegistry/ThemeRegistry';
import { AuthProvider } from '../utility/context/auth';
import NavbarComponent from '@/components/navbar';
import ProtectedRouteComponent from '@/components/protectedRoute';
import { auth } from '../../firebase/clientApp';
import firebase from 'firebase/compat/app';
import { AppDataProvider } from '@/contexts/AppDataProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <ProtectedRouteComponent>
            <ThemeRegistry>
              {!loading && !user ? (
                children
              ) : (
                <NavbarComponent>
                  <AppDataProvider>{children}</AppDataProvider>
                </NavbarComponent>
              )}
            </ThemeRegistry>
          </ProtectedRouteComponent>
        </AuthProvider>
      </body>
    </html>
  );
}
