'use client';

import { useState } from 'react';
import { FiDownload, FiCalendar, FiRefreshCw, FiBarChart2, FiTrendingUp, FiClipboard, FiMail } from 'react-icons/fi';

// Mock report data
const mockReports = [
  {
    id: 1,
    name: 'Lead Acquisition Report',
    description: 'Overview of new leads collected over time and their sources',
    lastGenerated: '2023-05-15',
    category: 'Lead Generation',
    format: 'PDF',
    icon: FiTrendingUp
  },
  {
    id: 2,
    name: 'Conversion Metrics',
    description: 'Analysis of lead conversions and engagement rates',
    lastGenerated: '2023-05-10',
    category: 'Performance',
    format: 'PDF',
    icon: FiBarChart2
  },
  {
    id: 3,
    name: 'Scraping Efficiency',
    description: 'Metrics on the performance of your scraping jobs',
    lastGenerated: '2023-05-05',
    category: 'Technical',
    format: 'CSV',
    icon: FiRefreshCw
  },
  {
    id: 4,
    name: 'Email Campaign Results',
    description: 'Open rates, click rates, and conversion data for email campaigns',
    lastGenerated: '2023-04-28',
    category: 'Marketing',
    format: 'PDF',
    icon: FiMail
  },
  {
    id: 5,
    name: 'Lead Source Breakdown',
    description: 'Detailed breakdown of lead sources and their quality metrics',
    lastGenerated: '2023-04-20',
    category: 'Lead Generation',
    format: 'PDF',
    icon: FiClipboard
  }
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [category, setCategory] = useState('all');

  const filteredReports = category === 'all' 
    ? mockReports 
    : mockReports.filter(report => report.category === category);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Access and generate custom reports</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 pr-8 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
              <option value="all">All time</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <FiCalendar className="h-4 w-4" />
            </div>
          </div>
          
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Generate New Report
          </button>
        </div>
      </div>

      {/* Report Category Filter */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setCategory('all')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${category === 'all'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
            `}
          >
            All Reports
          </button>
          <button
            onClick={() => setCategory('Lead Generation')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${category === 'Lead Generation'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
            `}
          >
            Lead Generation
          </button>
          <button
            onClick={() => setCategory('Performance')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${category === 'Performance'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
            `}
          >
            Performance
          </button>
          <button
            onClick={() => setCategory('Marketing')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${category === 'Marketing'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
            `}
          >
            Marketing
          </button>
          <button
            onClick={() => setCategory('Technical')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${category === 'Technical'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
            `}
          >
            Technical
          </button>
        </nav>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map(report => (
          <div key={report.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <report.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{report.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 mt-1">
                    {report.category}
                  </span>
                </div>
              </div>
              
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{report.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last generated: {formatDate(report.lastGenerated)}
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {report.format}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
              <div className="flex justify-between items-center">
                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  View Report
                </button>
                <button className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400">
                  <FiDownload className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredReports.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">No reports found in this category.</p>
          <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <FiRefreshCw className="mr-2 h-5 w-5" />
            Generate New Report
          </button>
        </div>
      )}
    </div>
  );
}
