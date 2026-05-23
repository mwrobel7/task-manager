import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // public routes
  const publicRoutes = [
    '/login',
  ]

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // ignoruj API i Next assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get('token')?.value

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

    const adminRoutes = [
      '/admin-dashboard',
      '/add-user',
      '/app-settings',
      '/users',
      '/all-tasks',
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
  matcher: '/:path*',
}