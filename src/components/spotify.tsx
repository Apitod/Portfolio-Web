'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify, FaPlayCircle, FaPauseCircle, FaStepForward, FaStepBackward } from 'react-icons/fa';
import Image from 'next/image';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNowPlaying = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/spotify');
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError('Failed to fetch Spotify data');
      console.error('Error fetching Spotify data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleControl = async (action: 'play' | 'pause' | 'next' | 'previous') => {
    try {
      const response = await fetch('/api/spotify/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });
      
      if (response.ok) {
        // Update the data after a short delay to allow Spotify API to update
        setTimeout(fetchNowPlaying, 500);
      } else {
        const error = await response.json();
        setError(error.message || 'Failed to control playback');
      }
    } catch (err) {
      setError('Failed to control playback');
      console.error('Error controlling playback:', err);
    }
  };

  const formatTime = (ms: number) => {
    if (!ms) return '0:00';
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor(ms / 1000 / 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 rounded-lg bg-neutral-900/60 backdrop-blur-sm">
        <div className="animate-pulse text-green-500">
          <FaSpotify className="w-6 h-6" />
        </div>
        <p className="ml-2 text-sm font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-neutral-900/60 backdrop-blur-sm">
        <div className="flex items-center text-red-500">
          <FaSpotify className="w-6 h-6" />
          <p className="ml-2 text-sm font-medium">Error loading Spotify data</p>
        </div>
      </div>
    );
  }

  if (!data || !data.isPlaying) {
    return (
      <div className="p-4 rounded-lg bg-neutral-900/60 backdrop-blur-sm">
        <div className="flex items-center text-neutral-400">
          <FaSpotify className="w-6 h-6 text-green-500" />
          <p className="ml-2 text-sm font-medium">Not playing anything</p>
        </div>
      </div>
    );
  }

  const progress = data.progress ? (data.progress / (data.duration || 1)) * 100 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 rounded-lg bg-neutral-900/60 backdrop-blur-sm"
    >
      <div className="flex items-center">
        <FaSpotify className="w-6 h-6 text-green-500 flex-shrink-0" />
        <p className="ml-2 text-sm font-medium">Now Playing</p>
      </div>
      
      <div className="flex mt-3">
        {data.albumImageUrl && (
          <div className="w-16 h-16 relative flex-shrink-0">
            <Image 
              src={data.albumImageUrl} 
              alt={data.title || 'Album cover'} 
              fill
              className="rounded-md object-cover"
            />
          </div>
        )}
        
        <div className="ml-3 flex-grow min-w-0">
          <a 
            href={data.songUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold truncate block hover:underline"
          >
            {data.title}
          </a>
          <p className="text-xs text-neutral-400 truncate">{data.artist}</p>
          
          <div className="mt-2">
            <div className="h-1 w-full bg-neutral-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1 text-neutral-400">
              <span>{formatTime(data.progress || 0)}</span>
              <span>{formatTime(data.duration || 0)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-3 space-x-4">
        <button 
          onClick={() => handleControl('previous')}
          className="text-white hover:text-green-500 transition-colors"
          aria-label="Previous track"
        >
          <FaStepBackward className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => handleControl(data.isPlaying ? 'pause' : 'play')}
          className="text-white hover:text-green-500 transition-colors"
          aria-label={data.isPlaying ? 'Pause' : 'Play'}
        >
          {data.isPlaying ? (
            <FaPauseCircle className="w-6 h-6" />
          ) : (
            <FaPlayCircle className="w-6 h-6" />
          )}
        </button>
        
        <button 
          onClick={() => handleControl('next')}
          className="text-white hover:text-green-500 transition-colors"
          aria-label="Next track"
        >
          <FaStepForward className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
} 