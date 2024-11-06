'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from '../../../components/ProductCard';
import Breadcrumb from '../../../components/Breadcrumb';

export default function CategoryPage({ params }) {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setCategory(resolvedParams.category);
    })();
  }, [params]);

  useEffect(() => {
    if (category) {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error("Error fetching category products:", error));
    }
  }, [category]);

  return (
    <section className="p-10 justify-center items-center">
      <Breadcrumb />
      <h1 className="text-3xl font-bold capitalize mb-6">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {products.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            name={product.title}
            price={`$${product.price}`}
            originalPrice={`$${(product.price * 1.2).toFixed(2)}`}
            discount={`-${Math.floor((1 - product.price / (product.price * 1.2)) * 100)}%`}
            image={product.image}
            rating={Math.floor(Math.random() * 5) + 1}
            reviews={Math.floor(Math.random() * 100) + 1}
            showDiscount="yes"
          />
        ))}
      </div>
    </section>
  );
}
