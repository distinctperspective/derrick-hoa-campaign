import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Settings | Derrick Threatt for Grand Central Park HOA',
  description: 'Manage admin settings for the Derrick Threatt for Grand Central Park HOA campaign website.',
  openGraph: {
    title: 'Admin Settings | Derrick Threatt for Grand Central Park HOA',
    description: 'Manage admin settings for the Derrick Threatt for Grand Central Park HOA campaign website.',
    url: process.env.NEXTAUTH_URL || 'https://gcphoatx.com',
    siteName: 'Derrick Threatt for Grand Central Park HOA',
    images: [
      {
        url: `${(process.env.NEXTAUTH_URL || 'https://gcphoatx.com').replace(/\/$/, '')}/api/og?title=Admin%20Settings&subtitle=Manage%20campaign%20settings`,
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
    title: 'Admin Settings | Derrick Threatt for Grand Central Park HOA',
    description: 'Manage admin settings for the Derrick Threatt for Grand Central Park HOA campaign website.',
    images: [`${(process.env.NEXTAUTH_URL || 'https://gcphoatx.com').replace(/\/$/, '')}/api/og?title=Admin%20Settings&subtitle=Manage%20campaign%20settings`],
  },
};

export default function AdminSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
