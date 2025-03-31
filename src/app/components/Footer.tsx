'use client';

import { UnsubscribeModal } from '@/components/UnsubscribeModal';

import Logo from './Logo';
import { MailX, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className='bg-[#0B3558] py-8'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='mb-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
                    <div className='flex flex-row items-center gap-4'>
                        <Logo width={120} height={120} />
                        <div className='text-white'>
                            <p className='text-2xl font-bold'>Derrick Threatt</p>
                            <p className='text-lg'>Candidate for GCP RAI Board</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center text-white'>
                            <Phone className='mr-2 h-5 w-5' />
                            <a href='tel:+19362515911' className='transition-colors hover:text-[#40BFB4]'>
                                +1 936 251 5911
                            </a>
                        </div>
                        <UnsubscribeModal>
                            <button className='flex items-center text-white/60 transition-colors hover:text-[#40BFB4]'>
                                <MailX className='mr-2 h-5 w-5' />
                                <span>Unsubscribe from emails</span>
                            </button>
                        </UnsubscribeModal>
                    </div>
                </div>
                <div className='text-sm text-white/80'>
                    <p className='mb-2'>
                        This website is a campaign website for Derrick Threatt's candidacy for the Grand Central Park
                        RAI Board.
                    </p>
                    <p className='mb-2'>
                        This is not an official website of Grand Central Park Residential Association Inc. (GCP RAI) and
                        is not affiliated with, endorsed by, or connected to GCP RAI or its management.
                    </p>
                    <p className='mb-4'>
                        All content on this website is for campaign purposes only and represents the views and
                        initiatives of Derrick Threatt as a candidate for the board position.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
