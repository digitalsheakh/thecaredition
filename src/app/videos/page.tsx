'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube, FaPlay, FaCalendarAlt, FaEye, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog';

interface YouTubeVideo {
  _id: string;
  title: string;
  createdAt: string;
  videoYoutubeLink: string;
  videoThumbnail: string;
  videoEmbedLink: string;
  description: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/videos");
        setVideos(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Keyboard support for video modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedVideo) {
        closeVideo();
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  const openVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Hero Section */}
      <section className="relative py-20 bg-black" style={{backgroundImage: 'url(/images/logos/background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/80"></div>
        
        <div className="w-full px-6 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center">
              <div className="border-l-4 border-red-600 pl-6 mb-8 inline-block">
                <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  YOUTUBE & MEDIA
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                Exploring the Road to <span className="text-red-600">Automotive Excellence</span>
              </h1>
              <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
                Watch our latest automotive transformations, expert tips, and behind-the-scenes content from The Car Edition.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Videos Grid */}
      <section className="w-full py-20 bg-black">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
        
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-300 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
                >
                  Try Again
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video, index) => (
                  <div 
                    key={video._id}
                    className="group cursor-pointer"
                    onClick={() => openVideo(video.videoEmbedLink)}
                  >
                    <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={video.videoThumbnail}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <FaPlay className="text-white text-xl ml-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center text-sm text-red-600 mb-2 font-rajdhani">
                        <FaCalendarAlt className="mr-2" />
                        <span>{formatDate(video.createdAt)}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white group-hover:text-red-600 transition-colors duration-300 font-orbitron mb-2">
                        {video.title}
                      </h3>
                      
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <span className="text-gray-400 font-rajdhani">Watch Now</span>
                        <a
                          href={video?.videoYoutubeLink}
                          className="flex items-center gap-1 text-red-600 hover:text-red-500 transition-colors duration-300 font-rajdhani"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaYoutube />
                          YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="text-center mt-12">
              <a 
                href="https://www.youtube.com/@thecareditionltd/videos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center">
                  <FaYoutube className="mr-3" />
                  VIEW ALL VIDEOS
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Promotional Sections */}
      <section className="w-full py-20 bg-black">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Services Promotion */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <div className="text-center">
                  <p className="text-gray-300 font-rajdhani mb-6 leading-relaxed">
                    From engine rebuilds to routine maintenance, discover our comprehensive range of automotive services designed to keep your vehicle running at its best.
                  </p>
                  <Link 
                    href="/services"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative flex items-center">
                      VIEW SERVICES
                      <FaArrowRight className="ml-3" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Contact Promotion */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <div className="text-center">
                  <p className="text-gray-300 font-rajdhani mb-6 leading-relaxed">
                    Ready to experience the Car Edition difference? Contact our expert team today for a consultation and personalized quote for your vehicle.
                  </p>
                  <Link 
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    <span className="relative flex items-center">
                      CONTACT US
                      <FaArrowRight className="ml-3" />
                    </span>
                  </Link>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={closeVideo}
        >
          <div 
            className="relative w-full max-w-7xl mx-4 animate-in fade-in zoom-in duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button - Top Right */}
            <button
              onClick={closeVideo}
              className="absolute -top-4 -right-4 z-30 group bg-red-600 hover:bg-red-700 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-2xl hover:shadow-red-600/50 transform hover:scale-110"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Close Button - Alternative Position */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-30 group bg-black/80 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Container */}
            <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl border-2 border-red-600/30 ring-4 ring-red-600/10">
              {/* Loading Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10" id="video-loading">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
                  <p className="text-white font-rajdhani">Loading video...</p>
                </div>
              </div>
              
              {/* Video Player */}
              <iframe
                src={`${selectedVideo}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=1&color=white&theme=dark`}
                className="w-full aspect-video border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                title="The Car Edition - Premium Automotive Content"
                frameBorder="0"
                style={{ minHeight: '400px' }}
                onLoad={() => {
                  const loading = document.getElementById('video-loading');
                  if (loading) {
                    setTimeout(() => {
                      loading.style.display = 'none';
                    }, 1000);
                  }
                }}
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <FaYoutube className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-white font-orbitron font-bold text-sm">THE CAR EDITION</p>
                      <p className="text-gray-300 font-rajdhani text-xs">Premium Automotive Content</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        if (document.fullscreenElement) {
                          document.exitFullscreen();
                        } else {
                          document.documentElement.requestFullscreen();
                        }
                      }}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all duration-300"
                      title="Toggle Fullscreen"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <a
                      href={selectedVideo.replace('/embed/', '/watch?v=')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-rajdhani font-bold text-sm transition-all duration-300 flex items-center"
                    >
                      <FaYoutube className="mr-2" />
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Keyboard Hints */}
            <div className="absolute -bottom-16 left-0 right-0 flex justify-between items-center text-gray-400 font-rajdhani text-sm">
              <div>
                Press <kbd className="px-2 py-1 bg-gray-800 rounded text-white mx-1">ESC</kbd> to close or click outside
              </div>
              <div className="flex items-center space-x-4">
                <span>Click</span>
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span>to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}