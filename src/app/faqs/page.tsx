import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import FAQAccordion from './FAQAccordion';
import Link from 'next/link';

// Construct the absolute URL for the OG image
const title = 'Frequently Asked Questions | Derrick Threatt for GCP HOA';
const subtitle = 'Find answers to common questions about my campaign and vision for our community';
const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`;

export const metadata: Metadata = {
    title: title,
    description: 'Find answers to common questions about Derrick Threatt\'s campaign for the Grand Central Park HOA board and his vision for our community.',
    keywords: ['Derrick Threatt', 'Grand Central Park', 'GCP', 'HOA', 'FAQ', 'Questions', 'Answers', 'Community'],
    openGraph: {
        title: title,
        description: 'Find answers to common questions about Derrick Threatt\'s campaign for the Grand Central Park HOA board and his vision for our community.',
        images: [
            {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: 'Frequently Asked Questions | Derrick Threatt for GCP HOA'
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: 'Find answers to common questions about Derrick Threatt\'s campaign for the Grand Central Park HOA board and his vision for our community.',
        images: [ogImageUrl],
    }
};

export default function FAQsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            
            <PageHero 
                title="Frequently Asked Questions"
                subtitle="Find answers to common questions about my campaign and vision for our community"
                imageSrc="/images/lakehouse.jpeg"
                imageAlt="Grand Central Park Lakehouse"
                objectPosition="center 50%"
            />

            {/* Main Content */}
            <div className='bg-gray-50'>
                <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16'>
                    <div className='mb-12 text-center'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-4'>Common Questions</h2>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                            Below you'll find answers to the questions I'm most commonly asked. If you have a question that isn't answered here, please feel free to contact me.
                        </p>
                    </div>
                    
                    <FAQAccordion />

                    {/* Endorsement Card */}
                    <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-8 md:flex md:items-center">
                            <div className="md:flex-1">
                                <h3 className="text-2xl font-bold text-[#0B3558] mb-3">Already Know Me?</h3>
                                <p className="text-gray-600 mb-6">
                                    If you're already familiar with me and my vision for Grand Central Park, I'd be honored to have your endorsement. Your support helps our community see the widespread backing for positive change.
                                </p>
                                <Link 
                                    href="/endorse-derrick-for-gcphoa" 
                                    className="inline-block bg-[#E85C41] hover:bg-[#E85C41]/90 text-white font-bold py-3 px-6 rounded-full transition-colors"
                                >
                                    Endorse My Campaign
                                </Link>
                            </div>
                            <div className="hidden md:block md:flex-shrink-0 md:ml-8">
                                <div className="w-32 h-32 rounded-full bg-[#40BFB4]/10 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#40BFB4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
