'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme
  useEffect(() => {
    // On first mount, we immediately get theme from local storage or system preference
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
    
    setMounted(true);
  }, []);

  // Update document class when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Update local storage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Handle system preference changes
  useEffect(() => {
    if (!mounted) return;
    
    // Only listen for system changes if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mounted]);

  // Toggle theme function
  const toggleTheme = () => {
    // Add no-transition class to prevent flickering
    document.documentElement.classList.add('no-transition');
    
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      return newTheme;
    });
    
    // Remove the class after a small delay to re-enable transitions
    setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
    }, 10);
  };

  // Prevent flash of wrong theme by returning children only after mounted
  if (!mounted) {
    // Return a placeholder with the same structure but without any theme context
    // This will prevent layout shifts during hydration
    return (
      <div className="contents">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
