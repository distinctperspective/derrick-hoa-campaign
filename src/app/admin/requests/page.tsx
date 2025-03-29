'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Trash2,
  AlertCircle,
  X,
  Mail,
  MessageSquare,
  User,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

type Reply = {
  id: string;
  content: string;
  requestId: string;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  address: string;
};

type Request = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userName: string;
  userEmail: string;
  replies: Reply[];
  user?: User;
};

// Modal types
type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

// Confirmation Modal Component
const ConfirmModal = ({ 
  isOpen, 
  title, 
  message, 
  confirmText, 
  cancelText, 
  onConfirm, 
  onCancel 
}: ConfirmModalProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Function to convert URLs in text to hyperlinks
function linkify(text: string) {
  if (!text) return '';
  
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${url}</a>`;
  });
}

export default function RequestsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReplyDeleting, setIsReplyDeleting] = useState<string | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  // Modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    onConfirm: () => {},
    type: '' // 'request' or 'reply'
  });
  const [replyToDelete, setReplyToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const response = await fetch('/api/admin/requests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      
      const data = await response.json();
      setRequests(data);
      
      // If there's a selected request, update it with the new data
      if (selectedRequest) {
        const updatedSelectedRequest = data.find((req: Request) => req.id === selectedRequest.id);
        if (updatedSelectedRequest) {
          setSelectedRequest(updatedSelectedRequest);
        }
      }
      
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Ensure the date is valid before formatting
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <AlertCircle className="w-3 h-3 mr-1" />;
      case 'IN_PROGRESS':
        return <Clock className="w-3 h-3 mr-1" />;
      case 'RESOLVED':
        return <CheckCircle className="w-3 h-3 mr-1" />;
      default:
        return <HelpCircle className="w-3 h-3 mr-1" />;
    }
  };

  const updateStatus = async (status: string) => {
    if (!selectedRequest) return;
    
    try {
      setStatusUpdating(true);
      
      const response = await fetch(`/api/requests/${selectedRequest.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      const updatedRequest = await response.json();
      
      // Update the requests list with the updated request
      setRequests(requests?.map(req => 
        req.id === selectedRequest.id ? updatedRequest : req
      ) || []);
      
      // Update selected request
      setSelectedRequest(updatedRequest);
      
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const submitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRequest || !session?.user) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/requests/${selectedRequest.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyContent,
        }),
      });
      
      if (response.ok) {
        setReplyContent('');
        
        // Show success toast notification
        toast.success('Reply submitted successfully', {
          description: 'An email notification has been sent to the resident.',
          icon: <CheckCircle2 className="h-4 w-4" />,
          duration: 4000,
        });
        
        // Refresh the selected request data to show the new reply
        const updatedRequestResponse = await fetch(`/api/admin/requests/${selectedRequest.id}`);
        if (updatedRequestResponse.ok) {
          const updatedRequest = await updatedRequestResponse.json();
          
          // Update the selected request with the new data
          setSelectedRequest(updatedRequest);
          
          // Also update the request in the requests list
          setRequests(requests?.map(request => 
            request.id === selectedRequest.id ? updatedRequest : request
          ) || []);
        } else {
          // If we can't get the updated request, just refresh all requests
          fetchRequests();
        }
      } else {
        console.error('Failed to submit reply');
        toast.error('Failed to submit reply', {
          description: 'Please try again later.',
          icon: <XCircle className="h-4 w-4" />,
        });
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Error submitting reply', {
        description: 'An unexpected error occurred.',
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show delete request confirmation modal
  const showDeleteRequestConfirmation = () => {
    if (!selectedRequest) return;
    
    setConfirmModal({
      isOpen: true,
      title: 'Delete Request',
      message: 'Are you sure you want to delete this request? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: deleteRequest,
      type: 'request'
    });
  };
  
  // Show delete reply confirmation modal
  const showDeleteReplyConfirmation = (replyId: string) => {
    setReplyToDelete(replyId);
    
    setConfirmModal({
      isOpen: true,
      title: 'Delete Reply',
      message: 'Are you sure you want to delete this reply? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => deleteReply(replyId),
      type: 'reply'
    });
  };
  
  // Close confirmation modal
  const closeConfirmModal = () => {
    setConfirmModal({
      ...confirmModal,
      isOpen: false
    });
    setReplyToDelete(null);
  };

  // Delete a request
  const deleteRequest = async () => {
    if (!selectedRequest) return;
    
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/admin/requests/${selectedRequest.id}/delete`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove the request from the list
        setRequests(requests?.filter(request => request.id !== selectedRequest.id) || []);
        setSelectedRequest(null);
        closeConfirmModal();
      } else {
        console.error('Failed to delete request');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Delete a reply
  const deleteReply = async (replyId: string) => {
    try {
      setIsReplyDeleting(replyId);
      
      const response = await fetch(`/api/admin/replies/${replyId}/delete`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        const updatedRequest = await response.json();
        
        // Update the selected request with the new data
        setSelectedRequest(updatedRequest);
        
        // Also update the request in the requests list
        setRequests(requests?.map(request => 
          request.id === updatedRequest.id ? updatedRequest : request
        ) || []);
        
        closeConfirmModal();
      } else {
        console.error('Failed to delete reply');
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
    } finally {
      setIsReplyDeleting(null);
    }
  };

  // Send email with reply
  const sendEmailReply = async (replyContent: string) => {
    if (!selectedRequest) return;
    
    try {
      setIsSendingEmail(true);
      
      const response = await fetch(`/api/admin/requests/${selectedRequest.id}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ replyContent }),
      });
      
      if (response.ok) {
        // Show success toast notification instead of alert
        toast.success('Email sent successfully', {
          description: `Email sent to ${selectedRequest.userEmail}`,
          icon: <CheckCircle2 className="h-4 w-4" />,
          duration: 4000,
        });
      } else {
        console.error('Failed to send email');
        toast.error('Failed to send email', {
          description: 'Please try again later.',
          icon: <XCircle className="h-4 w-4" />,
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error sending email', {
        description: 'An unexpected error occurred.',
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3558]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500 mb-4">Failed to load requests</p>
        <button 
          onClick={fetchRequests}
          className="flex items-center px-4 py-2 bg-[#0B3558] text-white rounded-md hover:bg-[#0B3558]/90"
        >
          <ChevronRight className="w-4 h-4 mr-2" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Resident Requests</h1>
        <p className="text-gray-600">Manage and respond to resident requests</p>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Requests List */}
        <div className="w-1/3 border-r border-gray-100 overflow-y-auto bg-gray-50">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">All Requests ({requests?.length || 0})</h2>
            
            {requests?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No requests found
              </div>
            ) : (
              <ul className="space-y-3">
                {requests?.map((request) => (
                  <li 
                    key={request.id}
                    className={`p-4 rounded-lg cursor-pointer shadow-sm ${
                      selectedRequest?.id === request.id 
                        ? 'border-[#0B3558] bg-[#0B3558]/5' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-2">
                          {request.user?.image ? (
                            <img 
                              src={request.user.image} 
                              alt={request.userName} 
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 font-medium">
                                {request.userName?.charAt(0) || '?'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{request.userName}</div>
                          <div className="text-xs text-gray-500">{request.userEmail}</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatDate(request.createdAt).split(',')[0]}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 truncate max-w-[70%]">{request.title}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{request.status?.replace('_', ' ') || 'OPEN'}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{request.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Request Details */}
        <div className="w-2/3 overflow-y-auto bg-gray-50">
          {selectedRequest ? (
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{selectedRequest.title}</h2>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {getStatusIcon(selectedRequest.status)}
                      <span className="ml-1">{selectedRequest.status?.replace('_', ' ') || 'OPEN'}</span>
                    </span>
                    <button 
                      onClick={showDeleteRequestConfirmation}
                      disabled={isDeleting}
                      className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                      title="Delete request"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-3">
                    {selectedRequest.user?.image ? (
                      <img 
                        src={selectedRequest.user.image} 
                        alt={selectedRequest.userName} 
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {selectedRequest.userName?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedRequest.userName}</h3>
                    <p className="text-sm text-gray-500">{selectedRequest.userEmail}</p>
                    {selectedRequest.user?.address && (
                      <p className="text-sm text-gray-500">{selectedRequest.user.address}</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <p 
                    className="text-gray-700 whitespace-pre-wrap" 
                    dangerouslySetInnerHTML={{ __html: linkify(selectedRequest.description) }}
                  ></p>
                </div>
                
                <div className="text-sm text-gray-500">
                  Submitted on {formatDate(selectedRequest.createdAt)}
                </div>
              </div>
              
              {/* Status Update */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <h3 className="font-medium text-gray-900 mb-3">Update Status</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateStatus('OPEN')}
                    disabled={statusUpdating || selectedRequest.status === 'OPEN'}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      selectedRequest.status === 'OPEN'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => updateStatus('IN_PROGRESS')}
                    disabled={statusUpdating || selectedRequest.status === 'IN_PROGRESS'}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      selectedRequest.status === 'IN_PROGRESS'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStatus('RESOLVED')}
                    disabled={statusUpdating || selectedRequest.status === 'RESOLVED'}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      selectedRequest.status === 'RESOLVED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Resolved
                  </button>
                </div>
              </div>
              
              {/* Conversation */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <h3 className="font-medium text-gray-900 mb-4">Conversation</h3>
                
                {selectedRequest.replies?.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    No replies yet
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    {selectedRequest.replies?.map((reply) => (
                      <div key={reply.id} className="flex">
                        <div className="flex-shrink-0 mr-3">
                          {reply.userName === session?.user?.name ? (
                            session?.user?.image ? (
                              <img 
                                src={session.user.image} 
                                alt={session.user.name || 'Admin'} 
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                            <div className="w-8 h-8 rounded-full bg-[#0B3558] flex items-center justify-center">
                              <span className="text-white font-medium">
                                {session.user.name?.charAt(0) || '?'}
                              </span>
                            </div>
                            )
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 font-medium">
                                {reply.userName?.charAt(0) || '?'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">{reply.userName}</span>
                              {reply.userName === session?.user?.name && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-600 text-white rounded-full">
                                  Admin
                                </span>
                              )}
                              <span className="text-xs text-gray-500 ml-3">
                                {formatDate(reply.createdAt)}
                              </span>
                            </div>
                            <div className="flex space-x-1">
                              {reply.userName === session?.user?.name && (
                                <button 
                                  onClick={() => sendEmailReply(reply.content)}
                                  disabled={isSendingEmail}
                                  className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 flex items-center justify-center"
                                  title="Email this reply to the requester"
                                >
                                  {isSendingEmail ? (
                                    <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                  ) : (
                                    <Mail size={14} />
                                  )}
                                </button>
                              )}
                              <button 
                                onClick={() => showDeleteReplyConfirmation(reply.id)}
                                disabled={isReplyDeleting === reply.id}
                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                title="Delete reply"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          <div 
                            className="mt-1 text-gray-700 whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: linkify(reply.content) }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Reply Form */}
                <form onSubmit={submitReply}>
                  <div className="mb-3">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your reply..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B3558] focus:border-transparent text-gray-900"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!replyContent.trim() || isSubmitting}
                      className="px-4 py-2 bg-[#0B3558] text-white rounded-md hover:bg-[#0B3558]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Reply'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <HelpCircle className="w-12 h-12 mb-2" />
              <p>Select a request to view details</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        onConfirm={() => {
          if (confirmModal.type === 'request') {
            deleteRequest();
          } else if (confirmModal.type === 'reply' && replyToDelete) {
            deleteReply(replyToDelete);
          }
        }}
        onCancel={closeConfirmModal}
      />
    </div>
  );
}
