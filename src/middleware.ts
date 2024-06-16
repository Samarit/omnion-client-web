import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname)
  console.log(req.cookies.get("token")?.value)
  if (
    !req.cookies.get("token")?.value &&
    req.nextUrl.pathname.startsWith("/chat")
  ) {
    console.log("redirecting")
    return NextResponse.redirect(new URL("/", req.url))
  }
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
