'use client';

import Link from 'next/link';
import Image from 'next/image';
import { User } from "lucide-react"
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Logo from './Logo';
import { Button as ShadcnButton } from "@/registry/new-york-v4/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu";
import Button from './Button';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <nav className='fixed top-4 w-full z-50'>
            <div className='container mx-auto px-4 max-w-[1600px]'>
                <div className='w-full h-[60px] bg-[#0B3558] rounded-2xl flex items-center justify-between px-4 md:px-8 shadow-lg overflow-visible relative z-50'>
                    <Logo className='text-white hover:text-gray-200 relative w-[200px] h-[80px] mt-[-8px] -ml-[40px] z-50' imageClassName="object-contain" />

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-6 ml-auto'>
                        <Link href="/vision" className='text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors'>
                            Vision
                        </Link>
                        <Link href="/about" className='text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors'>
                            Who Is Derrick?
                        </Link>
                        <Link href="/your-concerns" className='text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors'>
                            Your Concerns
                        </Link>
                        <Link href="/financials" className='text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors'>
                            Financials
                        </Link>
                        <Link href="/faqs" className='text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors'>
                            FAQs
                        </Link>
                        <Link href="/request" className='text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors'>
                            Contact Me
                        </Link>
                        <Button 
                            href="https://grandcentralpark.ivotehoa.com/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="accent"
                            size="default"
                            uppercase
                        >
                            Vote Now
                        </Button>
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="relative flex items-center">
                                        {session.user?.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name || "User"}
                                                width={40}
                                                height={40}
                                                className="rounded-full border-2 border-white hover:border-gray-200 transition-colors"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-[#E85C41] flex items-center justify-center border-2 border-white hover:border-gray-200 transition-colors">
                                                <User className="h-6 w-6 text-white" />
                                            </div>
                                        )}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64 mt-4 bg-[#0B3558] border-none text-white z-40">
                                    <DropdownMenuLabel>
                                        <div className="font-medium">{session.user?.name}</div>
                                        <div className="text-sm text-white/80">{session.user?.email}</div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/20" />
                                    <DropdownMenuItem 
                                        className="cursor-pointer focus:bg-white/10 focus:text-white"
                                        onClick={() => router.push('/profile')}
                                    >
                                        <span className="font-extrabold uppercase tracking-wide">Profile</span>
                                    </DropdownMenuItem>
                                    {session.user?.isAdmin && (
                                        <DropdownMenuItem 
                                            className="cursor-pointer focus:bg-white/10 focus:text-white"
                                            onClick={() => router.push('/admin')}
                                        >
                                            <span className="font-extrabold uppercase tracking-wide">Admin</span>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem 
                                        className="cursor-pointer focus:bg-white/10 focus:text-white"
                                        onClick={() => signOut()}
                                    >
                                        <span className="font-extrabold uppercase tracking-wide">Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button
                                onClick={() => signIn('google')}
                                variant="primary"
                                size="default"
                                uppercase
                            >
                                Login
                            </Button>
                        )}
                    </div>

                    {/* Mobile Navigation */}
                    <div className='md:hidden flex items-center gap-4'>
                        {session ? (
                            <button 
                                className="relative flex items-center"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || "User"}
                                        width={32}
                                        height={32}
                                        className="rounded-full border-2 border-white hover:border-gray-200 transition-colors"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-[#E85C41] flex items-center justify-center border-2 border-white hover:border-gray-200 transition-colors">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                )}
                            </button>
                        ) : (
                            <Button 
                                variant="ghost" 
                                className="text-white p-0 hover:bg-transparent relative w-8 h-8"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <motion.div
                                    className="w-6 h-[2px] bg-white absolute"
                                    initial={false}
                                    animate={{
                                        rotate: isMenuOpen ? 45 : 0,
                                        y: isMenuOpen ? 0 : -4
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.div
                                    className="w-6 h-[2px] bg-white absolute"
                                    initial={false}
                                    animate={{
                                        opacity: isMenuOpen ? 0 : 1
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.div
                                    className="w-6 h-[2px] bg-white absolute"
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
                                className="fixed top-[64px] left-[16px] right-[16px] bg-[#0B3558] shadow-lg py-4 px-6 rounded-b-2xl z-40"
                            >
                                <div className="container mx-auto max-w-[1600px]">
                                    {session && (
                                        <div className="py-2 mb-3 border-b border-white/20">
                                            <div className="font-medium text-white">{session.user?.name}</div>
                                            <div className="text-sm text-white/80">{session.user?.email}</div>
                                        </div>
                                    )}
                                    <Link 
                                        href="/vision" 
                                        className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Vision
                                    </Link>
                                    <Link 
                                        href="/about" 
                                        className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Who Is Derrick
                                    </Link>
                                    <Link 
                                        href="/your-concerns" 
                                        className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Your Concerns
                                    </Link>
                                    <Link 
                                        href="/financials" 
                                        className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Financials
                                    </Link>
                                    <Link 
                                        href="/faqs" 
                                        className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        FAQs
                                    </Link>
                                    <Link 
                                        href="/request" 
                                        className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Contact Me
                                    </Link>
                                    {session && (
                                        <Link 
                                            href="/profile" 
                                            className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                    )}
                                    {session?.user?.isAdmin && (
                                        <Link 
                                            href="/admin" 
                                            className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Admin
                                        </Link>
                                    )}
                                    {!session && (
                                        <div className="mt-3 pt-3 border-t border-white/20">
                                            <div className="flex flex-row gap-2">
                                                <Button 
                                                    href="https://grandcentralpark.ivotehoa.com/login"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    variant="accent"
                                                    size="default"
                                                    uppercase
                                                    className='flex-1'
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Vote Now
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        signIn('google');
                                                        setIsMenuOpen(false);
                                                    }}
                                                    variant="primary"
                                                    size="default"
                                                    uppercase
                                                    className="flex-1"
                                                >
                                                    Login
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    {session && (
                                        <div className="mt-3 pt-3 border-t border-white/20">
                                            <div className="flex flex-row gap-2">
                                                <Button 
                                                    href="https://grandcentralpark.ivotehoa.com/login"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    variant="accent"
                                                    size="default"
                                                    uppercase
                                                    className='flex-1'
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Vote Now
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        signOut();
                                                        setIsMenuOpen(false);
                                                    }}
                                                    variant="primary"
                                                    size="default"
                                                    uppercase
                                                    className='flex-1'
                                                >
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
