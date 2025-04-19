"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemesProviderProps } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface ThemeProviderProps extends Omit<NextThemesProviderProps, 'children'> {
  children: ReactNode;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [themeTransitioning, setThemeTransitioning] = useState(false);
  
  useEffect(() => {
    const handleThemeChange = () => {
      document.documentElement.classList.add('theme-transition');
      setThemeTransitioning(true);
      
      // Add overlay effect
      const overlay = document.createElement('div');
      overlay.className = 'theme-transition-overlay';
      document.body.appendChild(overlay);
      
      // Trigger animation
      setTimeout(() => {
        document.documentElement.classList.add('theme-transition-active');
        overlay.classList.add('active');
      }, 50);
      
      // Remove classes after transition
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
        document.documentElement.classList.remove('theme-transition-active');
        setThemeTransitioning(false);
        overlay.remove();
      }, 1300);
    };
    
    // Listen for theme changes
    window.addEventListener('themeChange', handleThemeChange);
    
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);
  
  return (
    <NextThemesProvider {...props}>
      {children}
      {themeTransitioning && <div className="theme-transition-overlay" />}
    </NextThemesProvider>
  );
} 