// src/app/layout.tsx
'use client';

import type { Metadata } from 'next' 
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatbotWrapper from '@/components/ChatbotWrapper'
import StoreProvider from '@/providers/StoreProvider'
import NextAuthSessionProvider from "../providers/NextAuthSessionProvider"
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=300, initial-scale=1, maximum-scale=1, user-scalable=no"/>
        <title>The Car Edition Pro</title>
      </head>
      <NextAuthSessionProvider>
        <StoreProvider>
          <body
            className="font-poppins antialiased min-h-screen flex flex-col"
            suppressHydrationWarning={true}
          >
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            {!isDashboard && <ChatbotWrapper />}
          </body>
        </StoreProvider>
      </NextAuthSessionProvider>
    </html>
  );
}
