"use client"

import { useForm } from 'react-hook-form';
import { useState, useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import 'react-quill/dist/quill.snow.css';
import { useCloudinaryUpload } from '@/components/uploadFiles/uploadCloudinary';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="border rounded p-4 h-48 bg-gray-50 animate-pulse"></div>
});

// Define types
type FormData = {
  title: string;
  image: File | null;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaImageUrl: File | null;
};

const BlogForm = () => {
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
      image: null,
      content: '',
      metaTitle: '',
      metaDescription: '',
      metaImageUrl: null
    }
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [metaImagePreview, setMetaImagePreview] = useState<string | null>(null);
  const content = watch('content');
  const metaDescription = watch('metaDescription');

  // Main image dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue('image', file, { shouldValidate: true });
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [setValue]);

  const { getRootProps: getMainImageRootProps, getInputProps: getMainImageInputProps, isDragActive: isMainImageDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  // Meta image dropzone
  const onMetaImageDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue('metaImageUrl', file, { shouldValidate: true });
      
      const reader = new FileReader();
      reader.onload = () => {
        setMetaImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [setValue]);

  const { getRootProps: getMetaImageRootProps, getInputProps: getMetaImageInputProps, isDragActive: isMetaImageDragActive } = useDropzone({
    onDrop: onMetaImageDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      let imageUrl = null;
      let metaImageUrl = null;

      // Upload main image to Cloudinary if exists
      if (data.image) {
        imageUrl = await useCloudinaryUpload(data.image);
        if (!imageUrl) {
          alert('Failed to upload main image');
          return;
        }
      }

      // Upload meta image to Cloudinary if exists
      if (data.metaImageUrl) {
        metaImageUrl = await useCloudinaryUpload(data.metaImageUrl);
        if (!metaImageUrl) {
          alert('Failed to upload meta image');
          return;
        }
      }

      // Prepare the final data with Cloudinary URLs
      const formData = {
        title: data.title,
        content: data.content,
        imageUrl: imageUrl,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaImageUrl: metaImageUrl
      };

      const res = await axios.post("/api/blogs", formData)
      if(res?.data?.insertedId){
        toast.success("Blog uploaded successfully")
        reset();
        setValue('content', '');
        setImagePreview(null);
        setMetaImagePreview(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
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
            <h1 className="text-2xl font-bold text-gray-900 font-orbitron uppercase tracking-wider">Create New Blog Post</h1>
            <p className="text-sm text-gray-600 mt-2 font-rajdhani">Add engaging automotive content to your blog</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Toaster />
        <form 
          onSubmit={handleSubmit(handleFormSubmit)} 
          className="space-y-6"
        >
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label htmlFor="title" className="block text-base font-bold text-gray-900 mb-3 font-rajdhani">
                Article Title *
              </label>
              <input
                id="title"
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="w-full px-5 py-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200 font-rajdhani text-base"
                placeholder="Enter compelling article title (e.g., Top 10 Car Maintenance Tips)"
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

            <div>
              <label className="block text-base font-bold text-gray-900 mb-3 font-rajdhani">
                Featured Article Image *
              </label>
              <div
                {...getMainImageRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  isMainImageDragActive 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-red-400 bg-gray-50'
                }`}
              >
                <input {...getMainImageInputProps()} />
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-md mx-auto">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-60 w-full object-cover rounded-lg mb-4 border-2 border-gray-200 shadow-sm"
                      />
                      <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
                        <span className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-lg shadow-lg font-rajdhani">
                          Click or drag to replace
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-medium text-gray-700 font-rajdhani">
                        {isMainImageDragActive ? 'Drop the image here' : 'Upload Featured Article Image'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 font-rajdhani">Drag & drop or click to select high-quality image</p>
                      <p className="text-xs text-gray-400 mt-2 font-rajdhani">Supports: JPG, PNG, WEBP (Max 20MB)</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2 font-rajdhani">
                Choose an eye-catching image that represents your article content
              </p>
              {errors.image && (
                <p className="mt-3 text-sm text-red-600 flex items-center font-rajdhani">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.image.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-base font-bold text-gray-900 mb-3 font-rajdhani">
                Article Content *
              </label>
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200 transition-all duration-200">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={(value) => setValue('content', value, { shouldValidate: true })}
                  modules={modules}
                  formats={formats}
                  className="w-full bg-white text-gray-900 font-rajdhani"
                  placeholder="Write engaging automotive content with detailed information, tips, and insights for your readers..."
                  style={{ border: 'none' }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-rajdhani">
                Create compelling content that provides value to automotive enthusiasts and car owners
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
          </div>

          {/* Right Column - Meta Data */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-300 pb-3 font-orbitron uppercase tracking-wide">SEO Optimization</h3>
              
              <div className="mb-6">
                <label htmlFor="metaTitle" className="block text-sm font-bold text-gray-800 mb-2 font-rajdhani">
                  SEO Meta Title
                </label>
                <input
                  id="metaTitle"
                  type="text"
                  {...register('metaTitle')}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200 font-rajdhani"
                  placeholder="Compelling SEO title for search engines"
                />
                <p className="mt-2 text-xs text-blue-600 font-rajdhani font-medium">📏 Recommended: 50-60 characters for optimal display</p>
              </div>

              <div className="mb-6">
                <label htmlFor="metaDescription" className="block text-sm font-bold text-gray-800 mb-2 font-rajdhani">
                  SEO Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  rows={4}
                  {...register('metaDescription')}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200 font-rajdhani resize-none"
                  placeholder="Write a compelling description that encourages clicks from search results"
                />
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-blue-600 font-rajdhani font-medium">📝 Recommended: 150-160 characters</p>
                  <p className="text-xs font-bold text-gray-700 font-rajdhani">{metaDescription?.length || 0}/160</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2 font-rajdhani">
                  SEO Meta Image
                </label>
                <div
                  {...getMetaImageRootProps()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
                    isMetaImageDragActive 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-red-400 bg-white'
                  }`}
                >
                  <input {...getMetaImageInputProps()} />
                  {metaImagePreview ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={metaImagePreview} 
                        alt="Meta Preview" 
                        className="max-h-40 w-full object-cover rounded-lg mb-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">Click or drag to replace</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="mx-auto w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-500">
                        {isMetaImageDragActive ? 'Drop the image here' : 'Click to upload'}
                      </p>
                      <p className="text-xs text-gray-400">Optimal size: 1200×630 pixels</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-6 mt-10 pt-6 border-t-2 border-gray-200">
          <button
            type="button"
            onClick={() => {
              reset();
              setValue('content', '');
              setImagePreview(null);
              setMetaImagePreview(null);
            }}
            className="inline-flex items-center px-8 py-4 text-base font-bold rounded-lg border-2 border-red-600 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-200 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-rajdhani uppercase tracking-wide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Reset Form
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-8 py-4 text-base font-bold rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-200 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-rajdhani uppercase tracking-wide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Publish Blog
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;