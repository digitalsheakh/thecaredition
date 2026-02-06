// components/SearchInput.jsx
import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  heading: string;
  onSubmit?: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isSearching?: boolean;
  limit?: number;
  onLimitChange?: (value: number) => void;
  pagination?: {
    total: number;
    page: number;
  };
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search services by name...", 
  heading,
  onSubmit,
  isLoading = false,
  isSearching = false,
  limit = 10,
  onLimitChange,
  pagination
}) => {
  const handleLimitChange = (value: string) => {
    onLimitChange?.(parseInt(value));
  };

  return (
   <div className="mb-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl shadow-sm border border-gray-200">
  {heading && (
    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
      <h3 className="text-xl font-bold text-gray-900 font-orbitron uppercase tracking-wider">{heading}</h3>
    </div>
  )}

  <div className="p-6">
    <form onSubmit={onSubmit} className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-4 py-3 text-base rounded-lg border-2 border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none text-gray-900 placeholder-gray-500 transition-all duration-200 font-rajdhani shadow-sm"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      
      {onSubmit && (
        <button 
          type="submit" 
          disabled={isSearching}
          className="inline-flex items-center px-6 py-3 text-base font-bold rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg transition-all duration-200 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-rajdhani uppercase tracking-wide"
        >
          {isSearching ? (
            <>
              <svg className="h-5 w-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Searching...
            </>
          ) : (
            <>
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Search
            </>
          )}
        </button>
      )}
    </form>

    {(onLimitChange || pagination) && (
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        {onLimitChange && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 font-rajdhani">Show:</span>
            <select 
              value={limit.toString()} 
              onChange={(e) => handleLimitChange(e.target.value)}
              className="w-20 border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 font-rajdhani font-medium bg-white shadow-sm"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-sm font-medium text-gray-700 font-rajdhani">entries</span>
          </div>
        )}
        
        {pagination?.total && pagination.total > 0 && (
          <div className="text-sm font-medium text-gray-700 font-rajdhani bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            Showing <span className="font-bold text-gray-900">{((pagination.page - 1) * limit) + 1}</span> to <span className="font-bold text-gray-900">{Math.min(pagination.page * limit, pagination.total)}</span> of <span className="font-bold text-gray-900">{pagination.total}</span> entries
          </div>
        )}
      </div>
    )}
  </div>
</div>
  );
};

export { SearchInput };