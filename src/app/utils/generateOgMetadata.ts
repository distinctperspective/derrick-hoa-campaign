import { Metadata } from 'next';

interface GenerateOgMetadataProps {
  title: string;
  description: string;
  subtitle?: string;
  keywords?: string[];
}

export function generateOgMetadata({
  title,
  description,
  subtitle = 'Building a stronger community together',
  keywords = [],
}: GenerateOgMetadataProps): Metadata {
  // Construct the absolute URL for the OG image
  const baseUrl = process.env.NEXTAUTH_URL || 'https://gcphoatx.com';
  
  // Ensure baseUrl is a valid URL by using the URL constructor
  const ogImageUrl = new URL('/api/og', baseUrl).toString() + `?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`;

  return {
    title,
    description,
    keywords: ['Derrick Threatt', 'Grand Central Park', 'GCP', 'HOA', ...keywords],
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      siteName: 'Derrick Threatt for GCP RAI',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@derrickthreatt',
    }
  };
}
