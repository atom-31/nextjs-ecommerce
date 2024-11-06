'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inter, Poppins } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { useCart } from '../lib/cartContext';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function Header() {
  const { data: session } = useSession();
  const { cartCount } = useCart(); // Use cart count from context
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path) => pathname === path;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={`sticky top-0 pt-20 pb-4 px-4 md:px-20 flex items-center justify-between bg-white text-black border-b z-40 ${poppins.className}`}>
      
      <h1 className={`${inter.className} font-bold text-2xl`}>Exclusive</h1>
      
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-2xl focus:outline-none"
      >
        ☰
      </button>

      {/* Navigation and Search (visible on larger screens) */}
      <nav className="hidden md:flex gap-12">
        <Link href="/" className={`pb-1 hover:scale-110 duration-150 ${isActive('/') ? 'border-b border-black' : ''}`}>
          Home
        </Link>
        <Link href="/contact" className={`pb-1 hover:scale-110 duration-150 ${isActive('/contact') ? 'border-b border-black' : ''}`}>
          Contact
        </Link>
        <Link href="/about" className={`pb-1 hover:scale-110 duration-150 ${isActive('/about') ? 'border-b border-black' : ''}`}>
          About
        </Link>
        <Link href="/login" className={`pb-1 hover:scale-110 duration-150 ${isActive('/login') ? 'border-b border-black' : ''}`}>
          Login
        </Link>
        <Link href="/signup" className={`pb-1 hover:scale-110 duration-150 ${isActive('/signup') ? 'border-b border-black' : ''}`}>
          Sign Up
        </Link>
      </nav>
      
      <div className="hidden md:flex justify-between gap-3">
        <div className="flex items-center bg-gray-100 rounded-md py-2 px-4 w-72">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="px-3 py-1 bg-gray-100 flex-grow outline-none"
          />
          <img src="/images/search.svg" alt="Search" className="scale-125" />
        </div>
        <div className="flex gap-2 justify-center items-center relative">
          {/* Heart icon with dynamic counter */}
          <div className="relative">
            <img src="/images/heart.svg" alt="Heart" className="h-8 w-8" />
          </div>

          <Link href="/cart" className="relative">
            <img src="/images/cart.svg" alt="Cart" className="h-8 w-8" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User icon with dropdown */}
          {session && (
            <button onClick={toggleDropdown}>
              <img src="/images/user.svg" alt="User" className="h-8 w-8 rounded-full" />
            </button>
          )}

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-full w-60 bg-black opacity-90 text-white rounded-md shadow-lg z-10"
            >
              <div className="flex flex-col whitespace-nowrap">
                <a href="/account" className="px-4 py-2 hover:bg-gray-700 flex items-center">
                  <img src="/images/user-white.svg" alt="Account" className="h-5 w-5 mr-4" />
                  Manage My Account
                </a>
                <a href="/orders" className="px-4 py-2 hover:bg-gray-700 flex items-center">
                  <img src="/images/order-white.svg" alt="Orders" className="h-5 w-5 mr-4" />
                  My Orders
                </a>
                <a href="/cancellations" className="px-4 py-2 hover:bg-gray-700 flex items-center">
                  <img src="/images/cancel-white.svg" alt="Cancellations" className="h-5 w-5 mr-4" />
                  My Cancellations
                </a>
                <a href="/reviews" className="px-4 py-2 hover:bg-gray-700 flex items-center">
                  <img src="/images/star-white.svg" alt="Reviews" className="h-5 w-5 mr-4" />
                  My Reviews
                </a>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="px-4 py-2 hover:bg-gray-700 flex items-center">
                    <img src="/images/logout.svg" alt="Logout" className="h-5 w-5 mr-4" />
                    Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="text-xl p-4 focus:outline-none"
        >
          ✕
        </button>
        
        {/* Sidebar Navigation */}
        <nav className="flex flex-col items-start gap-6 p-6 text-lg">
          <Link href="/" onClick={toggleSidebar} className={`${isActive('/') ? 'border-b border-black' : ''}`}>
            Home
          </Link>
          <Link href="/contact" onClick={toggleSidebar} className={`${isActive('/contact') ? 'border-b border-black' : ''}`}>
            Contact
          </Link>
          <Link href="/about" onClick={toggleSidebar} className={`${isActive('/about') ? 'border-b border-black' : ''}`}>
            About
          </Link>
          <Link href="/signup" onClick={toggleSidebar} className={`${isActive('/signup') ? 'border-b border-black' : ''}`}>
            Sign Up
          </Link>
        </nav>
      </div>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </header>
  );
}
