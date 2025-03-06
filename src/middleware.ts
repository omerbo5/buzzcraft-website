import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Manage route protection
  const isAuth = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

  const sensitiveRoutes = ['/dashboard'];
  const isAccessingSensitiveRoute = sensitiveRoutes.some((route) => 
    pathname.startsWith(route)
  );

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (isAccessingSensitiveRoute && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup',
  ],
};
