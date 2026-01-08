'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { toast } from 'react-toastify';
import { 
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { DataTable } from '@/components/reuseableComponents/Tables/reuseableTable';
import { Pagination } from '@/components/reuseableComponents/Tables/reuseablePagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChatLead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  carRegistration: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  engineSize: string;
  query: string;
  createdAt: string;
  status: string;
}

const statusColors: Record<string, string> = {
  'New Lead': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'Contacted': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  'Converted': 'bg-green-100 text-green-800 hover:bg-green-200',
  'Not Interested': 'bg-red-100 text-red-800 hover:bg-red-200',
};

type ColumnDef<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
};

export default function ChatLeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [chatLeads, setChatLeads] = useState<ChatLead[]>([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<ChatLead | null>(null);

  // Fetch chat leads from Google Sheets
  useEffect(() => {
    fetchChatLeads();
  }, [page, limit, searchTerm, statusFilter]);

  const fetchChatLeads = async () => {
    setIsLoading(true);
    try {
      // Fetch from Google Sheets - using the same URL as the chatbot
      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxgO6NKDDGYqwj6qWrpzQRnuz3CKgmdYQEfDyk3oiCzguKrwisG0louyp6XvOoah3IAgg/exec';
      
      // Add action parameter to fetch data
      const response = await fetch(`${GOOGLE_SHEET_URL}?action=getData`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform Google Sheets data to match our interface
      let transformedData: ChatLead[] = [];
      
      if (data && data.data && Array.isArray(data.data)) {
        // If data comes wrapped in a data property
        transformedData = data.data.map((row: any, index: number) => ({
          _id: `sheet-${index}`,
          name: row.name || row.Name || '',
          email: row.email || row.Email || '',
          phone: row.phone || row.Phone || '',
          carRegistration: row.carRegistration || row['Car Registration'] || row.carReg || '',
          vehicleMake: row.vehicleMake || row['Vehicle Make'] || row.make || '',
          vehicleModel: row.vehicleModel || row['Vehicle Model'] || row.model || '',
          vehicleYear: row.vehicleYear || row['Vehicle Year'] || row.year || '',
          engineSize: row.engineSize || row['Engine Size'] || '',
          query: row.query || row.Query || row.selectedServices || row.notes || '',
          createdAt: row.timestamp || row.Timestamp || row.createdAt || new Date().toISOString(),
          status: 'New Lead'
        }));
      } else if (data && Array.isArray(data)) {
        // If data comes as direct array
        transformedData = data.map((row: any, index: number) => ({
          _id: `sheet-${index}`,
          name: row.name || row.Name || '',
          email: row.email || row.Email || '',
          phone: row.phone || row.Phone || '',
          carRegistration: row.carRegistration || row['Car Registration'] || row.carReg || '',
          vehicleMake: row.vehicleMake || row['Vehicle Make'] || row.make || '',
          vehicleModel: row.vehicleModel || row['Vehicle Model'] || row.model || '',
          vehicleYear: row.vehicleYear || row['Vehicle Year'] || row.year || '',
          engineSize: row.engineSize || row['Engine Size'] || '',
          query: row.query || row.Query || row.selectedServices || row.notes || '',
          createdAt: row.timestamp || row.Timestamp || row.createdAt || new Date().toISOString(),
          status: 'New Lead'
        }));
      }

      // Sort by date (newest first)
      transformedData.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Apply filters
      let filteredData = transformedData;
      
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        filteredData = filteredData.filter(lead => 
          lead.name.toLowerCase().includes(search) ||
          lead.email.toLowerCase().includes(search) ||
          lead.phone.toLowerCase().includes(search) ||
          lead.carRegistration.toLowerCase().includes(search)
        );
      }
      
      if (statusFilter) {
        filteredData = filteredData.filter(lead => lead.status === statusFilter);
      }

      // Apply pagination
      const total = filteredData.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setChatLeads(paginatedData);
      setPagination({ total, totalPages });
      
      if (transformedData.length === 0) {
        toast.info('No chat leads found in Google Sheets');
      }
      
    } catch (error) {
      console.error('Error fetching chat leads from Google Sheets:', error);
      toast.error('Unable to connect to Google Sheets. Please check your connection.');
      setChatLeads([]);
      setPagination({ total: 0, totalPages: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const columns: ColumnDef<ChatLead>[] = [
    {
      header: 'Date',
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{moment(row.createdAt).format('DD/MM/YYYY HH:mm')}</span>
        </div>
      ),
      className: 'min-w-[150px]'
    },
    {
      header: 'Customer',
      accessor: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <PhoneIcon className="h-3 w-3" />
            {row.phone}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <EnvelopeIcon className="h-3 w-3" />
            {row.email}
          </div>
        </div>
      ),
      className: 'min-w-[200px]'
    },
    {
      header: 'Vehicle',
      accessor: (row) => (
        <div>
          <div className="flex items-center gap-2">
            <TruckIcon className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-900">{row.carRegistration}</span>
          </div>
          {row.vehicleMake && (
            <div className="text-sm text-gray-500 mt-1">
              {row.vehicleMake} {row.vehicleModel}
            </div>
          )}
          {row.vehicleYear && (
            <div className="text-xs text-gray-400">
              Year: {row.vehicleYear}
            </div>
          )}
        </div>
      ),
      className: 'min-w-[150px]'
    },
    {
      header: 'Inquiry',
      accessor: (row) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-700 line-clamp-2">{row.query || 'No details provided'}</p>
        </div>
      ),
      className: 'min-w-[200px]'
    },
    {
      header: 'Status',
      accessor: (row) => (
        <Badge className={statusColors[row.status] || 'bg-gray-100 text-gray-800'}>
          {row.status}
        </Badge>
      ),
      className: 'min-w-[120px]'
    },
    {
      header: 'Actions',
      accessor: (row) => (
        <button
          onClick={() => setSelectedLead(row)}
          className="text-red-600 hover:text-red-800 font-medium text-sm"
        >
          View Details
        </button>
      ),
      className: 'min-w-[100px]'
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Live Chat Leads</h1>
          </div>
          <p className="text-gray-600">Manage and track customer inquiries from live chat</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600">Total Leads</div>
            <div className="text-2xl font-bold text-gray-900">{pagination.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600">New Leads</div>
            <div className="text-2xl font-bold text-gray-900">
              {chatLeads.filter(l => l.status === 'New Lead').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="text-sm text-gray-600">Converted</div>
            <div className="text-2xl font-bold text-gray-900">
              {chatLeads.filter(l => l.status === 'Converted').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
            <div className="text-sm text-gray-600">This Month</div>
            <div className="text-2xl font-bold text-gray-900">
              {chatLeads.filter(l => moment(l.createdAt).isSame(moment(), 'month')).length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Leads</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="Search by name, email, phone, or registration..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <Select value={statusFilter || undefined} onValueChange={(value) => setStatusFilter(value || '')}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New Lead">New Lead</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                  <SelectItem value="Not Interested">Not Interested</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              onClick={fetchChatLeads}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <DataTable
            columns={columns}
            data={chatLeads}
            isLoading={isLoading}
            emptyMessage="No chat leads found"
          />
          
          <Pagination
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </div>

        {/* Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-gray-900">{selectedLead.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className="mt-1">
                        <Badge className={statusColors[selectedLead.status]}>
                          {selectedLead.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{selectedLead.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-gray-900">{selectedLead.phone}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Vehicle Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Registration</label>
                        <p className="text-gray-900">{selectedLead.carRegistration}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Make & Model</label>
                        <p className="text-gray-900">{selectedLead.vehicleMake} {selectedLead.vehicleModel}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Year</label>
                        <p className="text-gray-900">{selectedLead.vehicleYear || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Engine Size</label>
                        <p className="text-gray-900">{selectedLead.engineSize || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-gray-500">Customer Inquiry</label>
                    <p className="text-gray-900 mt-1">{selectedLead.query || 'No details provided'}</p>
                  </div>

                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-gray-500">Received</label>
                    <p className="text-gray-900">{moment(selectedLead.createdAt).format('DD MMMM YYYY, HH:mm')}</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-center"
                  >
                    Call Customer
                  </a>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex-1 border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium text-center"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
