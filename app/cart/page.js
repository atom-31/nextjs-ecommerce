'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export default function CartPage() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (session) {
      fetchCartItems();
    }
  }, [session]);

  const fetchCartItems = async () => {
    const res = await fetch('/api/cart');
    const data = await res.json();

    const itemsWithDetails = await Promise.all(
      data.items.map(async (item) => {
        const productRes = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
        const productData = await productRes.json();
        return {
          ...productData,
          quantity: item.quantity,
        };
      })
    );

    setCartItems(itemsWithDetails);
    calculateSubtotal(itemsWithDetails);
  };

  const calculateSubtotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total);
  };

  if (!session) {
    return (
      <div>
        <p>Please <Link href="/login">log in</Link> to view your cart.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-4">
      <Breadcrumb />
      <div className="rounded-lg p-4 shadow-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-4 flex items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 mr-4 object-contain" />
                  {item.title}
                </td>
                <td className="p-4">${item.price}</td>
                <td className="p-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="border rounded-md w-16 p-1 text-center"
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      item.quantity = newQuantity;
                      calculateSubtotal(cartItems);
                    }}
                  />
                </td>
                <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-6">
          <Link href="/" className="text-gray-700 underline">Return To Shop</Link>
          <button className="bg-gray-700 text-white py-2 px-4 rounded">Update Cart</button>
        </div>
      </div>
      
      <div className="flex mt-8 gap-8 justify-between">
        <div className="w-fit">
          <input
            type="text"
            placeholder="Coupon Code"
            className="w-full p-3 border rounded-md mb-4"
          />
          <button className="bg-red-500 text-white py-2 px-4 w-full rounded">Apply Coupon</button>
        </div>
        <div className="w-1/3 border p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
          <p className="flex justify-between mb-2"><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></p>
          <div className='h-px border mb-2'></div>
          <p className="flex justify-between mb-2"><span>Shipping:</span> <span>Free</span></p>
          <div className='h-px border mb-2'></div>
          <p className="flex justify-between text-lg font-semibold"><span>Total:</span> <span>${subtotal.toFixed(2)}</span></p>
          <button className="bg-red-500 text-white py-2 px-4 w-full rounded mt-4">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
