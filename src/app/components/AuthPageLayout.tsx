'use client';

import { useSession } from 'next-auth/react';
import Logo from './Logo';
import LoginWall from './LoginWall';

interface AuthPageLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

export default function AuthPageLayout({ children, title, subtitle }: AuthPageLayoutProps) {
    const { data: session } = useSession();

    if (!session) {
        return <LoginWall />;
    }

    return (
        <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center relative px-4 bg-[url('/images/lakehouse.jpeg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
                <Logo className="w-[200px] h-auto" />
            </div>
            
            <div className="max-w-4xl w-full text-center space-y-8 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg relative z-10">
                <div>
                    <h1 className="text-4xl font-bold text-[#0B3558]">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}
