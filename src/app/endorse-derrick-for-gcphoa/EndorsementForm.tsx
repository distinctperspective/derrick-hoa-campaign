'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Button as ShadcnButton } from '@/registry/new-york-v4/ui/button';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';
import { Label } from '@/registry/new-york-v4/ui/label';
import { toast } from 'sonner';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import UserEndorsements from './UserEndorsements';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Button from '../components/Button';

// Import MapboxSearch component dynamically with SSR disabled
const MapboxSearch = dynamic(
    () => import('../components/MapboxSearch'),
    { ssr: false }
);

export default function EndorsementForm() {
    const { data: session, status, update } = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        message: ''
    });

    // Initialize form with session data when available
    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: session.user.name || '',
                email: session.user.email || '',
                address: (session.user as any).address || '',
                phoneNumber: (session.user as any).phoneNumber || ''
            }));
        }
    }, [session]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!session) {
            signIn('google', { callbackUrl: window.location.href });
            return;
        }
        
        if (!formData.address) {
            toast.error("Please provide your address to continue.");
            return;
        }
        
        if (!formData.message) {
            toast.error("Please share why you support Derrick Threatt.");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // First update user profile if needed
            if (formData.address || formData.phoneNumber || 
                (formData.name && formData.name !== session.user.name)) {
                
                const profileResponse = await fetch('/api/user/profile', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        address: formData.address,
                        phoneNumber: formData.phoneNumber
                    })
                });
                
                if (!profileResponse.ok) {
                    throw new Error('Failed to update profile');
                }
                
                // Update session with new user data
                await update({
                    ...session,
                    user: {
                        ...session.user,
                        name: formData.name,
                        address: formData.address,
                        phoneNumber: formData.phoneNumber
                    }
                });
            }
            
            // Then submit endorsement
            const endorsementResponse = await fetch('/api/endorsements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: formData.message
                })
            });
            
            if (!endorsementResponse.ok) {
                throw new Error('Failed to submit endorsement');
            }
            
            setIsSuccess(true);
            toast.success("Thank you for your support. Your endorsement will be reviewed and published soon.");
            
            // Reset form
            setFormData(prev => ({ ...prev, message: '' }));
            
        } catch (error) {
            console.error('Error submitting endorsement:', error);
            toast.error("There was an error submitting your endorsement. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#40BFB4]" />
                <span className="ml-2 text-[#0B3558]">Loading...</span>
            </div>
        );
    }
    
    const inputClassName = "flex h-10 w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-[#0B3558] placeholder:text-gray-400 focus:border-[#0B3558] focus:ring-[#0B3558] focus:outline-none focus:ring-2 focus:ring-offset-2";
    const textareaClassName = "flex w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-[#0B3558] placeholder:text-gray-400 focus:border-[#0B3558] focus:ring-[#0B3558] focus:outline-none focus:ring-2 focus:ring-offset-2";
    const labelClassName = "block text-[#0B3558] font-semibold mb-1";
    
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#0B3558] mb-4">
                {session ? 'Share Your Endorsement' : 'Sign In to Continue'}
            </h3>
            
            {!session ? (
                <div className="text-center py-6">
                    <p className="text-gray-600 mb-6">
                        Please sign in with your Google account to share your endorsement.
                    </p>
                    <GoogleSignInButton 
                        className="bg-[#40BFB4] hover:bg-[#369c93] text-white"
                        callbackUrl={window.location.href}
                        size="large"
                    />
                </div>
            ) : isSuccess ? (
                <div className="text-center py-6">
                    <CheckCircle className="h-16 w-16 text-[#40BFB4] mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-[#0B3558] mb-2">Thank You!</h4>
                    <p className="text-gray-600 mb-6">
                        Your endorsement has been submitted successfully and will be reviewed by our team.
                        Once approved, it will appear on the website with your street name and initials.
                    </p>
                    <Button 
                        onClick={() => setIsSuccess(false)}
                        className="bg-[#40BFB4] hover:bg-[#369c93] text-white"
                    >
                        Submit Another Endorsement
                    </Button>
                    {/* Show user's existing endorsements */}
                    <UserEndorsements />
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name" className={labelClassName}>Your Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                required
                                className={inputClassName}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Only your street name and initials will be publicly displayed.
                            </p>
                        </div>
                        
                        <div>
                            <Label htmlFor="email" className={labelClassName}>Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your email address"
                                disabled
                                className={`${inputClassName} opacity-75`}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Email is provided by Google and cannot be changed.
                            </p>
                        </div>
                        
                        <div>
                            <Label htmlFor="address" className={labelClassName}>
                                Address <span className="text-red-500">*</span>
                            </Label>
                            <MapboxSearch
                                value={formData.address}
                                onChange={(value: string) => setFormData(prev => ({ ...prev, address: value }))}
                                className={inputClassName}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Required for verification. Only your street name will be publicly displayed.
                            </p>
                        </div>
                        
                        <div>
                            <Label htmlFor="phoneNumber" className={labelClassName}>Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Your phone number (optional)"
                                className={inputClassName}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Optional. Will not be publicly displayed.
                            </p>
                        </div>
                        
                        <div>
                            <Label htmlFor="message" className={labelClassName}>
                                Your Endorsement <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Share why you support Derrick Threatt for GCP HOA..."
                                rows={4}
                                required
                                className={textareaClassName}
                            />
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-blue-700">
                            By submitting this form, you confirm that you are a resident of Grand Central Park. 
                            Your endorsement will be reviewed before being published, and only your street name 
                            and initials will be publicly displayed.
                        </p>
                    </div>
                    
                    <div className="mt-6">
                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Endorsement'}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
