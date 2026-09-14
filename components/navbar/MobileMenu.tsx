"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SessionUser } from "../../lib/useSession"

type Props = {
  user: SessionUser | null
  onLogout: () => void
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/donors", label: "Find Donor" },
  { href: "/donors/nearby", label: "📍 Nearby" },
  { href: "/requests", label: "Blood Requests" },
  { href: "/about", label: "About" },
]

export default function MobileMenu({ user, onLogout }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setIsOpen(false)

  // Don't render inside admin panel
  if (pathname.startsWith("/admin")) return null

  return (
    <div className="md:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-t bg-white px-6 py-5 shadow-lg">

          {/* User info */}
          {user && (
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-red-50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              {user.role === "admin" && (
                <span className="ml-auto rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                  Admin
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-red-600"
              >
                {link.label}
              </Link>
            ))}

            <hr className="my-2" />

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={close}
                    className="rounded-lg bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 hover:bg-purple-100"
                  >
                    ⚙️ Admin Panel
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  onClick={close}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  📊 Dashboard
                </Link>
                <button
                  onClick={() => { close(); onLogout() }}
                  className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={close}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={close}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Register
                </Link>
                <Link
                  href="/donors/register"
                  onClick={close}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-red-700"
                >
                  Become a Donor
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
