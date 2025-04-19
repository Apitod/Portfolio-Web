"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "next-themes";

const Navigation = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Certificates", path: "/certificates" },
    { name: "Activity", path: "/activity" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    // Dispatch event first for smooth transition
    const event = new Event('themeChange');
    window.dispatchEvent(event);
    
    // Then change the theme
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 50);
  };

  const headerClasses = scrolled 
    ? "shadow-md bg-background/95 dark:bg-dark-bg/95" 
    : "bg-background/80 dark:bg-dark-bg/80";

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20 transition-all duration-300 ${headerClasses}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            <Link href="/">Razan</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  pathname === link.path
                    ? "text-primary dark:text-primary"
                    : "text-foreground/70 hover:text-foreground dark:text-foreground/70 dark:hover:text-foreground"
                }`}
              >
                {pathname === link.path && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                  />
                )}
                {link.name}
              </Link>
            ))}
          </motion.div>

          <div className="flex items-center">
            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {mounted && (
                theme === "dark" ? (
                  <FiSun className="w-5 h-5 text-accent" />
                ) : (
                  <FiMoon className="w-5 h-5 text-primary" />
                )
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-2">
              <motion.button
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 py-2 space-y-2"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href={link.path}
                  className={`block px-4 py-2 rounded-md ${
                    pathname === link.path
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Navigation; 