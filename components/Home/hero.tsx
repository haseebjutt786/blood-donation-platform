"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession } from "../../lib/useSession"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export default function Hero() {
  const { user } = useSession()

  return (
    <section className="relative min-h-[92svh] flex flex-col justify-center overflow-hidden bg-gray-950">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1800&auto=format&fit=crop&q=80"
          alt="Blood donation — nurse preparing blood collection for a patient"
          fill priority sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: 0.28 }}
          unoptimized
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-gray-950/90 via-transparent to-transparent" />

      {/* Crimson glow */}
      <div className="pointer-events-none absolute left-0 top-1/4 z-[1] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#B91C1C]/12 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-16 lg:pt-20">

        {/* Two-column layout on large screens */}
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left — text */}
          <div className="animate-fade-slide-up">

            {/* Live ping badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
              </span>
              Free · Direct Contact · 24/7 Pakistan
            </div>

            <h1 className="text-5xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
              Find Blood.
              <br />
              <span className="text-[#F87171]">Save a Life.</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-gray-300">
              Search verified blood donors across Pakistan by blood group and city.
              Post emergency requests and get contacted directly — no middlemen, no delays.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/donors" className="btn-primary">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                Find a Donor
              </Link>
              <Link
                href={user ? "/requests" : "/login?from=/requests"}
                className="inline-flex items-center gap-2 rounded-[0.75rem] border-2 border-white/20 bg-transparent px-7 py-3 text-base font-bold text-white transition hover:border-white/40 hover:bg-white/8"
              >
                🚨 Emergency Request
              </Link>
              <Link
                href={user ? "/donors/register" : "/login?from=/donors/register"}
                className="inline-flex items-center gap-2 rounded-[0.75rem] border-2 border-[#B91C1C]/40 bg-[#B91C1C]/10 px-7 py-3 text-base font-bold text-red-300 transition hover:bg-[#B91C1C]/20"
              >
                🩸 Register as Donor
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
              {["100% Free", "No signup to search", "All Pakistan cities", "All 8 blood groups"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — quick search card */}
          <div className="hidden lg:block animate-fade-slide-up" style={{ animationDelay: "150ms" }}>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/6 backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-4">
                <h2 className="font-bold text-white">Quick Search by Blood Group</h2>
                <p className="mt-0.5 text-sm text-gray-400">Click a blood group to see donors instantly</p>
              </div>
              <div className="grid grid-cols-4 gap-2.5 p-6">
                {bloodGroups.map(g => (
                  <Link
                    key={g}
                    href={`/donors?bloodGroup=${encodeURIComponent(g)}`}
                    className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/8 bg-white/4 py-4 text-center transition hover:border-[#B91C1C]/60 hover:bg-[#B91C1C]/15"
                  >
                    <svg className="h-5 w-5 text-red-400 group-hover:text-red-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.5C9.5 7 5 9.5 5 14a7 7 0 0014 0c0-4.5-4.5-7-7-11.5z"/>
                    </svg>
                    <span className="text-base font-black text-white">{g}</span>
                  </Link>
                ))}
              </div>
              <div className="px-6 pb-5">
                <Link
                  href="/donors"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B91C1C] py-3 text-sm font-bold text-white transition hover:bg-[#991B1B]"
                >
                  Search All Donors →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom blood group bar — mobile */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 bg-gray-950/90 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-2.5 scrollbar-none">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-600 mr-1">Find:</span>
          {bloodGroups.map(g => (
            <Link key={g} href={`/donors?bloodGroup=${encodeURIComponent(g)}`}
              className="shrink-0 rounded-lg border border-red-900/30 bg-red-950/30 px-3 py-1.5 text-xs font-black text-red-300 transition hover:bg-[#B91C1C] hover:text-white hover:border-[#B91C1C]">
              {g}
            </Link>
          ))}
        </div>
      </div>

    </section>
  )
}
