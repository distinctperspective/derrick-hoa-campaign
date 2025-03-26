'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';
import Button from './Button';

interface GoogleSignInButtonProps {
  callbackUrl?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'default' | 'large';
  className?: string;
}

export default function GoogleSignInButton({
  callbackUrl,
  variant = 'primary',
  size = 'default',
  className = '',
}: GoogleSignInButtonProps) {
  const handleSignIn = () => {
    const options = callbackUrl ? { callbackUrl } : undefined;
    signIn('google', options);
  };

  return (
    <Button
      onClick={handleSignIn}
      variant={variant}
      size={size}
      className={className}
      type="button"
    >
      <Image
        src="/google.svg"
        alt="Google"
        width={20}
        height={20}
        className="w-5 h-5 mr-2"
      />
      Sign in with Google
    </Button>
  );
}
