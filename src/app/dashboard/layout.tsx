import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { SidebarProvider } from '@/context/sidebar-context'
import '@/app/globals.css'
import { DashboardLayout } from './(DashboardComponents)/DashboardLayout/DashboardLayout'

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Modern dashboard with sidebar navigation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
 
      <div className={`${poppins.className} bg-gray-50 text-gray-900`}>
        <SidebarProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </SidebarProvider>
      </div>
   
  )
}