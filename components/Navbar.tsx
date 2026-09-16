"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import MobileMenu from "./navbar/MobileMenu"
import { useSession } from "../lib/useSession"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/donors", label: "Find Donor" },
  { href: "/requests", label: "Blood Requests" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { user, loading, logout } = useSession()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  // Don't render Navbar inside the admin panel (it has its own header)
  if (pathname.startsWith("/admin")) return null

  return (
    <nav className="sticky top-0 z-40 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-600">
          🩸 Blood Connect
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive(link.href)
                  ? "bg-red-50 text-red-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-red-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth area */}
        <div className="hidden items-center gap-3 md:flex">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-100" />
          ) : user ? (
            <>
              {/* Admin badge + link */}
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    pathname.startsWith("/admin")
                      ? "bg-purple-100 text-purple-700"
                      : "text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <span className="text-base">⚙️</span>
                  Admin
                </Link>
              )}

              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  pathname.startsWith("/dashboard")
                    ? "bg-red-50 text-red-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-500 transition hover:border-red-200 hover:text-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:text-red-600"
              >
                Login
              </Link>
              <Link
                href="/donors/register"
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Become a Donor
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <MobileMenu user={user ?? null} onLogout={logout} />

      </div>
    </nav>
  )
}
