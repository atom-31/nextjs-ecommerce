'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../lib/authContext'; // Adjust the import path accordingly
import { CartProvider } from '@/lib/cartContext';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
        {children}
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
