// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { toast } from 'react-toastify';
import { 
  UserGroupIcon, 
  CheckCircleIcon,
  ClockIcon,
  InboxIcon,
  ArrowPathIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from 'moment';
import axios from 'axios';

interface DashboardStats {
  totalBookings: number;
  newBookings: number;
  completedBookings: number;
  waitingResponse: number;
  cancelledBookings: number;
  totalCustomers: number;
  recentBookings: BookingData[];
}

interface BookingData {
  _id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  vehicle: {
    registrationNumber: string;
    make: string;
    model: string;
  };
  services: {
    name: string;
    basePrice: number;
  }[];
  totalPrice: number;
  otherService: string;
  status: string;
  createdAt?: string;
}

interface Notification {
  id: string;
  timestamp: string;
  customerName: string;
  registrationNumber: string;
  service: string;
  isNew: boolean;
}

const initialStats: DashboardStats = {
  totalBookings: 0,
  newBookings: 0,
  completedBookings: 0,
  waitingResponse: 0,
  cancelledBookings: 0,
  totalCustomers: 0,
  recentBookings: []
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const bookingsRes = await axios.get('/api/filter-dashboard');
      const bookingsData = bookingsRes.data;
      
      const recentBookings = bookingsData.data.map((booking: any) => ({
        id: booking._id.toString(),
        ...booking
      }));

      const newRequests = bookingsData.data
        .filter((b: any) => 
          (b.status?.toLowerCase() === 'new request') &&
          new Date(b.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
        .map((booking: any) => ({
          id: booking._id.toString(),
          timestamp: booking.createdAt,
          customerName: booking.customer?.name || 'Unknown Customer',
          registrationNumber: booking.vehicle?.registrationNumber || 'N/A',
          service: booking.services?.[0]?.name || 'Service Request',
          isNew: true
        }));

      setNotifications(newRequests);
      setUnreadCount(newRequests.length);

      setStats({
        totalBookings: bookingsData.data.length,
        newBookings: bookingsData.totalNewRequest,
        completedBookings: bookingsData.totalCompleted,
        waitingResponse: bookingsData.totalWaitingResponse,
        cancelledBookings: bookingsData.totalCancelledJons,
        totalCustomers: 0,
        recentBookings
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'New Requests',
      value: stats.newBookings,
      icon: InboxIcon,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      borderColor: 'border-orange-100',
      link: '/dashboard/bookings/new'
    },
    {
      title: 'Waiting Response',
      value: stats.waitingResponse,
      icon: ClockIcon,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      borderColor: 'border-blue-100',
      link: '/dashboard/bookings/waiting-response'
    },
    {
      title: 'Completed Jobs',
      value: stats.completedBookings,
      icon: CheckCircleIcon,
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      borderColor: 'border-emerald-100',
      link: '/dashboard/bookings/completed'
    },
    {
      title: 'Cancelled Jobs',
      value: stats.cancelledBookings,
      icon: CheckCircleIcon,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      borderColor: 'border-red-100',
      link: '/dashboard/bookings/cancelled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'new request':
        return 'bg-amber-50 text-amber-700 border border-amber-200 font-medium';
      case 'contacted':
      case 'waiting response':
        return 'bg-blue-50 text-blue-700 border border-blue-200 font-medium';
      case 'waiting':
        return 'bg-purple-50 text-purple-700 border border-purple-200 font-medium';
      case 'booked':
        return 'bg-green-50 text-green-700 border border-green-200 font-medium';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium';
      case 'cancelled':
      case 'cancelled jobs':
        return 'bg-red-50 text-red-700 border border-red-200 font-medium';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200 font-medium';
    }
  };

  const formatNotificationDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;
    
    if (diffInHours < 24) {
      return `${Math.round(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString('en-GB', { 
        day: 'numeric',
        month: 'short'
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header Section */}
      <div className="px-6 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 gap-4 bg-gradient-to-r from-red-50 to-red-100/50">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-orbitron uppercase tracking-wider">Business Dashboard</h1>
          <p className="text-sm text-gray-600 mt-2 font-rajdhani">Monitor your automotive service operations and customer engagement</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative inline-flex items-center p-2 sm:px-3 sm:py-2 text-gray-700 hover:text-gray-900 focus:outline-none">
              <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 sm:h-5 sm:w-5 bg-red-500 text-white text-xs items-center justify-center">
                    {unreadCount}
                  </span>
                </span>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 sm:w-80">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">New Requests</h3>
                <p className="text-xs text-gray-500 mt-1">Recent service requests from customers</p>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-gray-500">
                    <InboxIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm">No new requests</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="focus:bg-gray-50 cursor-pointer">
                      <Link href={`/dashboard/bookings/new`} className="px-4 py-3 flex flex-col w-full">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.customerName}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.service} - {notification.registrationNumber}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {formatNotificationDate(notification.timestamp)}
                          </span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
              </div>
              {notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-100">
                  <Link 
                    href="/dashboard/bookings/new"
                    className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center justify-center w-full"
                  >
                    View All New Requests
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <button
            onClick={loadDashboardData}
            className="group relative inline-flex items-center px-4 py-2 text-sm font-bold font-rajdhani uppercase tracking-wider rounded-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <ArrowPathIcon className="h-4 w-4 mr-2 relative z-10" />
            <span className="relative z-10">Refresh Data</span>
          </button>
          
          <Link
            href="/dashboard/bookings/service-estimator"
            className="group relative inline-flex items-center px-4 py-2 text-sm font-bold font-rajdhani uppercase tracking-wider rounded-lg border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10">New Booking</span>
          </Link>
          
          <Link
            href="/dashboard/chat-leads"
            className="group relative inline-flex items-center px-4 py-2 text-sm font-bold font-rajdhani uppercase tracking-wider rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="relative z-10">Chat Leads</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-rajdhani">Loading business data...</p>
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2 font-orbitron">Welcome to The Car Edition</h2>
            <p className="text-gray-600 font-rajdhani">Your comprehensive automotive service management platform</p>
          </div>

          {/* Business Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <Link 
                key={index}
                href={card.link}
                className="group bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${card.color} rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-gray-900 font-orbitron">{card.value}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 font-rajdhani uppercase tracking-wider mb-1">{card.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-red-600 transition-colors duration-300 font-rajdhani">
                      <span>View Details</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Service Requests */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 gap-4 bg-gray-50">
              <div>
                <h2 className="text-lg font-bold text-gray-900 font-orbitron">Recent Service Requests</h2>
                <p className="text-sm text-gray-600 font-rajdhani">Latest customer bookings and service requests</p>
              </div>
              <Link 
                href="/dashboard/bookings/new" 
                className="inline-flex items-center text-sm text-red-600 hover:text-red-700 font-rajdhani font-bold uppercase tracking-wider group"
              >
                View All Bookings
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-[15%]" />
                  <col className="w-[18%]" />
                  <col className="w-[22%]" />
                  <col className="w-[30%]" />
                  <col className="w-[15%]" />
                </colgroup>
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-300">
                    <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wide font-orbitron">Request Date</th>
                    <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wide font-orbitron">Vehicle Reg</th>
                    <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wide font-orbitron">Customer Info</th>
                    <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wide font-orbitron">Service Details</th>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wide font-orbitron">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.recentBookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <InboxIcon className="h-12 w-12 text-gray-300 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 font-orbitron mb-2">No Recent Service Requests</h3>
                          <p className="text-gray-500 font-rajdhani mb-4">You haven't received any service requests yet.</p>
                          <Link 
                            href="/dashboard/bookings/new"
                            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-rajdhani font-bold text-sm rounded-lg transition-colors duration-300"
                          >
                            View All Requests
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    stats?.recentBookings?.map((booking) => (
                      <tr key={booking?._id} className="hover:bg-blue-50 transition-colors duration-200 group border-b border-gray-100">
                        <td className="px-3 py-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900 font-rajdhani">
                              {moment(booking?.createdAt).format("DD MMM")}
                            </span>
                            <span className="text-xs text-gray-600 font-rajdhani">
                              {moment(booking?.createdAt).format("HH:mm")}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 font-orbitron uppercase">
                              {booking?.vehicle?.registrationNumber}
                            </span>
                            <span className="text-xs text-gray-700 font-rajdhani truncate">
                              {booking?.vehicle?.make} {booking?.vehicle?.model}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 font-rajdhani truncate">
                              {booking?.customer?.name}
                            </span>
                            <span className="text-xs text-gray-600 font-rajdhani truncate">
                              {booking?.customer?.email}
                            </span>
                            <span className="text-xs text-gray-600 font-rajdhani">
                              {booking?.customer?.phone}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="space-y-2">
                            {/* Main Services - Clear Multi-line */}
                            <div className="space-y-1">
                              {booking?.services?.map((service, i) => (
                                <div key={i} className="bg-white border border-gray-200 px-3 py-2 rounded-md">
                                  <span className="text-sm font-semibold text-gray-900 font-rajdhani leading-tight block">
                                    {service.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                            
                            {/* Additional Services */}
                            {booking?.otherService && (
                              <div className="bg-blue-50 border border-blue-200 px-3 py-2 rounded-md">
                                <div className="text-xs font-bold text-blue-700 font-rajdhani uppercase mb-1">
                                  Additional Request:
                                </div>
                                <div className="text-sm font-medium text-gray-800 font-rajdhani leading-tight">
                                  {booking.otherService}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-lg font-rajdhani uppercase tracking-wide shadow-sm ${getStatusColor(booking?.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}