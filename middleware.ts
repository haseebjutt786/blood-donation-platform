import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

// Routes that require any authenticated user
const PROTECTED_ROUTES = ["/dashboard"]

// Routes that require admin role specifically
const ADMIN_ROUTES = ["/admin"]

// Routes only for unauthenticated users
const AUTH_ROUTES = ["/login", "/register"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get("bc_session")?.value
  const session = token ? await verifyToken(token) : null
  const isAuthenticated = !!session
  const isAdmin = session?.role === "admin"

  // Redirect logged-in users away from login/register
  if (AUTH_ROUTES.some(r => pathname.startsWith(r))) {
    if (isAuthenticated) {
      const dest = isAdmin ? "/admin" : "/dashboard"
      return NextResponse.redirect(new URL(dest, request.url))
    }
    return NextResponse.next()
  }

  // Protect admin routes — must be authenticated AND admin
  if (ADMIN_ROUTES.some(r => pathname.startsWith(r))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
    if (!isAdmin) {
      // Authenticated but not admin — send to their dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Protect regular dashboard — must be authenticated
  if (PROTECTED_ROUTES.some(r => pathname.startsWith(r))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
}
