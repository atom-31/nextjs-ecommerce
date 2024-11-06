'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inter, Poppins } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function Header() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const isActive = (path) => pathname === path;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={`pt-12 pb-4 px-4 md:px-20 flex items-center justify-between bg-white text-black border-b ${poppins.className}`}>
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
        <img src="/images/heart.svg" alt="Heart" />
        <img src="/images/cart.svg" alt="Cart" />
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
