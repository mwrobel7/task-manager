// import { NextRequest, NextResponse } from 'next/server'
// import jwt from 'jsonwebtoken'

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value

//   const pathname = req.nextUrl.pathname

//   if (!token) {
//     return NextResponse.redirect(
//       new URL('/login', req.url)
//     )
//   }

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET!
//     ) as {
//       admin: boolean
//     }

//     if (
//       pathname.startsWith('/admin-dashboard') &&
//       !decoded.admin
//     ) {
//       return NextResponse.redirect(
//         new URL('/dashboard', req.url)
//       )
//     }

//     return NextResponse.next()
//   } catch {
//     return NextResponse.redirect(
//       new URL('/login', req.url)
//     )
//   }
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/admin-dashboard/:path*'],
// }

import { NextResponse } from 'next/server'

export function middleware() {
  return NextResponse.next()
}