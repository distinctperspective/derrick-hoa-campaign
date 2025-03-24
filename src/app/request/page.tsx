'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Input } from "@/registry/new-york-v4/ui/input";
import { Textarea } from "@/registry/new-york-v4/ui/textarea";
import Logo from '../components/Logo';
import Image from 'next/image';
import Link from 'next/link';
import { Label } from "@/registry/new-york-v4/ui/label";
import { toast } from "sonner";
import LoginWall from '../components/LoginWall';
import RequestsTable from '../components/RequestsTable';

export default function RequestPage() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [requests, setRequests] = useState(() => {
        // Try to get cached requests on initial load
        if (typeof window !== 'undefined') {
            const cached = localStorage.getItem('userRequests');
            return cached ? JSON.parse(cached) : [];
        }
        return [];
    });
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const fetchRequests = async () => {
        try {
            const response = await fetch('/api/requests');
            if (!response.ok) {
                throw new Error('Failed to fetch requests');
            }
            const data = await response.json();
            setRequests(data);
            // Cache the requests
            localStorage.setItem('userRequests', JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching requests:', error);
            toast.error('Failed to load requests');
        }
    };

    useEffect(() => {
        if (session) {
            fetchRequests();
        }
    }, [session]);

    if (!session) {
        return <LoginWall />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userId: session.user.id,
                    userEmail: session.user.email,
                    userName: session.user.name,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit request');
            }

            toast.success('Request submitted successfully');
            setFormData({ title: '', description: '' });
            
            // Immediately fetch updated requests
            fetchRequests();
        } catch (error) {
            console.error('Error submitting request:', error);
            toast.error('Failed to submit request');
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
                    className="object-cover"
                    priority
                />
                <div className='absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30' />
            </div>

            {/* Logo */}
            <div className="sticky md:absolute top-8 left-0 right-0 md:left-8 md:right-auto z-10 flex justify-center md:justify-start">
                <Logo 
                    imageClassName="h-[100px] w-auto" 
                    width={300}
                    height={100}
                />
            </div>

            {/* Split Layout */}
            <div className="relative min-h-screen flex flex-col md:flex-row pt-5 md:pt-0">
                {/* Left Side - Submit Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-8 md:py-0">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-8">
                        <div className="flex flex-col items-center mb-8">
                            {session?.user?.image && (
                                <img
                                    src={session.user.image}
                                    alt={session.user.name || 'Profile'}
                                    className="w-24 h-24 rounded-full border-4 border-[#0B3558] mb-4"
                                />
                            )}
                            <h1 className="text-2xl font-bold text-[#0B3558]">
                                Submit a Request
                            </h1>
                            <p className="text-gray-600 mb-8">Have a concern or suggestion? Let us know and we'll address it.</p>

                            <form onSubmit={handleSubmit} className="w-full space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-[#0B3558] font-semibold">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Brief summary of your request"
                                        className="bg-gray-100 text-[#0B3558] placeholder:text-gray-400 border-gray-200 focus:border-[#0B3558] focus:ring-[#0B3558]"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-[#0B3558] font-semibold">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={4}
                                        placeholder="Provide more details about your request"
                                        className="bg-gray-100 text-[#0B3558] placeholder:text-gray-400 border-gray-200 focus:border-[#0B3558] focus:ring-[#0B3558]"
                                        required
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
                                        {isLoading ? 'Submitting...' : 'Submit Request'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Side - Requests Table */}
                <div className="w-full md:w-1/2 bg-gray-50 p-8 overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-[#0B3558]">Your Requests</h2>
                        <p className="text-gray-600">View and track the status of your requests</p>
                    </div>
                    <RequestsTable requests={requests} />
                </div>
            </div>
        </main>
    );
}
