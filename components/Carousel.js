'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const carouselSlides = [
  {
    image: "/images/iphone-14.jpg",
    title: "iPhone 14 Series",
    description: "Up to 10% off Voucher",
    buttonText: "Shop Now",
  },
  {
    image: "/images/samsung.png",
    title: "Samsung Smart TV",
    description: "Save $200 on selected models",
    buttonText: "View Deals",
  },
  {
    image: "/images/mac.png",
    title: "Laptop Sale",
    description: "Up to 15% off on all laptops",
    buttonText: "Explore Now",
  },
  {
    image: "/images/console.png",
    title: "Gaming Consoles",
    description: "Exclusive offers on PS5 and Xbox",
    buttonText: "Shop Now",
  }
];

export default function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000 })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);


  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {carouselSlides.map((slide, index) => (
            <div key={index} className="embla__slide flex items-center justify-center text-white bg-black">
              <div className="text-center p-8">
                <h2 className="text-xl text-left font-thin">{slide.title}</h2>
                <p className="text-4xl mt-2 text-left font-bold">{slide.description}</p>
                <div className='flex flex-row items-center mt-4 pt-2 pb-1 gap-2'>
                <button className="text-left justify-start items-start flex font-extralight text-xl border-b border-white">
                  {slide.buttonText}
                </button>
                <img src="/images/arrow-shop.svg" alt="Arrow Right" className="w-7 h-8" />
                </div>
              </div>
              <img src={slide.image} alt={slide.title} className="max-w-[90%] h-[400px] object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-3 h-3 rounded-full ${index === selectedIndex ? 'bg-red-500 border-2 border-white' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
