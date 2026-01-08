'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JoinMembersClubPage() {
  const [formData, setFormData] = useState({
    name: '',
    registration: '',
    email: '',
    phone: '',
    mileage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        registration: '',
        email: '',
        phone: '',
        mileage: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        <div className="relative z-10 container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="border-l-4 border-red-600 pl-6 mb-8 inline-block">
              <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                EXCLUSIVE MEMBERSHIP
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-orbitron uppercase tracking-wider leading-tight">
              JOIN OUR MEMBERS CLUB
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-rajdhani leading-relaxed max-w-2xl mx-auto">
              Claim <span className="text-red-600 font-bold">10% off your first service</span> and get a chance to be featured on our platform. Join today and become part of The Car Edition family!
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-8">
          <div className="max-w-3xl mx-auto">
            {/* Benefits */}
            <div className="mb-12 bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6 font-orbitron uppercase">
                Membership Benefits
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-semibold font-rajdhani text-sm">10% Off First Service</span>
                    <span className="text-gray-300 font-rajdhani text-sm"> - Save money on your first visit</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-semibold font-rajdhani text-sm">Featured Member</span>
                    <span className="text-gray-300 font-rajdhani text-sm"> - Chance to be featured on our website and social media</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-semibold font-rajdhani text-sm">Priority Booking</span>
                    <span className="text-gray-300 font-rajdhani text-sm"> - Get priority access to appointment slots</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-semibold font-rajdhani text-sm">Exclusive Updates</span>
                    <span className="text-gray-300 font-rajdhani text-sm"> - Receive special offers and news</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6 font-orbitron uppercase">
                Join Now
              </h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-600 rounded-lg">
                  <p className="text-green-400 font-rajdhani">
                    Thank you for joining! We'll be in touch soon with your membership details and discount code.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-600 rounded-lg">
                  <p className="text-red-400 font-rajdhani">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-rajdhani font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-rajdhani focus:outline-none focus:border-red-600 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="registration" className="block text-white font-rajdhani font-semibold mb-2">
                    Vehicle Registration *
                  </label>
                  <input
                    type="text"
                    id="registration"
                    name="registration"
                    value={formData.registration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-rajdhani focus:outline-none focus:border-red-600 transition-colors uppercase"
                    placeholder="e.g., AB12 CDE"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-rajdhani font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-rajdhani focus:outline-none focus:border-red-600 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-rajdhani font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-rajdhani focus:outline-none focus:border-red-600 transition-colors"
                    placeholder="07XXX XXXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="mileage" className="block text-white font-rajdhani font-semibold mb-2">
                    Approximate Mileage *
                  </label>
                  <input
                    type="text"
                    id="mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-rajdhani focus:outline-none focus:border-red-600 transition-colors"
                    placeholder="e.g., 50,000 miles"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'JOIN MEMBERS CLUB'}
                  </button>
                </div>

                <p className="text-gray-400 text-sm font-rajdhani text-center">
                  By joining, you agree to receive updates and offers from The Car Edition. You can unsubscribe at any time.
                </p>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <p className="text-gray-300 font-rajdhani mb-4">
                Already a member? <Link href="/contact-us" className="text-red-600 hover:text-red-500 font-semibold">Contact us</Link> for assistance.
              </p>
              <Link 
                href="/" 
                className="inline-block text-white hover:text-red-600 font-rajdhani font-semibold transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
