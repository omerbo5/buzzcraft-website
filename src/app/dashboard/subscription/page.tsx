'use client';

import { useState } from 'react';
import { FiCheck, FiAward, FiArrowRight } from 'react-icons/fi';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$29',
    period: 'month',
    description: 'Perfect for small businesses just getting started with lead generation.',
    features: [
      'Up to 500 leads per month',
      'Basic analytics',
      '1 user account',
      'Email support',
      'Manual scraping'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$79',
    period: 'month',
    description: 'For growing businesses looking to scale their lead generation efforts.',
    features: [
      'Up to 2,000 leads per month',
      'Advanced analytics',
      '3 user accounts',
      'Priority email support',
      'Scheduled scraping',
      'CRM integration'
    ],
    cta: 'Upgrade Now',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$199',
    period: 'month',
    description: 'For large organizations with complex lead generation needs.',
    features: [
      'Unlimited leads',
      'Custom analytics and reports',
      'Unlimited user accounts',
      'Phone support',
      'Advanced scheduling',
      'Full API access',
      'White-labeling options'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function SubscriptionPage() {
  const [currentPlan] = useState('basic');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription</h1>
        <p className="text-gray-600 dark:text-gray-400">נהל את מנוי ה-BuzzCraft והחיוב שלך</p>
      </div>

      {/* Current Subscription */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Current Subscription</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
              <FiAward className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">You are currently on the</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{plans.find(p => p.id === currentPlan)?.name} Plan</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Billing Period</p>
                <p className="mt-1 text-gray-900 dark:text-white">Monthly</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Billing Date</p>
                <p className="mt-1 text-gray-900 dark:text-white">April 3, 2025</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</p>
                <p className="mt-1 text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-2 ${
              plan.popular 
                ? 'border-blue-500 dark:border-blue-400' 
                : 'border-transparent'
            } ${
              currentPlan === plan.id 
                ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                : ''
            }`}
          >
            {plan.popular && (
              <div className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 rounded-full mb-4">
                Most Popular
              </div>
            )}
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/{plan.period}</span>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
            
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <FiCheck className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              className={`mt-8 w-full inline-flex items-center justify-center px-4 py-2 border ${
                currentPlan === plan.id
                  ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  : 'border-transparent bg-blue-600 hover:bg-blue-700 text-white'
              } text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              disabled={currentPlan === plan.id}
            >
              {currentPlan === plan.id ? 'Current Plan' : plan.cta}
              {currentPlan !== plan.id && <FiArrowRight className="ml-2 h-4 w-4" />}
            </button>
          </div>
        ))}
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Billing History</h2>
        </div>
        <div className="p-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">March 3, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Basic Plan Subscription</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$29.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">February 3, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Basic Plan Subscription</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$29.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
