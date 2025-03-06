'use client';

import { useState } from 'react';
import { FiSearch, FiCalendar, FiClock, FiBarChart2 } from 'react-icons/fi';
import Tabs from '@/components/ui/Tabs';
import ErrorModal from '@/components/ui/ErrorModal';
import ScrapingInterface from '@/components/scraping/ScrapingInterface';
import ScrapingResults from '@/components/scraping/ScrapingResults';
import ScrapingSchedule from '@/components/scraping/ScrapingSchedule';
import ScrapingHistory from '@/components/scraping/ScrapingHistory';

export default function ScrapingPage() {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Tabs configuration
  const tabs = [
    {
      id: 'scrape',
      label: 'New Scrape',
      icon: <FiSearch className="mr-2 h-4 w-4" />,
      content: <ScrapingInterface />
    },
    {
      id: 'schedule',
      label: 'Scheduled Scrapes',
      icon: <FiCalendar className="mr-2 h-4 w-4" />,
      content: <ScrapingSchedule />
    },
    {
      id: 'history',
      label: 'History',
      icon: <FiClock className="mr-2 h-4 w-4" />,
      content: <ScrapingHistory />
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <FiBarChart2 className="mr-2 h-4 w-4" />,
      content: (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <FiBarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">Analytics Coming Soon</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              We're working on powerful analytics features to help you gain insights from your scraped data.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Reddit Scraping</h1>
        <p className="text-gray-600 dark:text-gray-400">Find potential leads and insights from Reddit communities</p>
      </div>
      
      <Tabs tabs={tabs} defaultTab="scrape" />
      
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Scraping Error"
        message={errorMessage}
      />
    </div>
  );
}
