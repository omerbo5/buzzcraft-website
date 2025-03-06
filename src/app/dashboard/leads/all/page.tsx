'use client';

import { useState, useEffect } from 'react';
import { FiDownload, FiPlusCircle, FiRefreshCw, FiActivity } from 'react-icons/fi';
import LeadCard from '@/components/dashboard/LeadCard';
import LeadFilter from '@/components/dashboard/LeadFilter';
import { Lead } from '@/types/lead';

// Mock data
const generateMockLeads = (count: number): Lead[] => {
  const subreddits = ['r/startups', 'r/entrepreneur', 'r/marketing', 'r/smallbusiness', 'r/webdev', 'r/socialmedia', 'r/sales'];
  const statuses: Lead['status'][] = ['new', 'contacted', 'qualified', 'responded', 'converted', 'rejected'];
  const tags = ['potential-client', 'tech-startup', 'marketing-agency', 'saas', 'b2b', 'b2c', 'enterprise', 'smb'];
  
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const relevance = Math.floor(Math.random() * 40) + 60; // 60-99
    const username = `u/user_${id}`;
    const randomTags = tags
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3));
    
    // Generate dates within the last month
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));
    
    const activityDate = new Date(createdDate);
    activityDate.setDate(activityDate.getDate() + Math.floor(Math.random() * 5));
    
    return {
      id,
      username,
      subreddit,
      post: `Looking for ${subreddit === 'r/webdev' ? 'a developer' : 'help'} with my ${
        Math.random() > 0.5 ? 'project' : 'business'
      }. I need assistance with ${
        subreddit === 'r/webdev' ? 'building a website' : 'growing my company'
      }.`,
      content: `Hello ${subreddit} community,\n\nI'm currently working on ${
        Math.random() > 0.5 ? 'a new project' : 'expanding my business'
      } and I'm looking for ${
        subreddit === 'r/webdev' ? 'developers who can help build a custom solution' : 'experts who can provide guidance'
      }.\n\nMy main challenges are ${
        Math.random() > 0.5 ? 'finding the right approach' : 'scaling efficiently'
      } and I would appreciate any recommendations or if anyone is interested in collaborating.\n\nThanks!`,
      status,
      relevance,
      createdAt: createdDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastActivity: activityDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tags: randomTags,
      notes: Math.random() > 0.7 ? `Follow up with ${username} about their specific needs.` : undefined,
      aiSummary: Math.random() > 0.3 ? `This lead is looking for ${
        subreddit === 'r/webdev' ? 'web development services' : 'business growth consulting'
      }. They seem to be in the ${
        Math.random() > 0.5 ? 'early stages' : 'growth phase'
      } of their project. Recommended approach: ${
        Math.random() > 0.5 ? 'Focus on quick wins and ROI' : 'Suggest a comprehensive strategy'
      }.` : undefined,
      isStarred: Math.random() > 0.8,
    };
  });
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIInsights, setShowAIInsights] = useState(false);
  
  // Extract unique subreddits and tags from leads
  const availableSubreddits = [...new Set(leads.map(lead => lead.subreddit))];
  const availableTags = [...new Set(leads.flatMap(lead => lead.tags || []))];
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockLeads = generateMockLeads(50);
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleFilterChange = (filters: any) => {
    let results = [...leads];
    
    // Apply status filter
    if (filters.status.length > 0) {
      results = results.filter(lead => filters.status.includes(lead.status));
    }
    
    // Apply subreddit filter
    if (filters.subreddits.length > 0) {
      results = results.filter(lead => filters.subreddits.includes(lead.subreddit));
    }
    
    // Apply tags filter
    if (filters.tags.length > 0) {
      results = results.filter(lead => 
        lead.tags && filters.tags.some((tag: string) => lead.tags!.includes(tag))
      );
    }
    
    // Apply relevance filter
    results = results.filter(lead => 
      lead.relevance >= filters.relevanceRange[0] && lead.relevance <= filters.relevanceRange[1]
    );
    
    // Apply date filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      let cutoff = new Date();
      
      if (filters.dateRange === 'today') {
        cutoff.setHours(0, 0, 0, 0);
      } else if (filters.dateRange === 'this week') {
        cutoff.setDate(now.getDate() - 7);
      } else if (filters.dateRange === 'this month') {
        cutoff.setMonth(now.getMonth() - 1);
      }
      
      results = results.filter(lead => {
        const createdDate = new Date(lead.createdAt);
        return createdDate >= cutoff;
      });
    }
    
    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      results = results.filter(lead => 
        lead.username.toLowerCase().includes(searchLower) ||
        lead.post.toLowerCase().includes(searchLower) ||
        (lead.content && lead.content.toLowerCase().includes(searchLower)) ||
        (lead.notes && lead.notes.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      let comparison = 0;
      
      if (filters.sortBy === 'relevance') {
        comparison = b.relevance - a.relevance;
      } else if (filters.sortBy === 'date') {
        comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (filters.sortBy === 'status') {
        const statusOrder: Record<Lead['status'], number> = { new: 0, contacted: 1, responded: 2, qualified: 3, converted: 4, rejected: 5 };
        comparison = (statusOrder[a.status]) - (statusOrder[b.status]);
      } else if (filters.sortBy === 'activity') {
        comparison = new Date(b.lastActivity || '').getTime() - new Date(a.lastActivity || '').getTime();
      }
      
      return filters.sortOrder === 'asc' ? -comparison : comparison;
    });
    
    setFilteredLeads(results);
  };
  
  const handleStatusChange = (id: number, status: Lead['status']) => {
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, status } : lead
    );
    setLeads(updatedLeads);
    
    // Also update filtered leads
    const updatedFilteredLeads = filteredLeads.map(lead => 
      lead.id === id ? { ...lead, status } : lead
    );
    setFilteredLeads(updatedFilteredLeads);
  };
  
  const handleStarToggle = (id: number, starred: boolean) => {
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, isStarred: starred } : lead
    );
    setLeads(updatedLeads);
    
    // Also update filtered leads
    const updatedFilteredLeads = filteredLeads.map(lead => 
      lead.id === id ? { ...lead, isStarred: starred } : lead
    );
    setFilteredLeads(updatedFilteredLeads);
  };
  
  const refreshLeads = () => {
    setLoading(true);
    setTimeout(() => {
      const mockLeads = generateMockLeads(50);
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setLoading(false);
    }, 1000);
  };
  
  const generateAIInsights = () => {
    setShowAIInsights(true);
    // In a real application, we would call an API to generate insights
    setTimeout(() => {
      setShowAIInsights(false);
    }, 3000);
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Lead Management
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Manage and organize all leads scraped from Reddit
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex sm:space-x-3">
          <button
            type="button"
            onClick={generateAIInsights}
            disabled={loading || showAIInsights}
            className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
              showAIInsights 
                ? 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700'
                : 'bg-purple-600 text-white border-transparent hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
          >
            <FiActivity className="mr-2 -ml-1 h-5 w-5" />
            {showAIInsights ? 'Generating Insights...' : 'AI Analyze'}
          </button>
          
          <button
            type="button"
            onClick={refreshLeads}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiRefreshCw className={`mr-2 -ml-1 h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiDownload className="mr-2 -ml-1 h-5 w-5" />
            Export
          </button>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <FiPlusCircle className="mr-2 -ml-1 h-5 w-5" />
            New Lead
          </button>
        </div>
      </div>
      
      {showAIInsights && (
        <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="mr-4">
              <FiActivity className="h-10 w-10 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300">AI is analyzing your leads</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Looking for patterns, scoring relevance, and identifying priority leads...
              </p>
            </div>
          </div>
          <div className="mt-3 w-full bg-purple-200 dark:bg-purple-800 rounded-full h-1.5">
            <div className="bg-purple-500 h-1.5 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <LeadFilter 
          onFilterChange={handleFilterChange}
          availableSubreddits={availableSubreddits}
          availableTags={availableTags}
        />
      </div>
      
      <div className="mt-2">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {filteredLeads.length} {filteredLeads.length === 1 ? 'lead' : 'leads'} found
        </p>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FiRefreshCw className="animate-spin h-8 w-8 text-blue-500" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading leads...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No leads found matching your criteria.</p>
            <button
              onClick={() => handleFilterChange({
                status: [],
                subreddits: [],
                relevanceRange: [0, 100],
                dateRange: 'all',
                tags: [],
                searchTerm: '',
                sortBy: 'relevance',
                sortOrder: 'desc',
              })}
              className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-500"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredLeads.map(lead => (
              <LeadCard 
                key={lead.id} 
                lead={lead} 
                onStatusChange={handleStatusChange}
                onStar={handleStarToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
