'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMessageCircle, FiStar, FiActivity, FiExternalLink, FiMoreHorizontal } from 'react-icons/fi';
import { Lead } from '@/types/lead';

type LeadCardProps = {
  lead: Lead;
  onStatusChange?: (id: number, status: Lead['status']) => void;
  onTagAdd?: (id: number, tag: string) => void;
  onTagRemove?: (id: number, tag: string) => void;
  onStar?: (id: number, starred: boolean) => void;
};

export default function LeadCard({ 
  lead, 
  onStatusChange,
  onTagAdd,
  onTagRemove,
  onStar 
}: LeadCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const statusColors = {
    new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    responded: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    converted: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    rejected: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  const relevanceColor = 
    lead.relevance >= 95 ? 'bg-green-500' : 
    lead.relevance >= 85 ? 'bg-blue-500' : 
    lead.relevance >= 75 ? 'bg-purple-500' : 
    lead.relevance >= 60 ? 'bg-yellow-500' : 'bg-red-500';

  const relevanceBadgeColor = 
    lead.relevance >= 95 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
    lead.relevance >= 85 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
    lead.relevance >= 75 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
    lead.relevance >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';

  const toggleExpanded = () => setExpanded(!expanded);
  
  const toggleStarred = () => {
    if (onStar) {
      onStar(lead.id, !lead.isStarred);
    }
  };

  const handleStatusChange = (status: Lead['status']) => {
    if (onStatusChange) {
      onStatusChange(lead.id, status);
    }
    setShowMenu(false);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${expanded ? 'mb-6' : 'mb-3'} transition-all duration-200`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  {lead.username.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-1">
                <button 
                  className="text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400 mr-2"
                  onClick={toggleStarred}
                >
                  <FiStar className={`h-4 w-4 ${lead.isStarred ? 'text-yellow-500 dark:text-yellow-400 fill-current' : ''}`} />
                </button>
                
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate mr-2">
                  {lead.username}
                </h3>
                
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 mr-2">
                  {lead.subreddit}
                </span>
                
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[lead.status]}`}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 hover:line-clamp-none cursor-pointer" onClick={toggleExpanded}>
                {lead.post}
              </p>
              
              <div className="mt-2 flex items-center">
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full ${relevanceColor}`} 
                    style={{ width: `${lead.relevance}%` }}
                  ></div>
                </div>
                <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${relevanceBadgeColor}`}>
                  {lead.relevance}% Match
                </span>
              </div>
              
              {lead.tags && lead.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {lead.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tag}
                      <button 
                        type="button"
                        className="ml-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        onClick={() => onTagRemove && onTagRemove(lead.id, tag)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Created: {lead.createdAt}</span>
                <span>Last activity: {lead.lastActivity}</span>
              </div>
            </div>
            
            <div className="flex-shrink-0 flex space-x-1 ml-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:text-blue-400 dark:hover:bg-blue-900/30">
                <FiMessageCircle className="h-5 w-5" />
              </button>
              <button className="p-1 rounded-full text-gray-400 hover:text-purple-600 hover:bg-purple-100 dark:hover:text-purple-400 dark:hover:bg-purple-900/30">
                <FiActivity className="h-5 w-5" />
              </button>
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700/50">
                <FiExternalLink className="h-5 w-5" />
              </button>
              <div className="relative">
                <button 
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700/50"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <FiMoreHorizontal className="h-5 w-5" />
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="py-1">
                      <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Change Status
                      </div>
                      {(['new', 'contacted', 'qualified', 'responded', 'converted', 'rejected'] as const).map((status) => (
                        <button
                          key={status}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            lead.status === status 
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => handleStatusChange(status)}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Original Content</h4>
                <div className="bg-gray-50 dark:bg-gray-750 rounded-md p-3 text-sm text-gray-700 dark:text-gray-300 overflow-auto max-h-48">
                  {lead.content}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">AI Summary</h4>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-md p-3 text-sm text-purple-700 dark:text-purple-300 overflow-auto max-h-48">
                  {lead.aiSummary || "No AI summary available yet."}
                </div>
                
                {lead.notes && (
                  <>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mt-3 mb-2">Notes</h4>
                    <div className="bg-gray-50 dark:bg-gray-750 rounded-md p-3 text-sm text-gray-700 dark:text-gray-300 overflow-auto max-h-32">
                      {lead.notes}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
