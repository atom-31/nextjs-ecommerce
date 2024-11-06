import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function Footer() {
  return (
    <footer className={`bg-black text-white py-10 px-6 ${poppins.className}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-sm md:gap-12">
        
        {/* Subscribe Section */}
        <div>
          <h3 className={`${inter.className} font-bold text-2xl mb-5`}>Exclusive</h3>
          <p className="mb-5 text-xl font-medium">Subscribe</p>
          <p className="text-gray-400 mb-3">Get 10% off your first order</p>
          <div className="flex items-center border border-white rounded-sm overflow-hidden py-2 px-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black text-gray-300 outline-none flex-grow"
            />
            <button className="">
              <img src="/images/arrow-right.svg" alt="Arrow Right" />
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-xl mb-5 font-medium">Support</h3>
          <ul className="flex flex-col gap-3 font-normal">
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
            </ul>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="text-xl mb-5 font-medium">Account</h3>
          <ul className="flex flex-col gap-3 font-normal">
            <li><a href="#" className="hover:text-gray-400">My Account</a></li>
            <li><a href="#" className="hover:text-gray-400">Login / Register</a></li>
            <li><a href="#" className="hover:text-gray-400">Cart</a></li>
            <li><a href="#" className="hover:text-gray-400">Wishlist</a></li>
            <li><a href="#" className="hover:text-gray-400">Shop</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl mb-5 font-medium">Quick Link</h3>
          <ul className="flex flex-col gap-3 font-normal">
            <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-400">Terms Of Use</a></li>
            <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        {/* Download App Section */}
        <div>
          <h3 className="text-xl mb-5 font-medium">Download App</h3>
          <p className="text-gray-400 mb-3 text-xs">Save $3 with App New User Only</p>
          <div className="flex items-center space-x-3 mb-4">
            <img src="/images/qr-code.svg" alt="QR Code" className="w-17 h-17" />
            <div>
              <img src="/images/google-play.svg" alt="Google Play" className="mb-2" />
              <img src="/images/app-store.svg" alt="App Store" />
            </div>
          </div>
          <div className="flex gap-6">
              <img src="/images/facebook.svg" alt="Facebook" className='w-6 h-6'/>
              <img src="/images/twitter.svg" alt="Twitter" className='w-6 h-6'/>
              <img src="/images/instagram.svg" alt="Instagram" className='w-6 h-6'/>
              <img src="/images/linkedin.svg" alt="Linkedin" className='w-6 h-6'/>
          </div>
        </div>
      </div>
      
      {/* Bottom Text */}
      <div className="border-t border-gray-900 mt-8 pt-4 text-center text-gray-500 text-sm">
        © Copyright Rimel 2022. All rights reserved
      </div>
    </footer>
  );
}
