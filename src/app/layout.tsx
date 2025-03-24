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
    description: 'Campaign website for Derrick Threatt, candidate for Grand Central Park Residential Association Inc. Board Member',
    keywords: ['Derrick Threatt', 'Grand Central Park', 'GCP', 'RAI', 'Board Member', 'Conroe', 'Texas', 'Resident Board Member', 'HOA', 'Community'],
    authors: [{ name: 'Derrick Threatt' }],
    creator: 'Derrick Threatt',
    publisher: 'Derrick Threatt Campaign',
    robots: 'index, follow',
    metadataBase: new URL('https://derrickthreatt.com'),
    alternates: {
        canonical: '/'
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
            { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
            { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
            { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
            { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        other: [
            { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
    },
    openGraph: {
        title: 'Derrick Threatt for GCP RAI',
        description: 'Campaign website for Derrick Threatt, candidate for Grand Central Park Residential Association Inc. Board Member',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Derrick Threatt for GCP RAI Board'
            }
        ],
        type: 'website',
        locale: 'en_US',
        siteName: 'Derrick Threatt for GCP RAI'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Derrick Threatt for GCP RAI',
        description: 'Campaign website for Derrick Threatt, candidate for Grand Central Park Residential Association Inc. Board Member',
        images: ['/images/og-image.jpg'],
        creator: '@derrickthreatt'
    }
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
