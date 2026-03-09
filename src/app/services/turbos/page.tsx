import ServiceEstimatorComponent from '@/components/reuseableComponents/ServicesEstimator/ServiceEstimator';
import Image from 'next/image';
import Link from 'next/link';

export default function TurbosPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-black">
        <Image
          src="/images/services/serviceimage3.jpg"
          alt="Turbocharger Service"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        {/* Service Badge */}
        <div className="absolute top-8 left-8 md:left-16 z-20">
          <span className="bg-orange-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider font-rajdhani">
            TURBO SERVICES
          </span>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-orbitron uppercase tracking-wider leading-tight bg-black/50 p-4 rounded">
              TURBOS
            </h1>
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-gray-200 mb-8 font-rajdhani leading-relaxed">
                Professional turbocharger repair and replacement services. Our expert technicians use <span className="text-white font-bold">specialized diagnostic equipment</span> to restore your turbo's performance and power delivery.
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
                EXPERT TURBOCHARGER REPAIR SERVICES
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-orbitron uppercase leading-tight">
              Turbocharger Services in Huntingdon – Restore Your Engine's Power
            </h2>
            <div className="max-w-4xl">
              <p className="text-base text-gray-300 mb-6 font-rajdhani leading-relaxed">
                Turbochargers are sophisticated components that force compressed air into your engine, dramatically increasing power output. When they fail, you'll notice reduced performance, unusual noises, and potential <span className="text-white font-semibold">engine damage</span>. Don't ignore the warning signs.
              </p>
              <p className="text-base text-gray-300 mb-6 font-rajdhani leading-relaxed">
                At <span className="text-white font-semibold">The Car Edition</span>, we specialize in turbocharger diagnostics, repair, and replacement. Our experienced technicians understand the complex engineering behind these systems and can restore your turbo to peak performance.
              </p>
              <a 
                href="https://www.youtube.com/watch?v=-Jz8jyMPt2U" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-rajdhani font-bold transition-colors duration-300"
              >
                Watch Video
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 font-orbitron uppercase">
              What We Offer
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Turbo Diagnostics</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Comprehensive testing to identify turbo problems and assess system performance</p>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Turbo Replacement</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Complete turbocharger replacement with genuine or high-quality aftermarket units</p>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Turbo Reconditioning</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Professional reconditioning service to restore turbo performance and reliability</p>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Intercooler Service</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Intercooler cleaning, repair, and replacement for optimal charge air cooling</p>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Wastegate Repair</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Wastegate actuator and valve repair to maintain proper boost control</p>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Boost Leak Testing</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Comprehensive testing to identify and repair boost leaks in the system</p>
              </div>
            </div>
            <p className="text-gray-300 mt-8 font-rajdhani text-sm">
              From routine maintenance to emergency repairs, we handle all turbocharger issues with precision and expertise.
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
                  <span className="text-white font-semibold font-rajdhani text-sm">Turbo Specialists</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Specialized expertise in all turbocharger systems and brands</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Advanced Diagnostics</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - State-of-the-art equipment for accurate turbo diagnosis</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Quality Components</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Genuine and premium aftermarket turbocharger parts</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Fair Pricing</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Competitive rates with transparent quotes</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Warranty Coverage</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Comprehensive warranty on all turbo repairs and replacements</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 font-rajdhani text-sm leading-relaxed">
              We understand the complexity of turbocharger systems and provide reliable repairs that restore your engine's performance and efficiency.
            </p>
          </div>

          {/* Warning Signs Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-orbitron uppercase">
              Signs Your Turbo Needs Attention
            </h3>
            <p className="text-gray-300 mb-6 font-rajdhani text-sm">Watch out for these turbo warning signs:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Loss of power or poor acceleration</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Excessive exhaust smoke (blue, black, or white)</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Unusual whining or grinding noises</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">High oil consumption</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Check engine light activation</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Turbo lag or delayed boost response</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Oil leaks around turbo housing</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Reduced fuel economy</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 font-rajdhani text-sm">
              Turbo failure can cause severe engine damage. Early diagnosis and repair are crucial to prevent costly engine rebuilds.
            </p>
          </div>

          {/* Service Estimator */}
          <div className="mb-20 bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 text-center font-orbitron uppercase">
              Get Your Turbocharger Service Quote
            </h3>
            <ServiceEstimatorComponent />
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-orbitron uppercase">
              Book Your Turbo Service Today
            </h3>
            <p className="text-base text-gray-300 mb-6 font-rajdhani max-w-2xl mx-auto">
              Don't let turbo problems reduce your engine's performance. Our expert team specializes in turbocharger repair and replacement.
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
