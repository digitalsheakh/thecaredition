'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { HiMenu } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isTrendingServicesOpen, setIsTrendingServicesOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Prevent transition flash on initial mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll event for header background change and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileMenuOpen]);
  
  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isMobileMenuOpen) return;
      
      const target = event.target as HTMLElement;
      const isMenuButton = menuButtonRef.current?.contains(target);
      const isInsideMenu = mobileMenuRef.current?.contains(target);
      
      if (!isMenuButton && !isInsideMenu) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);
  
  // Close menu on window resize (if desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);
  
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsTrendingServicesOpen(false);
  }, []);

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleTrendingServices = () => {
    setIsTrendingServicesOpen(!isTrendingServicesOpen);
  };

  if(pathname.includes("/dashboard") || pathname.includes("/signin") || pathname.includes("/signup")) {
    return null;
  }

  // Services dropdown items - only our created service pages
  const servicesDropdownItems = [
    { href: "/services/timing-chains", text: "Timing Chains & Belts" },
    { href: "/services/mechanical-repair", text: "Mechanical Repairs" },
    { href: "/services/turbos", text: "Turbos" },
    { href: "/services/brakes-and-pads", text: "Brakes & Pads" },
    { href: "/services/diagnostics", text: "Diagnostics" },
  ];

  // Trending Services dropdown items
  const trendingServicesItems = [
    { href: "/services/ford-wet-belt-replacement", text: "Ford Wet Belt Replacement" },
    { href: "/services/performance-ecu-tuning", text: "Performance & ECU Tuning" },
    { href: "/services/car-key-immobiliser", text: "Car Key & Immobiliser" },
    { href: "/services/full-service", text: "Full Service" },
    { href: "/services/gearbox-servicing", text: "Gearbox Servicing" },
  ];

  // Organized nav items with priority grouping
  const primaryNavItems = [
    { href: "/services", text: "Services", priority: "high", hasDropdown: true },
    { href: "https://thecaredition.shop/", text: "Shop", priority: "high", external: true },
  ];
  
  const secondaryNavItems = [
    { href: "/videos", text: "YouTube & Media", isYoutube: true, priority: "medium" },
    { href: "/blogs", text: "Blog & Articles", priority: "medium" },
  ];
  
  const actionNavItems = [
    { href: "/about-us", text: "About Us", priority: "low" },
    { href: "/contact-us", text: "Contact Us", priority: "high" },
  ];

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-black shadow-lg text-white ${
        isMounted ? 'transition-all duration-300' : ''
      } ${
        isHeaderVisible || isMobileMenuOpen
          ? 'translate-y-0' 
          : '-translate-y-full'
      }`}
    >
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center group mr-6 transition-transform duration-300 hover:scale-105">
            <div className="relative flex items-center">
              <Image 
                src="/images/logos/the_car_edition_logo.png" 
                alt="The Car Edition Logo" 
                width={110} 
                height={37} 
                className="w-24 h-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center gap-1"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {/* Primary Navigation Group */}
            <div className="flex items-center gap-1">
              {primaryNavItems.map((item) => (
                <div key={item.href} className="relative group">
                  {item.external ? (
                    <a 
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative font-bold text-white px-3 py-4 font-orbitron text-sm tracking-wide uppercase hover:text-orange-500 flex items-center gap-1"
                    >
                      <span>{item.text}</span>
                    </a>
                  ) : (
                    <Link 
                      href={item.href}
                      className="relative font-bold text-white px-3 py-4 font-orbitron text-sm tracking-wide uppercase hover:text-orange-500 flex items-center gap-1"
                      onMouseEnter={() => setHoveredNav(item.href)}
                    >
                      <span>{item.text}</span>
                      {item.hasDropdown && <span className="text-xs">▼</span>}
                    </Link>
                  )}
                  
                  {/* Services Dropdown */}
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-0 w-64 bg-black border border-orange-500/30 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                      <div className="py-3">
                        {/* Trending Service with Nested Dropdown - Moved to Top */}
                        <div className="relative group/trending">
                          <div className="px-4 py-2 text-white hover:text-orange-400 hover:bg-orange-900/20 transition-colors font-rajdhani text-sm cursor-pointer flex items-center justify-between">
                            <span>Trending Service</span>
                            <span className="text-xs">▶</span>
                          </div>
                          
                          {/* Nested Dropdown - appears to the right at same vertical level */}
                          <div className="absolute left-full top-[-12px] ml-0 w-64 bg-black border border-orange-500/30 rounded-lg shadow-2xl opacity-0 invisible group-hover/trending:opacity-100 group-hover/trending:visible transition-all duration-300 z-[60] pointer-events-none group-hover/trending:pointer-events-auto">
                            <div className="py-3">
                              {trendingServicesItems.map((trendingService) => (
                                <Link
                                  key={trendingService.href}
                                  href={trendingService.href}
                                  className="block px-4 py-2 text-white hover:text-orange-400 hover:bg-orange-900/20 transition-colors font-rajdhani text-sm"
                                >
                                  {trendingService.text}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {servicesDropdownItems.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block px-4 py-2 text-white hover:text-orange-400 hover:bg-orange-900/20 transition-colors font-rajdhani text-sm"
                          >
                            {service.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Secondary Navigation Group */}
            <div className="flex items-center gap-1">
              {secondaryNavItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="relative font-bold text-white px-3 py-4 font-orbitron text-sm tracking-wide uppercase hover:text-orange-500 whitespace-nowrap"
                >
                  {item.text}
                </Link>
              ))}
            </div>
            
            {/* Action Navigation Group */}
            <div className="flex items-center gap-1">
              {actionNavItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="relative font-bold text-white px-3 py-4 font-orbitron text-sm tracking-wide uppercase hover:text-orange-500 whitespace-nowrap"
                >
                  {item.text}
                </Link>
              ))}
            </div>
            
          </nav>

          {/* Get Quote Button and Phone Number */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              href="/service-estimator" 
              className="flex items-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-orbitron text-sm font-bold transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              GET QUOTE
            </Link>
            <a 
              href="tel:01480759004" 
              className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-orbitron text-sm font-bold transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              01480 759004
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            className="lg:hidden p-2 focus:outline-none rounded-md z-[101] relative"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <IoMdClose className="w-7 h-7 text-white" />
            ) : (
              <HiMenu className="w-7 h-7 text-white hover:text-orange-500" />
            )}
          </button>
        </div>
      </div>
      {/* Banner under header */}
      <div className='flex justify-center items-center h-12 bg-white shadow-lg'>
        <p className='text-black text-xs md:text-sm font-semibold font-orbitron tracking-wide uppercase px-4 text-center'>FLEET SERVICE DISCOUNT AVAILABLE</p>
      </div>
      {/* Mobile Navigation - Full Screen */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-0 z-[100] bg-black transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full hidden'
        }`}
        aria-hidden={!isMobileMenuOpen}
        style={{ visibility: isMobileMenuOpen ? 'visible' : 'hidden' }}
      >
          {/* Mobile Logo - Left Aligned */}
          <div className="flex items-center justify-start p-6 border-b border-gray-800">
            <Link href="/" className="group" onClick={closeMobileMenu}>
              <Image 
                src="/images/logos/the_car_edition_logo.png" 
                alt="The Car Edition Logo" 
                width={120} 
                height={40} 
                className="transition-transform group-hover:scale-105"
                priority
              />
            </Link>
          </div>
          
          <nav className="flex flex-col flex-1 bg-black">
            {/* Services with Click Dropdown */}
            <div className="border-b border-gray-800">
              <button
                onClick={toggleServices}
                className="w-full px-6 py-4 text-white text-base font-orbitron uppercase tracking-wider flex items-center justify-between hover:bg-gray-800 transition-colors"
              >
                SERVICES
                <span className={`text-sm transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`bg-gray-900 overflow-hidden transition-all duration-300 ${
                isServicesOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {/* Trending Service Nested Dropdown - Moved to Top */}
                <div className="border-b border-gray-700">
                  <button
                    onClick={toggleTrendingServices}
                    className="w-full px-8 py-3 text-gray-300 text-sm font-rajdhani hover:text-white hover:bg-gray-700 transition-colors flex items-center justify-between"
                  >
                    <span>Trending Service</span>
                    <span className={`text-xs transition-transform duration-200 ${isTrendingServicesOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  <div className={`bg-gray-800 overflow-hidden transition-all duration-300 ${
                    isTrendingServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {trendingServicesItems.map((trendingService) => (
                      <Link
                        key={trendingService.href}
                        href={trendingService.href}
                        className="block px-12 py-3 text-gray-400 text-sm font-rajdhani hover:text-white hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                        onClick={closeMobileMenu}
                      >
                        {trendingService.text}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {servicesDropdownItems.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="block px-8 py-3 text-gray-300 text-sm font-rajdhani hover:text-white hover:bg-gray-700 transition-colors border-b border-gray-700"
                    onClick={closeMobileMenu}
                  >
                    {service.text}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Shop */}
            <a 
              href="https://thecaredition.shop/" 
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-4 text-white text-base font-orbitron uppercase tracking-wider border-b border-gray-800 hover:bg-gray-800 transition-colors"
              onClick={closeMobileMenu}
            >
              SHOP
            </a>
            
            {/* YouTube & Media */}
            <Link 
              href="/videos" 
              className="block px-6 py-4 text-white text-base font-orbitron uppercase tracking-wider border-b border-gray-800 hover:bg-gray-800 transition-colors"
              onClick={closeMobileMenu}
            >
              YOUTUBE & MEDIA
            </Link>
            
            {/* Blog & Articles */}
            <Link 
              href="/blogs" 
              className="block px-6 py-4 text-white text-base font-orbitron uppercase tracking-wider border-b border-gray-800 hover:bg-gray-800 transition-colors"
              onClick={closeMobileMenu}
            >
              BLOG & ARTICLES
            </Link>
            
            {/* About Us */}
            <Link 
              href="/about-us" 
              className="block px-6 py-4 text-white text-base font-orbitron uppercase tracking-wider border-b border-gray-800 hover:bg-gray-800 transition-colors"
              onClick={closeMobileMenu}
            >
              ABOUT US
            </Link>
            
            {/* Get Quote and Contact Us Buttons */}
            <div className="mt-auto p-4 bg-gray-800">
              <Link 
                href="/service-estimator" 
                className="block bg-orange-600 hover:bg-orange-700 text-white text-center py-4 px-4 font-orbitron uppercase tracking-wider text-base transition-colors mb-3"
                onClick={closeMobileMenu}
              >
                GET QUOTE
              </Link>
              <Link 
                href="/contact-us" 
                className="block bg-gray-700 hover:bg-gray-600 text-white text-center py-4 px-4 font-orbitron uppercase tracking-wider text-base transition-colors mb-3"
                onClick={closeMobileMenu}
              >
                CONTACT US
              </Link>
            </div>
          </nav>
      </div>
    </header>
  );
}