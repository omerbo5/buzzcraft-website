'use client';

import { useState } from 'react';
import { FiUser, FiLock, FiGlobe, FiBell, FiSave } from 'react-icons/fi';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'security', label: 'Security', icon: FiLock },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'api', label: 'API Settings', icon: FiGlobe },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and application preferences</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row">
          {/* Tabs */}
          <div className="sm:w-64 border-r border-gray-200 dark:border-gray-700">
            <nav className="px-2 py-4 sm:py-6 sm:px-4">
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <tab.icon className={`mr-3 h-5 w-5 ${
                        activeTab === tab.id
                          ? 'text-blue-500 dark:text-blue-400'
                          : 'text-gray-400 dark:text-gray-500'
                      }`} />
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 flex-1">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Settings</h2>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue="John Doe"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue="john.doe@example.com"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      defaultValue="Lead generation expert and marketing professional."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Profile Picture
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600">
                        <svg className="h-full w-full text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FiSave className="mr-2 h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security Settings</h2>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      name="current-password"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      name="new-password"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FiSave className="mr-2 h-4 w-4" />
                      Update Password
                    </button>
                  </div>
                </form>
                
                <div className="mt-10">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Two-factor authentication is currently disabled.</p>
                    </div>
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-leads"
                            name="email-leads"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-leads" className="font-medium text-gray-700 dark:text-gray-300">
                            New leads
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">Get notified when new leads match your criteria.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-messages"
                            name="email-messages"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-messages" className="font-medium text-gray-700 dark:text-gray-300">
                            Messages
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">Get notified when you receive new messages.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-reports"
                            name="email-reports"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-reports" className="font-medium text-gray-700 dark:text-gray-300">
                            Reports
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">Receive weekly performance reports.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Push Notifications</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="push-leads"
                            name="push-leads"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="push-leads" className="font-medium text-gray-700 dark:text-gray-300">
                            New leads
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">Get push notifications for new leads.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="push-messages"
                            name="push-messages"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="push-messages" className="font-medium text-gray-700 dark:text-gray-300">
                            Messages
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">Get push notifications for new messages.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FiSave className="mr-2 h-4 w-4" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'api' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">API Settings</h2>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your API Key</h3>
                  <div className="flex items-center">
                    <input
                      type="text"
                      readOnly
                      value="••••••••••••••••••••••••••••••"
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-500 pr-10"
                    />
                    <button
                      type="button"
                      className="ml-2 px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      Show
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Your API key provides full access to your account. Never share it publicly.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Access</h3>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                      >
                        Regenerate API Key
                      </button>
                      <button
                        type="button"
                        className="ml-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        View API Documentation
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Webhook URL</h3>
                    <input
                      type="url"
                      placeholder="https://your-domain.com/webhook"
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      We'll send notifications to this URL when events occur.
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FiSave className="mr-2 h-4 w-4" />
                      Save API Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
