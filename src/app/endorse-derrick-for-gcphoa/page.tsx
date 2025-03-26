import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import EndorsementForm from './EndorsementForm';
import Image from 'next/image';

// Construct the absolute URL for the OG image
const title = 'Endorse Derrick Threatt for GCP HOA | Show Your Support';
const subtitle = 'Your support helps strengthen our community. Share your endorsement in just a few simple steps.';
const baseUrl = process.env.NEXTAUTH_URL || 'https://gcphoatx.com';
const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`;

export const metadata: Metadata = {
    title: title,
    description: 'Support Derrick Threatt\'s campaign for GCP HOA by sharing your endorsement. Your voice matters in shaping our community\'s future.',
    keywords: ['Derrick Threatt', 'Grand Central Park', 'GCP', 'HOA', 'Endorsement', 'Community Support', 'Resident Endorsement'],
    openGraph: {
        title: title,
        description: 'Support Derrick Threatt\'s campaign for GCP HOA by sharing your endorsement. Your voice matters in shaping our community\'s future.',
        images: [
            {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: 'Endorse Derrick Threatt for GCP HOA'
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: 'Support Derrick Threatt\'s campaign for GCP HOA by sharing your endorsement. Your voice matters in shaping our community\'s future.',
        images: [ogImageUrl],
    }
};

export default function EndorsementPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <PageHero 
                    title="Endorse Derrick Threatt for GCP HOA"
                    subtitle="Your support helps strengthen our community. Share your endorsement in just a few simple steps."
                    imageSrc="/images/hero-background.jpg"
                    imageAlt="Endorse Derrick Threatt"
                />
                
                <div className="bg-gray-50">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                            {/* Bio Section with Image */}
                            <section className="mb-8 sm:mb-12 bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#40BFB4]">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="md:w-1/3 flex justify-center">
                                        <div className="relative w-48 h-48 md:w-full md:h-auto aspect-square">
                                            <Image
                                                src="/images/derrick-cutout.png"
                                                alt="Derrick Threatt"
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 192px, 33vw"
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-2/3">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B3558] mb-4">From Neighbor to Board Member</h2>
                                        <p className="text-gray-700">
                                            As a proud resident of Grand Central Park, I'm running to be our community's
                                            first resident board member. Together, we can shape the future of our neighborhood.
                                        </p>
                                        <div className="mt-4 flex justify-end">
                                            <span className="text-[#40BFB4] font-bold">— Derrick Threatt</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            
                            <section className="mb-12 sm:mb-16">
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B3558] mb-4 sm:mb-6">Why Your Endorsement Matters</h2>
                                <p className="text-base sm:text-lg text-gray-600 mb-6">
                                    Community support is the foundation of effective leadership. By sharing your endorsement, 
                                    you're helping to build a stronger, more connected Grand Central Park community. Your voice 
                                    matters in shaping our neighborhood's future.
                                </p>
                                
                                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                                    <h3 className="text-xl font-semibold text-[#0B3558] mb-4">How Endorsements Work</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-[#40BFB4] font-bold mr-2">•</span> 
                                            <span>Your endorsement will be reviewed by our team before being published</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-[#40BFB4] font-bold mr-2">•</span> 
                                            <span>Only your street name and initials will be publicly displayed (e.g., "Resident on Callery Pear Court - D.T.")</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-[#40BFB4] font-bold mr-2">•</span> 
                                            <span>Your full name, email, and other personal information will remain private</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-[#40BFB4] font-bold mr-2">•</span> 
                                            <span>You can update your profile information during the endorsement process</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                                    <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Simple 3-Step Process</h3>
                                    <ol className="relative border-l border-gray-200 ml-3 pl-6 space-y-6">
                                        <li className="mb-6">
                                            <div className="absolute w-8 h-8 bg-[#40BFB4] rounded-full -left-4 flex items-center justify-center">
                                                <span className="text-white font-bold">1</span>
                                            </div>
                                            <h4 className="text-lg font-semibold text-[#0B3558]">Sign in with Google</h4>
                                            <p className="text-gray-600">
                                                Use your Google account to quickly sign in. This helps us verify you're a real person.
                                            </p>
                                        </li>
                                        <li className="mb-6">
                                            <div className="absolute w-8 h-8 bg-[#40BFB4] rounded-full -left-4 flex items-center justify-center">
                                                <span className="text-white font-bold">2</span>
                                            </div>
                                            <h4 className="text-lg font-semibold text-[#0B3558]">Complete Your Profile</h4>
                                            <p className="text-gray-600">
                                                Add or update your address and contact information. You can also edit your display name if needed.
                                            </p>
                                        </li>
                                        <li>
                                            <div className="absolute w-8 h-8 bg-[#40BFB4] rounded-full -left-4 flex items-center justify-center">
                                                <span className="text-white font-bold">3</span>
                                            </div>
                                            <h4 className="text-lg font-semibold text-[#0B3558]">Submit Your Endorsement</h4>
                                            <p className="text-gray-600">
                                                Share why you support Derrick Threatt for GCP HOA. Your endorsement will be published after review.
                                            </p>
                                        </li>
                                    </ol>
                                </div>
                                
                                <EndorsementForm />
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
