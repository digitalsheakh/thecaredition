'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    // Simulate form submission
    try {
      // In a real app, you would send this data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        privacy: false
      });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We provide a wide range of services including timing chains, engine rebuilds, turbo services, brakes & pads, diagnostics, and tyres & puncture repair."
    },
    {
      question: "Do you offer same-day service?",
      answer: "Yes, we offer same-day service for many of our repairs and maintenance services, subject to availability and the complexity of the work required."
    },
    {
      question: "Do you provide warranties on your work?",
      answer: "Absolutely! We provide warranties on all our work and parts to ensure you have complete peace of mind with our services."
    },
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment by calling us at 01480 759004, emailing info@thecaredition.co.uk, or using the contact form on this page."
    },
    {
      question: "What are your opening hours?",
      answer: "We're open Monday to Friday 9:00 AM - 6:00 PM, Saturday 10:00 AM - 4:00 PM, and closed on Sundays."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      {/* Hero section */}
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
                  GET IN TOUCH
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                CONTACT <span className="text-orange-600">US</span>
              </h1>
              <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
                Get in touch with our expert team for all your automotive needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Info */}
      <section className="w-full py-20 bg-black">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto bg-black border border-gray-700 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-6 font-orbitron tracking-wider uppercase">
                    GET IN <span className="text-orange-600">TOUCH</span>
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-orange-600 mb-2 font-orbitron uppercase">Address</h3>
                      <p className="text-gray-300 font-rajdhani leading-relaxed">
                        Unit 4-5 Cinch Storage,<br />
                        St Margarets Way,<br />
                        Huntingdon, PE29 6EB
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-orange-600 mb-2 font-orbitron uppercase">Phone</h3>
                      <a href="tel:01480759004" className="text-gray-300 hover:text-orange-400 transition-colors font-rajdhani text-lg">
                        01480 759004
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-orange-600 mb-2 font-orbitron uppercase">Email</h3>
                      <a href="mailto:info@thecaredition.co.uk" className="text-gray-300 hover:text-orange-400 transition-colors font-rajdhani text-lg">
                        info@thecaredition.co.uk
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-orange-600 mb-2 font-orbitron uppercase">Hours</h3>
                      <p className="text-gray-300 font-rajdhani leading-relaxed">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 1:00 PM<br />
                        Sunday: CLOSED
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-black/60 border border-gray-600 p-8 rounded-xl backdrop-blur-sm"
              >
              <h2 className="text-3xl font-bold mb-8 font-orbitron uppercase tracking-wider">Send Us a <span className="text-orange-600">Message</span></h2>
              
              {submitSuccess ? (
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-6 text-center">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-green-500 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-300">Thank you for contacting us. We'll get back to you as soon as possible.</p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Full Name <span className="text-orange-600">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">Phone Number <span className="text-orange-600">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="07123 456789"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-white mb-1">Service Required <span className="text-orange-600">*</span></label>
                    <input
                      type="text"
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      placeholder="e.g., Diagnostics, Timing Chain, ECU Remap"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your vehicle and the issue..."
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        checked={formData.privacy}
                        onChange={handleCheckbox}
                        required
                        className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-orange-600 text-orange-600"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="privacy" className="text-sm text-gray-300">
                        I accept the privacy policy
                      </label>
                    </div>
                  </div>
                  
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500 rounded-md p-3 text-red-500 text-sm">
                      {submitError}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </div>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 bg-black">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto bg-black border border-gray-700 rounded-2xl p-8 md:p-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                <span className="text-orange-600">FAQ</span>
              </h2>
            </motion.div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/40 border border-gray-600 rounded-xl overflow-hidden backdrop-blur-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-700/30 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-white font-orbitron">
                      {faq.question}
                    </h3>
                    <span className={`text-orange-600 text-xl transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 font-rajdhani leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="w-full py-20 bg-black">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto bg-black border border-gray-700 rounded-2xl p-8 md:p-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold mb-4 font-orbitron tracking-wider uppercase">
                FIND <span className="text-orange-600">US</span>
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden h-96 w-full border border-gray-600 bg-black"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.4380261289384!2d-0.20606312341485!3d52.34410947200145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4877dc6b9c923c75%3A0x7c6a8e0c3c1a9d0c!2sUnit%204%20St%20Margarets%20Way%2C%20Huntingdon%20PE29%206EB!5e0!3m2!1sen!2suk!4v1651234567890!5m2!1sen!2suk&style=feature:all%7Celement:geometry%7Ccolor:0x242f3e&style=feature:all%7Celement:labels.text.stroke%7Ccolor:0x242f3e&style=feature:all%7Celement:labels.text.fill%7Ccolor:0x746855&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
