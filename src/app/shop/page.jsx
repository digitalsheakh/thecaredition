'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaCalendarAlt, FaStar, FaPhone, FaEnvelope, FaArrowRight, FaChevronLeft, FaChevronRight, FaTools, FaCar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function ShopPage() {
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const response = await axios.get("/api/shops");
        setShopItems(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching shop items:', err);
        setError('Failed to load shop items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchShopItems();
  }, []);

  const openItemDialog = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex(prev => 
        prev === selectedItem.imageUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedItem.imageUrls.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-16 flex flex-col justify-center items-center">
        <p className="text-xl text-gray-400 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#f56e13] hover:bg-[#d45711] text-white px-8 py-3 rounded-md font-medium transition-all duration-300 uppercase italic flex items-center gap-2"
        >
          Try Again <FaArrowRight className="text-sm" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Hero Section */}
      <section className="relative py-20 bg-black" style={{backgroundImage: 'url(/images/logos/background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/80"></div>
        
        <div className="w-full px-6 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                CAR <span className="text-red-600">INVENTORY</span>
              </h1>
              <p className="text-lg text-gray-300 font-rajdhani max-w-2xl mx-auto leading-relaxed mb-8">
                Browse our current vehicle inventory.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#cars" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg shadow-lg">
                  VIEW CARS
                </Link>
                <Link href="/contact-us" className="inline-flex items-center border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg">
                  CONTACT US
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="w-full py-8 bg-gray-900">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <select className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 font-rajdhani text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                <option>Make</option>
                <option>Mercedes-Benz</option>
                <option>BMW</option>
                <option>Audi</option>
                <option>Jaguar</option>
              </select>
              <select className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 font-rajdhani text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                <option>Model</option>
                <option>C-Class</option>
                <option>E-Class</option>
                <option>S-Class</option>
              </select>
              <select className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 font-rajdhani text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                <option>Type</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Coupe</option>
              </select>
              <input type="text" placeholder="Min Price" className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 font-rajdhani text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600" />
              <input type="text" placeholder="Max Price" className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 font-rajdhani text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-300 font-rajdhani hover:text-red-600 transition-colors">
                  <span>Compare</span>
                </button>
                <input type="text" placeholder="Enter keyword" className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 font-rajdhani text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600" />
              </div>
              <button className="text-red-600 font-rajdhani hover:text-red-400 transition-colors">Clear all</button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="cars" className="w-full py-8 bg-black">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white font-orbitron uppercase tracking-wider">
                {shopItems.length} <span className="text-red-600">RESULTS</span>
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-gray-300 font-rajdhani">Sort by:</span>
                <select className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 font-rajdhani text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                  <option>Date Listed: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Mileage: Low to High</option>
                </select>
              </div>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopItems.map((item, index) => (
                <motion.article 
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black border border-gray-600 rounded-xl overflow-hidden hover:border-red-600 transition-all duration-300 group"
                >
                  <Link href={`/shop/${item._id}`} className="block">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.imageUrls[0]}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Photo count badge */}
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-rajdhani font-bold">
                        📷 {item.imageUrls?.length || 1}
                      </div>
                      
                      {/* Rating badge */}
                      {item.rating && (
                        <div className="absolute top-3 left-3 flex items-center bg-black text-yellow-400 px-2 py-1 rounded text-xs font-orbitron">
                          <FaStar className="mr-1" />
                          <span>{item.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2 font-orbitron uppercase tracking-wide group-hover:text-red-400 transition-colors">
                        {item.title} 
                      </h3>
                      
                      {item?.price && (
                        <div className="text-2xl font-bold text-white mb-2 font-orbitron">
                          {formatPrice(item.price)}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 font-rajdhani">
                        <div className="flex items-center gap-4">
                          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                            {new Date(item.createdAt).getFullYear()}
                          </span>
                          <span>31,000 miles</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="w-full py-16 bg-gray-900">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold font-orbitron">TCE</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white font-orbitron uppercase tracking-wider">The Car Edition Ltd</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-sm" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-300 font-rajdhani">5.0</span>
                      <span className="text-sm text-gray-400 font-rajdhani">Based on 15 reviews</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-rajdhani hover:bg-red-700 transition-colors">
                review us on Google
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black border border-gray-600 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm font-orbitron">NH</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-rajdhani">Nick Hunter</h4>
                    <span className="text-sm text-gray-400 font-rajdhani">2 years ago</span>
                  </div>
                  <div className="ml-auto">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-xs" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm font-rajdhani leading-relaxed">
                  I was looking for a particular car and saw one online whilst on holiday. I contacted Prince and paid a holding deposit so I could see the...
                </p>
              </div>
              
              <div className="bg-black border border-gray-600 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm font-orbitron">SB</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-rajdhani">Steven Bale</h4>
                    <span className="text-sm text-gray-400 font-rajdhani">2 years ago</span>
                  </div>
                  <div className="ml-auto">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-xs" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm font-rajdhani leading-relaxed">
                  They all ways looked after me, and now I own a brilliant car thanks to them.
                </p>
              </div>
              
              <div className="bg-black border border-gray-600 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm font-orbitron">RC</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-rajdhani">Rap Cloud</h4>
                    <span className="text-sm text-gray-400 font-rajdhani">2 years ago</span>
                  </div>
                  <div className="ml-auto">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-xs" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm font-rajdhani leading-relaxed">
                  Excellent service and quality cars. Highly recommend The Car Edition for anyone looking for their next vehicle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}