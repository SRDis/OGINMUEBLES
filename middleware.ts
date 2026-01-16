import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // IMPORTANTE: Esto refresca la sesión si es necesario
  const { data: { session } } = await supabase.auth.getSession();

  const isLoginPage = req.nextUrl.pathname === '/login';
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin');

  if (isAdminPage && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};