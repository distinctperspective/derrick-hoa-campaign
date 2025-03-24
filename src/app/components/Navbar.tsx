'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { Menu } from "lucide-react"
import { Button } from "@/registry/new-york-v4/ui/button"
import { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1600px] px-4 md:px-0'>
            <div className='w-full h-[80px] bg-[#0B3558] rounded-2xl flex items-center justify-between px-4 md:px-8 shadow-lg overflow-visible relative'>
                <Link href="/" className='text-white hover:text-gray-200 relative w-[300px] h-[131px] mt-[60px] -ml-[60px]'>
                    <Image
                        src="/images/gcp-logo.png"
                        alt="Grand Central Park Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-6 ml-auto'>
                    <Link href="/vision" className='text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors'>
                        Vision
                    </Link>
                    <Link href="/contact" className='text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors'>
                        Contact
                    </Link>
                    <a 
                        href="https://grandcentralpark.ivotehoa.com/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-white bg-[#E85C41] hover:bg-[#E85C41]/90 px-6 py-2 rounded-full font-extrabold uppercase tracking-wide transition-colors'
                    >
                        Vote Now
                    </a>
                    <div className="border-l border-white/20 h-6 mx-2" />
                    <ThemeToggle />
                </div>

                {/* Mobile Navigation */}
                <div className='md:hidden flex items-center gap-4'>
                    <Button 
                        variant="ghost" 
                        className="text-white p-0 hover:bg-transparent"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                    {isMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-[#0B3558] rounded-lg shadow-lg py-2 px-4">
                            <Link 
                                href="/vision" 
                                className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Vision
                            </Link>
                            <Link 
                                href="/contact" 
                                className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <a 
                                href="https://grandcentralpark.ivotehoa.com/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='block text-white font-extrabold uppercase tracking-wide hover:text-gray-200 transition-colors py-2'
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Vote Now
                            </a>
                            <div className="border-t border-white/20 my-2" />
                            <div className="py-2">
                                <ThemeToggle />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
