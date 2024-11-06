'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <section className="p-10">
        <Breadcrumb />
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link href={`/category/${category}`} key={category} className="block p-6 bg-gray-100 hover:bg-gray-200 rounded-lg shadow text-center capitalize font-semibold text-lg">
              {category}
          </Link>
        ))}
      </div>
    </section>
  );
}
