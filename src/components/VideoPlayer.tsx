"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface VideoPlayerProps {
  videoId: string;
  thumbnailSrc: string;
}

export default function VideoPlayer({ videoId, thumbnailSrc }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    // Create YouTube iframe only after user clicks
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    // Clear the container and append the iframe
    if (playerContainerRef.current) {
      playerContainerRef.current.innerHTML = '';
      playerContainerRef.current.appendChild(iframe);
    }
    
    return () => {
      // Clean up if component unmounts
      if (playerContainerRef.current) {
        playerContainerRef.current.innerHTML = '';
      }
    };
  }, [videoId, isPlaying]);
  
  return (
    <div className="w-full">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black group">
        {!isPlaying ? (
          <div 
            className="relative w-full h-full cursor-pointer" 
            onClick={() => setIsPlaying(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-20 h-20 rounded-full bg-orange-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-orange-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10 ml-1">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <Image
              src={thumbnailSrc}
              alt="Video Thumbnail"
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video w-full h-full" ref={playerContainerRef}></div>
        )}
      </div>
    </div>
  );
}
