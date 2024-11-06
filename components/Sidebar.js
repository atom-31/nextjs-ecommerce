'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function SidePanel() {
  const [categories, setCategories] = useState([]);

  const extraCategories = [
    "Groceries & Pets",
    "Health & Beauty",
    "Home & Lifestyle",
    "Sports & Outdoor",
  ];

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories([...data, ...extraCategories]);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <aside className={`hidden md:block border-r w-3/12 pr-4 pt-10 ${poppins.className}`}>
      <ul className="text-gray-700 space-y-4">
        {categories.map((category, index) => (
          <li key={index} className="flex items-center justify-between gap-5 cursor-pointer hover:text-black hover:scale-105 transition duration-150">
            <Link href={`/category/${category}`}>
              <span className="whitespace-nowrap capitalize">{category}</span>
            </Link>
            <span className="text-gray-500">›</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
