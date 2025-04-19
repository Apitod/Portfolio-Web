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
      // Add transition class to root element to ensure all elements transition smoothly
      document.documentElement.classList.add('theme-transition');
      setThemeTransitioning(true);
      
      // Add overlay effect
      const overlay = document.createElement('div');
      overlay.className = 'theme-transition-overlay';
      document.body.appendChild(overlay);
      
      // Force browser to process the class addition before adding active class
      setTimeout(() => {
        document.documentElement.classList.add('theme-transition-active');
        overlay.classList.add('active');
      }, 10);
      
      // Remove classes after transition completes
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
  
  // Preload both themes' stylesheets to avoid FOUC
  useEffect(() => {
    const preloadDarkStyles = () => {
      const darkStyles = document.createElement('style');
      darkStyles.textContent = `
        :root.dark {
          --background: #183B4E;
          --foreground: #F5EEDC;
          --primary: #3B75B4;
          --secondary: #224A63;
          --accent: #E5BB7B;
        }
      `;
      document.head.appendChild(darkStyles);
    };
    preloadDarkStyles();
  }, []);
  
  return (
    <NextThemesProvider {...props}>
      {children}
      {themeTransitioning && <div className="theme-transition-overlay" />}
    </NextThemesProvider>
  );
} 