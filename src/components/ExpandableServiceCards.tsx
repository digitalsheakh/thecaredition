"use client";

import { useState } from 'react';

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  color: string;
}

const services: ServiceCard[] = [
  {
    id: 1,
    title: "Main Dealer Experience",
    description: "Professional service standards with main dealer expertise. Our certified technicians deliver the same quality service you'd expect from a main dealership, but at competitive prices.",
    color: "bg-blue-500/10"
  },
  {
    id: 2,
    title: "Competitive Pricing",
    description: "Fair and transparent costs without compromising quality. We believe in honest pricing with no hidden fees, ensuring you get the best value for your automotive service needs.",
    color: "bg-green-500/10"
  },
  {
    id: 3,
    title: "Industry Specialists",
    description: "Expert certified technicians with years of experience. Our team stays updated with the latest automotive technology and techniques to provide superior service for all vehicle makes and models.",
    color: "bg-purple-500/10"
  },
  {
    id: 4,
    title: "Globally Recognised",
    description: "Trusted worldwide standards and certifications. We adhere to international quality standards, ensuring your vehicle receives world-class service that's recognized across the automotive industry.",
    color: "bg-pink-500/10"
  },
  {
    id: 5,
    title: "Quality OEM Parts",
    description: "Original manufacturer parts for optimal performance. We use only genuine OEM parts to ensure your vehicle maintains its integrity, performance, and warranty compliance.",
    color: "bg-orange-500/10"
  },
  {
    id: 6,
    title: "Full Transparency",
    description: "Clear communication always throughout your service. We keep you informed at every step with detailed explanations, video updates, and transparent reporting of all work performed.",
    color: "bg-yellow-500/10"
  }
];

export default function ExpandableServiceCards() {
  const [selectedCard, setSelectedCard] = useState<number>(1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {services.map((service) => {
        const isSelected = selectedCard === service.id;
        const isOtherSelected = selectedCard !== service.id;

        return (
          <div
            key={service.id}
            onClick={() => setSelectedCard(service.id)}
            onMouseEnter={() => setSelectedCard(service.id)}
            className={`
              relative overflow-hidden rounded-2xl border border-gray-700
              transition-all duration-500 ease-in-out cursor-pointer
              ${service.color}
              ${isSelected 
                ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2 z-10 shadow-2xl border-red-600' 
                : isOtherSelected 
                  ? 'opacity-70' 
                  : 'opacity-100'
              }
            `}
            style={{
              minHeight: isSelected ? '300px' : '150px',
            }}
          >
            <div className="h-full p-6 md:p-8 flex flex-col justify-center">
              {!isSelected ? (
                <div className="flex items-center justify-center h-full">
                  <h3 className="text-white font-orbitron font-bold text-base md:text-lg text-center uppercase tracking-wide leading-tight">
                    {service.title}
                  </h3>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-white font-orbitron font-bold text-xl md:text-2xl uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 font-rajdhani text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
