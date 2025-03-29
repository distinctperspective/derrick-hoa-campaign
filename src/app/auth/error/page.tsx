'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthError() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    try {
      const error = searchParams?.get('error');
      
      // Map error codes to user-friendly messages
      switch (error) {
        case 'Configuration':
          setErrorMessage('There is a problem with the server configuration.');
          break;
        case 'AccessDenied':
          setErrorMessage('You do not have permission to sign in.');
          break;
        case 'Verification':
          setErrorMessage('The verification link is invalid or has expired.');
          break;
        case 'OAuthSignin':
        case 'OAuthCallback':
        case 'OAuthCreateAccount':
        case 'EmailCreateAccount':
        case 'Callback':
        case 'OAuthAccountNotLinked':
        case 'EmailSignin':
        case 'CredentialsSignin':
          setErrorMessage('There was a problem with your sign in attempt. Please try again.');
          break;
        case 'SessionRequired':
          setErrorMessage('You must be signed in to access this page.');
          break;
        default:
          setErrorMessage('An unknown error occurred. Please try again.');
          break;
      }
    } catch (error) {
      console.error('Error processing auth error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  }, [searchParams]);

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
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
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
