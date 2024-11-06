'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (session) {
      fetchCartItems();
    }
  }, [session]);

  const fetchCartItems = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCartItems(data.items);
  };

  if (!session) {
    return (
      <div>
        <p>Please <Link href="/login">log in</Link> to view your cart.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id}>
            <p>{item.product.name}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
