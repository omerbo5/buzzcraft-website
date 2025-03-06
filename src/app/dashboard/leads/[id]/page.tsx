'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiEdit3, FiTrash2, FiStar, FiMessageCircle,
  FiActivity, FiExternalLink, FiUserPlus, FiTag
} from 'react-icons/fi';

import { Lead } from '@/types/lead';

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    // This would normally be an API call to get lead details by ID
    const fetchLead = async () => {
      try {
        setLoading(true);
        // Mock fetch with timeout
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate mock lead data based on ID
        const leadId = parseInt(params.id as string);
        const mockLead: Lead = {
          id: leadId,
          username: `u/user_${leadId}`,
          subreddit: 'r/webdev',
          post: 'Looking for developers to build a React dashboard',
          content: `Hello r/webdev community,

I'm looking for experienced React developers who can help build a custom dashboard for my business. We need features like data visualization, user management, and real-time notifications.

If you're interested, please send me a message with your portfolio and rates.

Thanks!`,
          status: 'new',
          relevance: 92,
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          lastActivity: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          tags: ['react', 'dashboard', 'development'],
          notes: 'Potential high-value client needing dashboard work.',
          aiSummary: 'This lead is looking for React developers to build a custom dashboard. They mentioned data visualization, user management, and real-time notifications as key requirements. This aligns well with our expertise in React development and dashboard creation.',
          isStarred: Math.random() > 0.5,
        };
        
        setLead(mockLead);
        setIsStarred(mockLead.isStarred || false);
      } catch (error) {
        console.error('Error fetching lead:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchLead();
    }
  }, [params.id]);

  const goBack = () => {
    router.back();
  };

  const toggleStar = () => {
    setIsStarred(!isStarred);
    if (lead) {
      setLead({ ...lead, isStarred: !isStarred });
    }
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto max-w-7xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto max-w-7xl">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 text-center">
          <h1 className="text-red-500 dark:text-red-400 text-2xl font-semibold mb-4">Lead Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The lead you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={goBack}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <FiArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-full mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={goBack}
            className="mr-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Lead Details</h1>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={toggleStar} 
            className={`p-1.5 rounded-full ${
              isStarred 
                ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
            }`}
          >
            <FiStar className={`h-5 w-5 ${isStarred ? 'fill-current' : ''}`} />
          </button>
          <button className="p-1.5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 dark:hover:text-blue-400">
            <FiUserPlus className="h-5 w-5" />
          </button>
          <button className="p-1.5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 dark:hover:text-blue-400">
            <FiMessageCircle className="h-5 w-5" />
          </button>
          <button className="p-1.5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 dark:hover:text-blue-400">
            <FiExternalLink className="h-5 w-5" />
          </button>
          <button className="p-1.5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 dark:hover:text-blue-400">
            <FiEdit3 className="h-5 w-5" />
          </button>
          <button className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 dark:hover:text-red-400">
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                {lead.username.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {lead.username}
              </h2>
              <div className="flex items-center mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 mr-2">
                  {lead.subreddit}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Created: {lead.createdAt}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Lead Info */}
            <div className="md:col-span-2">
              {/* Lead Status */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Status</h3>
                <div className="flex space-x-2">
                  {(['new', 'contacted', 'qualified', 'responded', 'converted', 'rejected'] as const).map((status) => {
                    const statusColors = {
                      new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                      contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                      qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                      responded: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
                      converted: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
                      rejected: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
                    };
                    
                    return (
                      <button
                        key={status}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                          lead.status === status 
                            ? statusColors[status]
                            : 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => setLead({ ...lead, status })}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Original Content */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Original Post</h3>
                <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">{lead.post}</h4>
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                    {lead.content}
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Posted in {lead.subreddit} on {lead.createdAt}
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tags</h3>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500">
                    <FiTag className="inline h-3 w-3 mr-1" /> Add Tag
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {lead.tags?.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {tag}
                      <button 
                        type="button"
                        className="ml-1 text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-100"
                        onClick={() => {
                          if (lead.tags) {
                            const newTags = [...lead.tags];
                            newTags.splice(index, 1);
                            setLead({ ...lead, tags: newTags });
                          }
                        }}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  
                  {(!lead.tags || lead.tags.length === 0) && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      No tags added yet
                    </span>
                  )}
                </div>
              </div>
              
              {/* Notes */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Notes</h3>
                <textarea
                  value={lead.notes || ''}
                  onChange={(e) => setLead({ ...lead, notes: e.target.value })}
                  placeholder="Add notes about this lead..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                />
              </div>
              
              {/* Activity Timeline */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Activity Timeline</h3>
                
                <div className="flow-root">
                  <ul className="-mb-8">
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                              <FiActivity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-sm">
                                <span className="font-medium text-gray-900 dark:text-white">Lead discovered</span>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                {lead.createdAt}
                              </p>
                            </div>
                            <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                              <p>Lead was discovered from {lead.subreddit}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    
                    <li>
                      <div className="relative pb-8">
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                              <FiActivity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-sm">
                                <span className="font-medium text-gray-900 dark:text-white">AI analyzed</span>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                {lead.lastActivity}
                              </p>
                            </div>
                            <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                              <p>AI relevance score: {lead.relevance}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right column - AI Insights & Actions */}
            <div>
              {/* AI Insights */}
              <div className="mb-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium flex items-center text-purple-800 dark:text-purple-300 mb-2">
                  <FiActivity className="mr-1.5 h-4 w-4" />
                  AI Insights
                </h3>
                <div className="text-sm text-purple-700 dark:text-purple-300">
                  {lead.aiSummary || "No AI insights available yet."}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-xs font-medium text-purple-800 dark:text-purple-300 mb-2">Relevance Score</h4>
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${
                          lead.relevance >= 95 ? 'bg-green-500' : 
                          lead.relevance >= 85 ? 'bg-blue-500' : 
                          lead.relevance >= 75 ? 'bg-purple-500' : 
                          lead.relevance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${lead.relevance}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-purple-800 dark:text-purple-300">
                      {lead.relevance}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FiMessageCircle className="mr-2 -ml-1 h-5 w-5" />
                    Send Message
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FiUserPlus className="mr-2 -ml-1 h-5 w-5" />
                    Add to CRM
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FiActivity className="mr-2 -ml-1 h-5 w-5" />
                    Generate More Insights
                  </button>
                </div>
              </div>
              
              {/* Similar Leads */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Similar Leads</h3>
                <div className="rounded-md border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                              U{i}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            u/similar_user_{i}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            r/{['webdev', 'reactjs', 'javascript'][i-1]} • {85 + i}% match
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
