import ServiceEstimatorComponent from '@/components/reuseableComponents/ServicesEstimator/ServiceEstimator';
import Image from 'next/image';
import Link from 'next/link';

export default function DiagnosticsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-black">
        <Image
          src="/images/services/serviceimage5.jpg"
          alt="Diagnostics Service"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        {/* Service Badge */}
        <div className="absolute top-8 left-8 md:left-16 z-20">
          <span className="bg-orange-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider font-rajdhani">
            DIAGNOSTIC SERVICES
          </span>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-orbitron uppercase tracking-wider leading-tight bg-black/50 p-4 rounded">
              DIAGNOSTICS
            </h1>
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-gray-200 mb-8 font-rajdhani leading-relaxed">
                Advanced vehicle diagnostics to identify problems quickly and accurately. Our expert technicians use <span className="text-white font-bold">state-of-the-art diagnostic equipment</span> to pinpoint issues and provide effective solutions.
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
                ADVANCED VEHICLE DIAGNOSTIC SERVICES
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-orbitron uppercase leading-tight">
              Vehicle Diagnostics in Huntingdon – Identify Problems Before They Become Costly
            </h2>
            <div className="max-w-4xl">
              <p className="text-base text-gray-300 mb-6 font-rajdhani leading-relaxed">
                Modern vehicles are equipped with sophisticated computer systems that monitor every aspect of your car's performance. When something goes wrong, these systems generate diagnostic codes that help us identify the exact <span className="text-white font-semibold">problem quickly and accurately</span>.
              </p>
              <p className="text-base text-gray-300 mb-6 font-rajdhani leading-relaxed">
                At <span className="text-white font-semibold">The Car Edition</span>, we use the latest diagnostic equipment to read these codes, analyze system data, and provide you with a comprehensive report of your vehicle's health. Early diagnosis saves you time and money.
              </p>
              <a 
                href="https://www.youtube.com/watch?v=q8yZL8IEK5o" 
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
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Engine Diagnostics</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Comprehensive engine system analysis to identify performance issues and faults</p>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Transmission Diagnostics</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Advanced testing of automatic and manual transmission systems</p>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Electrical System Testing</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Complete electrical system diagnosis including wiring and component testing</p>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">ABS & Brake System</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Specialized diagnostics for ABS, ESP, and brake system components</p>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Air Conditioning Diagnostics</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Climate control system testing and fault identification</p>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Pre-Purchase Inspections</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Comprehensive vehicle health checks before buying a used car</p>
              </div>
            </div>
            <p className="text-gray-300 mt-8 font-rajdhani text-sm">
              Our diagnostic services help prevent small issues from becoming major, expensive repairs.
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
                  <span className="text-white font-semibold font-rajdhani text-sm">Latest Equipment</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - State-of-the-art diagnostic tools for all vehicle makes and models</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Expert Analysis</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Skilled technicians who understand complex vehicle systems</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Clear Reports</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Detailed explanations of findings in plain English</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Honest Advice</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Transparent recommendations with no unnecessary work</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Quick Results</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Fast diagnosis to get you back on the road sooner</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 font-rajdhani text-sm leading-relaxed">
              We believe in providing accurate diagnostics that help you make informed decisions about your vehicle's maintenance and repairs.
            </p>
          </div>

          {/* Warning Signs Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-orbitron uppercase">
              Signs You Need Vehicle Diagnostics
            </h3>
            <p className="text-gray-300 mb-6 font-rajdhani text-sm">Book a diagnostic check if you notice:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Warning lights on dashboard</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Engine running rough or misfiring</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Poor fuel economy</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Difficulty starting the engine</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Unusual noises or vibrations</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Transmission shifting problems</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Air conditioning not working properly</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Failed MOT test</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 font-rajdhani text-sm">
              Early diagnosis can identify problems before they cause breakdowns or expensive damage. Don't wait until it's too late.
            </p>
          </div>

          {/* Service Estimator */}
          <div className="mb-20 bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 text-center font-orbitron uppercase">
              Get Your Diagnostic Service Quote
            </h3>
            <ServiceEstimatorComponent />
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-orbitron uppercase">
              Book Your Vehicle Diagnostic Today
            </h3>
            <p className="text-base text-gray-300 mb-6 font-rajdhani max-w-2xl mx-auto">
              Don't let unknown problems become expensive repairs. Our comprehensive diagnostic service identifies issues quickly and accurately.
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
