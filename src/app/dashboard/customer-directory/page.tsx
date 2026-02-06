'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  ArrowPathIcon, 
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useGetCustomersQuery } from '@/redux/features/customers/customerApi';
import {
  Card,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchInput } from '@/components/reuseableComponents/Tables/reuseableHeader';
import { DataTable } from '@/components/reuseableComponents/Tables/reuseableTable';
import { Pagination } from '@/components/reuseableComponents/Tables/reuseablePagination';
import moment from 'moment';

interface Vehicle {
  registrationNumber: string;
  make: string;
  model: string;
  color: string;
  fuelType: string;
  engineCapacity: number;
  yearOfManufacture: number;
  // Add other vehicle properties as needed
}

interface CustomerData {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  vehicles: Vehicle[];
  createdAt?: string;
}

type ColumnDef<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
};

export default function CustomerDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const { 
    data: customers = { data: [], pagination: { total: 0, totalPages: 0 } }, 
    isLoading, 
    error, 
    refetch 
  } = useGetCustomersQuery({
    search: searchTerm,
    page,
    limit
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  const columns: ColumnDef<CustomerData>[] = [
    {
      header: "Customer Information",
      accessor: (customer) => (
        <div className="py-3">
          <div className="text-base font-bold text-gray-900 font-rajdhani mb-1">{customer.name}</div>
          <div className="text-sm text-gray-600 font-rajdhani">
            {customer.createdAt && `Joined: ${moment(customer.createdAt).format("DD MMM YYYY")}`}
          </div>
        </div>
      ),
      className: "w-[25%]"
    },
    {
      header: "Contact Details",
      accessor: (customer) => (
        <div className="flex flex-col py-3 space-y-1">
          <a className="text-sm font-medium text-gray-600 hover:text-gray-800 hover:underline font-rajdhani" href={`mailto:${customer.email}`}>
            {customer.email}
          </a>
          <a className="text-sm font-semibold text-gray-700 hover:text-gray-900 hover:underline font-rajdhani" href={`tel:${customer.phone}`}>
            {customer.phone}
          </a>
        </div>
      ),
      className: "w-[25%]"
    },
    {
      header: "Vehicle Information",
      accessor: (customer) => (
        <div className="space-y-3 py-3">
          {customer.vehicles.map((vehicle, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex px-3 py-1 text-sm font-bold bg-gray-50 text-gray-700 rounded-lg font-orbitron uppercase tracking-wider">
                  {vehicle.registrationNumber}
                </span>
                <span className="text-sm font-semibold text-gray-900 font-rajdhani">
                  {vehicle.make} {vehicle.model}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 font-rajdhani">
                <div><span className="font-medium">Year:</span> {vehicle.yearOfManufacture}</div>
                <div><span className="font-medium">Fuel:</span> {vehicle.fuelType}</div>
                <div><span className="font-medium">Color:</span> {vehicle.color}</div>
                <div><span className="font-medium">Engine:</span> {vehicle.engineCapacity}cc</div>
              </div>
            </div>
          ))}
        </div>
      ),
      className: "w-[50%]"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header Section */}
      <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-orbitron uppercase tracking-wider">Customer Directory</h1>
            <p className="text-sm text-gray-600 mt-2 font-rajdhani">Manage your customer database and vehicle information</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          heading=""
          onSubmit={handleSearch}
          isLoading={isLoading}
          limit={limit}
          onLimitChange={handleLimitChange}
          pagination={{
            page: page,
            total: customers.pagination.total
          }}
          placeholder="Search by customer name, email, phone number, or vehicle registration..."
        />

      <DataTable<CustomerData>
        columns={columns}
        data={customers.data}
        isLoading={isLoading}
        error={
          error
            ? typeof error === "string"
              ? error
              : "status" in (error as any)
                ? `Error: ${(error as any).status}`
                : "An error occurred"
            : undefined
        }
        emptyMessage="No customers found"
        skeletonCount={5}
      />

      <Pagination
        currentPage={page}
        totalPages={customers.pagination.totalPages}
        onPageChange={goToPage}
        isLoading={isLoading}
      />
      </div>
    </div>
  );
}