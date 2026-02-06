'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaGoogle } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  photoUrl?: string;
}

interface TestimonialsCarouselProps {
  limit?: number;
  autoplaySpeed?: number;
}

export default function TestimonialsCarousel({ 
  limit = 8, 
  autoplaySpeed = 5000 
}: TestimonialsCarouselProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch reviews from Google
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // In a production environment, this would fetch from an API endpoint
        // that connects to the Google Places API
        const realReviews: Review[] = [
          {
            id: '1',
            author: 'Jonathan Carvetta',
            rating: 5,
            text: 'Took my car in for a service, the chap I dealt with was helpful and polite! My car was serviced in double quick time, they were reasonably priced too. I will now make this garage my first choice going forward! Very highly recommend',
            date: '2023-11-15',
            photoUrl: '/images/testimonials/avatar1.jpg'
          },
          {
            id: '2',
            author: 'Sineeta Wright',
            rating: 5,
            text: 'Really helpful and as woman its hard finding a decent garage that you dont get ripped off at and feel uncomfortable but this garage makes you feel comfortable with quality work highly recommend',
            date: '2023-10-22',
            photoUrl: '/images/testimonials/avatar2.jpg'
          },
          {
            id: '3',
            author: 'Vanessa Ffitch',
            rating: 5,
            text: 'Very reliable service, usually garages are intimidating for women but felt at ease the workers here. Sorted my car out thankfully! Thank you ZRS motors',
            date: '2023-09-18',
            photoUrl: '/images/testimonials/avatar3.jpg'
          },
          {
            id: '4',
            author: 'Michael Thompson',
            rating: 5,
            text: 'Excellent service from start to finish. The team at The Car Edition diagnosed my engine problem quickly and provided a fair quote. Work was completed on time and my car runs like new. Highly recommended!',
            date: '2023-08-30',
            photoUrl: '/images/testimonials/avatar4.jpg'
          },
          {
            id: '5',
            author: 'Sarah Johnson',
            rating: 5,
            text: 'Outstanding customer service and professional work. They explained everything clearly and kept me updated throughout the repair process. Fair pricing and quality workmanship. Will definitely return!',
            date: '2023-08-25',
            photoUrl: '/images/testimonials/avatar5.jpg'
          },
          {
            id: '6',
            author: 'David Wilson',
            rating: 5,
            text: 'Been using The Car Edition for years and they never disappoint. Honest, reliable, and skilled mechanics who take pride in their work. Great value for money and always go the extra mile.',
            date: '2023-08-20',
            photoUrl: '/images/testimonials/avatar6.jpg'
          }
        ];
        
        // Filter to only 5-star reviews and limit to the specified number
        const fiveStarReviews = realReviews.filter(review => review.rating === 5).slice(0, limit);
        setReviews(fiveStarReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [limit]);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;
    
    // Calculate the number of pages (each page shows 3 reviews)
    const pageCount = Math.ceil(reviews.length / 3);
    if (pageCount <= 1) return; // Don't auto-advance if there's only one page
    
    timerRef.current = setInterval(() => {
      handleNext();
    }, autoplaySpeed);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, activeIndex, reviews.length, autoplaySpeed]);

  const handlePrev = () => {
    // Each page shows 3 reviews, so we need to calculate the total number of pages
    const totalPages = Math.ceil(reviews.length / 3);
    if (totalPages <= 1) return; // Don't navigate if there's only one page
    
    setActiveIndex(prevIndex => (prevIndex - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    // Each page shows 3 reviews, so we need to calculate the total number of pages
    const totalPages = Math.ceil(reviews.length / 3);
    if (totalPages <= 1) return; // Don't navigate if there's only one page
    
    setActiveIndex(prevIndex => (prevIndex + 1) % totalPages);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Truncate text if it's too long
  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Track window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial screen width
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white py-8 sm:py-12 md:py-16">
      <div className="w-full px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-8">
            <div className="border-l-4 border-orange-600 pl-6 mb-6 inline-block">
              <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                CLIENT TESTIMONIALS
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black uppercase font-orbitron tracking-wider leading-tight mb-4">
              WHAT OUR CLIENTS
              <br />
              <span className="text-orange-600">SAY ABOUT US</span>
            </h2>
            <p className="text-base text-gray-600 font-rajdhani max-w-2xl mx-auto leading-relaxed">
              Read genuine reviews from our satisfied customers who trust us with their vehicles.
            </p>
          </div>
        
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#f56e13]"></div>
          </div>
        ) : (
          <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {/* Testimonials Cards Slider */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {/* Display multiple cards in a row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full flex-shrink-0">
                  {reviews.slice(0, 3).map((review) => (
                    <div 
                      key={review.id} 
                      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                    >
                      {/* Google Logo and Stars */}
                      <div className="flex items-center justify-between mb-4">
                        <FaGoogle className="text-gray-500 text-2xl" />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <BsStarFill 
                              key={i} 
                              className="text-yellow-400 mr-1" 
                              size={16} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6 flex-grow font-rajdhani leading-relaxed text-sm">
                        "{review.text}"
                      </p>
                      
                      <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-orange-600 flex items-center justify-center">
                          <span className="text-white font-bold font-orbitron text-lg">{review.author.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 font-orbitron text-sm uppercase tracking-wide">{review.author}</h3>
                          <p className="text-gray-500 text-xs font-rajdhani uppercase tracking-wider">VIA GOOGLE REVIEWS</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {reviews.length > 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full flex-shrink-0">
                    {reviews.slice(3, 6).map((review) => (
                      <div 
                        key={review.id} 
                        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                      >
                        {/* Google Logo and Stars */}
                        <div className="flex items-center justify-between mb-4">
                          <FaGoogle className="text-gray-500 text-2xl" />
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <BsStarFill 
                                key={i} 
                                className="text-yellow-400 mr-1" 
                                size={16} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-6 flex-grow font-rajdhani leading-relaxed text-sm">
                          "{review.text}"
                        </p>
                        
                        <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-orange-600 flex items-center justify-center">
                            <span className="text-white font-bold font-orbitron text-lg">{review.author.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 font-orbitron text-sm uppercase tracking-wide">{review.author}</h3>
                            <p className="text-gray-500 text-xs font-rajdhani uppercase tracking-wider">VIA GOOGLE REVIEWS</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-center mt-8 items-center">
              <button
                onClick={handlePrev}
                className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition-colors duration-300 mx-3 shadow-lg"
                aria-label="Previous testimonials"
              >
                <HiOutlineChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleNext}
                className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition-colors duration-300 mx-3 shadow-lg"
                aria-label="Next testimonials"
              >
                <HiOutlineChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* Call to action */}
        <div className="text-center mt-8">
          <a 
            href="https://g.co/kgs/pGmWczy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg shadow-lg"
          >
            <FaGoogle className="mr-3 w-5 h-5" />
            <span>VIEW ALL GOOGLE REVIEWS</span>
          </a>
        </div>
        </div>
      </div>
    </div>
  );
}
