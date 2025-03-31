'use client';

import { useState } from 'react';

import Logo from '@/app/components/Logo';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { toast } from 'sonner';

interface UnsubscribeModalProps {
    children: React.ReactNode;
}

export function UnsubscribeModal({ children }: UnsubscribeModalProps) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleUnsubscribe = async () => {
        if (!email) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            toast.success('Successfully unsubscribed from emails');
            setEmail('');
            setOpen(false);
        } catch (error) {
            console.error('Error unsubscribing:', error);
            toast.error('Failed to unsubscribe. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='bg-white p-0 sm:max-w-md'>
                <div className='flex flex-col items-center px-4 py-6 sm:px-6'>
                    <div className='mb-6'>
                        <Logo width={120} height={120} />
                    </div>
                    <DialogHeader className='space-y-3 text-center'>
                        <DialogTitle className='text-2xl font-semibold text-[#0B3558]'>
                            Unsubscribe from emails
                        </DialogTitle>
                        <DialogDescription className='text-base text-gray-600'>
                            Please enter your email address to unsubscribe
                        </DialogDescription>
                    </DialogHeader>
                    <div className='mt-6 w-full'>
                        <Input
                            type='email'
                            placeholder='Enter your email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='h-12 w-full border border-gray-300 bg-white text-gray-900'
                            required
                        />
                        <Button
                            onClick={handleUnsubscribe}
                            disabled={!email || isLoading}
                            className='mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#0B3558] px-6 text-white hover:bg-[#0B3558]/90'>
                            {isLoading ? 'Processing...' : 'Unsubscribe'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
