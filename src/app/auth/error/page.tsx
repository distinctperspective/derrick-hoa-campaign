import Image from 'next/image';
import Link from 'next/link';
import { ErrorClient } from './error-client';

// This is a server component
export default function AuthError({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  // Get the error from the URL
  const error = searchParams.error || '';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Image 
            src="/images/dtlogo.png" 
            alt="Derrick Threatt Logo" 
            width={150} 
            height={150} 
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Authentication Error</h2>
          <ErrorClient errorCode={error} />
        </div>
        <div className="mt-8">
          <Link 
            href="/auth/signin"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0B3558] hover:bg-[#0B3558]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B3558]"
          >
            Try signing in again
          </Link>
          <Link 
            href="/"
            className="mt-4 w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B3558]"
          >
            Return to home page
          </Link>
        </div>
      </div>
    </div>
  );
}
