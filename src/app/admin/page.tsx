'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  MessageSquare, 
  Users, 
  BarChart4,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    endorsements: {
      total: 0,
      pending: 0,
      approved: 0
    },
    users: 0,
    pageViews: 0
  });
  
  useEffect(() => {
    // In a real app, you would fetch these stats from your API
    // For now, we'll use dummy data
    setStats({
      endorsements: {
        total: 12,
        pending: 5,
        approved: 7
      },
      users: 24,
      pageViews: 1250
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon, linkTo, color }: { 
    title: string; 
    value: number | string; 
    icon: any; 
    linkTo?: string;
    color: string;
  }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-2 rounded-full ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      {linkTo && (
        <Link href={linkTo} className="mt-4 inline-flex items-center text-sm font-medium text-[#0B3558] hover:underline">
          View details <ArrowUpRight className="ml-1 w-3 h-3" />
        </Link>
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {session?.user?.name || 'Admin'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Endorsements" 
          value={stats.endorsements.total} 
          icon={MessageSquare} 
          linkTo="/admin/approve-endorsements"
          color="bg-[#0B3558]"
        />
        <StatCard 
          title="Pending Approval" 
          value={stats.endorsements.pending} 
          icon={MessageSquare} 
          linkTo="/admin/approve-endorsements"
          color="bg-orange-500"
        />
        <StatCard 
          title="Registered Users" 
          value={stats.users} 
          icon={Users}
          linkTo="/admin/users"
          color="bg-[#40C5B5]"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        </div>
        
        <div className="space-y-4">
          <div className="p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <MessageSquare className="w-5 h-5 text-[#0B3558]" />
              </div>
              <div>
                <p className="text-gray-800">New endorsement submitted</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-800">New user registered</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <BarChart4 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-800">Monthly analytics report</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
