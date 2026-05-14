import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Security Headers for all responses
  const response = NextResponse.next();

  // Content Security Policy - relaxed for Next.js compatibility
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://wa.me",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' blob: data: https://zdtxoprqyouczborasvf.supabase.co",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https://api.resend.com https://wa.me https://zdtxoprqyouczborasvf.supabase.co",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );

  // Other Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Admin route protection
  if (pathname.startsWith('/admin') && pathname !== '/admin' && !pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('admin_session');
    
    if (!token || !token.value) {
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Validate token (check expiration)
    try {
      const payload = JSON.parse(atob(token.value.split('.')[0]));
      if (payload.exp < Date.now()) {
        const loginUrl = new URL('/admin', request.url);
        const redirectResponse = NextResponse.redirect(loginUrl);
        redirectResponse.cookies.delete('admin_session');
        return redirectResponse;
      }
    } catch {
      const loginUrl = new URL('/admin', request.url);
      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.cookies.delete('admin_session');
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/checkout (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/checkout|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
