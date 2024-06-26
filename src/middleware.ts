import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  console.log(req.nextUrl.pathname)

  if (!token && !req.nextUrl.pathname.startsWith("/auth/login"))
    return NextResponse.redirect(new URL("/auth/login", req.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
