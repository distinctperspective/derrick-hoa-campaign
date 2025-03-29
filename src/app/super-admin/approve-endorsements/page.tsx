'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { CheckCircle, XCircle, AlertCircle, User, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';

type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  address: string | null;
  isResident: boolean;
};

type Endorsement = {
  id: string;
  userId: string;
  message: string;
  displayName: string;
  isApproved: boolean;
  createdAt: string;
  user?: User;
};

export default function ApproveEndorsementsPage() {
  const { data: session } = useSession();
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Fetch all endorsements
  useEffect(() => {
    const fetchEndorsements = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/endorsements');
        
        if (!response.ok) {
          throw new Error('Failed to fetch endorsements');
        }
        
        const data = await response.json();
        setEndorsements(data.endorsements || []);
      } catch (err) {
        console.error('Error fetching endorsements:', err);
        setError('Failed to load endorsements');
      } finally {
        setLoading(false);
      }
    };

    fetchEndorsements();
  }, []);

  const handleApprove = async (endorsementId: string) => {
    try {
      const response = await fetch('/api/admin/approve-endorsement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ endorsementId }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve endorsement');
      }

      // Update local state
      setEndorsements(prevEndorsements => 
        prevEndorsements.map(endorsement => 
          endorsement.id === endorsementId 
            ? { ...endorsement, isApproved: true } 
            : endorsement
        )
      );

      setSuccessMessage('Endorsement approved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error approving endorsement:', err);
      setError('Failed to approve endorsement');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDelete = async (endorsementId: string) => {
    if (!confirm('Are you sure you want to delete this endorsement? This action cannot be undone.')) {
      return;
    }
    
    try {
      setDeleting(endorsementId);
      const response = await fetch('/api/admin/delete-endorsement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ endorsementId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete endorsement');
      }

      // Remove the deleted endorsement from state
      setEndorsements(prevEndorsements => 
        prevEndorsements.filter(endorsement => endorsement.id !== endorsementId)
      );

      setSuccessMessage('Endorsement deleted successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error deleting endorsement:', err);
      setError('Failed to delete endorsement');
      setTimeout(() => setError(null), 3000);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3558]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Endorsements</h1>
        <div className="flex items-center">
          <span className="px-3 py-1 rounded-full bg-[#0B3558] text-white text-sm mr-2">
            {endorsements.filter(e => !e.isApproved).length} Pending
          </span>
          <span className="px-3 py-1 rounded-full bg-green-500 text-white text-sm">
            {endorsements.filter(e => e.isApproved).length} Approved
          </span>
        </div>
      </div>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <XCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {endorsements.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No endorsements found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {/* Pending endorsements section */}
          {endorsements.filter(e => !e.isApproved).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Pending Approval</h2>
              <div className="space-y-4">
                {endorsements
                  .filter(endorsement => !endorsement.isApproved)
                  .map(endorsement => (
                    <div 
                      key={endorsement.id} 
                      className="bg-white rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex mb-3">
                        <div className="mr-3 flex-shrink-0 self-center">
                          {endorsement.user?.image ? (
                            <Image 
                              src={endorsement.user.image} 
                              alt={endorsement.user?.name || 'User'} 
                              width={40} 
                              height={40} 
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-800 text-sm">
                              {endorsement.user?.name || 'Unknown User'}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {new Date(endorsement.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 leading-tight mt-0.5">
                            {endorsement.user?.email}
                          </p>
                          {endorsement.user?.address && (
                            <p className="text-xs text-gray-600 leading-tight mt-0.5">
                              {endorsement.user.address}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">{endorsement.message}</p>
                        <p className="text-sm text-gray-500 mt-2">Display as: {endorsement.displayName}</p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleApprove(endorsement.id)}
                          className="bg-[#0B3558] text-white px-4 py-2 rounded hover:bg-[#0B3558]/90 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDelete(endorsement.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500/90 transition-colors ml-2"
                          disabled={deleting === endorsement.id}
                        >
                          {deleting === endorsement.id ? (
                            <span className="flex items-center">
                              <Loader2 className="animate-spin mr-2 h-4 w-4" />
                              Deleting...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          
          {/* Approved endorsements section */}
          {endorsements.filter(e => e.isApproved).length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Approved Endorsements</h2>
              <div className="space-y-4">
                {endorsements
                  .filter(endorsement => endorsement.isApproved)
                  .map(endorsement => (
                    <div 
                      key={endorsement.id} 
                      className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-l-green-500"
                    >
                      <div className="flex mb-3">
                        <div className="mr-3 flex-shrink-0 self-center">
                          {endorsement.user?.image ? (
                            <Image 
                              src={endorsement.user.image} 
                              alt={endorsement.user?.name || 'User'} 
                              width={40} 
                              height={40} 
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-800 text-sm">
                              {endorsement.user?.name || 'Unknown User'}
                            </h3>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 mr-2">
                                {new Date(endorsement.createdAt).toLocaleString()}
                              </span>
                              <span className="text-green-600 font-medium flex items-center text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" /> Approved
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 leading-tight mt-0.5">
                            {endorsement.user?.email}
                          </p>
                          {endorsement.user?.address && (
                            <p className="text-xs text-gray-600 leading-tight mt-0.5">
                              {endorsement.user.address}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">{endorsement.message}</p>
                        <p className="text-sm text-gray-500 mt-2">Display as: {endorsement.displayName}</p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDelete(endorsement.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500/90 transition-colors"
                          disabled={deleting === endorsement.id}
                        >
                          {deleting === endorsement.id ? (
                            <span className="flex items-center">
                              <Loader2 className="animate-spin mr-2 h-4 w-4" />
                              Deleting...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
