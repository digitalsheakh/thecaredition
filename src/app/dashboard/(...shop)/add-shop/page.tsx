"use client"

import { useForm } from 'react-hook-form';
import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useCloudinaryUpload } from '@/components/uploadFiles/uploadCloudinary';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="border rounded p-4 h-48 bg-gray-50 animate-pulse"></div>
});

type FormData = {
  title: string;
  images: FileList | null;
  content: string;
};

const ShopForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      images: null,
      content: ''
    }
  });
  
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const content = watch('content');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      setValue('images', files, { shouldValidate: true });
      
      // Create previews
      const newPreviews: string[] = [];
      for (let i = 0; i < Math.min(files.length, 20); i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPreviews.push(event.target.result as string);
            if (newPreviews.length === Math.min(files.length, 20)) {
              setImagePreviews(newPreviews);
            }
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
    
    // Create new FileList without the removed image
    const dataTransfer = new DataTransfer();
    const currentFiles = watch('images');
    if (currentFiles) {
      for (let i = 0; i < currentFiles.length; i++) {
        if (i !== index) {
          dataTransfer.items.add(currentFiles[i]);
        }
      }
      setValue('images', dataTransfer.files);
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      let imageUrls: string[] = [];
      
      // Upload images if they exist
      if (data.images && data.images.length > 0) {
        const uploadPromises = [];
        for (let i = 0; i < data.images.length; i++) {
          uploadPromises.push(useCloudinaryUpload(data.images[i]));
        }
        
        const results = await Promise.all(uploadPromises);
        imageUrls = results.filter(url => url !== null) as string[];
        
        if (imageUrls.length === 0) {
          toast.error('Failed to upload images');
          return;
        }
      }

      // Prepare the final data
      const formData = {
        title: data.title,
        content: data.content,
        imageUrls: imageUrls
      };
      console.log(formData)
      const res = await axios.post("/api/shops", formData);
      if (res?.data?.insertedId) {
        toast.success("Shop created successfully");
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating shop. Please try again.');
    }
  };

  const resetForm = () => {
    reset();
    setValue('content', '');
    setImagePreviews([]);
  };

 const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'link', 'image'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header Section */}
      <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-orbitron uppercase tracking-wider">Add Shop Item</h1>
            <p className="text-sm text-gray-600 mt-2 font-rajdhani">Add new automotive products to your online shop</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Toaster />
        <form 
          onSubmit={handleSubmit(handleFormSubmit)} 
          className="space-y-6"
        >
          <div className="mb-8">
            <label htmlFor="title" className="block text-base font-bold text-gray-900 mb-3 font-rajdhani">
              Product Title *
            </label>
            <input
              id="title"
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-5 py-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200 font-rajdhani text-base"
              placeholder="Enter product name (e.g., Car Air Freshener, Engine Oil)"
            />
            {errors.title && (
              <p className="mt-3 text-sm text-red-600 flex items-center font-rajdhani">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-base font-bold text-gray-900 mb-3 font-rajdhani">
              Product Images *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-red-400 transition-colors duration-200 bg-gray-50">
              <input
                type="file"
                id="images"
                multiple
                accept="image/jpeg, image/jpg, image/png, image/webp"
                onChange={handleImageChange}
                className="file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-red-500 file:text-white hover:file:bg-red-600 file:transition-all file:duration-200 file:shadow-md hover:file:shadow-lg w-full text-gray-700 font-rajdhani text-base cursor-pointer"
              />
              <p className="text-sm text-gray-600 mt-2 font-rajdhani">
                Upload up to 20 high-quality product images (JPEG, JPG, PNG, WebP)
              </p>
            </div>
            
            {imagePreviews.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3 font-rajdhani uppercase tracking-wide">
                  Image Previews ({imagePreviews.length}/20)
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="h-24 w-full object-cover rounded-lg border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-lg"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-1 rounded font-rajdhani">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-base font-bold text-gray-900 mb-3 font-rajdhani">
              Product Description *
            </label>
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200 transition-all duration-200">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={(value) => setValue('content', value, { shouldValidate: true })}
                modules={modules}
                formats={formats}
                className="w-full bg-white text-gray-900 font-rajdhani"
                placeholder="Write a detailed product description including features, benefits, specifications, and usage instructions..."
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 font-rajdhani">
              Provide a comprehensive description to help customers understand your product better
            </p>
            {errors.content && (
              <p className="mt-3 text-sm text-red-600 flex items-center font-rajdhani">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
          {errors.content.message}
        </p>
      )}
    </div>

    <div className="flex justify-end gap-4 ">
      <button
        type="button"
        onClick={resetForm}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border  border-red-600  text-red-600 hover:text-white hover:bg-gradient-to-r  hover:from-red-600 hover:to-red-700 shadow-sm transition-all duration-200 ease-in-out hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
        Reset
      </button>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-sm transition-all duration-200 ease-in-out hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Create Shop
      </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ShopForm;