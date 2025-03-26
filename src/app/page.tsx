import HomePage from '@/app/components/HomePage';
import { Metadata } from 'next';

// Define metadata for the home page with a hardcoded URL to avoid build issues
export const metadata: Metadata = {
  title: 'Derrick Threatt for Grand Central Park HOA | From Neighbor to Board Member',
  description: 'Derrick Threatt is running to be the first resident board member for Grand Central Park Residential Association Inc. Learn about his vision for our community.',
  openGraph: {
    title: 'Derrick Threatt for Grand Central Park HOA | From Neighbor to Board Member',
    description: 'Derrick Threatt is running to be the first resident board member for Grand Central Park Residential Association Inc. Learn about his vision for our community.',
    images: [
      {
        url: 'https://gcphoatx.com/api/og?title=Derrick%20Threatt%20for%20GCP%20HOA&subtitle=From%20Neighbor%20to%20Board%20Member',
        width: 1200,
        height: 630,
        alt: 'Derrick Threatt for Grand Central Park HOA',
      },
    ],
    siteName: 'Derrick Threatt for Grand Central Park HOA',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Derrick Threatt for Grand Central Park HOA | From Neighbor to Board Member',
    description: 'Derrick Threatt is running to be the first resident board member for Grand Central Park Residential Association Inc. Learn about his vision for our community.',
    images: ['https://gcphoatx.com/api/og?title=Derrick%20Threatt%20for%20GCP%20HOA&subtitle=From%20Neighbor%20to%20Board%20Member'],
  },
};

/**
 * The main page component that renders the campaign HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const Page = () => {
    return <HomePage />;
};

export default Page;
