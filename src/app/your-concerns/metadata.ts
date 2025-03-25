import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Community Concerns | Derrick Threatt for GCP RAI',
    description: 'Learn about the issues that matter most to Grand Central Park residents and Derrick Threatt\'s plans to address these community concerns.',
    keywords: ['Derrick Threatt', 'Grand Central Park', 'GCP', 'RAI', 'Community Concerns', 'HOA Issues', 'Resident Survey'],
    openGraph: {
        title: 'Community Concerns | Derrick Threatt for GCP RAI',
        description: 'Learn about the issues that matter most to Grand Central Park residents and Derrick Threatt\'s plans to address these community concerns.',
        images: [
            {
                url: '/images/hoa-meeting.jpeg',
                width: 1200,
                height: 630,
                alt: 'HOA Meeting Background'
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Community Concerns | Derrick Threatt for GCP RAI',
        description: 'Learn about the issues that matter most to Grand Central Park residents and Derrick Threatt\'s plans to address these community concerns.',
        images: ['/images/hoa-meeting.jpeg'],
    }
};
