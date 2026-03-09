import ServiceEstimatorComponent from '@/components/reuseableComponents/ServicesEstimator/ServiceEstimator';
import ServiceVideoPlayer from '@/components/ServiceVideoPlayer';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicingPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-gray-900">
        <Image
          src="/images/services/serviceimage5.jpg"
          alt="Car Servicing"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        {/* Service Badge */}
        <div className="absolute top-8 left-8 md:left-16 z-20">
          <span className="bg-orange-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider font-rajdhani">
            CAR SERVICING
          </span>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-orbitron uppercase tracking-wider leading-tight bg-black/50 p-4 rounded">
              CAR SERVICING
            </h1>
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-gray-200 mb-8 font-rajdhani leading-relaxed">
                Comprehensive car servicing to keep your vehicle running at its best. Our expert technicians follow <span className="text-white font-bold">manufacturer service schedules</span> to maintain performance, reliability, and warranty compliance.
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
                PROFESSIONAL CAR SERVICING
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-orbitron uppercase leading-tight">
              Car Servicing in Huntingdon – Keep Your Vehicle in Peak Condition
            </h2>
            <div className="max-w-4xl">
              <p className="text-base text-gray-300 mb-6 font-rajdhani leading-relaxed">
                Regular servicing is essential to maintain your vehicle's performance, safety, and reliability. It helps prevent breakdowns, extends engine life, and maintains <span className="text-white font-semibold">optimal fuel efficiency</span>.
              </p>
              <p className="text-base text-gray-300 font-rajdhani leading-relaxed">
                At <span className="text-white font-semibold">The Car Edition</span>, we provide full and interim services for all makes and models. Our services follow manufacturer specifications and use quality parts to keep your vehicle running smoothly.
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
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Full Service</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Comprehensive annual service including all fluids, filters, and full vehicle inspection</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Interim Service</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Mid-year service for high-mileage vehicles with essential checks and oil change</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Major Service</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Extended service for vehicles due major maintenance including timing belt and spark plugs</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Oil & Filter Change</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Quick oil and filter service using quality oils to manufacturer specifications</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Brake Fluid Change</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Brake fluid replacement to maintain braking performance and safety</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Coolant Service</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Coolant system flush and refill to prevent overheating and corrosion</p>
              </div>
            </div>
            <p className="text-gray-300 mt-8 font-rajdhani text-sm">
              All services include a comprehensive health check and detailed report of your vehicle's condition.
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
                  <span className="text-white font-semibold font-rajdhani text-sm">Manufacturer Standards</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Services follow manufacturer schedules and specifications</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Quality Parts</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Genuine or OEM equivalent parts for reliable performance</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Warranty Safe</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Our services maintain your manufacturer warranty</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Transparent Pricing</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Clear, competitive pricing with no hidden costs</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Service History</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Full digital service records to maintain vehicle value</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 font-rajdhani text-sm leading-relaxed">
              Regular servicing is an investment in your vehicle's longevity and helps avoid costly repairs down the road.
            </p>
          </div>

          {/* Warning Signs Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-orbitron uppercase">
              What's Included in Our Services
            </h3>
            <p className="text-gray-300 mb-6 font-rajdhani text-sm">Our comprehensive service includes:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Engine oil and filter replacement</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Air filter and cabin filter check/replacement</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Brake system inspection and fluid check</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Suspension and steering check</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Tyre condition and pressure check</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Battery health test</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Lights and electrical systems check</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Coolant and washer fluid top-up</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Exhaust system inspection</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Full vehicle health report</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 font-rajdhani text-sm">
              We'll advise you of any additional work needed and provide transparent quotes before proceeding.
            </p>
          </div>

          {/* Video Section */}
          <ServiceVideoPlayer 
            videoId="C-B_lxS6XkQ" 
            title="Watch: Car Servicing Process"
          />

          {/* Service Estimator */}
          <div className="mb-20 bg-gray-900 p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 text-center font-orbitron uppercase">
              Get Your Service Quote
            </h3>
            <ServiceEstimatorComponent />
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-orbitron uppercase">
              Book Your Service Today
            </h3>
            <p className="text-base text-gray-300 mb-6 font-rajdhani max-w-2xl mx-auto">
              Keep your vehicle running smoothly with regular servicing. Book your appointment today for expert care.
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
