"use client"

import * as React from "react"

interface TabsContextType {
  value: string
  onChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined)

function useTabs() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider")
  }
  return context
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) {
  const [tabValue, setTabValue] = React.useState(value || defaultValue || "")

  React.useEffect(() => {
    if (value !== undefined) {
      setTabValue(value)
    }
  }, [value])

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setTabValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange]
  )

  return (
    <TabsContext.Provider value={{ value: tabValue, onChange: handleValueChange }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <div
      className={`flex border-b border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  children: React.ReactNode
}

export function TabsTrigger({ value, children, className, ...props }: TabsTriggerProps) {
  const { value: selectedValue, onChange } = useTabs()
  const isSelected = selectedValue === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      onClick={() => onChange(value)}
      className={`px-4 py-2 text-sm font-medium inline-flex items-center pb-3 ${
        isSelected
          ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-medium"
          : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
}

export function TabsContent({ value, children, className, ...props }: TabsContentProps) {
  const { value: selectedValue } = useTabs()
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      role="tabpanel"
      data-state={isSelected ? "active" : "inactive"}
      className={`mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const Root = Tabs

export default Tabs
'use client';

import { useState, ReactNode } from 'react';

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
};

export default function Tabs({ 
  tabs, 
  defaultTab, 
  className = "w-full", 
  tabClassName = "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white", 
  activeTabClassName = "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-medium",
  contentClassName = "mt-4"
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs.length > 0 ? tabs[0].id : ''));

  return (
    <div className={className}>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${tabClassName} ${
                activeTab === tab.id ? activeTabClassName : ''
              } inline-flex items-center pb-3 px-1`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className={contentClassName}>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
