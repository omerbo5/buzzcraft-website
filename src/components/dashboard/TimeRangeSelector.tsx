'use client';

import { useState } from 'react';

type TimeRange = 'day' | 'week' | 'month';

type TimeRangeSelectorProps = {
  onChange: (range: TimeRange) => void;
  initialValue?: TimeRange;
};

export default function TimeRangeSelector({ onChange, initialValue = 'week' }: TimeRangeSelectorProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>(initialValue);

  const handleChange = (range: TimeRange) => {
    setSelectedRange(range);
    onChange(range);
  };

  return (
    <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-md">
      <button
        type="button"
        onClick={() => handleChange('day')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md ${
          selectedRange === 'day'
            ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
        }`}
      >
        Day
      </button>
      <button
        type="button"
        onClick={() => handleChange('week')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md ${
          selectedRange === 'week'
            ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
        }`}
      >
        Week
      </button>
      <button
        type="button"
        onClick={() => handleChange('month')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md ${
          selectedRange === 'month'
            ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
        }`}
      >
        Month
      </button>
    </div>
  );
}
