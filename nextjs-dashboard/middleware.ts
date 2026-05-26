import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
)

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(
      new URL('/login', req.url)
    )
  }

  try {
    const { payload } = await jwtVerify(
      token,
      secret
    )

    const pathname = req.nextUrl.pathname

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

    if (isAdminRoute && !payload.admin) {
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
    '/app-settings/:path*',
    '/users/:path*',
    '/all-tasks/:path*',
    '/account-settings/:path*',
    '/tasks/:path*',
  ],
}