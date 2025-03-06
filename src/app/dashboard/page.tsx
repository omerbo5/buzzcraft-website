'use client';

import { useState } from 'react';
import {
  FiUsers, FiTarget, FiActivity, FiBarChart2, FiCalendar,
  FiAlertCircle, FiCheckCircle, FiTrendingUp, FiTrendingDown
} from 'react-icons/fi';

// Import our new components
import StatCard from '@/components/dashboard/StatCard';
import AIInsightsCard from '@/components/dashboard/AIInsightsCard';
import TopLeadsCard from '@/components/dashboard/TopLeadsCard';
import TasksCard from '@/components/dashboard/TasksCard';
import TimeRangeSelector from '@/components/dashboard/TimeRangeSelector';

type TimeRange = 'day' | 'week' | 'month';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  
  // Mock stats data
  const stats = [
    { 
      id: 1, 
      name: 'Total Leads', 
      value: timeRange === 'day' ? '84' : timeRange === 'week' ? '392' : '1,284', 
      change: timeRange === 'day' ? '+12.3%' : timeRange === 'week' ? '+8.7%' : '+16.2%', 
      changeType: 'increase' as const,
      icon: FiUsers, 
      color: 'bg-blue-500',
      description: `Total leads generated ${timeRange === 'day' ? 'today' : timeRange === 'week' ? 'this week' : 'this month'}.`,
      progressValue: 76
    },
    { 
      id: 2, 
      name: 'Qualified Leads', 
      value: timeRange === 'day' ? '32' : timeRange === 'week' ? '128' : '348', 
      change: timeRange === 'day' ? '+5.7%' : timeRange === 'week' ? '+4.2%' : '+9.3%', 
      changeType: 'increase' as const,
      icon: FiTarget, 
      color: 'bg-green-500',
      description: `Leads that meet your qualifying criteria.`,
      progressValue: 62
    },
    { 
      id: 3, 
      name: 'AI Relevance Score', 
      value: timeRange === 'day' ? '82%' : timeRange === 'week' ? '78%' : '76%', 
      change: timeRange === 'day' ? '+6.2%' : timeRange === 'week' ? '+4.8%' : '+3.1%', 
      changeType: 'increase' as const,
      icon: FiActivity, 
      color: 'bg-purple-500',
      description: `Average AI-calculated relevance score for all leads.`,
      progressValue: 78
    },
    { 
      id: 4, 
      name: 'Conversion Rate', 
      value: timeRange === 'day' ? '8.2%' : timeRange === 'week' ? '7.5%' : '6.8%', 
      change: timeRange === 'day' ? '-1.3%' : timeRange === 'week' ? '+2.1%' : '+3.5%', 
      changeType: timeRange === 'day' ? 'decrease' as const : 'increase' as const,
      icon: FiBarChart2, 
      color: 'bg-orange-500',
      description: `Percentage of leads that converted to customers.`,
      progressValue: 55
    }
  ];

  // Mock task data
  const initialTasks = [
    {
      id: 1,
      task: 'Follow up with high-priority leads from r/startup',
      due: '2023-07-15',
      priority: 'high' as const,
      completed: false
    },
    {
      id: 2,
      task: 'Review AI recommendations for keyword optimization',
      due: '2023-07-16',
      priority: 'medium' as const,
      completed: false
    },
    {
      id: 3,
      task: 'Set up new weekly scraping job for r/marketing',
      due: '2023-07-17',
      priority: 'medium' as const,
      completed: true
    },
    {
      id: 4,
      task: 'Analyze conversion metrics from last month',
      due: '2023-07-18',
      priority: 'low' as const,
      completed: false
    }
  ];

  // Mock top leads data
  const topLeads = [
    {
      id: 1,
      username: 'u/startupfounder',
      subreddit: 'r/startups',
      status: 'New',
      post: 'Looking for a social media analytics tool that can help me track engagement across multiple platforms. Any recommendations?',
      relevance: 95,
      lastActivity: '2 hours ago',
    },
    {
      id: 2,
      username: 'u/marketingpro',
      subreddit: 'r/marketing',
      status: 'Active',
      post: 'Our team is struggling with content creation for B2B tech. We need tools or strategies to scale our content production.',
      relevance: 92,
      lastActivity: '4 hours ago',
    },
    {
      id: 3,
      username: 'u/ecommerce_guru',
      subreddit: 'r/ecommerce',
      status: 'Contacted',
      post: 'Has anyone found a reliable analytics platform that integrates well with Shopify? Looking for recommendations.',
      relevance: 88,
      lastActivity: '1 day ago',
    },
    {
      id: 4,
      username: 'u/saas_founder',
      subreddit: 'r/SaaS',
      status: 'Interested',
      post: 'We need to improve our social listening capabilities. Currently using Brandwatch but looking for alternatives.',
      relevance: 85,
      lastActivity: '2 days ago',
    },
  ];

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Overview of your lead generation activity
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <TimeRangeSelector
              onChange={setTimeRange}
              initialValue={timeRange}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              name={stat.name}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              color={stat.color}
              description={stat.description}
              timeRange={timeRange}
              progressValue={stat.progressValue}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AIInsightsCard timeRange={timeRange} />
          </div>
          <div className="lg:col-span-1">
            <TasksCard initialTasks={initialTasks} />
          </div>
        </div>

        {/* Top leads */}
        <div className="mt-8">
          <TopLeadsCard leads={topLeads} timeRange={timeRange} />
        </div>
      </div>
    </div>
  );
}
