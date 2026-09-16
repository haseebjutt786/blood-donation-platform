"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession } from "../../lib/useSession"

const stats = [
  { value: "10K+", label: "Lives Saved" },
  { value: "5K+", label: "Active Donors" },
  { value: "50+", label: "Cities" },
  { value: "24/7", label: "Available" },
]

export default function Hero() {
  const { user } = useSession()

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-gray-950">

      {/* ── Background Image ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1800&auto=format&fit=crop&q=85"
          alt="Blood donation — a nurse preparing for blood collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: 0.35 }}
          unoptimized
        />
      </div>

      {/* ── Gradient overlays ─────────────────────────────────── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-gray-950 via-gray-950/85 to-red-950/50" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

      {/* ── Decorative glows ──────────────────────────────────── */}
      <div className="pointer-events-none absolute right-0 top-0 z-[1] h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-rose-700/10 blur-3xl" />

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-32 pt-20 lg:pt-28">
        <div className="max-w-3xl">

          {/* Live badge */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400" />
            </span>
            Pakistan&apos;s Blood Donation Platform
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Find Blood.
            <br />
            <span className="bg-gradient-to-r from-red-400 via-rose-400 to-red-500 bg-clip-text text-transparent">
              Save Lives.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
            Connect with verified blood donors across Pakistan — instantly.
            One platform for donors, patients, and hospitals.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/donors"
              className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-7 py-4 text-base font-bold text-white shadow-2xl shadow-red-900/40 ring-1 ring-red-500/80 transition hover:bg-red-500 active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              Find a Donor
            </Link>

            <Link
              href={user ? "/donors/register" : "/login?from=/donors/register"}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/15 hover:border-white/30 active:scale-95"
            >
              🩸 Become a Donor
            </Link>

            <Link
              href={user ? "/requests" : "/login?from=/requests"}
              className="inline-flex items-center gap-2 rounded-2xl border border-red-400/25 bg-red-500/10 px-7 py-4 text-base font-bold text-red-300 backdrop-blur-sm transition hover:bg-red-500/20 active:scale-95"
            >
              🚨 Emergency Request
            </Link>
          </div>

          {/* Trust note for guests */}
          {!user && (
            <p className="mt-5 text-sm text-gray-500">
              Free to use ·{" "}
              <Link href="/register" className="text-gray-400 underline hover:text-white transition">
                Create account
              </Link>{" "}
              · No credit card required
            </p>
          )}

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(s => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:bg-white/8"
              >
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Blood groups quick links ──────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 bg-gray-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3 scrollbar-none">
          <span className="mr-2 shrink-0 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Blood Groups:
          </span>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => (
            <Link
              key={g}
              href={`/donors?bloodGroup=${g}`}
              className="shrink-0 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-300 transition hover:bg-red-500/25 hover:text-red-200"
            >
              {g}
            </Link>
          ))}
        </div>
      </div>

    </section>
  )
}
