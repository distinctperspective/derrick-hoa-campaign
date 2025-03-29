import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/' || 
    path === '/auth/signin' || 
    path.startsWith('/api/auth') ||
    path === '/faqs' ||
    path === '/about' ||
    path === '/vision' ||
    path === '/financials' ||
    path === '/your-concerns' ||
    path === '/endorse-derrick-for-gcphoa';
  
  // Check for protected paths
  const isProtectedPath = 
    path === '/profile' || 
    path === '/request' ||
    path.startsWith('/super-admin');
  
  // Special check for admin paths
  const isAdminPath = path.startsWith('/super-admin');
  
  // Get the token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // If no token and trying to access protected path, redirect to sign in
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  
  // If token exists but trying to access admin path and not an admin
  if (token && isAdminPath && !token.isAdmin) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // For all other cases, proceed
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/',
    '/profile',
    '/request',
    '/super-admin/:path*',
    '/auth/:path*',
  ],
};
