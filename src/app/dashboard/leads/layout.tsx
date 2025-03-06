'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiList, FiInbox, FiStar, FiActivity, FiTag } from 'react-icons/fi';

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeView, setActiveView] = useState('all');
  
  // Navigation items
  const navItems = [
    { name: 'All Leads', href: '/dashboard/leads/all', icon: FiGrid },
    { name: 'Starred', href: '/dashboard/leads/starred', icon: FiStar },
    { name: 'New', href: '/dashboard/leads/new', icon: FiInbox },
    { name: 'Active', href: '/dashboard/leads/active', icon: FiActivity },
    { name: 'Tags', href: '/dashboard/leads/tags', icon: FiTag },
  ];

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex space-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center h-14 px-2 text-sm font-medium border-b-2 ${
                      isActive
                        ? 'border-blue-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setActiveView('grid')}
                className={`relative inline-flex items-center px-3 py-1.5 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                  activeView === 'grid'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FiGrid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView('list')}
                className={`relative inline-flex items-center px-3 py-1.5 rounded-r-md border border-gray-300 dark:border-gray-600 -ml-px text-sm font-medium ${
                  activeView === 'list'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FiList className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
