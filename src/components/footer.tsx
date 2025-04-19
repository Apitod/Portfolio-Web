"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaSpotify } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";

// Define the SpotifyData interface
interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);

  // Fetch Spotify data
  const fetchSpotifyData = async () => {
    try {
      const response = await fetch('/api/spotify');
      const data = await response.json();
      
      if (data && data.isPlaying) {
        setSpotifyData(data);
        setProgressPercent((data.progress / data.duration) * 100);
      } else {
        setSpotifyData(null);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching Spotify data:', err);
      setIsLoading(false);
    }
  };

  // Fetch on component mount and every 30 seconds
  useEffect(() => {
    fetchSpotifyData();
    
    const intervalId = setInterval(() => {
      fetchSpotifyData();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (spotifyData?.isPlaying) {
      const interval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [spotifyData]);

  const socialLinks = [
    {
      icon: <FiGithub className="w-5 h-5" />,
      href: "https://github.com/",
      label: "GitHub",
    },
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/razan-muhammad-dhirgham-aswani-523154309?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BL4PX5g2GSe2UKccQLbySFw%3D%3D",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      href: "https://instagram.com/razannmd",
      label: "Instagram",
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: "https://wa.me/0895326458650",
      label: "WhatsApp",
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      href: "mailto:razandirgham@gmail.com",
      label: "Email",
    },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-background dark:bg-dark-bg border-t border-gray-200 dark:border-gray-800 py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Left Column - Copyright */}
          <div className="mb-6 lg:mb-0 order-1 w-full lg:w-1/3">
            <div className="text-xl font-semibold mb-2 text-center lg:text-left">
              <span className="text-primary">RazanMDA</span>
            </div>
            <p className="text-sm text-foreground/70 text-center lg:text-left">
              © {currentYear} Razan. All rights reserved.
            </p>
          </div>

          {/* Middle Column - Spotify Currently Playing */}
          <div className="mb-6 lg:mb-0 order-3 lg:order-2 w-full lg:w-1/3 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center mb-2">
                <FaSpotify className="text-primary mr-2 w-4 h-4" />
                <span className="text-xs text-foreground/70">Razan&apos;s currently hearing:</span>
              </div>
              {spotifyData && spotifyData.isPlaying ? (
                <>
                  <div className="text-center mb-1">
                    <Link 
                      href={spotifyData.songUrl || '#'} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-primary"
                    >
                      {spotifyData.title}
                    </Link>
                    <p className="text-xs text-foreground/70">{spotifyData.artist}</p>
                  </div>
                  <div className="w-full max-w-[200px]">
                    <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: `${progressPercent}%` }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <motion.p 
                      className="text-sm font-medium text-foreground/80 bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-400 dark:to-gray-500 bg-clip-text text-transparent px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700"
                      animate={{ 
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        ease: "easeInOut" 
                      }}
                    >
                      None
                    </motion.p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Social Links */}
          <div className="order-2 lg:order-3 mb-6 lg:mb-0 w-full lg:w-1/3">
            <div className="flex justify-center lg:justify-end">
              <div className="flex items-center space-x-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                    variants={itemVariants}
                    className="text-foreground/70 hover:text-primary transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 