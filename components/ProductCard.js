import React from 'react';
import Link from 'next/link';

export default function ProductCard({
    id,
    name,
  price,
  originalPrice,
  discount,
  image,
  rating,
  reviews,
  buttonText = "Add To Cart",
  showDiscount = "no",
}) {
  return (
    <div className="p-4 w-64 bg-gray-100 rounded">
      {/* Product Image with Discount Badge and Action Buttons */}
      <div className="relative group w-full h-56 p-5 overflow-hidden rounded bg-white shadow-lg">
        <img src={image} alt={name} className="w-full h-full object-contain" />

        {/* Conditional Discount Badge */}
        {showDiscount === "yes" && discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">
            {discount}
          </span>
        )}

        {/* Wishlist and View Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button className="bg-gray-200 p-1 rounded-full shadow hover:scale-105">
            <img src="/images/heart.svg" alt="Heart" className="w-7 h-7" />
          </button>
          <Link href={`/product/${id}`} className="bg-gray-200 p-1 rounded-full shadow hover:scale-105" >
            <img src="/images/eye.svg" alt="Eye" className="w-7 h-7" />
          </Link>
        </div>

        {/* Hover Overlay for Add to Cart */}
        <button className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 opacity-0 rounded-b group-hover:opacity-100 transition-opacity duration-300">
          {buttonText}
        </button>
      </div>

      {/* Product Details */}
      <h3 className="mt-4 text-lg font-medium truncate" title={name}>
        {name}
      </h3>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-red-500 font-medium">{price}</span>
        {originalPrice && (
          <span className="text-gray-500 line-through">{originalPrice}</span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-1 mt-2 text-yellow-500">
        {"★".repeat(Math.floor(rating))}
        <span className="text-gray-500">({reviews})</span>
      </div>
    </div>
  );
}
