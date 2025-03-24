'use client';
import { Phone } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className='bg-[#0B3558] py-8'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-6'>
                    <div className='flex flex-row items-center gap-4'>
                        <Logo width={120} height={120} />
                        <div className='text-white'>
                            <p className='text-2xl font-bold'>Derrick Threatt</p>
                            <p className='text-lg'>Candidate for GCP RAI Board</p>
                        </div>
                    </div>
                    <div className='flex items-center text-white'>
                        <Phone className='w-5 h-5 mr-2' />
                        <a href='tel:+19362515911' className='hover:text-[#40BFB4] transition-colors'>
                            +1 936 251 5911
                        </a>
                    </div>
                </div>
                <div className='text-sm text-white/80'>
                    <p className='mb-2'>
                        This website is a campaign website for Derrick Threatt's candidacy for the Grand Central Park RAI Board.
                    </p>
                    <p className='mb-2'>
                        This is not an official website of Grand Central Park Residential Association Inc. (GCP RAI) 
                        and is not affiliated with, endorsed by, or connected to GCP RAI or its management.
                    </p>
                    <p>
                        All content on this website is for campaign purposes only and represents the views and initiatives 
                        of Derrick Threatt as a candidate for the board position.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
