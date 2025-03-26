'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/registry/new-york-v4/ui/button';
import { toast } from 'sonner';
import { Loader2, Trash2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

type Endorsement = {
    id: string;
    message: string;
    displayName: string;
    isApproved: boolean;
    createdAt: string;
};

export default function UserEndorsements() {
    const { data: session } = useSession();
    const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserEndorsements = async () => {
            if (!session?.user) return;
            
            try {
                setLoading(true);
                const response = await fetch('/api/user/endorsements');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch your endorsements');
                }
                
                const data = await response.json();
                setEndorsements(data.endorsements || []);
            } catch (err) {
                console.error('Error fetching endorsements:', err);
                setError('Failed to load your endorsements');
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserEndorsements();
    }, [session]);

    const handleDelete = async (endorsementId: string) => {
        if (!confirm('Are you sure you want to delete this endorsement?')) {
            return;
        }
        
        try {
            setDeleting(endorsementId);
            const response = await fetch('/api/endorsements', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ endorsementId })
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete endorsement');
            }
            
            // Remove the deleted endorsement from state
            setEndorsements(prev => prev.filter(e => e.id !== endorsementId));
            toast.success('Endorsement deleted successfully');
        } catch (err) {
            console.error('Error deleting endorsement:', err);
            toast.error('Failed to delete endorsement');
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-[#40BFB4]" />
                <span className="ml-2 text-[#0B3558]">Loading your endorsements...</span>
            </div>
        );
    }

    if (endorsements.length === 0) {
        return (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">You haven't submitted any endorsements yet.</p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h4 className="text-lg font-semibold text-[#0B3558] mb-3">Your Endorsements</h4>
            <div className="space-y-4">
                {endorsements.map(endorsement => (
                    <div 
                        key={endorsement.id} 
                        className={`bg-gray-50 rounded-lg p-4 border-l-4 ${
                            endorsement.isApproved 
                                ? 'border-l-green-500' 
                                : 'border-l-yellow-500'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-sm text-gray-500">
                                    {new Date(endorsement.createdAt).toLocaleDateString()}
                                </p>
                                <div className="flex items-center mt-1">
                                    {endorsement.isApproved ? (
                                        <span className="text-green-600 text-xs flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" /> Approved
                                        </span>
                                    ) : (
                                        <span className="text-yellow-600 text-xs flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" /> Pending Approval
                                        </span>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(endorsement.id)}
                                disabled={!!deleting}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                {deleting === endorsement.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                                <span className="ml-1">Delete</span>
                            </Button>
                        </div>
                        <p className="text-gray-700 my-2">{endorsement.message}</p>
                        <p className="text-sm text-gray-500">Displays as: {endorsement.displayName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
