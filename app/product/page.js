'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
        <Breadcrumb />
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.title}
            price={`$${product.price}`}
            image={product.image}
            rating={product.rating?.rate}
            reviews={product.rating?.count}
          />
        ))}
      </div>
    </section>
  );
}
