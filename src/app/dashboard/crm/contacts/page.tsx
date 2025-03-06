'use client';

import { useState } from 'react';
import { FiPlus, FiSearch, FiFilter, FiMoreVertical, FiMail, FiMessageSquare, FiPhone, FiStar } from 'react-icons/fi';
import Link from 'next/link';

// Mock contacts data
const mockContacts = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    company: 'Acme Corp',
    position: 'CTO',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    lastContact: '2 days ago',
    source: 'Reddit',
    tags: ['developer', 'potential client']
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    company: 'TechStart',
    position: 'Founder',
    phone: '+1 (555) 987-6543',
    status: 'New',
    lastContact: 'Never',
    source: 'Reddit',
    tags: ['startup', 'investor']
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'mchen@example.com',
    company: 'Global Solutions',
    position: 'Marketing Director',
    phone: '+1 (555) 456-7890',
    status: 'Active',
    lastContact: '1 week ago',
    source: 'Reddit',
    tags: ['marketing', 'enterprise']
  },
  {
    id: 4,
    name: 'Jessica Williams',
    email: 'jwilliams@example.com',
    company: 'Design Masters',
    position: 'UI/UX Lead',
    phone: '+1 (555) 234-5678',
    status: 'Inactive',
    lastContact: '3 weeks ago',
    source: 'Reddit',
    tags: ['design', 'freelancer']
  }
];

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const filteredContacts = searchTerm 
    ? mockContacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockContacts;

  const toggleContactSelection = (contactId: number) => {
    setSelectedContacts(prevSelected => 
      prevSelected.includes(contactId)
        ? prevSelected.filter(id => id !== contactId)
        : [...prevSelected, contactId]
    );
  };

  const toggleAllSelection = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contacts</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your lead contacts and communications</p>
        </div>

        <div className="mt-4 md:mt-0">
          <Link 
            href="/dashboard/crm/contacts/new" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            Add New Contact
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
          />
        </div>
        <button
          className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <FiFilter className="mr-2 h-5 w-5" />
          Filter
        </button>
      </div>

      {/* Contacts Table */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                      onChange={toggleAllSelection}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Contact
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredContacts.map(contact => (
                <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleContactSelection(contact.id)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 uppercase">
                          {contact.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {contact.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {contact.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{contact.company}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{contact.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      contact.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : contact.status === 'New'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map(tag => (
                        <span key={tag} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {contact.lastContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                        <FiMail className="h-5 w-5" />
                      </button>
                      <button className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300">
                        <FiMessageSquare className="h-5 w-5" />
                      </button>
                      <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300">
                        <FiStar className="h-5 w-5" />
                      </button>
                      <div className="relative">
                        <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                          <FiMoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredContacts.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No contacts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
