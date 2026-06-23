import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/registrar', '/registrar/crear', '/registrar/editar', '/admin'];
  const loginRoute = '/login';

  // Obtener token del localStorage (en el cliente)
  // Para middleware, usamos cookies
  const token = request.cookies.get('access_token')?.value;

  // Si la ruta es protegida y no hay token, redirigir a login
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL(loginRoute, request.url));
  }

  // Si está en login y ya tiene token, redirigir a /registrar
  if (pathname === loginRoute && token) {
    return NextResponse.redirect(new URL('/registrar', request.url));
  }

  return NextResponse.next();
}

// Configurar qué rutas usar el middleware
export const config = {
  matcher: [
    '/registrar/:path*',
    '/admin/:path*',
    '/login',
  ],
};
