'use client';

import Link from 'next/link';
import { FiActivity, FiMessageCircle } from 'react-icons/fi';

type Lead = {
  id: number;
  username: string;
  subreddit: string;
  status: string;
  post: string;
  relevance: number;
  lastActivity: string;
};

type TopLeadsCardProps = {
  leads?: Lead[];
  timeRange?: 'day' | 'week' | 'month';
};

export default function TopLeadsCard({ leads = [], timeRange = 'week' }: TopLeadsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Top Potential Leads
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {timeRange === 'day' ? 'Today' : timeRange === 'week' ? 'This week' : 'This month'}
        </span>
      </div>
      <div className="p-6">
        {leads.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {leads.map((lead) => (
              <li key={lead.id} className="py-4 group hover:bg-gray-50 dark:hover:bg-gray-750 rounded-md transition-all duration-150">
                <div className="flex items-start space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {lead.username}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="inline-block h-2 w-2 rounded-full bg-red-400 mr-1.5"></span>
                        {lead.subreddit}
                      </span>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{lead.lastActivity}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {lead.post}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-center flex flex-col items-end">
                    <div className="flex items-center p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white px-2 py-1 text-xs font-medium mb-2">
                      <FiActivity className="h-3 w-3 mr-1" />
                      {lead.relevance}%
                    </div>
                    <span className="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {lead.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex">
                  <Link 
                    href={`/dashboard/leads/${lead.id}`}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Details
                  </Link>
                  <button 
                    type="button"
                    className="ml-3 inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiMessageCircle className="mr-1 h-3 w-3" />
                    Send Message
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No leads found for the selected time period.</p>
            <button 
              type="button" 
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start New Scrape
            </button>
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
        <Link 
          href="/dashboard/leads" 
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
        >
          View all leads →
        </Link>
      </div>
    </div>
  );
}
