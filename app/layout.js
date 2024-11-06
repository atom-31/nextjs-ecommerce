import './globals.css'; // Make sure your global styles are imported
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'], // Specify weights as needed
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white text-black ${poppins.className}`}>
        <Header />
        <main className='pr-24 pl-24'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
