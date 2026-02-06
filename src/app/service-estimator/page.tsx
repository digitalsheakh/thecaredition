'use client';

import { motion } from 'framer-motion';
import ServiceEstimatorComponent from '@/components/reuseableComponents/ServicesEstimator/ServiceEstimator';

export default function ServiceEstimator() {
  return (
    <div className="min-h-screen bg-black text-white pt-32">
      <div className="text-center py-8">
        <h1 className="text-2xl md:text-3xl font-bold uppercase font-orbitron tracking-wider">
          GET YOUR MECHANICAL REPAIR <span className="text-orange-600">QUOTE</span>
        </h1>
      </div>
      <ServiceEstimatorComponent/>
    </div>
  );
}
