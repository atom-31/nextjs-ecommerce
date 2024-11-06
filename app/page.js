// app/page.js
import Carousel from '@/components/Carousel';
import FlashSales from '@/components/FlashSales';
import Sidebar from '@/components/Sidebar';

export default function HomePage() {
  return (
    <div className="flex flex-col">


      {/* Main Content Area */}
      <div className="flex">
        <Sidebar />
        {/* Carousel */}
        <div className='pb-10 pt-10 pl-10 justify-center items-center'><Carousel /></div>
      </div>
      <div>
        <FlashSales />
      </div>
    </div>
  );
}
