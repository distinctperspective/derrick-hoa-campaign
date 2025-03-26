import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Profile | Derrick Threatt for Grand Central Park HOA',
  description: 'Manage your profile information for the Derrick Threatt for Grand Central Park HOA campaign website.',
  openGraph: {
    title: 'Your Profile | Derrick Threatt for Grand Central Park HOA',
    description: 'Manage your profile information for the Derrick Threatt for Grand Central Park HOA campaign website.',
    url: process.env.NEXTAUTH_URL || 'https://gcphoatx.com',
    siteName: 'Derrick Threatt for Grand Central Park HOA',
    images: [
      {
        url: `${(process.env.NEXTAUTH_URL || 'https://gcphoatx.com').replace(/\/$/, '')}/api/og?title=Your%20Profile&subtitle=Manage%20your%20account%20information`,
        width: 1200,
        height: 630,
        alt: 'Derrick Threatt for Grand Central Park HOA',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Profile | Derrick Threatt for Grand Central Park HOA',
    description: 'Manage your profile information for the Derrick Threatt for Grand Central Park HOA campaign website.',
    images: [`${(process.env.NEXTAUTH_URL || 'https://gcphoatx.com').replace(/\/$/, '')}/api/og?title=Your%20Profile&subtitle=Manage%20your%20account%20information`],
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
