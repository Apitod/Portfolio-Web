'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMusic, FiPause, FiPlay, FiSkipBack, FiSkipForward, FiVolume2 } from 'react-icons/fi';

interface SpotifyData {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
  progress: number;
  duration: number;
}

const SpotifyPlayer = () => {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isClientPlaying, setIsClientPlaying] = useState(false);

  // Fetch Spotify data
  const fetchSpotifyData = async () => {
    try {
      const response = await fetch('/api/spotify');
      const data = await response.json();
      
      if (data && data.isPlaying) {
        setSpotifyData(data);
        setProgressPercent((data.progress / data.duration) * 100);
        setIsClientPlaying(data.isPlaying);
      } else {
        setSpotifyData(null);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching Spotify data:', err);
      setError('Failed to load Spotify data');
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
    if (spotifyData?.isPlaying && isClientPlaying) {
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
  }, [spotifyData, isClientPlaying]);

  // Toggle play/pause (client-side only, doesn't control Spotify)
  const togglePlay = async () => {
    if (!spotifyData) return;
    
    try {
      const action = isClientPlaying ? 'pause' : 'play';
      await fetch('/api/spotify/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });
      
      setIsClientPlaying(!isClientPlaying);
      // Refresh data after a slight delay to let Spotify update
      setTimeout(fetchSpotifyData, 1000);
    } catch (err) {
      console.error('Error controlling playback:', err);
    }
  };
  
  // Skip to next track
  const skipNext = async () => {
    if (!spotifyData) return;
    
    try {
      await fetch('/api/spotify/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'next' }),
      });
      
      // Refresh data after a slight delay to let Spotify update
      setTimeout(fetchSpotifyData, 1000);
    } catch (err) {
      console.error('Error skipping to next track:', err);
    }
  };
  
  // Skip to previous track
  const skipPrevious = async () => {
    if (!spotifyData) return;
    
    try {
      await fetch('/api/spotify/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'previous' }),
      });
      
      // Refresh data after a slight delay to let Spotify update
      setTimeout(fetchSpotifyData, 1000);
    } catch (err) {
      console.error('Error skipping to previous track:', err);
    }
  };

  // Format time from milliseconds to mm:ss
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <FiMusic className="text-primary animate-pulse" />
        <span className="text-xs text-foreground/70">Loading...</span>
      </div>
    );
  }

  if (error || !spotifyData) {
    return (
      <div className="flex items-center space-x-2">
        <FiMusic className="text-primary" />
        <span className="text-xs text-foreground/70">Not playing</span>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col space-y-2 rounded-lg bg-background/30 dark:bg-dark-bg/30 backdrop-blur-sm p-3 border border-gray-200/20 dark:border-gray-800/20 w-full max-w-xs"
    >
      {/* Track Info */}
      <div className="flex items-center space-x-3">
        <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
          {spotifyData.albumImageUrl ? (
            <Image 
              src={spotifyData.albumImageUrl} 
              alt={spotifyData.album}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-primary/20 w-full h-full flex items-center justify-center">
              <FiMusic className="text-primary" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <a 
            href={spotifyData.songUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-sm hover:text-primary truncate block"
          >
            {spotifyData.title}
          </a>
          <p className="text-xs text-foreground/70 truncate">{spotifyData.artist}</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="space-y-1 w-full">
        <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: `${progressPercent}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-foreground/60">
          <span>{formatTime(spotifyData.progress)}</span>
          <span>{formatTime(spotifyData.duration)}</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between pt-1">
        <button 
          className="text-foreground/70 hover:text-primary transition-colors"
          aria-label="Previous track"
          onClick={skipPrevious}
        >
          <FiSkipBack />
        </button>
        
        <button 
          className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
          onClick={togglePlay}
          aria-label={isClientPlaying ? "Pause" : "Play"}
        >
          {isClientPlaying ? <FiPause /> : <FiPlay />}
        </button>
        
        <button 
          className="text-foreground/70 hover:text-primary transition-colors"
          aria-label="Next track"
          onClick={skipNext}
        >
          <FiSkipForward />
        </button>
        
        <button 
          className="text-foreground/70 hover:text-primary transition-colors"
          aria-label="Volume"
        >
          <FiVolume2 />
        </button>
      </div>
    </motion.div>
  );
};

export default SpotifyPlayer; 