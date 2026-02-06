"use client";

import { useEffect, useRef, useState } from 'react';

interface ServiceVideoPlayerProps {
  videoId: string;
  title?: string;
}

export default function ServiceVideoPlayer({ videoId, title = "Watch Our Service Video" }: ServiceVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    if (playerContainerRef.current) {
      playerContainerRef.current.innerHTML = '';
      playerContainerRef.current.appendChild(iframe);
    }
    
    return () => {
      if (playerContainerRef.current) {
        playerContainerRef.current.innerHTML = '';
      }
    };
  }, [videoId, isPlaying]);
  
  return (
    <div className="mb-20">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-orbitron uppercase text-center">
        {title}
      </h3>
      <div className="max-w-4xl mx-auto">
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          {!isPlaying ? (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="relative z-10 w-20 h-20 rounded-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10 ml-1">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="aspect-video" ref={playerContainerRef}></div>
          )}
        </div>
      </div>
    </div>
  );
}
