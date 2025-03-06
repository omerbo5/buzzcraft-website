'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';

type StatCardProps = {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: IconType;
  color: string;
  description: string;
  timeRange?: 'day' | 'week' | 'month';
  progressValue?: number;
};

export default function StatCard({
  name,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  description,
  timeRange = 'week',
  progressValue
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {name}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                {value}
              </div>
              <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 
                changeType === 'decrease' ? 'text-red-600 dark:text-red-400' :
                'text-gray-600 dark:text-gray-400'
              }`}>
                {change}
              </div>
            </dd>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
          {progressValue !== undefined && (
            <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className={`${color} h-1.5 rounded-full`} 
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3 flex justify-between items-center">
        <div className="text-sm">
          <Link 
            href={`/dashboard/${name.toLowerCase().replace(' ', '-')}`} 
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
          >
            View details
          </Link>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {timeRange === 'day' ? 'Today' : timeRange === 'week' ? 'This week' : 'This month'}
        </span>
      </div>
    </div>
  );
}
