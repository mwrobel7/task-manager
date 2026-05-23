import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const pathname = req.nextUrl.pathname

  // pozwól wejść na login
  if (pathname === '/login') {
    return NextResponse.next()
  }

  // brak tokena
  if (!token) {
    return NextResponse.redirect(
      new URL('/login', req.url)
    )
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      admin: boolean
    }

    // blokada admin dashboard
    const adminRoutes = [
    '/admin-dashboard',
    '/add-user',
    ]

    const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
    )

    if (isAdminRoute && !decoded.admin) {
      return NextResponse.redirect(
        new URL('/dashboard', req.url)
      )
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(
      new URL('/login', req.url)
    )
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin-dashboard/:path*',
    '/add-user/:path*',
  ],
}