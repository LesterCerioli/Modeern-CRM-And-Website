import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value
  
  
  const allowedOrigins = [
    'http://localhost:8000',
    'http://localhost:3000'
  ]
  
  
  const origin = request.headers.get('origin')
  
  
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 403,
      statusText: 'Forbidden - Origin not allowed',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  
  const response = NextResponse.next()
  
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  
  const protectedRoutes = [
    '/accounting',
    '/finance',
    '/admin',
    '/sales',
    '/commercial',
    '/it',
    '/legal',
    '/marketing',
    '/administrative',
    '/tax'
  ]
  
  if (protectedRoutes.includes(path) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/accounting',
    '/finance',
    '/admin',
    '/sales',
    '/commercial',
    '/it',
    '/legal',
    '/marketing',
    '/administrative',
    '/tax',
    '/api/:path*' 
  ]
}