'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean); // Split the path and filter out empty segments

  return (
    <nav className="text-gray-500 text-sm mb-6">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-black">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">/</span>
              <Link href={href} className="capitalize hover:text-black">
                {decodeURIComponent(segment)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
