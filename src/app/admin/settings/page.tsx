'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Settings,
  UserPlus,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

type User = {
  id: string;
  name: string | null;
  email: string | null;
  isAdmin: boolean;
};

export default function AdminSettings() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedUserId, setSelectedUserId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage({ type: 'error', text: 'Failed to load users' });
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminStatus = async (userId: string, isAdmin: boolean) => {
    try {
      setMessage({ type: '', text: '' });
      
      const response = await fetch('/api/admin/set-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, isAdmin }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, isAdmin } : user
        ));
        setMessage({ 
          type: 'success', 
          text: `User ${isAdmin ? 'granted' : 'removed from'} admin access` 
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update admin status' });
      }
    } catch (error) {
      console.error('Error updating admin status:', error);
      setMessage({ type: 'error', text: 'Failed to update admin status' });
    }
  };

  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.name && user.name.toLowerCase().includes(searchLower)) ||
      (user.email && user.email.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Settings className="mr-2 w-6 h-6" /> Admin Settings
        </h1>
        <p className="text-gray-500">Manage admin access and settings</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.type === 'success' ? (
            <CheckCircle className="inline-block mr-2 w-5 h-5" />
          ) : (
            <AlertCircle className="inline-block mr-2 w-5 h-5" />
          )}
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Admin Users</h2>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0B3558] mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-4">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Admin Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{user.name || 'N/A'}</td>
                    <td className="px-4 py-3 text-gray-800">{user.email || 'N/A'}</td>
                    <td className="px-4 py-3">
                      {user.isAdmin ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Regular User
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {user.isAdmin ? (
                        <button
                          onClick={() => toggleAdminStatus(user.id, false)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Remove Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleAdminStatus(user.id, true)}
                          className="text-[#0B3558] hover:text-[#0B3558]/80 font-medium text-sm"
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
