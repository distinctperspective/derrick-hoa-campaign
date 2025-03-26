'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';
import GoogleSignInButton from './GoogleSignInButton';

export default function LoginWall() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative px-4 bg-[url('/images/lakehouse.jpeg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
                <Logo className="w-[200px] h-auto" />
            </div>
            
            <div className="max-w-2xl w-full text-center space-y-8 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg mt-24 relative z-10 mb-12">
                <h1 className="text-4xl font-bold text-[#0B3558]">
                    Please Sign In
                </h1>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    To submit a request, you'll need to sign in first. This helps us ensure we're addressing concerns from actual Grand Central Park residents.
                </p>
                <div className="space-y-4">
                    <GoogleSignInButton
                        size="large"
                        className="bg-[#40C5B5] text-white hover:bg-[#40C5B5]/90"
                    />
                    <div className="space-y-2 text-sm text-gray-500">
                        <p>
                            Your information helps us better understand and address community needs.
                        </p>
                        <p className="text-xs">
                            We value your privacy. Your information will only be shared with GCP RAI staff when necessary to help resolve your issues on your behalf.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
