import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfig } from "./auth.config";

import { publicRoutes, publicEndpoints } from "./utils";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;

  // Permitir acceso a la ruta de registro sin autenticación
  if (publicEndpoints.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Permitir acceso a la ruta principal (/) para todos los usuarios
  if (nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // Si el usuario no está autenticado y no está en rutas públicas, redirigir al login
  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  // Si el usuario está autenticado y trata de acceder al login, redirigir al admin
  if (publicRoutes.includes(nextUrl.pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', nextUrl));
  }

  // Permitir acceso a otras rutas
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
