import ServiceEstimatorComponent from '@/components/reuseableComponents/ServicesEstimator/ServiceEstimator';
import Image from 'next/image';
import Link from 'next/link';

export default function TyresAndPuncturePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-gray-900">
        <Image
          src="/images/tyres-and-puncture.jpeg"
          alt="Tyres and Puncture Repair Service"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        {/* Service Badge */}
        <div className="absolute top-8 left-8 md:left-16 z-20">
          <span className="bg-orange-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider font-rajdhani">
            TYRE SERVICES
          </span>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-orbitron uppercase tracking-wider leading-tight bg-black/50 p-4 rounded">
              TYRES & PUNCTURE REPAIR
            </h1>
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-gray-200 mb-8 font-rajdhani leading-relaxed">
                Professional tyre fitting and puncture repair services to keep you safe on the road. Our expert technicians use <span className="text-white font-bold">premium quality tyres</span> and professional repair techniques for reliable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-8">
          {/* Section Header */}
          <div className="mb-16">
            <div className="border-l-4 border-orange-600 pl-6 mb-8">
              <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                PROFESSIONAL TYRE AND PUNCTURE SERVICES
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-orbitron uppercase leading-tight">
              Tyre Services in Huntingdon – Safety Starts with Your Tyres
            </h2>
            <div className="max-w-4xl">
              <p className="text-base text-gray-300 mb-6 font-rajdhani leading-relaxed">
                Your tyres are the only contact point between your vehicle and the road. Worn, damaged, or incorrectly fitted tyres can compromise your safety, fuel efficiency, and vehicle performance. Don't take risks with <span className="text-white font-semibold">substandard tyres</span> or poor repairs.
              </p>
              <p className="text-base text-gray-300 font-rajdhani leading-relaxed">
                At <span className="text-white font-semibold">The Car Edition</span>, we provide comprehensive tyre services including new tyre fitting, puncture repairs, wheel balancing, and tyre pressure monitoring. We stock premium brands and offer competitive prices.
              </p>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 font-orbitron uppercase">
              What We Offer
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">New Tyre Fitting</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Professional tyre fitting service with premium brands and competitive prices</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Puncture Repairs</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Fast and reliable puncture repairs to get you back on the road quickly</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Wheel Balancing</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Precision wheel balancing to eliminate vibrations and extend tyre life</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Wheel Alignment</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Professional wheel alignment to prevent uneven tyre wear</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Tyre Pressure Monitoring</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">TPMS system service and sensor replacement for optimal safety</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Emergency Callout</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Mobile tyre fitting service for roadside emergencies</p>
              </div>
            </div>
            <p className="text-gray-300 mt-8 font-rajdhani text-sm">
              From budget tyres to premium brands, we have the right solution for your vehicle and driving needs.
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 font-orbitron uppercase">
              Why Choose The Car Edition?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Premium Brands</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - We stock leading tyre brands for all budgets and requirements</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Expert Fitting</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Professional installation with proper balancing and alignment</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Competitive Prices</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Great value tyres with price matching available</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Fast Service</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Quick fitting and repair services to minimize disruption</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Warranty Coverage</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Comprehensive warranty on all tyres and fitting services</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 font-rajdhani text-sm leading-relaxed">
              We understand that tyres are a significant investment. That's why we provide honest advice to help you choose the right tyres for your needs and budget.
            </p>
          </div>

          {/* Warning Signs Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-orbitron uppercase">
              Signs You Need New Tyres
            </h3>
            <p className="text-gray-300 mb-6 font-rajdhani text-sm">Replace your tyres if you notice:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Tread depth below 1.6mm (legal minimum)</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Uneven wear patterns across the tyre</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Cracks, cuts, or bulges in the sidewall</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Vibration while driving</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Frequent punctures or air loss</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Age over 6 years (regardless of tread)</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Poor grip in wet conditions</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Increased road noise</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 font-rajdhani text-sm">
              Driving on worn or damaged tyres is dangerous and illegal. Book a tyre check today to ensure your safety on the road.
            </p>
          </div>

          {/* Service Estimator */}
          <div className="mb-20 bg-gray-900 p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 text-center font-orbitron uppercase">
              Get Your Tyre Service Quote
            </h3>
            <ServiceEstimatorComponent />
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-orbitron uppercase">
              Book Your Tyre Service Today
            </h3>
            <p className="text-base text-gray-300 mb-6 font-rajdhani max-w-2xl mx-auto">
              Don't compromise on tyre safety. Whether you need new tyres, puncture repairs, or wheel alignment, we're here to help.
            </p>
            <p className="text-sm text-white mb-8 font-rajdhani font-semibold">
              Same-day appointments available - call now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact-us" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 font-bold transition-colors duration-300 font-rajdhani uppercase tracking-wide"
              >
                Book Service
              </Link>
              <Link 
                href="tel:01480123456" 
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 font-bold transition-colors duration-300 font-rajdhani uppercase tracking-wide"
              >
                Call Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
