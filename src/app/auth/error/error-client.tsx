'use client';

import { useEffect, useState } from 'react';

export function ErrorClient({ errorCode }: { errorCode: string }) {
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    // Map error codes to user-friendly messages
    switch (errorCode) {
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
  }, [errorCode]);

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
      <p className="text-sm text-red-700">{errorMessage}</p>
    </div>
  );
}
