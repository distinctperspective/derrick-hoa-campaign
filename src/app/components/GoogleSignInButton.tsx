'use client';

import { ButtonHTMLAttributes } from 'react';

import Image from 'next/image';

import Button from './Button';
import { signIn, signOut } from 'next-auth/react';

interface GoogleSignInButtonProps {
    callbackUrl?: string;
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'default' | 'large';
    className?: string;
    action?: 'signin' | 'signout';
}

export default function GoogleSignInButton({
    callbackUrl,
    variant = 'primary',
    size = 'default',
    className = '',
    action = 'signin'
}: GoogleSignInButtonProps) {
    const handleAction = async () => {
        if (action === 'signout') {
            // Clear all auth cookies and redirect to home
            await signOut({
                callbackUrl: '/',
                redirect: true
            });
            return;
        }

        const options = callbackUrl ? { callbackUrl } : undefined;
        await signIn('google', options);
    };

    return (
        <Button onClick={handleAction} variant={variant} size={size} className={className} type='button'>
            {action === 'signin' && (
                <Image src='/google.svg' alt='Google' width={20} height={20} className='mr-2 h-5 w-5' />
            )}
            {action === 'signin' ? 'Sign in with Google' : 'Sign Out'}
        </Button>
    );
}
