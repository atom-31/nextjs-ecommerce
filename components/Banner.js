// components/Banner.js
'use client';
import { useEffect, useState } from 'react';

export default function Banner() {


  return (
      <div className="fixed top-0 left-0 w-full bg-black text-white py-2 px-4 flex justify-center items-center z-50">
        <div className="text-sm font-extralight">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span className="ml-2 font-semibold cursor-pointer underline">Shop Now</span>
        </div>
        <div className="text-sm cursor-pointer fixed right-0 mr-20">English ▼</div>
      </div>
    )
}
