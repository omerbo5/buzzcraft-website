'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useState, useEffect } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  // Default to light theme
  const [currentTheme, setCurrentTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  
  // Safely attempt to get theme from context
  let contextTheme = 'light';
  let toggleFunction = () => {};
  
  try {
    const context = useTheme();
    contextTheme = context.theme;
    toggleFunction = context.toggleTheme;
  } catch (e) {
    // ThemeProvider not available
    console.warn('ThemeToggle: ThemeProvider not available');
  }
  
  // Update state when mounted and when context changes
  useEffect(() => {
    setCurrentTheme(contextTheme);
    setMounted(true);
  }, [contextTheme]);
  
  const isDark = currentTheme === 'dark';

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={toggleFunction}
      className={`relative flex items-center justify-center w-9 h-9 rounded-full overflow-hidden 
      ${isDark 
        ? 'bg-slate-800 hover:bg-slate-700 text-blue-400 ring-1 ring-slate-700' 
        : 'bg-white hover:bg-slate-100 text-blue-600 ring-1 ring-slate-200'} 
      ${className}`}
      whileTap={{ scale: 0.92 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: isDark 
          ? '0 0 8px rgba(96, 165, 250, 0.4)' 
          : '0 0 8px rgba(37, 99, 235, 0.2)'
      }}
      style={{
        boxShadow: isDark 
          ? '0 0 0 1px rgba(30, 41, 59, 0.5)' 
          : '0 0 0 1px rgba(203, 213, 225, 0.5)'
      }}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotateZ: isDark ? 0 : 45,
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.5
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute"
      >
        <FiMoon className="w-4 h-4" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ 
          rotateZ: isDark ? -45 : 0, 
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.5 : 1
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute"
      >
        <FiSun className="w-4 h-4" />
      </motion.div>
    </motion.button>
  );
}
