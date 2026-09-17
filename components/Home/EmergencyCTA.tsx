import Link from "next/link"

export default function EmergencyCTA() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-red-700 via-red-600 to-rose-600 px-8 py-16 text-center text-white shadow-2xl shadow-red-900/30">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

        <div className="relative">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            🚨 Emergency Service — 24/7
          </span>

          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black sm:text-4xl lg:text-5xl">
            Need Blood Urgently?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-red-100">
            Don&apos;t wait. Post a blood request now and connect with available donors in your city
            within minutes. Free, instant, available around the clock.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/requests"
              className="rounded-2xl bg-white px-8 py-4 font-bold text-red-600 shadow-xl transition hover:bg-gray-50 active:scale-95"
            >
              🩸 Post a Blood Request
            </Link>
            <Link
              href="/donors"
              className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
            >
              Find a Donor Now
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-sm text-red-200">
            Free forever · No signup required to search donors · Direct contact, no middlemen
          </p>
        </div>

      </div>
    </section>
  )
}
