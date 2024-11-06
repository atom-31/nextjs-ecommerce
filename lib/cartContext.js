import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (session) {
        try {
          const response = await fetch('/api/cart/count');
          const data = await response.json();
          setCartCount(data.count);
        } catch (error) {
          console.error("Failed to fetch cart count:", error);
        }
      }
    };

    fetchCartCount();
  }, [session]);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
