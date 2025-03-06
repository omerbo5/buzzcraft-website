'use client';

import { useState } from 'react';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('month');

  const timeRanges = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'quarter', label: 'Last Quarter' },
    { value: 'year', label: 'Last Year' }
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your lead generation and conversion metrics</p>
        </div>

        <div className="mt-4 md:mt-0">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Time Range:</label>
          <div className="relative inline-block w-40">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:text-white"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiCalendar className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
              <FiBarChart2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lead Generation</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">+27.4%</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/analytics/performance" 
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              View performance details →
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
              <FiTrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12.8%</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/analytics/performance#conversion" 
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              Analyze conversions →
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
              <FiPieChart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lead Sources</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">5 active</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/analytics/reports" 
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              View detailed reports →
            </Link>
          </div>
        </div>
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Lead Generation Trend</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Chart visualization will be displayed here</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Conversion Funnel</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Chart visualization will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Available Reports</h2>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Link href="/dashboard/analytics/reports/leads" className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white">Lead Generation Report</span>
              <FiBarChart2 className="h-5 w-5 text-gray-400" />
            </Link>
          </li>
          <li className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Link href="/dashboard/analytics/reports/conversion" className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white">Conversion Analytics</span>
              <FiTrendingUp className="h-5 w-5 text-gray-400" />
            </Link>
          </li>
          <li className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Link href="/dashboard/analytics/reports/sources" className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white">Lead Sources Breakdown</span>
              <FiPieChart className="h-5 w-5 text-gray-400" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
