import ServiceEstimatorComponent from '@/components/reuseableComponents/ServicesEstimator/ServiceEstimator';
import ServiceVideoPlayer from '@/components/ServiceVideoPlayer';
import Image from 'next/image';
import Link from 'next/link';

export default function CustomisationPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-gray-900">
        <Image
          src="/images/services/serviceimage1.jpg"
          alt="Car Customisation Service"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        {/* Service Badge */}
        <div className="absolute top-8 left-8 md:left-16 z-20">
          <span className="bg-orange-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider font-rajdhani">
            CUSTOMISATION SERVICES
          </span>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-orbitron uppercase tracking-wider leading-tight bg-black/50 p-4 rounded">
              CUSTOMISATION
            </h1>
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-gray-200 mb-8 font-rajdhani leading-relaxed">
                Transform your vehicle with our professional customisation services. From <span className="text-white font-bold">star lights and dash cams to in-car entertainment</span>, we'll personalize your car to match your style.
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
                PROFESSIONAL CAR CUSTOMISATION
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-orbitron uppercase leading-tight">
              Car Customisation in Huntingdon – Make Your Vehicle Unique
            </h2>
            <div className="max-w-4xl">
              <p className="text-base text-gray-300 mb-6 font-rajdhani leading-relaxed">
                Your car should reflect your personality and lifestyle. Whether you want to add luxury features, improve safety, or enhance entertainment, our customisation services can <span className="text-white font-semibold">transform your driving experience</span>.
              </p>
              <p className="text-base text-gray-300 font-rajdhani leading-relaxed">
                At <span className="text-white font-semibold">The Car Edition</span>, we specialize in professional installation of aftermarket accessories and custom features. Our expert technicians ensure every installation is done to the highest standards with clean wiring and factory-quality finish.
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
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Star Lights & Lighting</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Ambient star light headliners, LED interior lighting, and custom lighting solutions</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Dash Cam Fitting</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Professional dash cam installation with hidden wiring and parking mode setup</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">In-Car Entertainment</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Touchscreen head units, Apple CarPlay, Android Auto, and audio system upgrades</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Sound System Upgrades</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Premium speakers, amplifiers, and subwoofer installation for superior audio</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Parking Sensors & Cameras</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Front and rear parking sensors, reversing cameras, and 360-degree camera systems</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-600 transition-colors duration-300">
                <h4 className="text-lg font-bold text-white mb-3 font-rajdhani">Cruise Control Installation</h4>
                <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">Professional cruise control retrofit and installation for enhanced driving comfort</p>
              </div>
            </div>
            <p className="text-gray-300 mt-8 font-rajdhani text-sm">
              All installations include professional wiring, programming, and testing to ensure perfect operation.
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
                  <span className="text-white font-semibold font-rajdhani text-sm">Expert Installation</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Professional fitting with factory-quality finish</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Clean Wiring</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Hidden, professional wiring that looks OEM</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Quality Products</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Premium brands and reliable aftermarket accessories</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Custom Solutions</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Tailored installations to suit your specific needs</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold font-rajdhani text-sm">Warranty Protected</span>
                  <span className="text-gray-300 font-rajdhani text-sm"> - Installations that don't void your vehicle warranty</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 font-rajdhani text-sm leading-relaxed">
              We take pride in delivering customisation work that looks professional and enhances your vehicle's value.
            </p>
          </div>

          {/* Popular Upgrades Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-orbitron uppercase">
              Popular Customisation Options
            </h3>
            <p className="text-gray-300 mb-6 font-rajdhani text-sm">Transform your vehicle with these popular upgrades:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Starlight headliner for luxury ambiance</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Front and rear dash cams for security</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Apple CarPlay and Android Auto integration</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">LED ambient interior lighting</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Premium audio system upgrades</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">360-degree camera systems</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Wireless phone charging pads</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300 font-rajdhani text-sm">Rear seat entertainment systems</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 font-rajdhani text-sm">
              Contact us to discuss your customisation ideas. We can source and install almost any aftermarket accessory.
            </p>
          </div>

          {/* Video Section */}
          <ServiceVideoPlayer 
            videoId="YJ7a0m1jbMU" 
            title="Watch: Car Customisation Services"
          />

          {/* Service Estimator */}
          <div className="mb-20 bg-gray-900 p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 text-center font-orbitron uppercase">
              Get Your Customisation Quote
            </h3>
            <ServiceEstimatorComponent />
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-orbitron uppercase">
              Personalize Your Vehicle Today
            </h3>
            <p className="text-base text-gray-300 mb-6 font-rajdhani max-w-2xl mx-auto">
              Book your customisation consultation and let us transform your vehicle with professional upgrades.
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
