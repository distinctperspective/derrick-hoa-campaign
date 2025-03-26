'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings,
  LogOut,
  User,
  ChevronDown,
  Menu,
  Shield,
  HelpCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    redirect('/');
  }

  // Redirect if authenticated but not an admin
  if (status === 'authenticated' && !session?.user?.isAdmin) {
    redirect('/');
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3558]"></div>
      </div>
    );
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Endorsements', href: '/admin/approve-endorsements', icon: MessageSquare },
    { name: 'Requests', href: '/admin/requests', icon: HelpCircle },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white">
        <div className="p-4">
          <Link href="/">
            <div className="flex justify-center">
              <h2 className="text-xl font-bold text-[#0B3558]">Derrick Threatt</h2>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#0B3558]">
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="md:hidden flex-1 flex justify-center">
              <h2 className="text-lg font-bold text-[#0B3558]">Derrick Threatt</h2>
            </div>

            {/* User menu */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 focus:outline-none"
                onClick={toggleUserMenu}
              >
                <div className="w-8 h-8 rounded-full bg-[#0B3558] flex items-center justify-center text-white overflow-hidden">
                  {session?.user?.image ? (
                    <div className="w-full h-full bg-gray-300 rounded-full"></div>
                  ) : (
                    <span>{session?.user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  {session?.user?.name || 'User'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link href="/profile" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      // Handle logout
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                className="md:hidden fixed inset-0 z-40 backdrop-blur-sm bg-black/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={toggleMobileMenu}
              />
              <motion.div 
                className="md:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-4 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-[#0B3558]">Derrick Threatt</h2>
                  <motion.button 
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700"
                    onClick={toggleMobileMenu}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.li 
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link 
                          href={item.href} 
                          className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#0B3558]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
