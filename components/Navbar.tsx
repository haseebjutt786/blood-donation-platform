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
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { user, loading, logout } = useSession()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  if (pathname.startsWith("/admin")) return null

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B91C1C] shadow-sm group-hover:shadow-md transition-shadow">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.5C9.5 7 5 9.5 5 14a7 7 0 0014 0c0-4.5-4.5-7-7-11.5z"/>
            </svg>
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            Blood<span className="text-[#B91C1C]">Connect</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive(link.href)
                  ? "text-[#B91C1C] bg-red-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-[#B91C1C]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-2.5 md:flex">
          {loading ? (
            <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-100" />
          ) : user ? (
            <>
              {user.role === "admin" && (
                <Link href="/admin" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-purple-600 transition hover:bg-purple-50">
                  ⚙️ Admin
                </Link>
              )}
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  pathname.startsWith("/dashboard") ? "bg-red-50 text-[#B91C1C]" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B91C1C] text-xs font-black text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name.split(" ")[0]}
              </Link>
              <button
                onClick={logout}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-500 transition hover:border-red-200 hover:text-[#B91C1C]"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 text-sm font-semibold text-gray-600 transition hover:text-gray-900">
                Sign In
              </Link>
              <Link
                href="/donors/register"
                className="btn-primary text-sm px-5 py-2.5"
              >
                🩸 Become a Donor
              </Link>
            </>
          )}
        </div>

        <MobileMenu user={user ?? null} onLogout={logout} />
      </div>
    </header>
  )
}
