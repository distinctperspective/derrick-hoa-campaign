import Image from 'next/image';
import Link from 'next/link';
import Footer from './Footer';
import Navbar from './Navbar';

const HomePage: React.FC = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-grow'>
                {/* Hero Section with Background */}
                <div className='relative pt-[50px]'>
                    {/* Background Image */}
                    <div className='absolute inset-0 h-full' style={{ height: '600px' }}>
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
                    <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8' style={{ minHeight: '600px' }}>
                        <div className='flex flex-col-reverse items-center gap-8 py-16 lg:flex-row lg:justify-between lg:py-24'>
                            {/* Left Column - Text Content */}
                            <div className='flex flex-col items-center lg:items-start lg:w-1/2'>
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

                                <div className='mt-8 flex flex-wrap gap-4'>
                                    <Link 
                                        href='/vision'
                                        className='rounded-full bg-[#40BFB4] px-6 py-3 text-white hover:bg-[#40BFB4]/90 transition-colors font-extrabold uppercase tracking-wide'
                                    >
                                        My Vision
                                    </Link>
                                    <Link
                                        href='/contact'
                                        className='rounded-full border border-white px-6 py-3 text-white hover:bg-white/20 transition-colors font-extrabold uppercase tracking-wide'
                                    >
                                        Connect With Me
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
                            <div className='lg:w-1/2 flex justify-center lg:justify-end'>
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

                {/* Feature Cards */}
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 gap-6 py-12 sm:grid-cols-3 lg:py-24'>
                        <div className='rounded-xl border p-6 transition-shadow hover:shadow-lg'>
                            <h3 className='mb-2 text-xl font-semibold'>Community First</h3>
                            <p className='text-gray-600'>
                                Bringing resident perspectives to board decisions
                            </p>
                        </div>
                        <div className='rounded-xl border p-6 transition-shadow hover:shadow-lg'>
                            <h3 className='mb-2 text-xl font-semibold'>Transparency</h3>
                            <p className='text-gray-600'>
                                Open communication with all residents
                            </p>
                        </div>
                        <div className='rounded-xl border p-6 transition-shadow hover:shadow-lg'>
                            <h3 className='mb-2 text-xl font-semibold'>Experience</h3>
                            <p className='text-gray-600'>
                                Professional expertise serving our community
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
