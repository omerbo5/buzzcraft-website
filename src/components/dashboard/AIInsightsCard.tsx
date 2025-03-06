'use client';

import Link from 'next/link';
import { FiActivity, FiTarget, FiMessageCircle, FiAlertCircle } from 'react-icons/fi';

type AIInsightsCardProps = {
  timeRange?: 'day' | 'week' | 'month';
};

export default function AIInsightsCard({ timeRange = 'week' }: AIInsightsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
          <FiActivity className="mr-2 text-purple-500" />
          AI Insights
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
          Updated {timeRange === 'day' ? 'today' : timeRange === 'week' ? 'this week' : 'this month'}
        </span>
      </div>
      <div className="p-6">
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 mb-4">
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Based on your recent lead data, our AI has identified these key insights to help optimize your lead generation.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                <FiTarget className="h-5 w-5" />
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Best performing subreddits</h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                r/webdev, r/smallbusiness, and r/entrepreneur are providing 72% of your qualified leads.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <FiMessageCircle className="h-5 w-5" />
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Response patterns</h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Leads respond 43% more often when first contacted within 2 hours of their post.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                <FiAlertCircle className="h-5 w-5" />
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Attention needed</h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                23 high-relevance leads (&gt;90%) haven't been contacted in the past 48 hours.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Lead quality distribution</h4>
          <div className="relative pt-1">
            <div className="flex h-4 overflow-hidden text-xs rounded-full">
              <div className="flex flex-col justify-center text-center text-white bg-green-500 shadow-md w-3/12 rounded-l-full">
                <span className="text-xs font-semibold">High</span>
              </div>
              <div className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-md w-5/12">
                <span className="text-xs font-semibold">Medium</span>
              </div>
              <div className="flex flex-col justify-center text-center text-white bg-yellow-500 shadow-md w-3/12">
                <span className="text-xs font-semibold">Low</span>
              </div>
              <div className="flex flex-col justify-center text-center text-white bg-gray-400 shadow-md w-1/12 rounded-r-full">
                <span className="text-xs font-semibold">N/A</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
        <div className="text-sm">
          <Link href="/dashboard/analytics/insights" className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500">
            View full AI analysis
          </Link>
        </div>
      </div>
    </div>
  );
}
