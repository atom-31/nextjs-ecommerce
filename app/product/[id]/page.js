'use client';
import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import ProductCard from '../../../components/ProductCard';

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  useEffect(() => {
    handleColorSelect('red');
    handleSizeSelect('M');
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);

          fetch(`https://fakestoreapi.com/products/category/${data.category}?limit=4`)
            .then((res) => res.json())
            .then((related) => {
              setRelatedProducts(related.filter((item) => item.id !== data.id));
            });
        })
        .catch((error) => console.error("Error fetching product details:", error));
    }
  }, [id]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="p-10">
      <Breadcrumb />
      <div className="flex gap-10">
        <div className="w-1/2 flex mt-5 gap-5">
          <div className="flex flex-col gap-2 mt-4">
            {[product.image, product.image, product.image].map((img, index) => (
              <img key={index} src={img} alt="Thumbnail" className="w-32 h-24 shadow-lg object-contain border p-4" />
            ))}
          </div>
          <img src={product.image} alt={product.title} className="w-full h-96 object-contain shadow-lg border p-5" />
        </div>

        {/* Product Details */}
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="text-yellow-500 flex items-center mb-2">
            {"★".repeat(Math.floor(product.rating?.rate || 0))}
            <span className="text-gray-500 ml-2">({product.rating?.count} Reviews)</span>
          </div>
          <p className="text-2xl font-extralight mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className='bg-gray-400 h-px'></div>

          {/* Color Selection */}
          <div className="mb-4 mt-6 flex items-center gap-4">
            <p className="font-medium flex items-center text-xl">Colours:</p>
            <div className="flex gap-3 items-center justify-center">
              <span
                className={`w-5 h-5 bg-red-500 rounded-full cursor-pointer ${
                  selectedColor === 'red' ? 'border-2 border-black' : ''
                }`}
                onClick={() => handleColorSelect('red')}
              ></span>
              <span
                className={`w-5 h-5 bg-gray-500 rounded-full cursor-pointer ${
                  selectedColor === 'gray' ? 'border-2 border-black' : ''
                }`}
                onClick={() => handleColorSelect('gray')}
              ></span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-4 flex items-center gap-4">
            <p className="font-medium flex items-center text-xl">Size:</p>
            <div className="flex gap-3 mt-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <span
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-3 py-1 border border-gray-400 rounded cursor-pointer hover:bg-red-500 hover:text-white ${
                    selectedSize === size ? 'bg-red-500 text-white' : ''
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className='flex gap-3 items-center mb-6'>
            <div className="flex items-center border border-gray-400">
              <button onClick={() => handleQuantityChange(-1)} className="p-2 border-r border-gray-400 hover:bg-red-500 hover:text-white">-</button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="p-2 border-l border-gray-400 hover:bg-red-500 hover:text-white">+</button>
            </div>
            <button className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 w-full">Buy Now</button>
            <button className="border border-gray-400 rounded-md font-semibold px-2">
              <img src='/images/heart.svg' alt='Heart Icon' className='w-12 h-12' />
            </button>
          </div>

          {/* Shipping Information */}
          <div className="mt-6 border border-gray-400 p-2">
            <div className="flex items-center gap-3 mb-4 mt-3">
              <img src='/images/free_delivery.svg' alt='Free Delivery' className='w-14 h-14'/>
              <div className='flex flex-col'>
                <p>Free Delivery</p>
                <p className='text-sm underline'>Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className='h-px bg-gray-400'></div>
            <div className="flex items-center gap-3 mb-3 mt-3">
              <img src='/images/return.svg' alt='Return Delivery' className='w-12 h-12'/>
              <div className='flex flex-col'>
                <p>Return Delivery</p>
                <p className='text-sm'>Free 30 Days Delivery Returns. <span className='underline'>Details</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      <div className="mt-12">
        <div className="flex items-center gap-4 mb-12">
                <div className='w-5 h-10 bg-red-600 rounded'></div>
                <p className="text-lg font-semibold text-red-600">Related Items</p>
            </div>
        <div className="flex gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
            id={relatedProduct.id}
              key={relatedProduct.id}
              name={relatedProduct.title}
              price={`$${relatedProduct.price}`}
              originalPrice={`$${(relatedProduct.price * 1.2).toFixed(2)}`} 
              discount={`-${Math.floor((1 - relatedProduct.price / (relatedProduct.price * 1.2)) * 100)}%`}
              image={relatedProduct.image}
              rating={Math.floor(Math.random() * 5) + 1} 
              reviews={Math.floor(Math.random() * 100) + 1} 
              showDiscount="yes"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
