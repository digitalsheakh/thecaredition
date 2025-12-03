'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      id: 'timing-chains',
      title: 'TIMING CHAINS',
      description: 'Professional timing chain replacement and repair services for optimal engine performance.',
      image: '/images/services/serviceimage1.jpg',
      category: 'ENGINE SERVICES'
    },
    {
      id: 'engine-rebuilds',
      title: 'ENGINE REBUILDS',
      description: 'Complete engine rebuild services to restore your vehicle\'s performance and reliability.',
      image: '/images/services/serviceimage2.jpg',
      category: 'ENGINE SERVICES'
    },
    {
      id: 'turbos',
      title: 'TURBOS',
      description: 'Professional turbo repair and replacement services for optimal turbocharged engine performance.',
      image: '/images/services/serviceimage3.jpg',
      category: 'PERFORMANCE'
    },
    {
      id: 'brakes-and-pads',
      title: 'BRAKES & PADS',
      description: 'Expert brake and pad replacement services to ensure your safety and optimal stopping power.',
      image: '/images/services/serviceimage4.jpg',
      category: 'SAFETY SYSTEMS'
    },
    {
      id: 'diagnostics',
      title: 'DIAGNOSTICS',
      description: 'Advanced diagnostic services to identify and resolve issues with precision and accuracy.',
      image: '/images/services/serviceimage5.jpg',
      category: 'DIAGNOSTICS'
    },
    {
      id: 'tyres-and-puncture',
      title: 'TYRES & PUNCTURE REPAIR',
      description: 'Professional tyre fitting and puncture repair services to keep you safe on the road.',
      image: '/images/tyres-and-puncture.jpeg',
      category: 'TYRES & WHEELS'
    },
    {
      id: 'transmission',
      title: 'TRANSMISSION REPAIR',
      description: 'Expert transmission repair and maintenance for automatic and manual gearboxes.',
      image: '/images/services/serviceimage1.jpg',
      category: 'TRANSMISSION'
    },
    {
      id: 'carbon-clean',
      title: 'CARBON CLEAN',
      description: 'Professional engine carbon cleaning to restore performance and efficiency.',
      image: '/images/services/serviceimage2.jpg',
      category: 'ENGINE SERVICES'
    },
    {
      id: 'electrical-repair',
      title: 'ELECTRICAL REPAIR',
      description: 'Expert automotive electrical diagnostics and repair for all vehicle systems.',
      image: '/images/services/serviceimage3.jpg',
      category: 'ELECTRICAL'
    },
    {
      id: 'interior-repair',
      title: 'INTERIOR REPAIR',
      description: 'Professional car interior repair and restoration services for leather, upholstery, and trim.',
      image: '/images/services/serviceimage4.jpg',
      category: 'INTERIOR'
    },
    {
      id: 'servicing',
      title: 'CAR SERVICING',
      description: 'Comprehensive car servicing to keep your vehicle running at its best.',
      image: '/images/services/serviceimage5.jpg',
      category: 'MAINTENANCE'
    },
    {
      id: 'customisation',
      title: 'CUSTOMISATION',
      description: 'Transform your vehicle with star lights, dash cams, and in-car entertainment systems.',
      image: '/images/services/serviceimage1.jpg',
      category: 'CUSTOMISATION'
    },
    {
      id: 'air-conditioning',
      title: 'AIR CONDITIONING',
      description: 'Professional air conditioning service and repair to keep you cool and comfortable.',
      image: '/images/services/serviceimage2.jpg',
      category: 'CLIMATE CONTROL'
    }
  ];

  const categories = [...new Set(services.map(service => service.category))];

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
              <div className="border-l-4 border-red-600 pl-6 mb-8 inline-block">
                <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  WHAT WE OFFER
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                OUR <span className="text-red-600">SERVICES</span>
              </h1>
              <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
                Professional automotive services with certified mechanics, quality parts, and exceptional customer care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative w-full py-16 bg-black" style={{backgroundImage: 'url(/images/logos/background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="w-full px-6 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden hover:border-red-600 transition-all duration-300 group cursor-pointer"
                  >
                    {/* Service Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold font-orbitron uppercase">
                        {service.category}
                      </div>
                    </div>
                    
                    {/* Service Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 font-orbitron tracking-wider uppercase">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 font-rajdhani leading-relaxed mb-4">
                        {service.description}
                      </p>
                      
                      <Link 
                        href={`/services/${service.id}`}
                        className="inline-flex items-center text-red-400 hover:text-red-300 font-orbitron font-semibold uppercase tracking-wide text-sm transition-colors duration-300"
                      >
                        LEARN MORE
                        <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 bg-gray-900">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="border-l-4 border-red-600 pl-6 mb-8 inline-block">
                <p className="text-red-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  GET STARTED TODAY
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                READY TO <span className="text-red-600">GET STARTED?</span>
              </h2>
              <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed mb-8">
                Contact us today to book your service or get a free quote for your vehicle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact-us" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg shadow-lg">
                  BOOK SERVICE
                </Link>
                <Link href="/service-estimator" className="inline-flex items-center border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg">
                  GET QUOTE
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
