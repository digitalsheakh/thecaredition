'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaPhone, FaEnvelope, FaArrowLeft, FaChevronLeft, FaChevronRight, FaShoppingCart, FaCalendarAlt, FaShieldAlt, FaTruck, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

interface ProductDetails {
  _id: string;
  title: string;
  createdAt: string;
  content: string;
  imageUrls: string[];
  price?: number;
  rating?: number;
  productNumber?: string;
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ProductDetails>(`/api/shops/${params.id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex(prev => 
        prev === product.imageUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex(prev => 
        prev === 0 ? product.imageUrls.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f56e13]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-16 flex flex-col justify-center items-center">
        <p className="text-xl text-gray-400 mb-6">{error || 'Product not found'}</p>
        <Link 
          href="/shop"
          className="bg-[#f56e13] hover:bg-[#d45711] text-white px-8 py-3 rounded-md font-medium transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1"
        >
          <FaArrowLeft className="text-sm" /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Breadcrumb */}
      <div className="w-full px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-sm font-rajdhani">
            <Link 
              href="/"
              className="text-gray-400 hover:text-red-600 transition-colors duration-300"
            >
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link 
              href="/shop"
              className="text-gray-400 hover:text-red-600 transition-colors duration-300"
            >
              Inventory
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-red-600 font-semibold">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
              <Image
                src={product.imageUrls[currentImageIndex]}
                alt={product.title}
                fill
                className="object-cover"
              />
              
              {product.imageUrls.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <FaChevronLeft className="text-xl" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <FaChevronRight className="text-xl" />
                  </button>
                </>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Thumbnail Navigation */}
            {product.imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.imageUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'ring-2 ring-[#f56e13] ring-offset-2 ring-offset-black' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${product.title} - View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Vehicle Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title and Basic Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 uppercase font-orbitron tracking-wider leading-tight text-white">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-400 font-rajdhani mb-6">
                <span>2020</span>
                <span>•</span>
                <span>31,000 miles</span>
                <span>•</span>
                <span>Coupe</span>
                <span>•</span>
                <span>Petrol</span>
              </div>
              
              {product.price && (
                <div className="mb-6">
                  <span className="text-4xl md:text-5xl font-bold text-white font-orbitron">
                    {formatPrice(product.price)}
                  </span>
                  <button className="ml-4 text-gray-400 hover:text-red-600 transition-colors">
                    <FaStar className="inline mr-2" />
                    Add to favorites
                  </button>
                </div>
              )}
            </div>

            {/* Vehicle Specifications */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-rajdhani">Make:</span>
                    <span className="text-white font-rajdhani">Mercedes-Benz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-rajdhani">Model:</span>
                    <span className="text-white font-rajdhani">AMG C 63 S PREMIUM AUTO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-rajdhani">Color:</span>
                    <span className="text-white font-rajdhani">Black</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-rajdhani">Drive Type:</span>
                    <span className="text-white font-rajdhani">AWD/4WD</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-rajdhani">Transmission:</span>
                    <span className="text-white font-rajdhani">Automatic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-rajdhani">Condition:</span>
                    <span className="text-white font-rajdhani">Used</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-rajdhani">Year:</span>
                    <span className="text-white font-rajdhani">2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-rajdhani">Mileage:</span>
                    <span className="text-white font-rajdhani">31,000 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-rajdhani">Fuel Type:</span>
                    <span className="text-white font-rajdhani">Petrol</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-all duration-300 font-rajdhani border border-gray-600">
                <FaPhone className="inline mr-2" />
                441 *** *** - reveal
              </button>
              <button className="w-full bg-black hover:bg-gray-900 text-white p-4 rounded-lg transition-all duration-300 font-orbitron font-bold border border-gray-600">
                Send message
              </button>
            </div>

            {/* Vehicle Description */}
            <div className="bg-black/40 border border-gray-600 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 font-orbitron uppercase tracking-wider">VEHICLE <span className="text-red-600">DETAILS</span></h2>
              <div 
                className="prose prose-invert max-w-none prose-headings:text-red-600 prose-a:text-red-600 prose-strong:text-white prose-p:text-gray-300 prose-li:text-gray-300 font-rajdhani"
                dangerouslySetInnerHTML={{ __html: product.content }}
              />
            </div>
          </motion.div>
          </div>
          
          {/* Full Width Description Section */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-6 font-orbitron uppercase tracking-wider text-white">
                DESCRIPTION
              </h2>
              
              <div className="space-y-4 text-gray-300 font-rajdhani">
                <div>
                  <h3 className="font-bold text-white mb-2">Key Features:</h3>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Model:</strong> Mercedes-Benz AMG C 63 S Premium+ Auto Coupe</li>
                    <li>• <strong>Year:</strong> 2020</li>
                    <li>• <strong>Engine:</strong> 3982 cc V8 Biturbo (ULEZ Compliant)</li>
                    <li>• <strong>Transmission:</strong> 9-Speed Automatic</li>
                    <li>• <strong>Mileage:</strong> 31,000 miles</li>
                    <li>• <strong>Exterior:</strong> Sleek Black finish with AMG styling</li>
                    <li>• <strong>Interior:</strong> Premium+ trim with luxurious and sporty accents</li>
                    <li>• <strong>Body Type:</strong> Coupe</li>
                    <li>• <strong>Full Service History:</strong> highlighting exceptional care and maintenance</li>
                    <li>• <strong>Warranty:</strong> 3 Months (Extendable to 24 Months)</li>
                    <li>• <strong>Finance Options Available</strong></li>
                    <li>• <strong>Price:</strong> £47,995</li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <p><strong>Location:</strong> Visit us at Unit 4 St Margarets Way, Stukeley Meadows Industrial...</p>
                  <button className="text-red-600 hover:text-red-400 transition-colors mt-2">
                    Show more
                  </button>
                </div>
              </div>
            </div>
            
            {/* Loan Calculator */}
            <div>
              <h2 className="text-2xl font-bold mb-6 font-orbitron uppercase tracking-wider text-white">
                LOAN <span className="text-red-600">CALCULATOR</span>
              </h2>
              
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <p className="text-gray-300 font-rajdhani mb-6 leading-relaxed">
                  Use our loan calculator to calculate payments over the life of your loan. Enter your information to see how much your monthly payments could be. You can adjust length of loan, down payment and interest rate to see how those changes raise or lower your payments.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-400 font-rajdhani mb-2">Price *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">£</span>
                      <input type="text" value="47,995" className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 font-rajdhani mb-2">Interest Rate *</label>
                    <div className="relative">
                      <input type="text" value="6" className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600" />
                      <span className="absolute right-3 top-3 text-gray-400">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 font-rajdhani mb-2">Period (months) *</label>
                    <input type="text" value="36" className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600" />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-rajdhani mb-2">Down Payment</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">£</span>
                      <input type="text" value="4,800" className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/40 border border-gray-600 rounded-xl p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <h3 className="text-gray-400 font-rajdhani mb-2">Monthly Payment</h3>
                      <p className="text-2xl font-bold text-white font-orbitron">£1,314.08</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 font-rajdhani mb-2">Total Interest</h3>
                      <p className="text-2xl font-bold text-white font-orbitron">£4,111.72</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 font-rajdhani mb-2">Total Payments</h3>
                      <p className="text-2xl font-bold text-white font-orbitron">£52,106.72</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 font-rajdhani mt-4 leading-relaxed">
                  Title and other fees and incentives are not included in this calculation, which is an estimate only. Monthly payment estimates are for informational purpose and do not represent a financing offer from the seller of this vehicle. Other taxes may apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 