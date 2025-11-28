"use client"

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import {useCreateServiceMutation} from "@/redux/features/service/serviceApi"
type FormData = {
  name: string;
  description: string;
  basePrice: number;
};

const ServiceForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset,
  } = useForm<FormData>();
  const [createService] = useCreateServiceMutation()
  const handleFormSubmit = async (data: FormData) => {
    try {
      // Prepare the final data
      const formData = {
        name: data.name,
        description: data.description,
        basePrice: Number(data.basePrice)
      };
      const res = await createService(formData)
      if(res?.data?.insertedId){
 toast.success("Service created successfully");
      reset();
      }

      
     
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating service. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header Section */}
      <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-orbitron uppercase tracking-wider">Add New Service</h1>
            <p className="text-sm text-gray-600 mt-2 font-rajdhani">Create a new automotive service offering for your customers</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Toaster />
        <form 
          onSubmit={handleSubmit(handleFormSubmit)} 
          className="space-y-6"
        >
        
        {/* Service Title Field */}
        <div className="mb-8">
          <label htmlFor="name" className="block text-base font-bold text-gray-900 mb-3 font-rajdhani">
            Service Name *
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { 
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters'
              }
            })}
            className="w-full px-5 py-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200 font-rajdhani text-base"
            placeholder="Enter service name (e.g., Full Service, Oil Change)"
          />
          {errors.name && (
            <p className="mt-3 text-sm text-red-600 flex items-center font-rajdhani">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Service Description Field */}
        <div className="mb-8">
          <label htmlFor="description" className="block text-base font-bold text-gray-900 mb-3 font-rajdhani">
            Service Description *
          </label>
          <textarea
            id="description"
            rows={5}
            {...register('description', { 
              required: 'Description is required',
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters'
              }
            })}
            className="w-full px-5 py-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200 font-rajdhani text-base leading-relaxed resize-vertical"
            placeholder="Describe the service in detail (e.g., Comprehensive vehicle inspection, oil and filter change, brake check, etc.)"
          />
          {errors.description && (
            <p className="mt-3 text-sm text-red-600 flex items-center font-rajdhani">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Base Price Field */}
        <div className="mb-8">
          <label htmlFor="basePrice" className="block text-base font-bold text-gray-900 mb-3 font-rajdhani">
            Base Price *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-4 text-gray-600 font-bold text-lg font-orbitron">£</span>
            <input
              id="basePrice"
              type="number"
              step="0.01"
              min="0"
              {...register('basePrice', { 
                required: 'Base price is required',
                min: {
                  value: 0.01,
                  message: 'Price must be greater than 0'
                }
              })}
              className="w-full pl-10 pr-5 py-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200 font-rajdhani text-base"
              placeholder="0.00"
            />
          </div>
          <p className="mt-2 text-sm text-gray-600 font-rajdhani">Enter the base price for this service in GBP</p>
          {errors.basePrice && (
            <p className="mt-3 text-sm text-red-600 flex items-center font-rajdhani">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.basePrice.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-lg text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-rajdhani"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Reset Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 text-base font-bold rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-200 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-rajdhani"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Create Service
              </>
            )}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;