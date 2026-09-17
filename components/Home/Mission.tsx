import Link from "next/link"
import Image from "next/image"

export default function Mission() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Image side */}
          <div className="relative h-80 overflow-hidden rounded-3xl shadow-2xl lg:h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80"
              alt="Blood donation — connecting donors and patients across Pakistan"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">
                Faisalabad, Pakistan
              </p>
              <p className="mt-0.5 text-lg font-black text-gray-900">Blood Connect</p>
            </div>
          </div>

          {/* Content side */}
          <div>
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700">
              Our Story
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight text-gray-900 sm:text-4xl">
              Built to Solve a Real Problem
              <span className="block text-[#B91C1C]">in Pakistan</span>
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              When a patient urgently needs blood in Pakistan, families often spend hours making calls,
              posting on social media groups, and waiting for responses. In that delay, conditions worsen.
              Blood Connect was built to remove that delay completely.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Donors register once with their blood group and city. Patients search and find matching
              donors in seconds, then contact them directly by phone. Free, instant, no middlemen.
            </p>

            {/* Trust points */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: "🆓", title: "Always Free", desc: "No fees ever" },
                { icon: "⚡", title: "Instant Results", desc: "Find donors fast" },
                { icon: "📞", title: "Direct Contact", desc: "No middlemen" },
              ].map(v => (
                <div key={v.title} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                  <span className="text-2xl">{v.icon}</span>
                  <p className="mt-2 font-bold text-gray-900">{v.title}</p>
                  <p className="text-xs text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#B91C1C] px-7 py-3.5 font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-800"
            >
              Read Our Full Story
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
