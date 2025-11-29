import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface Token {
  role?: string;
  permissions?: string[];
  email?: string;
}

// Define admin routes that require authentication
const ADMIN_ROUTES = [
  '/dashboard',
  '/dashboard/add-services',
  '/dashboard/services-list',
  '/dashboard/customer-directory',
  '/dashboard/bookings/new',
  '/dashboard/bookings/booked-services',
  '/dashboard/bookings/waiting-response',
  '/dashboard/bookings/completed',
  '/dashboard/bookings/cancelled-jobs',
  '/dashboard/add-shop',
  '/dashboard/shop-list',
  '/dashboard/add-blog',
  '/dashboard/blog-list',
  '/dashboard/add-video',
  '/dashboard/video-list',
  '/dashboard/system-setting'
];

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  const token = await getToken({ req }) as Token;
  const path = req.nextUrl.pathname;
  const isAdminRoute = ADMIN_ROUTES.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  if (!token && isAdminRoute) {
    const callbackUrl = encodeURIComponent(path);
    return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url));
  }
  if (!token?.role && isAdminRoute) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }
  const isAdmin = [
    'admin' 
  ].includes(token?.role || '');

  if (!isAdmin && isAdminRoute) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }


  return NextResponse.next();
};
