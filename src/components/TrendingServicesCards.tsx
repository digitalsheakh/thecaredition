'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ServiceCard {
  title: string;
  subtitle: string;
  price: string;
  vat: string;
  features: string[];
  href: string;
}

const trendingServices: ServiceCard[] = [
  {
    title: "FORD WET BELT REPLACEMENT",
    subtitle: "SPECIALIST SERVICE",
    price: "From £1250",
    vat: "+ VAT",
    features: [
      "Expert wet belt replacement",
      "Ford specialist service", 
      "Quality OEM parts",
      "Professional installation"
    ],
    href: "/services/ford-wet-belt-replacement"
  },
  {
    title: "TIMING CHAIN REPLACEMENT", 
    subtitle: "CRITICAL SERVICE",
    price: "From £1500",
    vat: "+ VAT",
    features: [
      "Complete chain replacement",
      "Tensioner inspection",
      "Engine timing adjustment", 
      "Prevent engine damage"
    ],
    href: "/services/timing-chains"
  },
  {
    title: "PERFORMANCE & ECU TUNING",
    subtitle: "PERFORMANCE UPGRADE", 
    price: "From £49",
    vat: "+ VAT",
    features: [
      "ECU remapping",
      "Performance optimization",
      "Fuel efficiency improvement",
      "Power enhancement"
    ],
    href: "/services/performance-ecu-tuning"
  },
  {
    title: "CAR KEY & IMMOBILISER",
    subtitle: "SECURITY SERVICE",
    price: "From £99", 
    vat: "+ VAT",
    features: [
      "Key programming",
      "Immobiliser repair",
      "Key replacement",
      "Security system diagnostics"
    ],
    href: "/services/car-key-immobiliser"
  },
  {
    title: "FULL SERVICE",
    subtitle: "PREMIUM PACKAGE",
    price: "£150",
    vat: "+ VAT", 
    features: [
      "Oil & filter change",
      "Brake system check",
      "Engine diagnostics",
      "Safety inspection"
    ],
    href: "/services/full-service"
  }
];

export default function TrendingServicesCards() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="py-20 bg-black">
      <div className="w-full px-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="border-l-4 border-orange-600 pl-6 mb-8 inline-block">
              <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                TRENDING SERVICES
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase font-orbitron tracking-wider leading-tight mb-6">
              POPULAR AUTOMOTIVE
              <br />
              <span className="text-orange-600">SERVICES</span>
            </h2>
            <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
              Our most requested services with transparent pricing and professional expertise.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {trendingServices.map((service, index) => (
              <div
                key={index}
                className={`bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-orange-600 cursor-pointer ${
                  expandedCard === index ? 'border-orange-600 bg-gray-800' : ''
                }`}
                onClick={() => toggleCard(index)}
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-orange-600 text-xs font-bold uppercase tracking-wider font-rajdhani">
                      {service.subtitle}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg font-orbitron uppercase tracking-wide leading-tight mb-4">
                    {service.title}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="text-white text-2xl font-bold font-orbitron">
                      {service.price}
                    </span>
                    <span className="text-gray-400 text-sm font-rajdhani ml-2">
                      {service.vat}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className={`space-y-2 transition-all duration-300 ${
                    expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm font-rajdhani">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Expand/Collapse Indicator */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                    <Link
                      href={service.href}
                      className="text-orange-600 hover:text-orange-400 text-sm font-orbitron font-semibold uppercase tracking-wide transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      LEARN MORE
                    </Link>
                    <div className="text-orange-600">
                      {expandedCard === index ? (
                        <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg"
            >
              VIEW ALL SERVICES
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
