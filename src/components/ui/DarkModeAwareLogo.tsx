'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface DarkModeAwareLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function DarkModeAwareLogo({ 
  className = '', 
  width = 40, 
  height = 40 
}: DarkModeAwareLogoProps) {
  // Use a default light theme
  const [currentTheme, setCurrentTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  
  // Try to get theme from context, but don't fail if not available
  let contextTheme = 'light';
  try {
    const { theme } = useTheme();
    contextTheme = theme;
  } catch (e) {
    // ThemeProvider not available, use default light theme
  }
  
  // Update current theme when mounted and when context theme changes
  useEffect(() => {
    setCurrentTheme(contextTheme);
    setMounted(true);
    
    // Also check system preference as fallback
    if (contextTheme === 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setCurrentTheme('dark');
    }
  }, [contextTheme]);
  
  // Use a div with relative positioning to properly size the logo
  return (
    <div 
      className={`relative ${className}`} 
      style={{ width, height }}
    >
      {mounted ? (
        <Image 
          src={currentTheme === 'dark' ? '/logo-dark.svg' : '/logo.svg'} 
          alt="BuzzCraft Logo" 
          fill
          className="object-contain"
          priority
        />
      ) : (
        // Fallback for SSR
        <Image 
          src="/logo.svg" 
          alt="BuzzCraft Logo" 
          fill
          className="object-contain"
          priority
        />
      )}
    </div>
  );
}
