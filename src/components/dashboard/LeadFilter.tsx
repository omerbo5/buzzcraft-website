'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiSliders, FiX, FiCheck, FiCalendar } from 'react-icons/fi';
import { LeadFilter } from '@/types/lead';

type LeadFilterProps = {
  initialFilters?: Partial<LeadFilter>;
  onFilterChange: (filters: LeadFilter) => void;
  availableSubreddits: string[];
  availableTags: string[];
};

export default function LeadFilterComponent({
  initialFilters,
  onFilterChange,
  availableSubreddits,
  availableTags,
}: LeadFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<LeadFilter>({
    status: initialFilters?.status || [],
    subreddits: initialFilters?.subreddits || [],
    relevanceRange: initialFilters?.relevanceRange || [0, 100],
    dateRange: undefined,
    tags: initialFilters?.tags || [],
    search: initialFilters?.search || '',
    sort: initialFilters?.sort || { field: 'relevance', direction: 'desc' },
  });

  const toggleFilter = () => setIsOpen(!isOpen);

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const resetFilters: LeadFilter = {
      status: [],
      subreddits: [],
      relevanceRange: [0, 100],
      dateRange: undefined,
      tags: [],
      search: '',
      sort: { field: 'relevance', direction: 'desc' },
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: e.target.value
    });
  };

  const toggleStatus = (status: string) => {
    setFilters(prev => {
      const statusArray = prev.status || [];
      const newStatus = statusArray.includes(status)
        ? statusArray.filter(s => s !== status)
        : [...statusArray, status];
      
      return { ...prev, status: newStatus };
    });
  };

  const toggleSubreddit = (subreddit: string) => {
    setFilters(prev => {
      const subredditsArray = prev.subreddits || [];
      const newSubreddits = subredditsArray.includes(subreddit)
        ? subredditsArray.filter(s => s !== subreddit)
        : [...subredditsArray, subreddit];
      
      return { ...prev, subreddits: newSubreddits };
    });
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => {
      const tagsArray = prev.tags || [];
      const newTags = tagsArray.includes(tag)
        ? tagsArray.filter(t => t !== tag)
        : [...tagsArray, tag];
      
      return { ...prev, tags: newTags };
    });
  };

  const handleRelevanceChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      relevanceRange: [min, max] as [number, number]
    }));
  };

  const handleSortChange = (field: string) => {
    setFilters(prev => {
      const currentSort = prev.sort || { field: 'relevance', direction: 'desc' };
      // If clicking the same sort option, toggle the direction
      const direction = currentSort.field === field
        ? (currentSort.direction === 'asc' ? 'desc' : 'asc')
        : 'desc';
      
      return {
        ...prev,
        sort: {
          field,
          direction
        }
      };
    });
  };

  // Apply search on enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  useEffect(() => {
    // Auto-apply filter when search field is cleared
    if (filters.search === '') {
      onFilterChange(filters);
    }
  }, [filters.search, onFilterChange]);

  // Check if any filters are applied
  const hasActiveFilters = () => {
    return (
      (filters.status && filters.status.length > 0) ||
      (filters.subreddits && filters.subreddits.length > 0) ||
      (filters.tags && filters.tags.length > 0) ||
      (filters.search && filters.search !== '') ||
      (filters.relevanceRange && 
        (filters.relevanceRange[0] > 0 || filters.relevanceRange[1] < 100))
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
      <div className="p-4 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search leads..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
          />
        </div>
        
        <button
          onClick={toggleFilter}
          className={`ml-3 px-3 py-2 inline-flex items-center rounded-md border ${
            hasActiveFilters()
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
          }`}
        >
          <FiSliders className="mr-2 h-5 w-5" />
          Filters
          {hasActiveFilters() && (
            <span className="ml-1.5 inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-200 dark:bg-blue-800 text-xs font-medium text-blue-800 dark:text-blue-300">
              {[
                filters.status?.length || 0,
                filters.subreddits?.length || 0,
                filters.tags?.length || 0,
                filters.search ? 1 : 0,
                (filters.relevanceRange && 
                  (filters.relevanceRange[0] > 0 || filters.relevanceRange[1] < 100)) ? 1 : 0
              ].reduce((a, b) => a + b, 0)}
            </span>
          )}
        </button>
      </div>
      
      {isOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</h3>
              <div className="grid grid-cols-2 gap-2">
                {['new', 'contacted', 'qualified', 'responded', 'converted', 'rejected'].map((status) => (
                  <div key={status} className="flex items-center">
                    <button
                      onClick={() => toggleStatus(status)}
                      className={`h-4 w-4 rounded border flex items-center justify-center ${
                        filters.status?.includes(status)
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {filters.status?.includes(status) && <FiCheck className="h-3 w-3" />}
                    </button>
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Subreddit Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subreddits</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableSubreddits.map((subreddit) => (
                  <div key={subreddit} className="flex items-center">
                    <button
                      onClick={() => toggleSubreddit(subreddit)}
                      className={`h-4 w-4 rounded border flex items-center justify-center ${
                        filters.subreddits?.includes(subreddit)
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {filters.subreddits?.includes(subreddit) && <FiCheck className="h-3 w-3" />}
                    </button>
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {subreddit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Relevance Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Relevance: {filters.relevanceRange?.[0]}% - {filters.relevanceRange?.[1]}%
              </h3>
              <div className="px-2">
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.relevanceRange?.[0] || 0}
                    onChange={(e) => {
                      const min = parseInt(e.target.value);
                      const max = filters.relevanceRange?.[1] || 100;
                      if (min <= max) {
                        handleRelevanceChange(min, max);
                      }
                    }}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.relevanceRange?.[1] || 100}
                    onChange={(e) => {
                      const max = parseInt(e.target.value);
                      const min = filters.relevanceRange?.[0] || 0;
                      if (max >= min) {
                        handleRelevanceChange(min, max);
                      }
                    }}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                </div>
              </div>
            </div>
            
            {/* Tags Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      filters.tags?.includes(tag)
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { field: 'relevance', label: 'Relevance' },
                  { field: 'createdAt', label: 'Date Created' },
                  { field: 'lastActivity', label: 'Last Activity' },
                  { field: 'username', label: 'Username' }
                ].map((sortOption) => (
                  <button
                    key={sortOption.field}
                    onClick={() => handleSortChange(sortOption.field)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      filters.sort?.field === sortOption.field
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {sortOption.label}
                    {filters.sort?.field === sortOption.field && (
                      <span className="ml-1">
                        {filters.sort.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Filter Actions */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
