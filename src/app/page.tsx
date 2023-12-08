'use client';

import { useAuth } from '@/utility/context/auth';
import { useEffect } from 'react';

export default function HomePage() {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user?.emailVerified);
  }, [user]);

  return (
    <>
      {user?.emailVerified ? <h1>Admin logged in</h1> : <h1>User logged in</h1>}
    </>
  );
}
