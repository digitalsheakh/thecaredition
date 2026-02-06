'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCar, FaSearch, FaArrowRight } from 'react-icons/fa';
import { getVehicleByRegistration, isValidUKRegistration, VehicleDetails } from '@/services/vehicleApi';


export default function ServiceEstimatorComponent() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [step, setStep] = useState(1); // Step 1: Enter reg, Step 2: Confirm vehicle

  // Format registration number with a space in the middle (e.g., AB12 CDE)
  const formatRegistration = (reg: string) => {
    const clean = reg.replace(/\s+/g, '').toUpperCase();
    if (clean.length > 4) {
      return `${clean.slice(0, 4)} ${clean.slice(4)}`;
    }
    return clean;
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow letters, numbers and spaces
    const value = e.target.value.replace(/[^A-Za-z0-9\s]/g, '');
    setRegistrationNumber(value);
    
    // Clear any previous errors when user starts typing again
    if (error) setError(null);
    
    // Reset vehicle data if user changes registration
    if (vehicle) setVehicle(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setError(null);
    
    // Clean up registration number
    const cleanReg = registrationNumber.replace(/\s+/g, '').toUpperCase();
    
    // Basic validation
    if (!cleanReg) {
      setError('Please enter a registration number');
      return;
    }
    
    // Validate UK registration format
    if (!isValidUKRegistration(cleanReg)) {
      setError('Please enter a valid UK registration number');
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Call the API to get vehicle details
      const vehicleData = await getVehicleByRegistration(cleanReg);
      
      if (vehicleData) {
        setVehicle(vehicleData);
        setStep(2); // Move to vehicle confirmation step
      } else {
        setError('Vehicle not found. Please check the registration number.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRegistration = () => {
    setStep(1); // Go back to registration input
    setVehicle(null); // Clear vehicle data
  };

  const handleConfirmVehicle = () => {
    // Store vehicle details in localStorage for use in the service selection page
    if (vehicle) {
      try {
        // Make sure to stringify the vehicle object properly
        const vehicleString = JSON.stringify(vehicle);
        localStorage.setItem('selectedVehicle', vehicleString);
   
        
        // Navigate to the service selection page
        // Use direct window.location.href assignment instead of setTimeout
        window.location.href = '/service-estimator/service-selection';
      } catch (error) {
        console.error('Error storing vehicle data:', error);
        alert('There was an error saving your vehicle information. Please try again.');
      }
    }
  };

  return (
    <section className="bg-black flex justify-center py-8">
          
          {step === 1 && (
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase font-orbitron tracking-wider text-white">
                ENTER YOUR <span className="text-orange-600">REGISTRATION</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* License plate style input */}
                <div className="relative bg-yellow-400 rounded-lg shadow-lg border-2 border-gray-700 overflow-hidden max-w-sm mx-auto">
                  <div className="flex">
                    <div className="bg-yellow-400 w-16 py-2 px-2 flex flex-col items-center justify-center border-r-2 border-gray-700">
                      <div className="w-12 h-6 mb-1 overflow-hidden rounded shadow-sm">
                        <img src="/images/uk-flag.png" alt="UK Flag" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-gray-900 font-bold text-sm">UK</span>
                    </div>
                    <div className="flex-1 bg-white">
                      <input
                        type="text"
                        id="registration"
                        value={registrationNumber}
                        onChange={handleRegistrationChange}
                        placeholder="AB12 CDE"
                        className="w-full h-full text-2xl font-bold tracking-widest text-center uppercase border-0 focus:ring-0 focus:outline-none bg-transparent text-black py-4 px-3 font-orbitron"
                        maxLength={10}
                        disabled={isLoading}
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
                {error && <p className="mt-2 text-sm text-orange-400 font-rajdhani">{error}</p>}
                
                <button
                  type="submit"
                  disabled={isLoading || !registrationNumber.trim()}
                  className={`group relative inline-flex items-center justify-center px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden ${
                    isLoading || !registrationNumber.trim() 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      SEARCHING...
                    </>
                  ) : (
                    <>
                      <FaSearch className="mr-2" />
                      SEARCH VEHICLE
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 2 && vehicle && (
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase font-orbitron tracking-wider text-white">
                CONFIRM YOUR <span className="text-orange-600">VEHICLE</span>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <FaCar className="text-orange-600 text-2xl mx-auto mb-2" />
                  <p className="text-gray-400 text-xs font-rajdhani uppercase mb-1">Registration</p>
                  <p className="text-lg font-bold text-white font-orbitron">{formatRegistration(vehicle.registrationNumber)}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold font-orbitron text-sm">M</span>
                  </div>
                  <p className="text-gray-400 text-xs font-rajdhani uppercase mb-1">Make</p>
                  <p className="text-lg font-bold text-white font-orbitron">{vehicle.make}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold font-orbitron text-sm">Y</span>
                  </div>
                  <p className="text-gray-400 text-xs font-rajdhani uppercase mb-1">Year</p>
                  <p className="text-lg font-bold text-white font-orbitron">{vehicle.yearOfManufacture}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold font-orbitron text-sm">E</span>
                  </div>
                  <p className="text-gray-400 text-xs font-rajdhani uppercase mb-1">Engine</p>
                  <p className="text-lg font-bold text-white font-orbitron">{vehicle.engineCapacity ? `${vehicle.engineCapacity}cc` : 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleEditRegistration}
                  className="group relative inline-flex items-center justify-center px-6 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative">CHECK ANOTHER CAR</span>
                </button>
                <button
                  onClick={handleConfirmVehicle}
                  className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center">
                    CONFIRM & CONTINUE
                    <FaArrowRight className="ml-2" />
                  </span>
                </button>
              </div>
            </div>
          )}
    </section>
  );
}