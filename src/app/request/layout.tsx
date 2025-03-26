import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit a Request | Derrick Threatt for Grand Central Park HOA',
  description: 'Submit your requests, concerns, or suggestions to Derrick Threatt for the Grand Central Park HOA.',
  openGraph: {
    title: 'Submit a Request | Derrick Threatt for Grand Central Park HOA',
    description: 'Submit your requests, concerns, or suggestions to Derrick Threatt for the Grand Central Park HOA.',
    url: process.env.NEXTAUTH_URL || 'https://gcphoatx.com',
    siteName: 'Derrick Threatt for Grand Central Park HOA',
    images: [
      {
        url: `${(process.env.NEXTAUTH_URL || 'https://gcphoatx.com').replace(/\/$/, '')}/api/og?title=Submit%20a%20Request&subtitle=Share%20your%20concerns%20and%20suggestions`,
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
    title: 'Submit a Request | Derrick Threatt for Grand Central Park HOA',
    description: 'Submit your requests, concerns, or suggestions to Derrick Threatt for the Grand Central Park HOA.',
    images: [`${(process.env.NEXTAUTH_URL || 'https://gcphoatx.com').replace(/\/$/, '')}/api/og?title=Submit%20a%20Request&subtitle=Share%20your%20concerns%20and%20suggestions`],
  },
};

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
