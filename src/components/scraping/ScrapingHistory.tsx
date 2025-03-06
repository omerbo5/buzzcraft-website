'use client';

import { useState } from 'react';
import { FiCalendar, FiClock, FiSearch, FiUser, FiFilter, FiExternalLink, FiDownload, FiArrowDown, FiArrowUp, FiInfo } from 'react-icons/fi';

type ScrapingSession = {
  id: string;
  name: string;
  date: string;
  duration: string;
  status: 'completed' | 'failed';
  subreddits: string[];
  keywords: string[];
  postsFound: number;
  relevantPosts: number;
  isScheduled: boolean;
  scheduleName?: string;
};

const mockHistory: ScrapingSession[] = [
  {
    id: '1',
    name: 'Marketing Campaign Research',
    date: '2025-03-04T15:30:00',
    duration: '3m 45s',
    status: 'completed',
    subreddits: ['marketing', 'digitalmarketing', 'socialmedia'],
    keywords: ['campaign strategy', 'social media marketing'],
    postsFound: 342,
    relevantPosts: 67,
    isScheduled: true,
    scheduleName: 'Marketing Leads'
  },
  {
    id: '2',
    name: 'SaaS Competitor Analysis',
    date: '2025-03-03T11:15:00',
    duration: '2m 20s',
    status: 'completed',
    subreddits: ['SaaS', 'startups', 'entrepreneur'],
    keywords: ['pricing strategy', 'saas retention'],
    postsFound: 215,
    relevantPosts: 42,
    isScheduled: false
  },
  {
    id: '3',
    name: 'UI Design Trends',
    date: '2025-03-01T09:30:00',
    duration: '4m 12s',
    status: 'completed',
    subreddits: ['web_design', 'UI_Design', 'UXDesign'],
    keywords: ['UI trends', 'design patterns'],
    postsFound: 178,
    relevantPosts: 35,
    isScheduled: true,
    scheduleName: 'Design Insights'
  },
  {
    id: '4',
    name: 'Error in API Connection',
    date: '2025-02-28T14:45:00',
    duration: '0m 45s',
    status: 'failed',
    subreddits: ['programming', 'webdev', 'javascript'],
    keywords: ['api', 'oauth'],
    postsFound: 0,
    relevantPosts: 0,
    isScheduled: false
  },
  {
    id: '5',
    name: 'Product Feedback Analysis',
    date: '2025-02-25T10:20:00',
    duration: '3m 10s',
    status: 'completed',
    subreddits: ['productfeedback', 'userexperience', 'productivity'],
    keywords: ['user feedback', 'product improvement'],
    postsFound: 156,
    relevantPosts: 29,
    isScheduled: false
  }
];

const ScrapingHistory = () => {
  const [history, setHistory] = useState<ScrapingSession[]>(mockHistory);
  const [sortField, setSortField] = useState<keyof ScrapingSession>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    showScheduled: true,
    showManual: true,
    showCompleted: true,
    showFailed: true
  });
  
  // Handle sort changes
  const handleSort = (field: keyof ScrapingSession) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Apply filters and sorting
  const filteredAndSortedHistory = history
    .filter(session => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          session.name.toLowerCase().includes(query) ||
          session.keywords.some(k => k.toLowerCase().includes(query)) ||
          session.subreddits.some(s => s.toLowerCase().includes(query)) ||
          (session.scheduleName && session.scheduleName.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter(session => {
      // Apply checkbox filters
      if (session.isScheduled && !filters.showScheduled) return false;
      if (!session.isScheduled && !filters.showManual) return false;
      if (session.status === 'completed' && !filters.showCompleted) return false;
      if (session.status === 'failed' && !filters.showFailed) return false;
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      // Handle different types of values
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortDirection === 'asc'
          ? (aValue ? 1 : 0) - (bValue ? 1 : 0)
          : (bValue ? 1 : 0) - (aValue ? 1 : 0);
      }
      
      // Default case
      return 0;
    });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Toggle filter
  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters({...filters, [filterName]: !filters[filterName]});
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Scraping History</h2>
          
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <FiDownload className="mr-2 h-4 w-4" />
            Export History
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, keywords, or subreddits..."
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                checked={filters.showScheduled}
                onChange={() => toggleFilter('showScheduled')}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Scheduled</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                checked={filters.showManual}
                onChange={() => toggleFilter('showManual')}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Manual</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                checked={filters.showCompleted}
                onChange={() => toggleFilter('showCompleted')}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Completed</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                checked={filters.showFailed}
                onChange={() => toggleFilter('showFailed')}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Failed</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* History Table */}
      {filteredAndSortedHistory.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <FiInfo className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No history found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {searchQuery || !filters.showCompleted || !filters.showFailed || !filters.showManual || !filters.showScheduled
              ? 'Try adjusting your search or filters'
              : 'Start scraping to build your history'}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      <span>Name</span>
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <FiArrowUp className="ml-1 h-4 w-4" /> : <FiArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      <span>Date</span>
                      {sortField === 'date' && (
                        sortDirection === 'asc' ? <FiArrowUp className="ml-1 h-4 w-4" /> : <FiArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      <span>Status</span>
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <FiArrowUp className="ml-1 h-4 w-4" /> : <FiArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('postsFound')}
                  >
                    <div className="flex items-center">
                      <span>Posts</span>
                      {sortField === 'postsFound' && (
                        sortDirection === 'asc' ? <FiArrowUp className="ml-1 h-4 w-4" /> : <FiArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('relevantPosts')}
                  >
                    <div className="flex items-center">
                      <span>Relevant</span>
                      {sortField === 'relevantPosts' && (
                        sortDirection === 'asc' ? <FiArrowUp className="ml-1 h-4 w-4" /> : <FiArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('isScheduled')}
                  >
                    <div className="flex items-center">
                      <span>Type</span>
                      {sortField === 'isScheduled' && (
                        sortDirection === 'asc' ? <FiArrowUp className="ml-1 h-4 w-4" /> : <FiArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAndSortedHistory.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{session.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {session.keywords.slice(0, 2).join(', ')}
                        {session.keywords.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{formatDate(session.date)}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Duration: {session.duration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 py-1 text-xs font-medium rounded-full
                          ${session.status === 'completed' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`
                        }
                      >
                        {session.status === 'completed' ? 'Completed' : 'Failed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {session.postsFound}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {session.relevantPosts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.isScheduled ? (
                        <div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                            Scheduled
                          </span>
                          {session.scheduleName && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {session.scheduleName}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          Manual
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          View Results
                        </button>
                        <button
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrapingHistory;
