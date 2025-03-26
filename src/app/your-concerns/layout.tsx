import { Metadata } from 'next';
import { generateOgMetadata } from '../utils/generateOgMetadata';

// Construct the absolute URL for the OG image
const title = 'Community Concerns | Derrick Threatt for GCP RAI';
const description = 'Learn about the issues that matter most to Grand Central Park residents and Derrick Threatt\'s plans to address these community concerns.';
const subtitle = 'Learn about the issues that matter most to Grand Central Park residents';

// Ensure baseUrl is always a valid URL
const baseUrl = process.env.NEXTAUTH_URL || 'https://gcphoatx.com';
const ogImageUrl = new URL('/api/og', baseUrl).toString() + `?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`;

export const metadata: Metadata = generateOgMetadata({
    title,
    description,
    subtitle,
    keywords: ['Community Concerns', 'HOA Issues', 'Resident Survey'],
});

export default function YourConcernsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
