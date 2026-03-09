import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// helper to inspect auth cookie (Supabase session)
function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('sb-access-token')?.value;
  return !!token;
}

export function proxy(request: NextRequest) {
  // if hitting /private, block unauthenticated users before rendering
  if (
    request.nextUrl.pathname === '/private' ||
    request.nextUrl.pathname.startsWith('/private/')
  ) {
    if (!isAuthenticated(request)) {
      // redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/private/:path*'],
};
