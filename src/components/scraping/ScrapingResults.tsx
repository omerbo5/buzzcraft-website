'use client';

import { useState } from 'react';
import { FiSearch, FiFilter, FiBarChart2, FiDownload, FiExternalLink, FiUser, FiThumbsUp, FiMessageSquare, FiCalendar, FiArrowUp, FiArrowDown } from 'react-icons/fi';

type RedditPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  subreddit: string;
  url: string;
  upvotes: number;
  comments: number;
  created: string;
  relevanceScore: number;
  matchedKeywords?: string[];
};

type ScrapingResultsProps = {
  posts: RedditPost[];
  isLoading?: boolean;
  onExport?: () => void;
};

const ScrapingResults = ({ posts, isLoading = false, onExport }: ScrapingResultsProps) => {
  const [sortField, setSortField] = useState<string>('relevanceScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);
  const [minRelevanceFilter, setMinRelevanceFilter] = useState<number>(0);

  // Toggle expanded state of a post
  const toggleExpand = (postId: string) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter(id => id !== postId));
    } else {
      setExpandedPosts([...expandedPosts, postId]);
    }
  };

  // Handle sort changes
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filter and sort posts
  const filteredAndSortedPosts = posts
    .filter((post) => {
      // Apply search query filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower) ||
          post.author.toLowerCase().includes(searchLower) ||
          post.subreddit.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((post) => {
      // Apply relevance score filter
      return post.relevanceScore >= minRelevanceFilter;
    })
    .sort((a, b) => {
      // Apply sorting
      const fieldA = a[sortField as keyof RedditPost];
      const fieldB = b[sortField as keyof RedditPost];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      } else {
        // Assume numeric
        return sortDirection === 'asc'
          ? Number(fieldA) - Number(fieldB)
          : Number(fieldB) - Number(fieldA);
      }
    });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <FiSearch className="mr-2 text-blue-500" /> 
            Scraping Results
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              {posts.length} posts found
            </span>
          </h2>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onExport}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiDownload className="mr-2 h-4 w-4" />
              Export
            </button>
            
            <button
              onClick={() => console.log('View analytics')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiBarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </button>
          </div>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search in results..."
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-64">
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">Min Relevance:</span>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={minRelevanceFilter}
                onChange={(e) => setMinRelevanceFilter(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{minRelevanceFilter}%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Table Header */}
      <div className="hidden sm:flex bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 px-6 py-3 text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
        <div className="w-1/2 flex items-center cursor-pointer" onClick={() => handleSort('title')}>
          <span>Post</span>
          {sortField === 'title' && (
            sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
          )}
        </div>
        <div className="w-1/12 flex items-center cursor-pointer" onClick={() => handleSort('upvotes')}>
          <span>Upvotes</span>
          {sortField === 'upvotes' && (
            sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
          )}
        </div>
        <div className="w-1/12 flex items-center cursor-pointer" onClick={() => handleSort('comments')}>
          <span>Comments</span>
          {sortField === 'comments' && (
            sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
          )}
        </div>
        <div className="w-1/6 flex items-center cursor-pointer" onClick={() => handleSort('created')}>
          <span>Date</span>
          {sortField === 'created' && (
            sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
          )}
        </div>
        <div className="w-1/6 flex items-center justify-end cursor-pointer" onClick={() => handleSort('relevanceScore')}>
          <span>Relevance</span>
          {sortField === 'relevanceScore' && (
            sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
          )}
        </div>
      </div>
      
      {/* Results List */}
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-3 text-gray-700 dark:text-gray-300">Loading results...</span>
        </div>
      ) : filteredAndSortedPosts.length === 0 ? (
        <div className="text-center py-12">
          <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No results found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredAndSortedPosts.map((post) => (
            <div key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div className="px-6 py-4">
                <div 
                  className="sm:flex sm:justify-between sm:items-center cursor-pointer"
                  onClick={() => toggleExpand(post.id)}
                >
                  <div className="sm:w-1/2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 line-clamp-2">{post.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiUser className="mr-1 h-3 w-3" />
                      <span className="mr-2">{post.author}</span>
                      <span>r/{post.subreddit}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 sm:mt-0 flex sm:block w-full sm:w-auto">
                    <div className="flex sm:block justify-between w-full sm:w-auto">
                      <div className="sm:w-1/12 flex items-center">
                        <FiThumbsUp className="mr-1 h-4 w-4 text-orange-500" />
                        <span>{post.upvotes}</span>
                      </div>
                      
                      <div className="sm:w-1/12 flex items-center">
                        <FiMessageSquare className="mr-1 h-4 w-4 text-blue-500" />
                        <span>{post.comments}</span>
                      </div>
                      
                      <div className="sm:w-1/6 flex items-center">
                        <FiCalendar className="mr-1 h-4 w-4 text-green-500" />
                        <span>{formatDate(post.created)}</span>
                      </div>
                      
                      <div className="sm:w-1/6 ml-auto sm:ml-0 flex items-center">
                        <div className={`px-2 py-1 text-xs font-semibold rounded-full 
                          ${post.relevanceScore >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                           post.relevanceScore >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                           'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
                        }>
                          {post.relevanceScore}% relevance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expanded content */}
                {expandedPosts.includes(post.id) && (
                  <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {post.content}
                    </p>
                    
                    {post.matchedKeywords && post.matchedKeywords.length > 0 && (
                      <div className="mt-4">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Matched keywords:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {post.matchedKeywords.map((keyword, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full px-2.5 py-0.5 text-xs"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View on Reddit <FiExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination (simplified for now) */}
      {filteredAndSortedPosts.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{filteredAndSortedPosts.length}</span> of <span className="font-medium">{posts.length}</span> results
          </div>
          
          <div className="flex-1 flex justify-end">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700"
              onClick={() => console.log('Show more')}
            >
              Show More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrapingResults;
