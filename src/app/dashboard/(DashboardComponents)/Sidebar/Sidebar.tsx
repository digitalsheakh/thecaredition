"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Users,
  Calendar,
  FilePlus,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Video,
  Film,
  BookOpen,
  Settings,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const navSections = [
    {
      title: "Services Management",
      icon: <Users className="h-5 w-5 text-amber-500" />,
      items: [
        { href: "/dashboard/add-services", icon: <Users className="h-4 w-4" />, name: "Add Service" },
        { href: "/dashboard/services-list", icon: <Users className="h-4 w-4" />, name: "Services List" },
      ]
    },
    {
      title: "Customers Management",
      icon: <Users className="h-5 w-5 text-amber-500" />,
      items: [
        { href: "/dashboard/customer-directory", icon: <Users className="h-4 w-4" />, name: "Customer Directory" },
      ]
    },
    {
      title: "Booking Management",
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
      items: [
        { href: '/dashboard/bookings/new', icon: <FilePlus className="h-4 w-4" />, name: 'New Requests' },
        { href: '/dashboard/bookings/booked-services', icon: <CheckCircle2 className="h-4 w-4" />, name: 'Booked Services' },
        { href: '/dashboard/bookings/waiting-response', icon: <Clock className="h-4 w-4" />, name: 'Waiting Response' },
        { href: '/dashboard/bookings/completed', icon: <CheckCircle2 className="h-4 w-4" />, name: 'Completed' },
        { href: '/dashboard/bookings/cancelled-jobs', icon: <XCircle className="h-4 w-4" />, name: 'Cancelled Jobs' },
      ]
    },
    {
      title: "Shop Management",
      icon: <BookOpen className="h-5 w-5 text-amber-500" />,
      items: [
        { href: '/dashboard/add-shop', icon: <FilePlus className="h-4 w-4" />, name: 'Add Shop' },
        { href: '/dashboard/shop-list', icon: <FileText className="h-4 w-4" />, name: 'Shop List' },
      ]
    },
    {
      title: "Blog Management",
      icon: <BookOpen className="h-5 w-5 text-amber-500" />,
      items: [
        { href: '/dashboard/add-blog', icon: <FilePlus className="h-4 w-4" />, name: 'Add Blog' },
        { href: '/dashboard/blog-list', icon: <FileText className="h-4 w-4" />, name: 'Blog List' },
      ]
    },
    {
      title: "Video Management",
      icon: <Film className="h-5 w-5 text-amber-500" />,
      items: [
        { href: '/dashboard/add-video', icon: <Video className="h-4 w-4" />, name: 'Add Video' },
        { href: '/dashboard/video-list', icon: <Film className="h-4 w-4" />, name: 'Video List' },
      ]
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5 text-amber-500" />,
      items: [
        { href: '/dashboard/system-setting', icon: <Settings className="h-4 w-4" />, name: 'System Settings' },
      ]
    }
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200 lg:w-72 w-64">
      {/* Header */}
      <div className="flex h-20 items-center justify-center border-b border-gray-200 px-4 bg-gradient-to-r from-red-600 to-red-700">
        <Link href={"/dashboard"} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="font-bold text-red-600 text-lg font-orbitron">CE</span>
          </div>
          <div className="text-left">
            <span className="text-lg font-bold text-white font-orbitron block leading-tight">THE CAR EDITION</span>
            <span className="text-xs text-red-100 font-rajdhani">Business Dashboard</span>
          </div>
        </Link>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Dashboard Button */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-rajdhani font-medium",
              isActive('/dashboard')
                ? "bg-red-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-red-50 hover:text-red-600"
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard Overview</span>
          </Link>
        </div>

        {/* Business Management Sections */}
        {navSections.map((section) => (
          <div key={section.title} className="mb-4">
            <div className="flex items-center gap-3 px-3 py-2 mb-2 bg-gray-50 rounded-lg">
              <div className="text-red-600">{section.icon}</div>
              <span className="font-semibold text-gray-800 font-rajdhani text-sm uppercase tracking-wide">{section.title}</span>
            </div>
            <div className="space-y-1 ml-2">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all font-rajdhani text-sm",
                    isActive(item.href) 
                      ? "bg-red-600 text-white shadow-md" 
                      : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                  )}
                >
                  <div className="text-current">{item.icon}</div>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white transition-colors">
              <Image 
                src={session?.user?.profilePhoto || '/default-avatar.png'} 
                width={40} 
                height={40} 
                alt='profile pic' 
                className="h-10 w-10 rounded-full border-2 border-red-600 shadow-sm"
                priority
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 font-rajdhani">{session?.user?.name || 'Business Admin'}</p>
                <p className="text-xs text-gray-500 font-rajdhani">{session?.user?.email || 'admin@thecaredition.com'}</p>
              </div>
              <LogOut className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-gray-800 font-orbitron">Confirm Logout</DialogTitle>
              <DialogDescription className="text-gray-600 font-rajdhani">
                Are you sure you want to logout from the business dashboard?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="text-gray-700 border-gray-300 hover:bg-gray-50 font-rajdhani"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-rajdhani"
              >
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}