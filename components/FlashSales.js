'use client';
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function FlashSales() {
  const [timeLeft, setTimeLeft] = useState(null); // Start as null to avoid SSR mismatch
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);

  // Initialize Countdown Timer only after mounting on the client
  useEffect(() => {
    const initialTime = {
      days: 3,
      hours: 23,
      minutes: 19,
      seconds: 56,
    };
    setTimeLeft(initialTime);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (!prevTime) return initialTime;

        const { days, hours, minutes, seconds } = prevTime;
        if (seconds > 0) return { ...prevTime, seconds: seconds - 1 };
        if (minutes > 0) return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
        if (days > 0) return { ...prevTime, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch products from the API only on the client
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then((res) => res.json())
      .then((data) => {
        const formattedProducts = data.map((product) => ({
          id: product.id,
          name: product.title,
          price: `$${product.price}`,
          originalPrice: `$${(product.price * 1.2).toFixed(2)}`,
          discount: `-${Math.floor((1 - product.price / (product.price * 1.2)) * 100)}%`,
          image: product.image,
          rating: Math.floor(Math.random() * 5) + 1,
          reviews: Math.floor(Math.random() * 100) + 1,
        }));
        setProducts(formattedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Scroll functions
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="pt-10 pb-10">
        <div className='flex flex-col gap-4'>
            <div className="flex items-center gap-4">
                <div className='w-5 h-10 bg-red-600 rounded'></div>
                <p className="text-lg font-semibold text-red-600">Today's</p>
            </div>

            <div className="flex justify-between items-end mb-4">
                <h2 className={`${inter.className} text-3xl font-semibold`}>Flash Sales</h2>
                {/* Display Countdown Timer only if timeLeft is initialized */}
                {timeLeft && (
                <div className="flex items-end justify-center space-x-5 text-xl font-semibold">
                    <div className='flex flex-col items-center justify-center'>
                        <p className=' text-xs font-extralight'>Days</p>
                        <p className={`${inter.className} text-3xl`}>{String(timeLeft.days).padStart(2, '0')}</p> 
                    </div>
                    <div className=' text-red-400 text-2xl align-text-bottom'>
                        :
                    </div> 
                    <div className='flex flex-col items-center justify-center'>
                        <p className=' text-xs font-extralight'>Hours</p>
                        <p className={`${inter.className} text-3xl`}>{String(timeLeft.hours).padStart(2, '0')}</p> 
                    </div>
                    <div className=' text-red-400 text-2xl align-text-bottom'>
                        :
                    </div> 
                    <div className='flex flex-col items-center justify-center'>
                        <p className=' text-xs font-extralight'>Minutes</p>
                        <p className={`${inter.className} text-3xl`}>{String(timeLeft.minutes).padStart(2, '0')}</p> 
                    </div>
                    <div className=' text-red-400 text-2xl align-text-bottom'>
                        :
                    </div> 
                    <div className='flex flex-col items-center justify-center'>
                        <p className=' text-xs font-extralight'>Seconds</p>
                        <p className={`${inter.className} text-3xl`}>{String(timeLeft.seconds).padStart(2, '0')}</p> 
                    </div>
                </div>
                )}

                <div className="flex space-x-2">
                <button onClick={scrollLeft} className="p-2 bg-gray-100 rounded-full">
                    <img src="/images/arrow-nav-left-black.svg" alt="Scroll Left" className='w-6 h-6' />
                </button>
                <button onClick={scrollRight} className="p-2 bg-gray-100 rounded-full">
                    <img src="/images/arrow-nav-right-black.svg" alt="Scroll Right" className='w-6 h-6' />
                </button>
                </div>
            </div>
        </div>

      {/* Horizontal Scrollable Product Cards */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-8 scrollbar-hide"
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px]">
            <ProductCard
            id = {product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              image={product.image}
              rating={product.rating}
              reviews={product.reviews}
              showDiscount="yes"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href ="/product" className="bg-red-600 text-white px-6 py-3 rounded font-medium hover:bg-red-800">
          View All Products
        </Link>
      </div>
    </section>
  );
}
