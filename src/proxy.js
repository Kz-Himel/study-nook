// import { NextResponse } from 'next/server'
// import { auth } from './lib/auth'
// import { headers } from 'next/headers'
 
// // This function can be marked `async` if using `await` inside
// export async function proxy(request) {

//     const session = await auth.api.getSession({
//         headers: await headers()
//     })

//     if(!session) {
//         return NextResponse.redirect(new URL('/login', request.url))
//     }

  
// }
 
// export const config = {
//   matcher: [
//     "/my-bookings",
//     "/add-room",
//     "/my-listing",
//     "/rooms/:path"
//   ],
// }

import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
 
export async function proxy(request) {
    const { pathname } = request.nextUrl;

    if (
      pathname.startsWith('/_next') || 
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}
 
export const config = {
  matcher: [
    "/my-bookings",
    "/add-room",
    "/my-listing",
    "/rooms/:path*" 
  ],
}