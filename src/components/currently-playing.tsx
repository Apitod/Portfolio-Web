'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import Link from 'next/link';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}

export default function CurrentlyPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);

  // Fetch Spotify data
  const fetchSpotifyData = async () => {
    try {
      const response = await fetch('/api/spotify');
      const data = await response.json();
      
      if (data && data.isPlaying) {
        setData(data);
        setProgressPercent((data.progress / data.duration) * 100);
      } else {
        setData(null);
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
    if (data?.isPlaying) {
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
  }, [data]);

  // Don't render anything if not playing or on loading
  if (isLoading || !data || !data.isPlaying) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 z-10 p-3 rounded-lg bg-background/80 dark:bg-dark-bg/80 backdrop-blur-sm border border-gray-200/30 dark:border-gray-800/30 shadow-md max-w-[240px] hidden md:block"
    >
      <div className="flex items-center space-x-2">
        <FaSpotify className="text-primary flex-shrink-0 w-4 h-4" />
        <div className="min-w-0 flex-1">
          <Link 
            href={data.songUrl || '#'} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium hover:text-primary truncate block"
          >
            {data.title}
          </Link>
          <p className="text-xs text-foreground/70 truncate">{data.artist}</p>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: `${progressPercent}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
} 