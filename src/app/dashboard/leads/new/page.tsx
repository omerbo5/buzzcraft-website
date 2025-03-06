'use client';

import { FiInbox } from 'react-icons/fi';

export default function NewLeadsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            New Leads
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Review your newly discovered leads
          </p>
        </div>
      </div>
      
      <div className="mt-10 text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <FiInbox className="mx-auto h-12 w-12 text-blue-500" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No new leads available</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          New leads will appear here once discovered by our Reddit scraper.
        </p>
      </div>
    </div>
  );
}
