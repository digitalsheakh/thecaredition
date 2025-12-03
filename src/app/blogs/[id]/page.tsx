import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import { Metadata } from 'next'
import axios from 'axios'

// Type definitions
export type Blog = {
  _id?: string;
  title: string;
  createdAt: string;
  imageUrl: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImageUrl?: string;
  description?: string;
  author?: string;
  tags?: string[];
  slug?: string;
}

interface BlogDetailsProps {
  params: { id: string }
}

// Utility functions
const stripHtml = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = stripHtml(content).split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Data fetching function
async function getBlogData(id: string): Promise<Blog | null> {
  try {
  
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}/api/blogs/${id}`);
    
    if (response.data && response.status === 200) {
   
      return response.data;
    }
    
    console.warn('Blog not found or invalid response');
    return null;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return null;
  }
}

// Metadata generation
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  try {
    const blog = await getBlogData(params.id);

    if (!blog) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found. Please check the URL and try again.',
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    // Generate description from content if not provided
    const description = blog.description || 
      truncateText(stripHtml(blog.content), 160) ||
      'Read this interesting blog post on our website.';
    
    // Format the published date
    const publishedTime = moment(blog.createdAt).toISOString();
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'My Blog';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

    return {
      title: `${blog.metaTitle || blog.title} | ${siteName}`,
      description: blog.metaDescription || description,

      // Open Graph metadata for social media sharing
      openGraph: {
        title: blog.title,
        description: description,
        type: 'article',
        publishedTime: publishedTime,
        authors: blog.author ? [blog.author] : undefined,
        images: [
          {
            url: blog.metaImageUrl || blog.imageUrl,
            width: 1200,
            height: 630,
            alt: blog.title,
          }
        ],
        siteName: siteName,
        url: `${siteUrl}/blog/${params.id}`,
      },

      // Twitter Card metadata
      twitter: {
        card: 'summary_large_image',
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || description,
        images: [blog.metaImageUrl || blog.imageUrl],
        creator: blog.author ? `@${blog.author.replace('@', '')}` : undefined,
        site: process.env.NEXT_PUBLIC_TWITTER_HANDLE || undefined,
      },

      // Additional metadata
      keywords: blog.tags?.length ? blog.tags.join(', ') : undefined,
      authors: blog.author ? [{ name: blog.author }] : undefined,
      
      // Structured data for search engines
      other: {
        'article:published_time': publishedTime,
        'article:author': blog.author || 'Anonymous',
        'article:section': 'Blog',
        'article:tag': blog.tags?.join(',') || '',
        'og:locale': 'en_US',
      },

      // Canonical URL
      alternates: {
        canonical: `${siteUrl}/blog/${params.id}`,
      },

      // Robots directive
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },

      // Additional SEO enhancements
      category: 'Blog',
      classification: 'Blog Post',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error Loading Blog Post',
      description: 'An error occurred while loading the blog post.',
    };
  }
}

// Main component
const BlogDetails = async ({ params }: BlogDetailsProps) => {
  const blog = await getBlogData(params.id);
  
  // Early return if no blog data
  if (!blog) {
    return (
      <div className="bg-[#1A1A1A] border border-white/10 text-white p-6 pt-40 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <p className="text-gray-400">The requested blog post could not be loaded.</p>
        </div>
      </div>
    );
  }

  const readTime = calculateReadTime(blog.content);
  const formattedDate = moment(blog.createdAt).format('MMMM D, YYYY');

  return (
    <article className="min-h-screen bg-black text-white">
      {/* Hero Section with Background */}
      <section className="relative pt-32 pb-16 bg-black" style={{backgroundImage: 'url(/images/logos/background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/80"></div>
        
        <div className="w-full px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <p className='text-gray-400 font-rajdhani text-sm'>
                <a href="/" className="hover:text-red-600 transition-colors">Home</a>
                <span className="mx-2">/</span>
                <a href="/blogs" className="hover:text-red-600 transition-colors">Blog</a>
                <span className="mx-2">/</span>
                <span className='text-red-600'>{blog.title}</span>
              </p>
            </nav>

            {/* Header Section */}
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight font-orbitron uppercase tracking-wider">
                {blog.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6 font-rajdhani">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-red-600" />
                  <time dateTime={blog.createdAt}>
                    {formattedDate}
                  </time>
                </div>
                
                <span className="text-gray-600">•</span>
                
                <div className="flex items-center">
                  <FaClock className="mr-2 text-red-600" />
                  <span>{readTime} min read</span>
                </div>

                {blog.author && (
                  <>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center">
                      <span>By {blog.author}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-red-600/20 text-red-400 text-xs font-rajdhani font-bold uppercase tracking-wider rounded border border-red-600/30 hover:bg-red-600/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="w-full px-6 -mt-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl border-4 border-gray-900">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="relative w-full py-16 bg-black" style={{backgroundImage: 'url(/images/logos/background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/80"></div>
        
        <div className="w-full px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Blog Description */}
            {blog.description && (
              <div className="mb-12 p-8 bg-gray-900/50 border border-red-600/30 rounded-xl backdrop-blur-sm">
                <p className="text-xl text-gray-200 italic leading-relaxed font-rajdhani">
                  {blog.description}
                </p>
              </div>
            )}

            {/* Blog Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none 
                         prose-headings:text-white prose-headings:font-orbitron prose-headings:uppercase prose-headings:tracking-wider prose-headings:font-bold
                         prose-h1:text-4xl prose-h2:text-3xl prose-h2:border-l-4 prose-h2:border-red-600 prose-h2:pl-4 prose-h2:py-2
                         prose-h3:text-2xl prose-h3:text-red-600
                         prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-rajdhani prose-p:text-lg
                         prose-strong:text-white prose-strong:font-semibold
                         prose-a:text-red-500 prose-a:underline hover:prose-a:text-red-400 prose-a:font-semibold prose-a:transition-colors
                         prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:bg-gray-900/50 prose-blockquote:p-6 prose-blockquote:rounded-lg prose-blockquote:italic
                         prose-code:text-red-400 prose-code:bg-gray-900/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono
                         prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg
                         prose-ul:text-gray-300 prose-ul:font-rajdhani prose-ol:text-gray-300 prose-ol:font-rajdhani
                         prose-li:text-gray-300 prose-li:marker:text-red-600 prose-li:font-rajdhani
                         prose-img:rounded-xl prose-img:shadow-2xl prose-img:border-4 prose-img:border-gray-800"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-400 font-rajdhani">
                  Published on <span className="text-red-600 font-semibold">{formattedDate}</span>
                  {blog.author && <span> by <span className="text-white font-semibold">{blog.author}</span></span>}
                </div>
                
                {/* Back to Blog Button */}
                <a 
                  href="/blogs"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-rajdhani font-bold uppercase tracking-wider transition-all duration-300"
                >
                  ← Back to Blog
                </a>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </article>
  );
};

export default BlogDetails;