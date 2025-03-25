'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { X } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface EndorsementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (message: string) => Promise<void>;
}

export default function EndorsementModal({ isOpen, onClose, onSubmit }: EndorsementModalProps) {
    const { data: session, status } = useSession();
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Reset states when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setMessage('');
            setError(null);
            setSuccess(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!message.trim()) {
            setError('Please enter an endorsement message');
            return;
        }
        
        try {
            setIsSubmitting(true);
            setError(null);
            
            await onSubmit(message);
            
            setSuccess(true);
            setMessage('');
        } catch (err) {
            console.error('Error submitting endorsement:', err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to submit endorsement. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Check if user is logged in
    if (status === 'unauthenticated') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="bg-gray-50 rounded-xl shadow-xl max-w-lg w-full p-6 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="text-center space-y-6 py-4">
                        <h2 className="text-2xl font-bold text-[#0B3558]">Sign In Required</h2>
                        <p className="text-gray-600">
                            To submit an endorsement, you'll need to sign in first. This helps us ensure endorsements come from actual Grand Central Park residents.
                        </p>
                        
                        <button
                            onClick={() => signIn('google')}
                            className="inline-flex items-center justify-center gap-3 bg-[#40C5B5] text-white px-6 py-3 rounded-full font-bold hover:bg-[#40C5B5]/90 transition-colors"
                        >
                            <Image
                                src="/google.svg"
                                alt="Google"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Check if user has address
    if (session?.user && !session.user.address) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="bg-gray-50 rounded-xl shadow-xl max-w-lg w-full p-6 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="text-center space-y-6 py-4">
                        <h2 className="text-2xl font-bold text-[#0B3558]">Address Required</h2>
                        <p className="text-gray-600">
                            To submit an endorsement, you need to add your address to your profile. This helps us verify you're a Grand Central Park resident.
                        </p>
                        
                        <a
                            href="/profile"
                            className="inline-block bg-[#0B3558] text-white px-6 py-3 rounded-full font-bold hover:bg-[#0B3558]/90 transition-colors"
                        >
                            Update Your Profile
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Extract street name and initials for display
    let displayName = '';
    if (session?.user) {
        // Extract street name from address
        let streetName = 'Resident';
        if (session.user.address) {
            const addressParts = session.user.address.split(',');
            if (addressParts.length > 0) {
                const firstPart = addressParts[0].trim();
                // Extract street name (remove house number)
                const streetMatch = firstPart.match(/\d+\s+(.+)/);
                if (streetMatch && streetMatch[1]) {
                    streetName = streetMatch[1];
                }
            }
        }
        
        // Get user initials
        let initials = '';
        if (session.user.name) {
            const nameParts = session.user.name.split(' ');
            if (nameParts.length >= 2) {
                initials = `${nameParts[0][0]}.${nameParts[nameParts.length - 1][0]}.`;
            } else if (nameParts.length === 1) {
                initials = `${nameParts[0][0]}.`;
            }
        }
        
        displayName = `Resident on ${streetName} - ${initials}`;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-gray-50 rounded-xl shadow-xl max-w-lg w-full p-6 relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                
                {success ? (
                    <div className="text-center space-y-6 py-8">
                        <h2 className="text-2xl font-bold text-[#0B3558]">Thank You!</h2>
                        <p className="text-gray-600">
                            Your endorsement has been submitted successfully. We appreciate your support!
                        </p>
                        <button
                            onClick={onClose}
                            className="inline-block bg-[#40C5B5] text-white px-6 py-3 rounded-full font-bold hover:bg-[#40C5B5]/90 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[#0B3558]">Endorse My Campaign</h2>
                            {displayName && (
                                <div className="relative mt-4 mb-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="absolute -top-3 -left-3 text-[#40C5B5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-80">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 font-medium mb-2">Your endorsement will appear as:</p>
                                    <p className="text-[#0B3558] font-bold text-center">{displayName}</p>
                                    <p className="text-gray-600 italic text-center mt-2">
                                        "{message || "Your endorsement message will appear here..."}"
                                    </p>
                                </div>
                            )}
                            <p className="text-gray-600 mt-2">
                                Share why you support my candidacy for the Grand Central Park RAI Board.
                            </p>
                        </div>
                        
                        <div>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your endorsement here..."
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-[#0B3558] focus:border-[#0B3558] outline-none"
                                rows={4}
                                required
                            />
                        </div>
                        
                        {error && (
                            <div className="text-red-500 text-sm">
                                {error}
                            </div>
                        )}
                        
                        <p className="text-sm text-gray-500 italic">
                            Your endorsement will be displayed with your street name and initials only. Your full name and exact address will remain confidential.
                        </p>
                        
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-[#0B3558] rounded-full font-medium text-white hover:bg-[#0B3558]/90 transition-colors disabled:opacity-70"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Endorsement'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
