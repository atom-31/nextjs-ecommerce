'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../lib/authContext'; // Adjust the import path accordingly

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}