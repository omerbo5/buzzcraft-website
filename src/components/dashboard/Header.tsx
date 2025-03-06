'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiBell, FiSearch, FiUser } from 'react-icons/fi';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function DashboardHeader() {
  const { data: session } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex flex-1 justify-end">
            {/* Search bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md">
              <div className="w-full max-w-lg lg:max-w-xs relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  placeholder="Search for leads, contacts..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            <div className="ml-4 flex items-center gap-2 md:gap-4">
              {/* Theme toggle */}
              <div className="flex items-center">
                <ThemeToggle />
              </div>

              {/* Notifications dropdown */}
              <div className="relative">
                <button
                  className="p-1 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <span className="sr-only">View notifications</span>
                  <FiBell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />
                </button>

                {isNotificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1 divide-y divide-gray-200 dark:divide-gray-700">
                      <div className="px-4 py-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          <p className="font-medium">New leads available</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 new leads from r/webdev match your criteria</p>
                        </div>
                        <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          <p className="font-medium">Scraping job completed</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your scheduled scraping job has finished</p>
                        </div>
                        <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          <p className="font-medium">Lead response received</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">User john_doe replied to your message</p>
                        </div>
                      </div>
                      <div className="px-4 py-2">
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {session?.user?.image ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={session.user.image}
                        alt={`${session.user.name}'s profile`}
                      />
                    ) : (
                      <FiUser className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300 hidden md:block">
                    {session?.user?.name || 'User'}
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <a
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Your Profile
                      </a>
                      <a
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Settings
                      </a>
                      <a
                        href="/dashboard/subscription"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Subscription
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
