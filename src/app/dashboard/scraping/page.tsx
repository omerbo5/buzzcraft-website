'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiCalendar, FiClock, FiPlus, FiList } from 'react-icons/fi';
import Link from 'next/link';

// Mocked scraping jobs data
const mockJobs = [
  {
    id: 1,
    name: 'Web Development Freelancers',
    source: 'r/webdev, r/freelance',
    status: 'active',
    lastRun: '2 hours ago',
    nextRun: 'in 22 hours',
    leadsFound: 126,
    schedule: 'Daily'
  },
  {
    id: 2,
    name: 'Mobile App Projects',
    source: 'r/iOSProgramming, r/androiddev',
    status: 'active',
    lastRun: '1 day ago',
    nextRun: 'in 8 hours',
    leadsFound: 84,
    schedule: 'Daily'
  },
  {
    id: 3,
    name: 'UI/UX Design Opportunities',
    source: 'r/UI_Design, r/UXDesign',
    status: 'paused',
    lastRun: '3 days ago',
    nextRun: '-',
    leadsFound: 57,
    schedule: 'Weekly'
  },
];

export default function ScrapingDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/scraping/new');
  }, [router]);

  const [filter, setFilter] = useState('all');

  const filteredJobs = filter === 'all' 
    ? mockJobs 
    : mockJobs.filter(job => job.status === filter);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scraping</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your Reddit scraping jobs and schedules</p>
        </div>

        <div className="mt-4 md:mt-0">
          <Link 
            href="/dashboard/scraping/new" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            Create New Scraping Job
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
              <FiSearch className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockJobs.filter(job => job.status === 'active').length}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/scraping?filter=active" 
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              View active jobs →
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
              <FiCalendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled Jobs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockJobs.filter(job => job.schedule !== 'Once').length}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/scraping/scheduled" 
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              View schedules →
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
              <FiList className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Leads Found</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockJobs.reduce((total, job) => total + job.leadsFound, 0)}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/leads" 
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              View all leads →
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setFilter('all')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${filter === 'all'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
            `}
          >
            All Jobs
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${filter === 'active'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
            `}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('paused')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${filter === 'paused'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
            `}
          >
            Paused
          </button>
        </nav>
      </div>

      {/* Jobs List */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Scraping Jobs</h2>
        </div>
        
        {filteredJobs.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredJobs.map(job => (
              <li key={job.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{job.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Source: {job.source}</p>
                    <div className="mt-2 flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {job.status === 'active' ? 'Active' : 'Paused'}
                      </span>
                      <span className="ml-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiClock className="mr-1.5 h-4 w-4 text-gray-400" />
                        {job.schedule}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div>Last run: {job.lastRun}</div>
                      <div>Next run: {job.nextRun}</div>
                      <div>Leads found: {job.leadsFound}</div>
                    </div>
                    <div className="mt-3 flex space-x-3">
                      <button
                        className={`inline-flex items-center px-3 py-1 border text-sm font-medium rounded-md ${
                          job.status === 'active'
                            ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'
                            : 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100 dark:border-green-600 dark:text-green-300 dark:bg-green-900/30 dark:hover:bg-green-900/50'
                        }`}
                      >
                        {job.status === 'active' ? 'Pause' : 'Resume'}
                      </button>
                      <Link
                        href={`/dashboard/scraping/${job.id}`}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 text-sm font-medium rounded-md dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No scraping jobs found matching your filter.</p>
            <Link 
              href="/dashboard/scraping/new" 
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <FiPlus className="mr-2 h-5 w-5" />
              Create New Scraping Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
