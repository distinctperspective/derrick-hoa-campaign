'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Input } from "@/registry/new-york-v4/ui/input";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Textarea } from "@/registry/new-york-v4/ui/textarea";
import Logo from '../components/Logo';
import Image from 'next/image';
import Link from 'next/link';
import { Label } from "@/registry/new-york-v4/ui/label";
import dynamic from 'next/dynamic';
import { toast } from "sonner";

// Import MapboxSearch component dynamically with SSR disabled
const MapboxSearch = dynamic(
  () => import('../components/MapboxSearch'),
  { ssr: false }
);

export default function ProfilePage() {
    const { data: session, update } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        bio: '',
        phoneNumber: '',
    });

    useEffect(() => {
        if (session?.user) {
            setFormData({
                address: session.user.address || '',
                bio: session.user.bio || '',
                phoneNumber: session.user.phoneNumber || '',
            });
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            await update();
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen relative">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/images/lakehouse.jpeg"
                    alt="Grand Central Park Lakehouse"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className='absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30' />
            </div>

            {/* Logo */}
            <Logo 
                className="absolute top-8 left-8 z-10" 
                imageClassName="h-[100px] w-auto" 
                width={300}
                height={100}
            />

            {/* Profile Card */}
            <div className="relative min-h-screen flex items-center justify-center px-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8">
                    <div className="flex flex-col items-center mb-8">
                        {session?.user?.image && (
                            <img
                                src={session.user.image}
                                alt={session.user.name || 'Profile'}
                                className="w-24 h-24 rounded-full border-4 border-[#0B3558] mb-4"
                            />
                        )}
                        <h1 className="text-2xl font-bold text-[#0B3558]">
                            {session?.user?.name}
                        </h1>
                        <p className="text-gray-600 mb-8">{session?.user?.email}</p>

                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-[#0B3558] font-semibold">
                                    Address
                                </Label>
                                <MapboxSearch
                                    value={formData.address}
                                    onChange={(value) => setFormData({ ...formData, address: value })}
                                    className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-[#0B3558] placeholder:text-gray-400 focus:border-[#0B3558] focus:ring-[#0B3558] focus:outline-none focus:ring-2 focus:ring-offset-2"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-[#0B3558] font-semibold">
                                    Bio
                                </Label>
                                <Textarea
                                    id="bio"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={4}
                                    placeholder="Tell us about yourself..."
                                    className="bg-gray-100 text-[#0B3558] placeholder:text-gray-400 border-gray-200 focus:border-[#0B3558] focus:ring-[#0B3558]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber" className="text-[#0B3558] font-semibold">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    placeholder="(123) 456-7890"
                                    className="bg-gray-100 text-[#0B3558] placeholder:text-gray-400 border-gray-200 focus:border-[#0B3558] focus:ring-[#0B3558]"
                                />
                            </div>

                            <div className="flex gap-4 justify-end mt-8">
                                <Link 
                                    href="/"
                                    className="px-6 py-2 bg-gray-100 text-[#0B3558] rounded-md hover:bg-gray-200 transition-colors font-semibold"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#0B3558] text-white rounded-md hover:bg-[#0B3558]/90 transition-colors font-semibold disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
