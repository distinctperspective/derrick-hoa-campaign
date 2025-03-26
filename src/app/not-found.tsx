import Link from 'next/link';
import { Metadata } from 'next';

// Add minimal metadata for the not-found page without URL construction
export const metadata: Metadata = {
  title: 'Page Not Found | Derrick Threatt for GCP HOA',
  description: 'The page you are looking for could not be found.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#0B3558] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find the page you're looking for. The page may have been moved or doesn't exist.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-[#0B3558] text-white rounded-md hover:bg-[#0B3558]/90 transition-colors font-semibold"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
