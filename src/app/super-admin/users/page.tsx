'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Search, 
  UserCheck, 
  UserX, 
  Mail, 
  Home, 
  AlertCircle,
  Edit,
  Trash2,
  X,
  Check,
  Shield
} from 'lucide-react';

type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  address: string | null;
  isResident: boolean;
  isAdmin: boolean;
  createdAt: string;
};

type EditingUser = User & {
  newName: string;
  newEmail: string;
  newAddress: string | null;
  newIsResident: boolean;
  newIsAdmin: boolean;
};

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Close modal when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEditUser = (user: User) => {
    setEditingUser({
      ...user,
      newName: user.name || '',
      newEmail: user.email || '',
      newAddress: user.address || '',
      newIsResident: user.isResident,
      newIsAdmin: user.isAdmin
    });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    
    try {
      setActionLoading(true);
      
      const response = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingUser.newName,
          email: editingUser.newEmail,
          address: editingUser.newAddress,
          isResident: editingUser.newIsResident,
          isAdmin: editingUser.newIsAdmin
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      // Refresh user list
      await fetchUsers();
      
      // Close modal
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      setActionLoading(true);
      
      const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      // Refresh user list
      await fetchUsers();
      
      // Close modal
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (user.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (user.address?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

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
        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
        <div className="flex items-center">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm mr-2">
            {users.filter(u => u.isResident).length} Residents
          </span>
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
            {users.filter(u => !u.isResident).length} Non-Residents
          </span>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0B3558] focus:border-[#0B3558] block w-full pl-10 p-2.5"
            placeholder="Search users by name, email, or address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
          <button 
            onClick={() => setError(null)} 
            className="ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No users found matching your search criteria.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#0B3558] flex items-center justify-center text-gray-200">
                        {user.image ? (
                          <img src={user.image} alt={user.name || ''} className="h-10 w-10 rounded-full" />
                        ) : (
                          <span className="text-gray-200">{user.name?.charAt(0) || '?'}</span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || 'No Name'}
                          {user.isAdmin && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <Shield className="w-3 h-3 mr-1" />
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Mail className="w-3 h-3 mr-1" />
                          <span className="text-gray-500">{user.email || 'No Email'}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.address ? (
                      <div className="flex items-center text-sm text-gray-500">
                        <Home className="w-4 h-4 mr-1" />
                        <span className="text-gray-500">{user.address}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Not provided</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isResident ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 items-center">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Resident
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 items-center">
                        <UserX className="w-3 h-3 mr-1" />
                        Non-Resident
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end">
                      {/* Admin Toggle Switch */}
                      <div className="mr-4 flex items-center">
                        <span className="mr-2 text-xs text-gray-500">Admin</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={user.isAdmin}
                            onChange={async () => {
                              try {
                                const response = await fetch('/api/admin/set-admin', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({ 
                                    userId: user.id, 
                                    isAdmin: !user.isAdmin 
                                  }),
                                });
                                
                                if (response.ok) {
                                  setUsers(users.map(u => 
                                    u.id === user.id ? { ...u, isAdmin: !user.isAdmin } : u
                                  ));
                                }
                              } catch (error) {
                                console.error('Error updating admin status:', error);
                              }
                            }}
                          />
                          <div className="w-9 h-5 bg-red-100 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit User Modal */}
      {isModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Edit User</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#0B3558] focus:border-[#0B3558] text-gray-800"
                  value={editingUser.newName}
                  onChange={(e) => setEditingUser({...editingUser, newName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#0B3558] focus:border-[#0B3558] text-gray-800"
                  value={editingUser.newEmail}
                  onChange={(e) => setEditingUser({...editingUser, newEmail: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#0B3558] focus:border-[#0B3558] text-gray-800"
                  value={editingUser.newAddress || ''}
                  onChange={(e) => setEditingUser({...editingUser, newAddress: e.target.value})}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="is-resident"
                  type="checkbox"
                  className="h-4 w-4 text-[#0B3558] focus:ring-[#0B3558] border-gray-300 rounded"
                  checked={editingUser.newIsResident}
                  onChange={(e) => setEditingUser({...editingUser, newIsResident: e.target.checked})}
                />
                <label htmlFor="is-resident" className="ml-2 block text-sm text-gray-700">
                  Is Resident
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="is-admin"
                  type="checkbox"
                  className="h-4 w-4 text-[#0B3558] focus:ring-[#0B3558] border-gray-300 rounded"
                  checked={editingUser.newIsAdmin}
                  onChange={(e) => setEditingUser({...editingUser, newIsAdmin: e.target.checked})}
                />
                <label htmlFor="is-admin" className="ml-2 block text-sm text-gray-700">
                  Is Admin
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsModalOpen(false)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-[#0B3558] rounded-md text-sm font-medium text-white hover:bg-[#0a2e4e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B3558]"
                onClick={handleSaveUser}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    Save Changes
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">
                Are you sure you want to delete the user <span className="font-semibold">{userToDelete.name || userToDelete.email}</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleConfirmDelete}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete User
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
