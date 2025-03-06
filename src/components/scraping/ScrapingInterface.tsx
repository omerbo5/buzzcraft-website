'use client';

import { useState } from 'react';
import { FiSearch, FiUser, FiFilter, FiSettings, FiPlus, FiX, FiExternalLink } from 'react-icons/fi';

type ScrapingTargetType = {
  subreddit: string;
  keywords: string[];
  timeframe: string;
  minScore?: number;
  includeComments?: boolean;
};

type ScrapingResultType = {
  id: string;
  title: string;
  content: string;
  author: string;
  subreddit: string;
  url: string;
  score: number;
  createdAt: string;
  matchedKeywords: string[];
  relevanceScore: number;
};

export const ScrapingInterface = () => {
  const [scrapingTargets, setScrapingTargets] = useState<ScrapingTargetType[]>([]);
  const [currentTarget, setCurrentTarget] = useState<ScrapingTargetType>({
    subreddit: '',
    keywords: [],
    timeframe: '7 days'
  });
  const [results, setResults] = useState<ScrapingResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState('');

  const addKeyword = () => {
    if (currentKeyword.trim() && !currentTarget.keywords.includes(currentKeyword.trim())) {
      setCurrentTarget({
        ...currentTarget,
        keywords: [...currentTarget.keywords, currentKeyword.trim()]
      });
      setCurrentKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setCurrentTarget({
      ...currentTarget,
      keywords: currentTarget.keywords.filter(k => k !== keyword)
    });
  };

  const addScrapingTarget = () => {
    if (currentTarget.subreddit && currentTarget.keywords.length > 0) {
      setScrapingTargets([...scrapingTargets, currentTarget]);
      setCurrentTarget({
        subreddit: '',
        keywords: [],
        timeframe: '7 days'
      });
    }
  };

  const removeScrapingTarget = (index: number) => {
    const updatedTargets = [...scrapingTargets];
    updatedTargets.splice(index, 1);
    setScrapingTargets(updatedTargets);
  };

  const runScraping = async () => {
    // This will be implemented to connect to the backend
    setIsLoading(true);
    
    // Mock function to simulate API call
    setTimeout(() => {
      setResults([
        {
          id: '1',
          title: 'Example post about marketing strategies',
          content: 'This is an example post that discusses various marketing strategies...',
          author: 'user123',
          subreddit: 'marketing',
          url: 'https://reddit.com/r/marketing/post1',
          score: 245,
          createdAt: '2023-01-15',
          matchedKeywords: ['marketing strategy', 'leads'],
          relevanceScore: 85
        },
        {
          id: '2',
          title: 'How I generated 100 leads in one week',
          content: 'In this post I share my experience with lead generation techniques...',
          author: 'leadguru',
          subreddit: 'marketing',
          url: 'https://reddit.com/r/marketing/post2',
          score: 189,
          createdAt: '2023-01-12',
          matchedKeywords: ['lead generation', 'leads'],
          relevanceScore: 92
        }
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Interface Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Configure Scraping Targets</h2>
        
        {/* Target Configuration Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subreddit
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">r/</span>
              <input
                type="text"
                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="marketing"
                value={currentTarget.subreddit}
                onChange={(e) => setCurrentTarget({...currentTarget, subreddit: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Timeframe
            </label>
            <select
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={currentTarget.timeframe}
              onChange={(e) => setCurrentTarget({...currentTarget, timeframe: e.target.value})}
            >
              <option value="1 day">Last 24 hours</option>
              <option value="3 days">Last 3 days</option>
              <option value="7 days">Last week</option>
              <option value="30 days">Last month</option>
              <option value="90 days">Last 3 months</option>
              <option value="year">Last year</option>
            </select>
          </div>
        </div>
        
        {/* Keywords Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Keywords
          </label>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter keywords (e.g., lead generation)"
              value={currentKeyword}
              onChange={(e) => setCurrentKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
            />
            <button 
              onClick={addKeyword}
              className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiPlus className="mr-1" /> Add
            </button>
          </div>
          
          {/* Keywords List */}
          <div className="flex flex-wrap gap-2 mt-3">
            {currentTarget.keywords.map((keyword, index) => (
              <div key={index} className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm">
                {keyword}
                <button 
                  onClick={() => removeKeyword(keyword)} 
                  className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Add Target Button */}
        <div className="flex justify-end">
          <button
            onClick={addScrapingTarget}
            disabled={!currentTarget.subreddit || currentTarget.keywords.length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlus className="mr-2" /> Add Scraping Target
          </button>
        </div>
      </div>
      
      {/* Targets List */}
      {scrapingTargets.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Scraping Targets ({scrapingTargets.length})</h2>
          
          <div className="space-y-4">
            {scrapingTargets.map((target, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">r/{target.subreddit}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Timeframe: {target.timeframe}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {target.keywords.map((keyword, idx) => (
                        <span key={idx} className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-2.5 py-0.5 text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => removeScrapingTarget(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Run Scraping Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={runScraping}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FiSearch className="mr-2" /> Start Scraping
                </>
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Results Section */}
      {results.length > 0 && !isLoading && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Scraping Results ({results.length})</h2>
          
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{result.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 space-x-4">
                      <span className="flex items-center">
                        <FiUser className="mr-1" size={14} /> {result.author}
                      </span>
                      <span>r/{result.subreddit}</span>
                      <span>Score: {result.score}</span>
                    </div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{result.content.length > 150 ? `${result.content.substring(0, 150)}...` : result.content}</p>
                    
                    {/* Matched Keywords */}
                    <div className="mt-3">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Matched Keywords:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {result.matchedKeywords.map((keyword, idx) => (
                          <span key={idx} className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full px-2.5 py-0.5 text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm font-medium">
                      Relevance: {result.relevanceScore}%
                    </div>
                    <a 
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View on Reddit <FiExternalLink className="ml-1" size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrapingInterface;
