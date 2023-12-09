'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utility/context/auth';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the color and opacity
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
};

const ProtectedRouteComponent: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const router = useRouter();
  const { user, loading, pathname } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      if (!pathname.includes('auth')) {
        router.replace('/auth/signin'); // Redirect to the login page if not authenticated
      } else {
        return;
      }
    } else if (user && pathname.includes('auth')) {
      router.replace('/'); // Redirect to the dashboard page if authenticated
    } else {
      return;
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    // You can show a loading spinner or another component while authentication is in progress
    return (
      <Box sx={styles.overlay}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <CircularProgress />
        </Paper>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRouteComponent;
