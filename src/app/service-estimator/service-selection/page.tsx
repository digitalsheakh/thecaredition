'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { VehicleDetails } from '@/services/vehicleApi';
import { FaCar, FaWrench, FaArrowRight, FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaHome } from 'react-icons/fa';

export default function ServiceSelection() {
  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceDescription, setServiceDescription] = useState('');
  const [urgency, setUrgency] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Retrieve vehicle data from localStorage
  useEffect(() => {
    try {
      const storedVehicle = localStorage.getItem('selectedVehicle');
      if (storedVehicle) {
        setVehicle(JSON.parse(storedVehicle));
      } else {
        console.warn('No vehicle data found in localStorage');
        window.location.href = '/service-estimator';
      }
    } catch (error) {
      console.error('Error retrieving vehicle data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const formatRegistration = (reg: string) => {
    const clean = reg.replace(/\s+/g, '').toUpperCase();
    return clean.length > 4 
      ? `${clean.slice(0, 4)} ${clean.slice(4)}`
      : clean;
  };

  const handleSubmit = () => {
    if (serviceDescription.trim() && urgency && preferredDate && customerName.trim() && phoneNumber.trim() && email.trim()) {
      localStorage.setItem('serviceDetails', JSON.stringify({
        serviceDescription,
        urgency,
        preferredDate,
        additionalNotes,
        customerName,
        phoneNumber,
        email,
        vehicle
      }));
      setIsSubmitted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4 font-orbitron">No Vehicle Selected</h2>
          <button
            onClick={() => window.location.href = '/service-estimator'}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Success message after form submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white pt-32">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-2xl mx-auto px-6">
            <div className="mb-8">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron tracking-wider">
                QUOTE REQUEST <span className="text-green-500">SUBMITTED!</span>
              </h1>
              <p className="text-lg text-gray-300 font-rajdhani mb-6">
                Thank you, {customerName}! We've received your service request and will get back to you soon.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-white font-orbitron mb-4">What happens next?</h3>
              <div className="text-left space-y-3 font-rajdhani text-gray-300">
                <div className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>Our team will review your request within 24 hours</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>We'll contact you at {phoneNumber} or {email}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>You'll receive a personalized quote for your {vehicle.make}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>We'll schedule a convenient time for your service</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center">
                  <FaHome className="mr-3" />
                  GO TO HOME
                </span>
              </Link>
              <Link 
                href="/services"
                className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <span className="relative flex items-center">
                  <FaWrench className="mr-3" />
                  VIEW SERVICES
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Hero Section */}
      <section className="bg-black py-8 pt-32">
        <div className="text-center px-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 uppercase font-orbitron tracking-wider">
            TELL US ABOUT YOUR <span className="text-red-600">SERVICE NEEDS</span>
          </h1>
          <p className="text-gray-300 font-rajdhani max-w-2xl mx-auto">
            Just fill out this quick form and we'll get back to you with a personalized quote!
          </p>
        </div>
      </section>

      {/* Service Request Form */}
      <section className="w-full py-8 bg-black">
        <div className="w-full px-6 max-w-4xl mx-auto">

            {/* Vehicle Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="border-l-4 border-red-600 pl-6 mb-6 inline-block">
                <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  YOUR VEHICLE
                </p>
              </div>
              <div className="bg-black/40 border border-gray-600 rounded-xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center">
                    <FaCar className="text-red-600 mr-3" />
                    <div>
                      <p className="text-gray-400 text-sm font-rajdhani">Registration</p>
                      <p className="font-bold font-orbitron">{vehicle.registrationNumber}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-rajdhani">Make</p>
                    <p className="font-bold font-orbitron">{vehicle.make}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-rajdhani">Year</p>
                    <p className="font-bold font-orbitron">{vehicle.yearOfManufacture}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-rajdhani">Engine</p>
                    <p className="font-bold font-orbitron">{vehicle.engineCapacity ? `${vehicle.engineCapacity}cc` : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Service Request Form */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white font-orbitron mb-6">
                What can we help you with?
              </h2>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-white font-rajdhani mb-2">
                    <FaUser className="inline mr-2 text-red-600" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-rajdhani mb-2">
                    <FaPhone className="inline mr-2 text-red-600" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="07123 456789"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-rajdhani mb-2">
                    <FaEnvelope className="inline mr-2 text-red-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Service Description */}
              <div>
                <label className="block text-white font-rajdhani mb-2">
                  <FaWrench className="inline mr-2 text-red-600" />
                  What service do you need?
                </label>
                <textarea
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Tell us what's wrong with your car or what service you need (e.g., oil change, brake repair, strange noise, etc.)"
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 placeholder-gray-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Urgency */}
                <div>
                  <label className="block text-white font-rajdhani mb-2">
                    <FaClock className="inline mr-2 text-red-600" />
                    How urgent is it?
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    required
                  >
                    <option value="">Choose urgency</option>
                    <option value="emergency">Emergency - ASAP!</option>
                    <option value="urgent">Urgent - Within 24 hours</option>
                    <option value="soon">Soon - Within a week</option>
                    <option value="flexible">No rush - When convenient</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-white font-rajdhani mb-2">
                    <FaCalendarAlt className="inline mr-2 text-red-600" />
                    When would you like us to look at it?
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    required
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-white font-rajdhani mb-2">
                  Anything else we should know? (Optional)
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any other details that might help us give you a better quote..."
                  rows={2}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 placeholder-gray-400"
                />
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                onClick={handleSubmit}
                disabled={!serviceDescription.trim() || !urgency || !preferredDate || !customerName.trim() || !phoneNumber.trim() || !email.trim()}
                className={`group relative inline-flex items-center justify-center px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden ${
                  !serviceDescription.trim() || !urgency || !preferredDate || !customerName.trim() || !phoneNumber.trim() || !email.trim()
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center">
                  GET MY QUOTE
                  <FaArrowRight className="ml-3" />
                </span>
              </button>
            </div>
        </div>
      </section>
    </div>
  );
}