'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';


// These components aren't needed or don't exist in the project
import VideoPlayer from '@/components/VideoPlayer';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();
  console.log(session);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    // Initialize slider position to start from left side
    if (sliderRef.current && scrollPosition === 0) {
      sliderRef.current.scrollLeft = 0;
      setScrollPosition(0);
    }
  }, []);

  // Reference for the services slider
  const servicesSliderRef = useRef<HTMLDivElement>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  
  useEffect(() => {
    // Create continuous scrolling effect from left to right
    const animationInterval = setInterval(() => {
      if (sliderRef.current) {
        // Get the total width of all items
        const totalWidth = sliderRef.current.scrollWidth;
        const containerWidth = sliderRef.current.clientWidth;
        
        // Increment scroll position (for left to right movement)
        let newPosition = scrollPosition + 1;
        
        // Reset when we reach the end
        if (newPosition >= totalWidth - containerWidth) {
          // Jump back to start without animation
          sliderRef.current.scrollLeft = 0;
          newPosition = 0;
        } else {
          // Smooth scroll to new position
          sliderRef.current.scrollLeft = newPosition;
        }
        
        setScrollPosition(newPosition);
      }
    }, 20); // Update every 20ms for smooth animation
    
    return () => clearInterval(animationInterval);
  }, [scrollPosition]);
  
  // Auto-scrolling effect for services slider
  useEffect(() => {
    if (!autoScrollEnabled) return;
    
    const servicesInterval = setInterval(() => {
      if (servicesSliderRef.current) {
        servicesSliderRef.current.scrollLeft += 1;
        
        // Reset when we reach the end
        if (servicesSliderRef.current.scrollLeft >= servicesSliderRef.current.scrollWidth - servicesSliderRef.current.clientWidth - 10) {
          servicesSliderRef.current.scrollLeft = 0;
        }
      }
    }, 30);
    
    return () => clearInterval(servicesInterval);
  }, [autoScrollEnabled]);

  return (
    <main className="  text-white font-heading bg-black">
      {/* Hero Section with Services at Bottom */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/logos/backgroundlogo2.jpg"
            alt="Car Workshop"
            fill
            className="object-cover brightness-50"
            sizes="100vw"
            style={{ 
              objectPosition: 'center 20%'
            }}
            priority
          />
        </div>
        
        {/* Main Hero Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-screen-2xl mx-auto">
            <div className="text-center md:text-left">
              {/* Clean Hero Headlines */}
              <div className="mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 uppercase font-orbitron tracking-wider text-white">
                  CAR CARE
                </h1>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 uppercase font-orbitron tracking-wider" style={{ color: '#fb9929' }}>
                  REDEFINED
                </h2>
                
                {/* Simple Call to Action */}
                <div className="mt-8">
                  <Link href="/service-estimator" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-base font-bold uppercase font-orbitron tracking-wider transition-colors duration-300">
                    CALL US FOR AN ESTIMATE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Categories at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 md:pb-16">
          <div className="w-full px-6">
            <div className="max-w-screen-2xl mx-auto">
              {/* Desktop view - Clean Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-8">
                {/* ENGINE REPAIR & REBUILDS */}
                <div className="flex items-start">
                  <div className="mr-4">
                    <Image
                      src="/images/icons/SERVICE ICON white.png"
                      alt="Engine Repair Icon"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase mb-1 font-orbitron tracking-wider">ENGINE REPAIR & REBUILDS</h3>
                    <p className="text-gray-300 text-xs font-rajdhani">
                      Rebuild your engine with The Car Edition.<br/>
                      Our experts are proficient in European,<br/>
                      American and Japanese brands.
                    </p>
                  </div>
                </div>
                
                {/* MAINTENANCE & SERVICING */}
                <div className="flex items-start">
                  <div className="mr-4">
                    <Image
                      src="/images/icons/SERVICE ICON white.png"
                      alt="Maintenance Icon"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase mb-1 font-orbitron tracking-wider">MAINTENANCE & SERVICING</h3>
                    <p className="text-gray-300 text-xs font-rajdhani">
                      Whether you need oil change services,<br/>
                      major service or even a general service,<br/>
                      The Car Edition got you covered.
                    </p>
                  </div>
                </div>
                
                {/* BUY OR SELL YOUR CAR */}
                <div className="flex items-start">
                  <div className="mr-4">
                    <Image
                      src="/images/icons/CAR_3.png"
                      alt="Buy Sell Icon"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase mb-1 font-orbitron tracking-wider">BUY OR SELL YOUR CAR</h3>
                    <p className="text-gray-300 text-xs font-rajdhani">
                      Looking to buy your dream car<br/>
                      or simply want to sell yours?<br/>
                      Look no further - we can do both!
                    </p>
                  </div>
                </div>
              </div>
            
              {/* Mobile view - Clean Marquee */}
              <div className="md:hidden overflow-hidden">
                <div className="flex whitespace-nowrap animate-marquee">
                  <style jsx>{`
                    @keyframes marquee {
                      0% { transform: translateX(100%); }
                      100% { transform: translateX(-200%); }
                    }
                    .animate-marquee {
                      animation: marquee 20s linear infinite;
                      min-width: 100%;
                    }
                  `}</style>
                  
                  {/* First set of service items */}
                  <div className="inline-flex items-start mx-4">
                    <div className="mr-4">
                      <Image
                        src="/images/icons/SERVICE ICON white.png"
                        alt="Service Icon"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase mb-1 italic">ENGINE REPAIR & REBUILDS</h3>
                      <p className="text-gray-300 text-xs italic">
                        Rebuild your engine with The Car Edition.<br/>
                        Our experts are proficient in European,<br/>
                        American and Japanese brands.
                      </p>
                    </div>
                  </div>
                  
                  {/* Second set of service items */}
                  <div className="inline-flex items-start mx-4">
                    <div className="mr-4">
                      <Image
                        src="/images/icons/SERVICE ICON white.png"
                        alt="Maintenance Icon"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase mb-1 italic">MAINTENANCE & SERVICING</h3>
                      <p className="text-gray-300 text-xs italic">
                        Whether you need oil change services,<br/>
                        major service or even a general service,<br/>
                        The Car Edition got you covered.
                      </p>
                    </div>
                  </div>
                  
                  {/* Third set of service items */}
                  <div className="inline-flex items-start mx-4">
                    <div className="mr-4">
                      <Image
                        src="/images/icons/CAR_3.png"
                        alt="Buy Sell Icon"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase mb-1 italic">BUY OR SELL YOUR CAR</h3>
                      <p className="text-gray-300 text-xs italic">
                        Looking to buy your dream car<br/>
                        or simply want to sell yours?<br/>
                        Look no further - we can do both!
                      </p>
                    </div>
                  </div>
                  
                  {/* Duplicate first set for continuous scrolling */}
                  <div className="inline-flex items-start mx-4">
                    <div className="mr-4">
                      <Image
                        src="/images/icons/SERVICE ICON white.png"
                        alt="Service Icon"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase mb-1 italic">ENGINE REPAIR & REBUILDS</h3>
                      <p className="text-gray-300 text-xs italic">
                        Rebuild your engine with The Car Edition.<br/>
                        Our experts are proficient in European,<br/>
                        American and Japanese brands.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10% Off Banner with Mobile Marquee */}
      <section className="bg-red-600 py-3 md:py-4">
        <div className="w-full">
          {/* Desktop - Static Text */}
          <div className="hidden md:block px-4">
            <div className="max-w-screen-2xl mx-auto">
              <p className="text-white text-center text-base font-bold uppercase tracking-wide">
                GET 10% OFF YOUR FIRST SERVICE + FREE BRAKE FLUID TOP UP WHEN YOU SIGN UP TO OUR REWARDS PROGRAM!
              </p>
            </div>
          </div>
          
          {/* Mobile - Marquee */}
          <div className="md:hidden overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
              <style jsx>{`
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                  animation: marquee 15s linear infinite;
                }
              `}</style>
              <p className="text-white text-base font-bold uppercase tracking-wide">
                GET 10% OFF YOUR FIRST SERVICE + FREE BRAKE FLUID TOP UP WHEN YOU SIGN UP TO OUR REWARDS PROGRAM!&nbsp;&nbsp;&nbsp;&nbsp;GET 10% OFF YOUR FIRST SERVICE + FREE BRAKE FLUID TOP UP WHEN YOU SIGN UP TO OUR REWARDS PROGRAM!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black" style={{backgroundImage: 'url(/images/logos/background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]"></div>
        <div className="w-full px-6 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <div className="border-l-4 border-red-600 pl-6 mb-8 inline-block">
                <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  PROFESSIONAL CAR SERVICES
                </p>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white uppercase font-orbitron tracking-wider leading-tight mb-6">TRENDING SERVICES</h2>
              <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
                Discover our most popular automotive services designed to keep your vehicle running at peak performance. Professional quality, competitive prices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {/* Service Card 1 - FULL SERVICE */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 hover:border-red-600 transition-all duration-300 group h-full flex flex-col">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white font-orbitron uppercase tracking-wide mb-2 min-h-[3rem] flex items-center">FULL SERVICE</h3>
                    <p className="text-xs text-red-400 font-rajdhani uppercase tracking-wider">PREMIUM PACKAGE</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-white text-4xl font-bold font-orbitron mb-2">£249</div>
                    <p className="text-sm text-gray-400 font-rajdhani">Comprehensive vehicle inspection</p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Oil & Filter Change</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Brake System Check</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Engine Diagnostics</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Safety Inspection</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg mt-auto">
                    BOOK NOW
                  </button>
                </div>
              </div>
            
              {/* Service Card 2 - INTERIM SERVICE */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 hover:border-red-600 transition-all duration-300 group h-full flex flex-col">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white font-orbitron uppercase tracking-wide mb-2 min-h-[3rem] flex items-center">INTERIM SERVICE</h3>
                    <p className="text-xs text-red-400 font-rajdhani uppercase tracking-wider">ESSENTIAL PACKAGE</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-white text-4xl font-bold font-orbitron mb-2">£149</div>
                    <p className="text-sm text-gray-400 font-rajdhani">Essential maintenance service</p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Oil Change</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Basic Inspection</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Fluid Top-up</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Tyre Check</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg mt-auto">
                    BOOK NOW
                  </button>
                </div>
              </div>
            
              {/* Service Card 3 - GEARBOX SERVICE */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 hover:border-red-600 transition-all duration-300 group h-full flex flex-col">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white font-orbitron uppercase tracking-wide mb-2 min-h-[3rem] flex items-center">GEARBOX SERVICE</h3>
                    <p className="text-xs text-red-400 font-rajdhani uppercase tracking-wider">SPECIALIST SERVICE</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-white text-4xl font-bold font-orbitron mb-2">£299</div>
                    <p className="text-sm text-gray-400 font-rajdhani">Complete gearbox maintenance</p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Gearbox Oil Change</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Filter Replacement</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">System Diagnostics</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Performance Test</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg mt-auto">
                    BOOK NOW
                  </button>
                </div>
              </div>
            
              {/* Service Card 4 - TIMING BELT */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 hover:border-red-600 transition-all duration-300 group h-full flex flex-col">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white font-orbitron uppercase tracking-wide mb-2 min-h-[3rem] flex items-center">TIMING BELT</h3>
                    <p className="text-xs text-red-400 font-rajdhani uppercase tracking-wider">CRITICAL SERVICE</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-white text-4xl font-bold font-orbitron mb-2">£399</div>
                    <p className="text-sm text-gray-400 font-rajdhani">Prevent engine damage</p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Belt Replacement</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Tensioner Check</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Water Pump Inspection</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Engine Timing</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg mt-auto">
                    BOOK NOW
                  </button>
                </div>
              </div>
            
              {/* Service Card 5 - WINTER PACKAGE */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 hover:border-red-600 transition-all duration-300 group h-full flex flex-col">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white font-orbitron uppercase tracking-wide mb-2 min-h-[3rem] flex items-center">WINTER PACKAGE</h3>
                    <p className="text-xs text-red-400 font-rajdhani uppercase tracking-wider">SEASONAL SPECIAL</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-white text-4xl font-bold font-orbitron mb-2">£99</div>
                    <p className="text-sm text-gray-400 font-rajdhani">Winter readiness check</p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Battery Test</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Antifreeze Check</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Tyre Condition</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-gray-300 font-rajdhani text-sm">Heating System</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg mt-auto">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="py-20 bg-black">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <div className="border-l-4 border-red-600 pl-6 mb-8 inline-block">
                <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  AUTOMOTIVE EXCELLENCE
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white uppercase font-orbitron tracking-wider leading-tight mb-6">TRUSTED BY LEADING BRANDS</h2>
              <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
                We service and maintain vehicles from all major automotive manufacturers with professional expertise and genuine parts.
              </p>
            </div>
            
            {/* Marquee Container */}
            <div className="relative overflow-hidden bg-gray-900/50 py-12 rounded-2xl border border-gray-800">
              {/* Continuous Marquee - No gaps, always filled */}
              <div className="flex animate-marquee hover:pause-marquee space-x-16">
                {/* Repeat logos multiple times for continuous coverage */}
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo1.png" 
                    alt="BMW" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo2.png" 
                    alt="Mercedes-Benz" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo3.png" 
                    alt="Audi" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo4.png" 
                    alt="Volkswagen" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                
                {/* Duplicate sets for seamless loop */}
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo1.png" 
                    alt="BMW" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo2.png" 
                    alt="Mercedes-Benz" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo3.png" 
                    alt="Audi" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo4.png" 
                    alt="Volkswagen" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                
                {/* Third set */}
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo1.png" 
                    alt="BMW" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo2.png" 
                    alt="Mercedes-Benz" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo3.png" 
                    alt="Audi" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
                <div className="w-40 h-24 relative flex-shrink-0 group">
                  <Image 
                    src="/images/cars/carlogo4.png" 
                    alt="Volkswagen" 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
              </div>
              
              {/* Gradient overlays for smooth fade effect */}
              <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-gray-900/50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-gray-900/50 to-transparent z-10 pointer-events-none"></div>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <h3 className="text-lg font-bold text-white font-orbitron uppercase tracking-wide mb-2">YEARS EXPERIENCE</h3>
                <p className="text-gray-400 font-rajdhani text-sm">Serving automotive excellence since 2008</p>
              </div>
              <div className="group">
                <h3 className="text-lg font-bold text-white font-orbitron uppercase tracking-wide mb-2">ALL CAR BRANDS</h3>
                <p className="text-gray-400 font-rajdhani text-sm">All major manufacturers supported</p>
              </div>
              <div className="group">
                <h3 className="text-lg font-bold text-white font-orbitron uppercase tracking-wide mb-2">HAPPY CUSTOMERS</h3>
                <p className="text-gray-400 font-rajdhani text-sm">Trusted by thousands of drivers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome to The Car Edition Section */}
      <section className="py-20 bg-black">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="relative">
                  <Image 
                    src="/images/logos/about us image.jpg" 
                    alt="Professional automotive service at The Car Edition" 
                    width={700} 
                    height={500} 
                    className="rounded-2xl shadow-2xl border border-gray-800" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="border-l-4 border-red-600 pl-6 mb-8">
                  <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                    AUTOMOTIVE EXCELLENCE SINCE 2008
                  </p>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white uppercase font-orbitron tracking-wider leading-tight mb-4">
                  WELCOME TO
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold text-red-600 uppercase font-orbitron tracking-wider leading-tight mb-8">
                  THE CAR EDITION
                </h3>
                <p className="text-lg text-gray-300 font-rajdhani leading-relaxed mb-8">
                  The Car Edition is a trusted provider of high-quality used cars and comprehensive automotive services. Our qualified team of mechanics delivers professional solutions for all your vehicle needs, from routine maintenance to complex engine rebuilds and advanced diagnostics.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/services" className="inline-flex items-center bg-white text-black hover:bg-gray-200 px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg">
                    <span className="mr-3 text-red-600 text-lg">+</span> EXPLORE SERVICES
                  </Link>
                  <Link href="/videos" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg">
                    <span className="mr-3 text-lg">⏵</span> WELCOME VIDEO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Members Club Section */}
      <section className="py-20 bg-black" style={{backgroundImage: 'url(/images/logos/background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]"></div>
        <div className="w-full px-6 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="border-l-4 border-red-600 pl-6 mb-8">
                  <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                    EXCLUSIVE MEMBERSHIP PROGRAM
                  </p>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase font-orbitron tracking-wider leading-tight mb-6">
                  JOIN OUR GOLD
                  <br />
                  <span className="text-red-600">MEMBERS CLUB</span>
                </h2>
                <p className="text-lg text-gray-300 font-rajdhani leading-relaxed mb-8">
                  Earn points for every service visit and unlock exclusive rewards. Get MOT and service reminders, priority booking, and special member discounts. Start with 5,000 bonus points when you join today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg">
                    CLAIM 5K POINTS NOW
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg">
                    LEARN MORE
                  </button>
                </div>
                
                {/* Member Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani">5,000 Welcome Points</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani">Priority Booking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani">Service Reminders</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani">Exclusive Discounts</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="relative">
                  <Image
                    src="/images/logos/rentacarimage.jpg"
                    alt="Gold Members Club Benefits"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl border border-gray-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  
                  {/* Membership Card Overlay */}
                  <div className="absolute top-6 right-6 bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-xl shadow-lg">
                    <p className="text-black text-xs font-bold font-orbitron uppercase">GOLD MEMBER</p>
                    <p className="text-black text-lg font-bold font-orbitron">5,000</p>
                    <p className="text-black text-xs font-rajdhani">BONUS POINTS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Service Your Car Section */}
      <section className="py-20 bg-black" style={{backgroundImage: 'url(/images/logos/background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]"></div>
        <div className="w-full px-6 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left side - 3D Car Image (Clean & Plain) */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <Image
                    src="/images/logos/3dcarpic.png"
                    alt="Professional automotive service at The Car Edition"
                    width={700}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              {/* Right side - Compact Content */}
              <div className="lg:w-1/2">
                <div className="border-l-4 border-red-600 pl-4 mb-6">
                  <p className="text-red-600 text-xs font-bold uppercase tracking-wider font-rajdhani">
                    PROFESSIONAL SERVICES
                  </p>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white uppercase font-orbitron tracking-wider leading-tight mb-6">
                  WHY SERVICE YOUR CAR WITH
                  <br />
                  <span className="text-red-600">THE CAR EDITION?</span>
                </h2>
                
                <p className="text-base text-gray-300 font-rajdhani leading-relaxed mb-6">
                  Professional automotive services with certified mechanics and quality parts.
                </p>
                
                {/* Compact Service Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani text-sm">Expert Mechanics</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani text-sm">Quality Parts</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani text-sm">Fair Pricing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani text-sm">Fast Service</span>
                  </div>
                </div>
                
                {/* Compact Call to Action */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/services" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg text-sm">
                    VIEW SERVICES
                  </a>
                  <a href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg text-sm">
                    CONTACT US
                  </a>
                </div>
                
                {/* Video Player Component */}
                <div className="mt-8">
                  <VideoPlayer 
                    videoId="-Jz8jyMPt2U" 
                    thumbnailSrc="/images/logos/youtube_logo.jpg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Mechanical Work and Diagnostics */}
      <section className="py-20 bg-white">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <div className="border-l-4 border-red-600 pl-6 mb-8 inline-block">
                <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  PROFESSIONAL EXPERTISE
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-black uppercase font-orbitron tracking-wider leading-tight mb-6">
                SPECIALIST MECHANICAL WORK
                <br />
                <span className="text-red-600">& DIAGNOSTICS</span>
              </h2>
              <p className="text-lg text-gray-600 font-rajdhani max-w-3xl mx-auto leading-relaxed">
                Expert technicians delivering professional solutions for all your vehicle needs with state-of-the-art diagnostic equipment.
              </p>
            </div>
          
          {/* Sliding services carousel */}
          <div className="relative overflow-hidden" 
            onMouseEnter={() => setAutoScrollEnabled(false)}
            onMouseLeave={() => setAutoScrollEnabled(true)}
          >
            {/* Slider container */}
            <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory" ref={servicesSliderRef}>
              
              {/* Service 1: Timing Chains */}
              <div className="flex-shrink-0 w-full md:w-1/4 lg:w-1/5 min-w-[280px] snap-start">
                <div className="relative aspect-square overflow-hidden" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
                  <Image
                    src="/images/services/serviceimage1.jpg"
                    alt="Timing Chains"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-base font-semibold mb-2">TIMING CHAINS</h3>
                    <p className="text-xs mb-4">Professional timing chain replacement and repair services for optimal engine performance.</p>
                    <Link href="/services/timing-chains" className="text-xs font-semibold tracking-wider uppercase flex items-center text-white hover:text-[#f56e13] transition-colors">
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Service 2: Engine Rebuilds */}
              <div className="flex-shrink-0 w-full md:w-1/4 lg:w-1/5 min-w-[280px] snap-start">
                <div className="relative aspect-square overflow-hidden" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
                  <Image
                    src="/images/services/serviceimage2.jpg"
                    alt="Engine Rebuilds"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-base font-semibold mb-2">ENGINE REBUILDS</h3>
                    <p className="text-xs mb-4">Complete engine rebuild services to restore your vehicle's performance and reliability.</p>
                    <Link href="/services/engine-rebuilds" className="text-xs font-semibold tracking-wider uppercase flex items-center text-white hover:text-[#f56e13] transition-colors">
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Service 3: Turbos */}
              <div className="flex-shrink-0 w-full md:w-1/4 lg:w-1/5 min-w-[280px] snap-start">
                <div className="relative aspect-square overflow-hidden" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
                  <Image
                    src="/images/services/serviceimage3.jpg"
                    alt="Turbos"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-base font-semibold mb-2">TURBOS</h3>
                    <p className="text-xs mb-4">Professional turbo repair and replacement services for optimal turbocharged engine performance.</p>
                    <Link href="/services/turbos" className="text-xs font-semibold tracking-wider uppercase flex items-center text-white hover:text-[#f56e13] transition-colors">
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Service 4: Brakes and Pads */}
              <div className="flex-shrink-0 w-full md:w-1/4 lg:w-1/5 min-w-[280px] snap-start">
                <div className="relative aspect-square overflow-hidden" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
                  <Image
                    src="/images/services/serviceimage4.jpg"
                    alt="Brakes and Pads"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-base font-semibold mb-2">BRAKES & PADS</h3>
                    <p className="text-xs mb-4">Expert brake and pad replacement services to ensure your safety and optimal stopping power.</p>
                    <Link href="/services/brakes-and-pads" className="text-xs font-semibold tracking-wider uppercase flex items-center text-white hover:text-[#f56e13] transition-colors">
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Service 5: Diagnostics */}
              <div className="flex-shrink-0 w-full md:w-1/4 lg:w-1/5 min-w-[280px] snap-start">
                <div className="relative aspect-square overflow-hidden" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
                  <Image
                    src="/images/services/serviceimage5.jpg"
                    alt="Diagnostics"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-base font-semibold mb-2">DIAGNOSTICS</h3>
                    <p className="text-xs mb-4">Advanced diagnostic services to identify and resolve issues with precision and accuracy.</p>
                    <Link href="/services/diagnostics" className="text-xs font-semibold tracking-wider uppercase flex items-center text-white hover:text-[#f56e13] transition-colors">
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-1/4 lg:w-1/5 min-w-[280px] snap-start">
                <div className="relative aspect-square overflow-hidden" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
                  <Image
                    src="/images/tyres-and-puncture.jpeg"
                    alt="Tyres & Puncture Repair"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-base font-semibold mb-2">TYRES & PUNCTURE REPAIR</h3>
                    <p className="text-xs mb-4">Professional tyre fitting and puncture repair services to keep you safe on the road.</p>
                    <Link href="/services/tyres-and-puncture" className="text-xs font-semibold tracking-wider uppercase flex items-center text-white hover:text-[#f56e13] transition-colors">
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-10 ml-2"
              onClick={() => {
                setAutoScrollEnabled(false);
                if (servicesSliderRef.current) {
                  servicesSliderRef.current.scrollLeft -= 300;
                }
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-10 mr-2"
              onClick={() => {
                setAutoScrollEnabled(false);
                if (servicesSliderRef.current) {
                  servicesSliderRef.current.scrollLeft += 300;
                }
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          </div>
        </div>
      </section>

      {/* Schedule Appointment Section */}
      <section className="py-20 bg-black" style={{backgroundImage: 'url(/images/logos/background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]"></div>
        <div className="w-full px-6 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Left Content */}
              <div className="lg:w-1/2">
                <div className="border-l-4 border-red-600 pl-6 mb-8">
                  <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                    BOOK YOUR SERVICE TODAY
                  </p>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white uppercase font-orbitron tracking-wider leading-tight mb-6">
                  SCHEDULE AN
                  <br />
                  <span className="text-red-600">APPOINTMENT</span>
                </h2>
                <p className="text-lg text-gray-300 font-rajdhani leading-relaxed mb-8">
                  Experience professional automotive service at The Car Edition. Our expert technicians are ready to keep your vehicle running at peak performance. Book your appointment today for quality service you can trust.
                </p>
                
                {/* Service Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani">Same Day Service</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani">Expert Technicians</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani">Quality Guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-300 font-rajdhani">Competitive Prices</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/service-estimator" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg">
                    BOOK APPOINTMENT
                  </Link>
                  <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg">
                    CALL US NOW
                  </Link>
                </div>
              </div>
              
              {/* Right Image */}
              <div className="lg:w-1/2">
                <div className="relative h-full min-h-[500px]">
                  <Image
                    src="/images/logos/youtube_logo.jpg"
                    alt="Professional automotive service booking"
                    fill
                    className="rounded-2xl shadow-2xl border border-gray-800 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  
                  {/* Service Hours Overlay */}
                  <div className="absolute top-6 left-6 bg-red-600 p-4 rounded-xl shadow-lg">
                    <p className="text-white text-xs font-bold font-orbitron uppercase mb-1">OPEN TODAY</p>
                    <p className="text-white text-sm font-rajdhani">Mon-Fri: 8AM-6PM</p>
                    <p className="text-white text-sm font-rajdhani">Sat: 8AM-4PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <TestimonialsCarousel limit={6} autoplaySpeed={6000} />



    </main>
  );
}
