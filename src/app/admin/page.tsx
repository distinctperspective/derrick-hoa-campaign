'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  MessageSquare, 
  Users, 
  BarChart4,
  ArrowUpRight,
  CheckCircle,
  Clock,
  UserCheck,
  UserX
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
    users: {
      total: 0,
      withProfile: 0,
      withoutProfile: 0
    },
    requests: {
      total: 0,
      open: 0,
      closed: 0
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch endorsement stats
        const endorsementsRes = await fetch('/api/admin/stats/endorsements');
        if (!endorsementsRes.ok) throw new Error('Failed to fetch endorsement stats');
        const endorsementsData = await endorsementsRes.json();
        
        // Fetch user stats
        const usersRes = await fetch('/api/admin/stats/users');
        if (!usersRes.ok) throw new Error('Failed to fetch user stats');
        const usersData = await usersRes.json();
        
        // Fetch request stats
        const requestsRes = await fetch('/api/admin/stats/requests');
        if (!requestsRes.ok) throw new Error('Failed to fetch request stats');
        const requestsData = await requestsRes.json();
        
        setStats({
          endorsements: endorsementsData,
          users: usersData,
          requests: requestsData
        });
        
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, linkTo, color, subStats }: { 
    title: string; 
    value: number | string; 
    icon: any; 
    linkTo?: string;
    color: string;
    subStats?: Array<{label: string; value: number; icon: any; color: string;}>;
  }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-2 rounded-full ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      
      {subStats && (
        <div className="space-y-2">
          {subStats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between py-1.5 px-3 rounded-full ${stat.color}`}
            >
              <span className="text-sm font-medium text-white">
                <span className="font-bold">{stat.value}</span> {stat.label}
              </span>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>
      )}
      
      {linkTo && (
        <Link href={linkTo} className="mt-4 inline-flex items-center text-sm font-medium text-[#0B3558] hover:underline">
          View details <ArrowUpRight className="ml-1 w-3 h-3" />
        </Link>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3558]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-medium">Error loading dashboard data</p>
        <p className="text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {session?.user?.name || 'Admin'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Endorsements" 
          value={stats.endorsements.total} 
          icon={MessageSquare} 
          linkTo="/admin/approve-endorsements"
          color="bg-[#0B3558]"
          subStats={[
            {
              label: "Approved",
              value: stats.endorsements.approved,
              icon: CheckCircle,
              color: "bg-green-500"
            },
            {
              label: "Pending",
              value: stats.endorsements.pending,
              icon: Clock,
              color: "bg-orange-500"
            }
          ]}
        />
        <StatCard 
          title="Registered Users" 
          value={stats.users.total} 
          icon={Users}
          linkTo="/admin/users"
          color="bg-[#40C5B5]"
          subStats={[
            {
              label: "Complete Profile",
              value: stats.users.withProfile,
              icon: UserCheck,
              color: "bg-green-500"
            },
            {
              label: "Incomplete Profile",
              value: stats.users.withoutProfile,
              icon: UserX,
              color: "bg-gray-500"
            }
          ]}
        />
        <StatCard 
          title="Requests" 
          value={stats.requests.total} 
          icon={BarChart4}
          linkTo="/admin/requests"
          color="bg-purple-600"
          subStats={[
            {
              label: "Open",
              value: stats.requests.open,
              icon: Clock,
              color: "bg-blue-500"
            },
            {
              label: "Closed",
              value: stats.requests.closed,
              icon: CheckCircle,
              color: "bg-gray-500"
            }
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          <Link href="/admin/activity" className="text-sm text-[#0B3558] hover:underline">
            View all
          </Link>
        </div>
        
        <div className="space-y-4">
          {/* We'll replace this with real activity data in the future */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <MessageSquare className="w-5 h-5 text-[#0B3558]" />
              </div>
              <div>
                <p className="text-gray-800">Dashboard updated with real-time data</p>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
