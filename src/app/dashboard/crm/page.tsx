'use client';

import { useState } from 'react';
import { FiUsers, FiMessageSquare, FiFileText } from 'react-icons/fi';
import Link from 'next/link';

export default function CRMDashboard() {
  const [stats] = useState({
    contacts: 187,
    activeConversations: 42,
    templates: 15
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CRM Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your customer relationships and communications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
              <FiUsers className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.contacts}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/crm/contacts" 
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              View all contacts →
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
              <FiMessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Conversations</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeConversations}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/crm/conversations" 
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              Manage conversations →
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
              <FiFileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Message Templates</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.templates}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/crm/templates" 
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              Manage templates →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/dashboard/crm/contacts/new" 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Add New Contact
          </Link>
          <Link 
            href="/dashboard/crm/conversations/new" 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Start Conversation
          </Link>
          <Link 
            href="/dashboard/crm/templates/new" 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            Create Template
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
