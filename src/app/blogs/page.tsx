'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaEye, FaArrowRight, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface BlogPost {
  _id: string;
  title: string;
  createdAt: string;
  content: string;
  imageUrl: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<BlogPost[]>("/api/blogs");
        setBlogs(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const openBlogDialog = (blog: BlogPost) => {
    router.push(`/blogs/${blog._id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-16 flex flex-col justify-center items-center">
        <p className="text-xl text-gray-400 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center gap-2"
        >
          Try Again
          <FaArrowRight className="text-sm" />
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
              <div className="border-l-4 border-orange-600 pl-6 mb-8 inline-block">
                <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  AUTOMOTIVE INSIGHTS
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                EXPLORING THE ROAD TO <span className="text-orange-600">AUTOMOTIVE EXCELLENCE</span>
              </h1>
              <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
                Uncover the Latest Tips, Trends, and Tales in the World of Cars
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Blog Grid Section */}
      <section className="relative w-full py-16 bg-black" style={{backgroundImage: 'url(/images/logos/background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="w-full px-6 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                FEATURED <span className="text-orange-600">ARTICLES</span>
              </h2>
            </motion.div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.article 
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/40 border border-gray-600 rounded-xl overflow-hidden backdrop-blur-sm hover:border-orange-600 transition-all duration-300 group cursor-pointer"
                  onClick={() => openBlogDialog(blog)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center text-xs text-orange-400 mb-3 font-rajdhani">
                      <FaCalendarAlt className="mr-2" />
                      <span>{formatDate(blog.createdAt)}</span>
                      <span className="mx-2">•</span>
                      <FaClock className="mr-2" />
                      <span>5 min read</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-orange-400 transition-colors duration-300 font-orbitron uppercase tracking-wide line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <div 
                      className="text-gray-300 text-sm mb-3 font-rajdhani line-clamp-2" 
                      dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) + '...' }} 
                    />
                    
                    <div className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-400 text-sm font-orbitron font-semibold uppercase tracking-wide transition-colors duration-300">
                      READ MORE
                      <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}