'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { 
  FiHome, 
  FiSearch, 
  FiUsers, 
  FiMessageSquare, 
  FiBarChart2, 
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiAward
} from 'react-icons/fi';

type MenuItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  subItems?: { name: string; href: string }[];
};

const menuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'Scraping', href: '/dashboard/scraping/new', icon: FiSearch },
  { 
    name: 'Leads', 
    href: '/dashboard/leads', 
    icon: FiUsers,
    subItems: [
      { name: 'All Leads', href: '/dashboard/leads/all' },
      { name: 'Create Lead', href: '/dashboard/leads/create' },
      { name: 'Starred', href: '/dashboard/leads/starred' },
      { name: 'Active', href: '/dashboard/leads/active' },
      { name: 'Tags', href: '/dashboard/leads/tags' },
    ]
  },
  { 
    name: 'CRM', 
    href: '/dashboard/crm', 
    icon: FiMessageSquare,
    subItems: [
      { name: 'Contacts', href: '/dashboard/crm/contacts' },
      { name: 'Conversations', href: '/dashboard/crm/conversations' },
      { name: 'Templates', href: '/dashboard/crm/templates' },
    ]
  },
  { 
    name: 'Analytics', 
    href: '/dashboard/analytics', 
    icon: FiBarChart2,
    subItems: [
      { name: 'Performance', href: '/dashboard/analytics/performance' },
      { name: 'Reports', href: '/dashboard/analytics/reports' },
    ]
  },
  { name: 'Subscription', href: '/dashboard/subscription', icon: FiAward },
  { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubMenu = (name: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const isCurrentPath = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-500 dark:text-gray-300 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`md:hidden fixed inset-0 z-40 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl">
          <div className="pt-5 pb-4 px-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg text-blue-600 dark:text-blue-400">BuzzCraft</div>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-500 dark:text-gray-300 focus:outline-none"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="mt-8 space-y-2">
              {menuItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  {item.subItems ? (
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md ${
                        isCurrentPath(item.href)
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                        {item.name}
                      </div>
                      {expandedMenus[item.name] ? (
                        <FiChevronDown className="h-4 w-4" />
                      ) : (
                        <FiChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        isCurrentPath(item.href)
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      {item.name}
                    </Link>
                  )}

                  {/* Sub-menu items */}
                  {item.subItems && expandedMenus[item.name] && (
                    <div className="pl-12 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-2 text-sm font-medium rounded-md ${
                            pathname === subItem.href
                              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
              >
                <FiLogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </nav>
          </div>
        </div>
        
        {/* Overlay to close the menu */}
        <div 
          className="bg-gray-600 bg-opacity-75" 
          onClick={toggleMobileMenu}
        />
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 shadow">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-center h-16">
                <div className="font-bold text-xl text-blue-600 dark:text-blue-400">BuzzCraft</div>
              </div>
              <nav className="mt-5 flex-1 px-3 space-y-2">
                {menuItems.map((item) => (
                  <div key={item.name} className="space-y-1">
                    {item.subItems ? (
                      <button
                        onClick={() => toggleSubMenu(item.name)}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md ${
                          isCurrentPath(item.href)
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                          {item.name}
                        </div>
                        {expandedMenus[item.name] ? (
                          <FiChevronDown className="h-4 w-4" />
                        ) : (
                          <FiChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          isCurrentPath(item.href)
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                        {item.name}
                      </Link>
                    )}

                    {/* Sub-menu items */}
                    {item.subItems && expandedMenus[item.name] && (
                      <div className="pl-10 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm font-medium rounded-md ${
                              pathname === subItem.href
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <button
                onClick={handleLogout}
                className="flex-shrink-0 w-full group block text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md px-4 py-2 text-sm font-medium"
              >
                <div className="flex items-center">
                  <FiLogOut className="mr-3 h-5 w-5" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
