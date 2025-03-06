'use client';

import { useState } from 'react';
import { FiCalendar, FiClock, FiRepeat, FiTrash2, FiEdit, FiPause, FiPlay, FiMoreVertical, FiChevronDown, FiChevronUp } from 'react-icons/fi';

type ScheduledScrape = {
  id: string;
  name: string;
  subreddits: string[];
  keywords: string[];
  schedule: string;
  nextRun: string;
  status: 'active' | 'paused';
  lastRunResults?: {
    totalPosts: number;
    relevantPosts: number;
    date: string;
  };
};

const exampleSchedules: ScheduledScrape[] = [
  {
    id: '1',
    name: 'Marketing Leads',
    subreddits: ['marketing', 'digitalmarketing', 'socialmedia'],
    keywords: ['lead generation', 'marketing automation', 'campaign strategy'],
    schedule: 'Daily at 9:00 AM',
    nextRun: '2025-03-05T09:00:00',
    status: 'active',
    lastRunResults: {
      totalPosts: 245,
      relevantPosts: 42,
      date: '2025-03-04T09:00:00'
    }
  },
  {
    id: '2',
    name: 'SaaS Monitoring',
    subreddits: ['SaaS', 'startups', 'entrepreneur'],
    keywords: ['software service', 'pricing strategy', 'saas growth'],
    schedule: 'Weekly on Monday, 10:00 AM',
    nextRun: '2025-03-10T10:00:00',
    status: 'active',
    lastRunResults: {
      totalPosts: 189,
      relevantPosts: 37,
      date: '2025-03-03T10:00:00'
    }
  },
  {
    id: '3',
    name: 'Design Insights',
    subreddits: ['web_design', 'UI_Design', 'UXDesign'],
    keywords: ['UI feedback', 'design tools', 'user experience'],
    schedule: 'Weekly on Wednesday, 2:00 PM',
    nextRun: '2025-03-05T14:00:00',
    status: 'paused'
  }
];

const ScrapingSchedule = () => {
  const [schedules, setSchedules] = useState<ScheduledScrape[]>(exampleSchedules);
  const [expandedSchedules, setExpandedSchedules] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  
  // Toggle expanded state of a scheduled scrape
  const toggleExpand = (scheduleId: string) => {
    if (expandedSchedules.includes(scheduleId)) {
      setExpandedSchedules(expandedSchedules.filter(id => id !== scheduleId));
    } else {
      setExpandedSchedules([...expandedSchedules, scheduleId]);
    }
  };
  
  // Toggle the status of a scheduled scrape (active/paused)
  const toggleStatus = (scheduleId: string) => {
    setSchedules(prevSchedules => 
      prevSchedules.map(schedule => 
        schedule.id === scheduleId
          ? { ...schedule, status: schedule.status === 'active' ? 'paused' : 'active' }
          : schedule
      )
    );
  };
  
  // Delete a scheduled scrape
  const deleteSchedule = (scheduleId: string) => {
    setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule.id !== scheduleId));
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  
  // Compute the time remaining until next run
  const getTimeRemaining = (nextRun: string) => {
    const now = new Date();
    const runDate = new Date(nextRun);
    const diff = runDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Due now';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} ${hours} hr${hours !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
    } else {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Scheduled Scrapes</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Schedule
        </button>
      </div>
      
      {/* Create Schedule Form - Simplified placeholder */}
      {isCreating && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4">Create New Schedule</h3>
          {/* Form elements would go here */}
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            Schedule creation form will be implemented in the next phase.
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Schedule
            </button>
          </div>
        </div>
      )}
      
      {/* Scheduled Scrapes List */}
      {schedules.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <FiCalendar className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No scheduled scrapes</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Get started by creating a new scheduled scrape to automate your Reddit data collection.
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Create Your First Schedule
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {schedules.map((schedule) => (
              <li key={schedule.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="px-6 py-5">
                  <div 
                    className="flex justify-between items-start cursor-pointer"
                    onClick={() => toggleExpand(schedule.id)}
                  >
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{schedule.name}</h3>
                        <span 
                          className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${schedule.status === 'active' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`
                          }
                        >
                          {schedule.status === 'active' ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      
                      <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiClock className="mr-1.5 h-4 w-4 text-gray-400" />
                        {schedule.schedule}
                      </div>
                      
                      <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiCalendar className="mr-1.5 h-4 w-4 text-gray-400" />
                        Next run: {formatDate(schedule.nextRun)} ({getTimeRemaining(schedule.nextRun)})
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(schedule.id);
                        }}
                        className={`p-2 rounded-full
                          ${schedule.status === 'active'
                            ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            : 'text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'}`
                        }
                      >
                        {schedule.status === 'active' ? <FiPause /> : <FiPlay />}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit
                        }}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiEdit />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSchedule(schedule.id);
                        }}
                        className="p-2 rounded-full text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                      >
                        <FiTrash2 />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(schedule.id);
                        }}
                      >
                        {expandedSchedules.includes(schedule.id) ? (
                          <FiChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <FiChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded details */}
                  {expandedSchedules.includes(schedule.id) && (
                    <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Subreddits</h4>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {schedule.subreddits.map((subreddit, index) => (
                              <span key={index} className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-2.5 py-0.5 text-xs">
                                r/{subreddit}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Keywords</h4>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {schedule.keywords.map((keyword, index) => (
                              <span key={index} className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full px-2.5 py-0.5 text-xs">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {schedule.lastRunResults && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Last Run Results</h4>
                          <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 dark:text-gray-400">Total Posts</div>
                              <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-100">
                                {schedule.lastRunResults.totalPosts}
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 dark:text-gray-400">Relevant Posts</div>
                              <div className="mt-1 text-xl font-semibold text-green-600 dark:text-green-400">
                                {schedule.lastRunResults.relevantPosts}
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 dark:text-gray-400">Ran On</div>
                              <div className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                                {formatDate(schedule.lastRunResults.date)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 flex justify-end space-x-3">
                        <button
                          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          View Results
                        </button>
                        
                        <button
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Run Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScrapingSchedule;
