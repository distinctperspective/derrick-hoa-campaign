import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Mr_Dafoe } from 'next/font/google';
import Script from 'next/script';

import { ThemeProvider } from 'next-themes';
import { Providers } from './providers';

import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});
const mrDafoe = Mr_Dafoe({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mr-dafoe',
});

export const metadata: Metadata = {
    title: 'Derrick Threatt for GCP RAI',
    description: 'Campaign website for Derrick Threatt, candidate for Grand Central Park Residential Association Inc. Board Member'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${mrDafoe.variable} bg-background text-foreground overscroll-none antialiased`}>
                <ThemeProvider attribute='class'>
                    <Providers>
                        {process.env.NODE_ENV === 'production' && (
                            <>
                                <Script 
                                    src={`https://www.googletagmanager.com/gtag/js?id=G-29QR8H8K8S`} 
                                    strategy="afterInteractive" 
                                />
                                <Script 
                                    id="google-analytics" 
                                    strategy="afterInteractive"
                                    dangerouslySetInnerHTML={{
                                        __html: `
                                            window.dataLayer = window.dataLayer || [];
                                            function gtag(){dataLayer.push(arguments);}
                                            gtag('js', new Date());
                                            gtag('config', 'G-29QR8H8K8S');
                                        `,
                                    }}
                                />
                            </>
                        )}
                        {children}
                        <Toaster />
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
