import Image from 'next/image';
import Link from 'next/link';
import Footer from './Footer';
import Navbar from './Navbar';
import { 
    Trees, 
    Building2, 
    DollarSign 
} from 'lucide-react';

const HomePage: React.FC = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-grow'>
                {/* Hero Section with Background */}
                <div className='relative pt-[50px]'>
                    {/* Background Image */}
                    <div className='absolute inset-0 w-full h-full'>
                        <Image
                            src='/images/hero-background.jpg'
                            alt='Grand Central Park'
                            fill
                            className='object-cover'
                            priority
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
                                        for GCP RAI Board
                                    </p>
                                </div>
                                
                                <p className='mt-6 text-lg text-gray-100'>
                                    As a proud resident of Grand Central Park, I'm running to be our community's
                                    first resident board member. Together, we can shape the future of our neighborhood.
                                </p>

                                <div className='mt-8 flex flex-col sm:flex-row gap-4'>
                                    <Link
                                        href='/vision'
                                        className='rounded-full bg-[#40BFB4] px-6 py-3 text-white hover:bg-[#40BFB4]/90 transition-colors font-extrabold uppercase tracking-wide'
                                    >
                                        My Vision
                                    </Link>
                                    <a
                                        href='https://grandcentralpark.ivotehoa.com/login'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='rounded-full bg-[#E85C41] px-6 py-3 text-white hover:bg-[#E85C41]/90 transition-colors font-extrabold uppercase tracking-wide'
                                    >
                                        Vote Now
                                    </a>
                                </div>
                            </div>

                            {/* Right Column - Image */}
                            <div className='lg:w-1/2 mt-[30px] lg:mt-0 flex justify-center lg:justify-end'>
                                <div className='relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96'>
                                    <div className='absolute inset-0 rounded-2xl bg-black/10'></div>
                                    <Image
                                        src='/images/derrick.jpg'
                                        alt='Derrick Threatt - Candidate for Grand Central Park RAI Board'
                                        fill
                                        className='rounded-2xl object-cover'
                                        style={{ objectPosition: '50% 30%' }}
                                        priority
                                    />
                                </div>
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

                {/* Feature Cards */}
                <div className='bg-gray-50'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                        <div className='grid grid-cols-1 gap-6 py-12 sm:grid-cols-3 lg:py-24'>
                            <div className='bg-white rounded-xl border-gray-100 border p-6 transition-shadow hover:shadow-lg'>
                                <h3 className='mb-2 text-xl font-semibold'>Community First</h3>
                                <p className='text-gray-600'>
                                    Bringing resident perspectives to board decisions
                                </p>
                            </div>
                            <div className='bg-white rounded-xl border-gray-100 border p-6 transition-shadow hover:shadow-lg'>
                                <h3 className='mb-2 text-xl font-semibold'>Transparency</h3>
                                <p className='text-gray-600'>
                                    Open communication with all residents
                                </p>
                            </div>
                            <div className='bg-white rounded-xl border-gray-100 border p-6 transition-shadow hover:shadow-lg'>
                                <h3 className='mb-2 text-xl font-semibold'>Experience</h3>
                                <p className='text-gray-600'>
                                    Professional expertise serving our community
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
