import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
      <h1 className="text-8xl font-black text-gray-200 dark:text-gray-800">404</h1>
      <h2 className="text-2xl font-bold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 text-center max-w-md">We couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.</p>
      <Link href="/" className="mt-8 bg-[#ff2d3d] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-black transition-colors">
        <FaHome /> Back to Home
      </Link>
    </div>
  );
}
