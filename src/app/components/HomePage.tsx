'use client';

import Image from 'next/image';
import Link from 'next/link';
import Footer from './Footer';
import Navbar from './Navbar';
import { 
    Trees, 
    Building2, 
    DollarSign,
    Phone,
    ChevronDown
} from 'lucide-react';
import EndorsementCarousel from './EndorsementCarousel';
import { useState } from 'react';
import EndorsementModal from './EndorsementModal';
import { useSession } from 'next-auth/react';

const HomePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const { data: session } = useSession();

    const handleEndorsementSubmit = async (message: string) => {
        try {
            const response = await fetch('/api/endorsements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit endorsement');
            }

            // Close modal after successful submission
            setTimeout(() => {
                setIsModalOpen(false);
            }, 3000); // Close after 3 seconds to allow user to see success message
            
            return await response.json();
        } catch (error) {
            console.error('Error submitting endorsement:', error);
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error('An unexpected error occurred');
            }
        }
    };

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-grow'>
                {/* Hero Section with Background */}
                <div className='relative pt-[50px]'>
                    {/* Background Image */}
                    <div className='absolute inset-0 w-full h-full'>
                        <Image
                            src='/images/optimized/hero-background.jpg'
                            alt='Grand Central Park'
                            fill
                            sizes="100vw"
                            className='object-cover'
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhgJAi5qj4AAAAABJRU5ErkJggg=="
                        />
                        <div className='absolute inset-0 bg-black/60' />
                    </div>

                    {/* Content */}
                    <div className='relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24'>
                        <div className='flex flex-col-reverse items-center gap-8 lg:flex-row lg:justify-between'>
                            {/* Left Column - Text Content */}
                            <div className='flex flex-col items-center text-center lg:text-left lg:items-start lg:w-1/2'>
                                <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                                    From Neighbor to<br />Board Member
                                </h1>
                                <div className='mt-6'>
                                    <h2 className='text-3xl font-bold text-[#40BFB4] sm:text-5xl'>
                                        Derrick Threatt
                                    </h2>
                                    <p className='mt-2 text-xl text-gray-200 sm:text-2xl'>
                                        Your Elected GCP RAI Board Representative
                                    </p>
                                </div>
                                
                                <p className='mt-6 text-lg text-gray-100'>
                                    Thank you for your overwhelming support in electing me as our community's
                                    first resident board member. I'm honored to represent you and committed to 
                                    making our neighborhood even better.
                                </p>

                                <div className='mt-4 flex items-center text-white'>
                                    <a href='tel:+19362515911' className='flex items-center text-[#40BFB4] hover:text-[#40BFB4]/80 transition-colors'>
                                        <Phone className='w-5 h-5 mr-2' />
                                        +1 936 251 5911
                                    </a>
                                </div>

                                <div className='mt-8 flex flex-col sm:flex-row gap-4'>
                                    <Link
                                        href='/vision'
                                        className='rounded-full bg-[#40BFB4] px-6 py-3 text-white hover:bg-[#40BFB4]/90 transition-colors font-extrabold uppercase tracking-wide'
                                    >
                                        My Vision
                                    </Link>
                                    <Link
                                        href='/endorse-derrick-for-gcphoa'
                                        className='rounded-full bg-[#0B3558] px-6 py-3 text-white hover:bg-[#0B3558]/90 transition-colors font-extrabold uppercase tracking-wide'
                                    >
                                        Endorse Me
                                    </Link>
                                    <a
                                        href='https://grandcentralpark.ivotehoa.com/login'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='hidden rounded-full bg-[#E85C41] px-6 py-3 text-white hover:bg-[#E85C41]/90 transition-colors font-extrabold uppercase tracking-wide'
                                    >
                                        Vote Now
                                    </a>
                                </div>
                            </div>

                            {/* Right Column - Image */}
                            <div className='lg:w-1/2 mt-[30px] lg:mt-0 flex justify-center lg:justify-end'>
                                <div className='flex flex-col items-center'>
                                    <div className='relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96'>
                                        <div className='absolute inset-0 rounded-2xl bg-black/10'></div>
                                        <Image
                                            src='/images/optimized/derrick.jpg'
                                            alt='Derrick Threatt - Elected Grand Central Park RAI Board Member'
                                            fill
                                            sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 384px"
                                            className='rounded-2xl object-cover'
                                            style={{ objectPosition: '50% 30%' }}
                                            priority
                                        />
                                    </div>
                                    <div className='mt-4 text-center'>
                                        <h3 className='text-xl font-semibold text-white'>Director, Derrick Threatt</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Your Vote Has Been Heard Section */}
                <div className='bg-white py-16'>
                  <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='text-center mb-12'>
                      <h2 className='text-3xl sm:text-4xl font-bold text-[#0B3558] mb-4'>Your Vote Has Been Heard</h2>
                      <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto'>
                        Thank you for your overwhelming support in electing me as your first resident board member!
                      </p>
                    </div>

                    <div className='bg-gray-50 rounded-xl p-8 shadow-sm'>
                      <div className='flex flex-col lg:flex-row justify-between items-center mb-8 gap-8'>
                        <div className='lg:w-1/2'>
                          <h3 className='text-2xl font-semibold text-[#0B3558] mb-4'>Election Results</h3>
                          <p className='text-lg text-gray-700 mb-4'>
                            I'm honored to announce that I've been elected to serve as your representative on the Grand Central Park HOA Board of Directors.
                          </p>
                          <div className='space-y-4 text-gray-700'>
                            <p>
                              <span className='font-semibold'>Historic Participation:</span> We achieved an impressive 37% voter participation rate from our 997 homeowners, far exceeding the required 10% quorum.
                            </p>
                            <p>
                              <span className='font-semibold'>Strong Mandate:</span> With 109 votes, I received the highest number of votes among all candidates, representing a clear mandate from our community.
                            </p>
                            <p className='mt-6'>
                              After my first meeting with the board and CCMC, I will be setting up personal meet-and-greet sessions at the Lake House by appointment. This will be your opportunity to share your ideas, concerns, and vision for our community directly with me.
                            </p>
                          </div>
                        </div>
                        <div className='lg:w-1/2 flex justify-center'>
                          <div className='relative max-w-md'>
                            <Image
                              src='/images/vote-results.png'
                              alt='Grand Central Park HOA Election Results'
                              width={500}
                              height={400}
                              className='rounded-lg shadow-md'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='bg-white rounded-lg p-6 border border-gray-200'>
                        <h4 className='text-xl font-semibold text-[#0B3558] mb-4'>Next Steps</h4>
                        <div className='space-y-4'>
                          <p className='text-gray-700'>
                            <span className='font-semibold'>Board Integration:</span> I'll be attending my first official board meeting to begin representing your interests immediately.
                          </p>
                          <p className='text-gray-700'>
                            <span className='font-semibold'>Community Meet & Greets:</span> I'll be scheduling one-on-one meetings with residents at the Lake House to hear your concerns directly.
                          </p>
                          <p className='text-gray-700'>
                            <span className='font-semibold'>Regular Updates:</span> Expect consistent communication about board activities and decisions that affect our community.
                          </p>
                        </div>
                      </div>

                      <div className='mt-8 flex justify-center'>
                        <button
                          disabled
                          className='rounded-full bg-[#40BFB4]/70 px-6 py-3 text-white cursor-not-allowed opacity-80 font-bold'
                        >
                          Meet with me. (Coming Soon)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Concerns Section */}
                <div className='bg-gray-50 py-16'>
                  <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='text-center mb-12'>
                      <h2 className='text-3xl sm:text-4xl font-bold text-[#0B3558] mb-4'>A Candidate Who Listens</h2>
                      <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto'>
                        This candidate is in touch with the community and cares about what you care about through his own lens.
                      </p>
                    </div>

                    <div className='grid gap-8 md:grid-cols-3'>
                      {/* Issue 1 */}
                      <div className='bg-white rounded-xl p-6 shadow-sm'>
                        <div className='flex items-center mb-4'>
                          <Trees className='w-6 h-6 text-[#40BFB4] mr-3' />
                          <h3 className='text-xl font-semibold text-[#0B3558]'>Common Areas & Amenities</h3>
                        </div>
                        <p className='text-gray-600 mb-4'>Top concern at 25.7% of responses</p>
                        <div className='space-y-2 text-gray-600'>
                          <p><strong>Our Solution:</strong></p>
                          <ul className='list-disc pl-5 space-y-1'>
                            <li>Regular maintenance schedule reviews</li>
                            <li>Quality assessment of facilities</li>
                            <li>Prioritized improvement plans</li>
                          </ul>
                        </div>
                      </div>

                      {/* Issue 2 */}
                      <div className='bg-white rounded-xl p-6 shadow-sm'>
                        <div className='flex items-center mb-4'>
                          <Building2 className='w-6 h-6 text-[#40BFB4] mr-3' />
                          <h3 className='text-xl font-semibold text-[#0B3558]'>Amenities Quality</h3>
                        </div>
                        <p className='text-gray-600 mb-4'>Second highest at 19.0% of responses</p>
                        <div className='space-y-2 text-gray-600'>
                          <p><strong>Our Solution:</strong></p>
                          <ul className='list-disc pl-5 space-y-1'>
                            <li>Comprehensive amenity audit</li>
                            <li>Upgrade and modernization plan</li>
                            <li>Regular community feedback</li>
                          </ul>
                        </div>
                      </div>

                      {/* Issue 3 */}
                      <div className='bg-white rounded-xl p-6 shadow-sm'>
                        <div className='flex items-center mb-4'>
                          <DollarSign className='w-6 h-6 text-[#40BFB4] mr-3' />
                          <h3 className='text-xl font-semibold text-[#0B3558]'>HOA Fee Structure</h3>
                        </div>
                        <p className='text-gray-600 mb-4'>Third highest at 13.7% of responses</p>
                        <div className='space-y-2 text-gray-600'>
                          <p><strong>Our Solution:</strong></p>
                          <ul className='list-disc pl-5 space-y-1'>
                            <li>Transparent budget allocation</li>
                            <li>Regular financial reviews</li>
                            <li>Value-based assessments</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vision Preview Section */}
                <div className='relative py-16'>
                    {/* GCP Logo - Positioned at the top of Vision section */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <Image
                        src="/images/optimized/gcp-logo.png"
                        alt="Grand Central Park Logo"
                        width={140}
                        height={140}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhgJAi5qj4AAAAABJRU5ErkJggg=="
                      />
                    </div>
                    
                    {/* Background Image */}
                    <div className='absolute inset-0 w-full h-full'>
                        <Image
                            src='/images/optimized/community.jpg'
                            alt='Grand Central Park Community'
                            fill
                            sizes="100vw"
                            className='object-cover'
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhgJAi5qj4AAAAABJRU5ErkJggg=="
                        />
                        <div className='absolute inset-0 bg-black/60' />
                    </div>
                    
                    <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                        <div className='text-center mb-12'>
                            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>My Vision for Our Community</h2>
                            <p className='text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto'>
                                As your first resident board member, I'm committed to these key priorities:
                            </p>
                        </div>

                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
                            <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20'>
                                <h3 className='text-xl font-semibold text-[#40BFB4] mb-3'>Resident Voice</h3>
                                <p className='text-white'>Ensuring resident perspectives are represented in all board decisions.</p>
                            </div>
                            
                            <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20'>
                                <h3 className='text-xl font-semibold text-[#40BFB4] mb-3'>Transparent Communication</h3>
                                <p className='text-white'>Keeping residents informed with clear, consistent updates on board activities.</p>
                            </div>
                            
                            <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20'>
                                <h3 className='text-xl font-semibold text-[#40BFB4] mb-3'>Community Excellence</h3>
                                <p className='text-white'>Maintaining and enhancing our amenities and common areas to highest standards.</p>
                            </div>
                            
                            <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20'>
                                <h3 className='text-xl font-semibold text-[#40BFB4] mb-3'>Fiscal Responsibility</h3>
                                <p className='text-white'>Ensuring HOA fees provide maximum value and benefit to all residents.</p>
                            </div>
                        </div>
                        
                        <div className='mt-10 text-center'>
                            <Link
                                href='/vision'
                                className='inline-flex items-center text-[#40BFB4] hover:text-white font-semibold transition-colors'
                            >
                                Read my full vision for Grand Central Park
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Page Navigation Section */}
                <div className='bg-white py-16'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                        <div className='text-center mb-12'>
                            <h2 className='text-3xl sm:text-4xl font-bold text-[#0B3558] mb-4'>Learn More About My Campaign</h2>
                            <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto'>
                                Explore these pages to learn more about my background, plans, and priorities for our community.
                            </p>
                        </div>

                        {/* Vision & About Section */}
                        <div className='flex flex-col md:flex-row gap-8 mb-12'>
                            <div className='md:w-1/2 bg-[#0B3558] rounded-xl p-8 text-white'>
                                <h3 className='text-2xl font-semibold text-[#40BFB4] mb-4'>My Vision</h3>
                                <p className='mb-6'>
                                    A comprehensive plan for improving our community and representing resident interests on the board. 
                                    Learn about my priorities and how I plan to make a positive impact.
                                </p>
                                <Link
                                    href='/vision'
                                    className='inline-flex items-center text-white hover:text-[#40BFB4] transition-colors font-semibold'
                                >
                                    Explore My Vision
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                            
                            <div className='md:w-1/2 bg-gray-100 rounded-xl p-8'>
                                <h3 className='text-2xl font-semibold text-[#0B3558] mb-4'>About Derrick</h3>
                                <p className='mb-6 text-gray-700'>
                                    Learn about my background, experience, and why I'm passionate about serving our community. 
                                    My professional expertise and community involvement make me uniquely qualified to serve.
                                </p>
                                <Link
                                    href='/about'
                                    className='inline-flex items-center text-[#0B3558] hover:text-[#40BFB4] transition-colors font-semibold'
                                >
                                    Read My Story
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Concerns & Financials Section */}
                        <div className='flex flex-col-reverse md:flex-row gap-8'>
                            <div className='md:w-1/2 bg-gray-100 rounded-xl p-8'>
                                <h3 className='text-2xl font-semibold text-[#0B3558] mb-4'>Your Concerns</h3>
                                <p className='mb-6 text-gray-700'>
                                    See how I plan to address the top concerns shared by our community members.
                                    From amenities to HOA fees, I'm focused on the issues that matter most to you.
                                </p>
                                <Link
                                    href='/your-concerns'
                                    className='inline-flex items-center text-[#0B3558] hover:text-[#40BFB4] transition-colors font-semibold'
                                >
                                    View Community Concerns
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                            
                            <div className='md:w-1/2 bg-[#0B3558] rounded-xl p-8 text-white'>
                                <h3 className='text-2xl font-semibold text-[#40BFB4] mb-4'>Financial Approach</h3>
                                <p className='mb-6'>
                                    My approach to ensuring fiscal responsibility and transparency with HOA funds.
                                    I believe in maximizing value for all residents through careful financial management.
                                </p>
                                <Link
                                    href='/vision'
                                    className='inline-flex items-center text-white hover:text-[#40BFB4] transition-colors font-semibold'
                                >
                                    Learn About My Financial Approach
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Endorsements Section */}
                <div className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-[#0B3558] mb-2">Resident Endorsements</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Hear from your neighbors about why they support my candidacy for the first resident board member position.
                            </p>
                        </div>
                        
                        <EndorsementCarousel />
                        
                        <div className="text-center mt-2">
                            <p className="text-sm text-gray-500 italic mb-4 max-w-4xl mx-auto">
                                All endorsements are confidential. Only street names and initials are disclosed to protect residents' privacy.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center rounded-full bg-[#0B3558] px-6 py-3 text-white hover:bg-[#0B3558]/90 transition-colors font-bold"
                            >
                                {session ? "Endorse My Campaign" : "Login to Endorse Me"}
                            </button>
                            
                            {isModalOpen && (
                                <EndorsementModal
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    onSubmit={handleEndorsementSubmit}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className='bg-[#0B3558] py-16'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                        <div className='text-center'>
                            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>Important Dates</h2>
                            <p className='text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-8'>
                                Make your voice heard in this historic election for our community's first resident board member.
                            </p>
                            
                            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto'>
                                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6'>
                                    <h3 className='text-xl font-semibold text-[#40BFB4] mb-2'>Voting Opens</h3>
                                    <p className='text-white'>March 17, 2025</p>
                                </div>
                                
                                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6'>
                                    <h3 className='text-xl font-semibold text-[#40BFB4] mb-2'>Town Hall</h3>
                                    <p className='text-white'>April 2, 2025</p>
                                    <p className='text-white text-sm mt-1'>6:00PM - 8:00PM</p>
                                </div>
                                
                                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6'>
                                    <h3 className='text-xl font-semibold text-[#40BFB4] mb-2'>Voting Closes</h3>
                                    <p className='text-white'>April 7, 2025</p>
                                </div>

                                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6'>
                                    <h3 className='text-xl font-semibold text-[#40BFB4] mb-2'>Results Announced</h3>
                                    <p className='text-white'>April 10, 2025</p>
                                    <p className='text-white text-sm mt-1'>Annual Meeting</p>
                                </div>
                            </div>
                            
                            <div className='mt-10'>
                                <a
                                    href='https://grandcentralpark.ivotehoa.com/login'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='hidden rounded-full bg-[#E85C41] px-8 py-3 text-white hover:bg-[#E85C41]/90 transition-colors font-extrabold uppercase tracking-wide mr-4'
                                >
                                    Vote Now
                                </a>
                                <Link
                                    href='/request'
                                    className='rounded-full bg-[#40BFB4] px-8 py-3 text-white hover:bg-[#40BFB4]/90 transition-colors font-extrabold uppercase tracking-wide'
                                >
                                    Contact Me
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
