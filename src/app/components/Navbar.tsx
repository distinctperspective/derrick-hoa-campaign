'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Button as ShadcnButton } from '@/registry/new-york-v4/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/registry/new-york-v4/ui/dropdown-menu';

import Button from './Button';
import Logo from './Logo';
import { AnimatePresence, motion } from 'framer-motion';
import { User } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

// Status badge component
const StatusBadge = ({ status, color }: { status: string; color: string }) => (
    <span className={`flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium text-white ${color}`}>
        {status}
    </span>
);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    return (
        <nav className='fixed top-4 z-50 w-full'>
            <div className='container mx-auto max-w-[1600px] px-4'>
                <div className='relative z-50 flex h-[60px] w-full items-center justify-between overflow-visible rounded-2xl bg-[#0B3558] px-4 shadow-lg md:px-8'>
                    <Logo
                        className='relative z-50 mt-[-8px] -ml-[40px] h-[80px] w-[200px] text-white hover:text-gray-200'
                        imageClassName='object-contain'
                    />

                    {/* Desktop Navigation */}
                    <div className='ml-auto hidden items-center gap-6 md:flex'>
                        <Link
                            href='/vision'
                            className='font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'>
                            Vision
                        </Link>
                        <Link
                            href='/about'
                            className='font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'>
                            Who Is Derrick?
                        </Link>
                        <Link
                            href='/your-concerns'
                            className='font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'>
                            Your Concerns
                        </Link>
                        <Link
                            href='/financials'
                            className='font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'>
                            Financials
                        </Link>
                        <Link
                            href='/faqs'
                            className='font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'>
                            FAQs
                        </Link>
                        <Link
                            href='/request'
                            className='font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'>
                            Contact Me
                        </Link>
                        <Button
                            href='https://grandcentralpark.ivotehoa.com/login'
                            target='_blank'
                            rel='noopener noreferrer'
                            variant='accent'
                            size='default'
                            uppercase>
                            Vote Now
                        </Button>
                        {status === 'authenticated' && session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className='relative flex items-center'>
                                        {session.user?.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name || 'User'}
                                                width={40}
                                                height={40}
                                                className='rounded-full border-2 border-white transition-colors hover:border-gray-200'
                                            />
                                        ) : (
                                            <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#E85C41] transition-colors hover:border-gray-200'>
                                                <User className='h-6 w-6 text-white' />
                                            </div>
                                        )}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='z-40 mt-4 w-64 border-none bg-[#0B3558] text-white'>
                                    <DropdownMenuLabel>
                                        <div className='font-medium'>{session.user?.name}</div>
                                        <div className='text-sm text-white/80'>{session.user?.email}</div>
                                        <div className='mt-2 flex flex-wrap gap-2'>
                                            {session.user?.isResident ? (
                                                <StatusBadge status='Resident' color='bg-emerald-600' />
                                            ) : (
                                                <StatusBadge status='Guest' color='bg-teal-500' />
                                            )}
                                            {session.user?.isAdmin && <StatusBadge status='Admin' color='bg-red-600' />}
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className='bg-white/20' />
                                    <DropdownMenuItem
                                        className='cursor-pointer focus:bg-white/10 focus:text-white'
                                        onClick={() => router.push('/profile')}>
                                        <span className='font-extrabold tracking-wide uppercase'>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className='cursor-pointer focus:bg-white/10 focus:text-white'
                                        onClick={() => router.push('/auth/signout')}>
                                        <span className='font-extrabold tracking-wide uppercase'>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button onClick={() => router.push('/auth/signin')} variant='primary' size='default' uppercase>
                                Login
                            </Button>
                        )}
                    </div>

                    {/* Mobile Navigation */}
                    <div className='flex items-center gap-4 md:hidden'>
                        {status === 'authenticated' && session ? (
                            <button className='relative flex items-center' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || 'User'}
                                        width={32}
                                        height={32}
                                        className='rounded-full border-2 border-white transition-colors hover:border-gray-200'
                                    />
                                ) : (
                                    <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E85C41] transition-colors hover:border-gray-200'>
                                        <User className='h-5 w-5 text-white' />
                                    </div>
                                )}
                            </button>
                        ) : (
                            <Button
                                variant='ghost'
                                className='relative h-8 w-8 p-0 text-white hover:bg-transparent'
                                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <motion.div
                                    className='absolute h-[2px] w-6 bg-white'
                                    initial={false}
                                    animate={{
                                        rotate: isMenuOpen ? 45 : 0,
                                        y: isMenuOpen ? 0 : -4
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.div
                                    className='absolute h-[2px] w-6 bg-white'
                                    initial={false}
                                    animate={{
                                        opacity: isMenuOpen ? 0 : 1
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.div
                                    className='absolute h-[2px] w-6 bg-white'
                                    initial={false}
                                    animate={{
                                        rotate: isMenuOpen ? -45 : 0,
                                        y: isMenuOpen ? 0 : 4
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                            </Button>
                        )}
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className='fixed top-[64px] right-[16px] left-[16px] z-40 rounded-b-2xl bg-[#0B3558] px-6 py-4 shadow-lg'>
                                    <div className='container mx-auto max-w-[1600px]'>
                                        {status === 'authenticated' && session && (
                                            <div className='mb-3 border-b border-white/20 py-2'>
                                                <div className='font-medium text-white'>{session.user?.name}</div>
                                                <div className='text-sm text-white/80'>{session.user?.email}</div>
                                            </div>
                                        )}
                                        <Link
                                            href='/vision'
                                            className='block py-2 font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'
                                            onClick={() => setIsMenuOpen(false)}>
                                            Vision
                                        </Link>
                                        <Link
                                            href='/about'
                                            className='block py-2 font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'
                                            onClick={() => setIsMenuOpen(false)}>
                                            Who Is Derrick
                                        </Link>
                                        <Link
                                            href='/your-concerns'
                                            className='block py-2 font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'
                                            onClick={() => setIsMenuOpen(false)}>
                                            Your Concerns
                                        </Link>
                                        <Link
                                            href='/financials'
                                            className='block py-2 font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'
                                            onClick={() => setIsMenuOpen(false)}>
                                            Financials
                                        </Link>
                                        <Link
                                            href='/faqs'
                                            className='block py-2 font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'
                                            onClick={() => setIsMenuOpen(false)}>
                                            FAQs
                                        </Link>
                                        <Link
                                            href='/request'
                                            className='block py-2 font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'
                                            onClick={() => setIsMenuOpen(false)}>
                                            Contact Me
                                        </Link>
                                        {status === 'authenticated' && session && (
                                            <Link
                                                href='/profile'
                                                className='block py-2 font-extrabold tracking-wide text-white uppercase transition-colors hover:text-gray-200'
                                                onClick={() => setIsMenuOpen(false)}>
                                                Profile
                                            </Link>
                                        )}
                                        {status !== 'authenticated' && (
                                            <div className='mt-3 border-t border-white/20 pt-3'>
                                                <div className='flex flex-row gap-2'>
                                                    <Button
                                                        href='https://grandcentralpark.ivotehoa.com/login'
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        variant='accent'
                                                        size='default'
                                                        uppercase
                                                        className='flex-1'
                                                        onClick={() => setIsMenuOpen(false)}>
                                                        Vote Now
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            router.push('/auth/signin');
                                                            setIsMenuOpen(false);
                                                        }}
                                                        variant='primary'
                                                        size='default'
                                                        uppercase
                                                        className='flex-1'>
                                                        Login
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                        {status === 'authenticated' && session && (
                                            <div className='mt-3 border-t border-white/20 pt-3'>
                                                <div className='flex flex-row gap-2'>
                                                    <Button
                                                        href='https://grandcentralpark.ivotehoa.com/login'
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        variant='accent'
                                                        size='default'
                                                        uppercase
                                                        className='flex-1'
                                                        onClick={() => setIsMenuOpen(false)}>
                                                        Vote Now
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            router.push('/auth/signout');
                                                            setIsMenuOpen(false);
                                                        }}
                                                        variant='primary'
                                                        size='default'
                                                        uppercase
                                                        className='flex-1'>
                                                        Logout
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
