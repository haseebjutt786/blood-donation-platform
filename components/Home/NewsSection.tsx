import Link from "next/link"

/**
 * NEWS & EVENTS SECTION
 *
 * No fabricated events or statistics are shown here.
 * When real events happen, add them to the `events` array below
 * with accurate details. Until then, a "Coming Soon" state is shown.
 *
 * To add a real event:
 * {
 *   date: "January 2025",
 *   tag: "Donation Camp",           // or "Awareness", "Platform Update", etc.
 *   title: "Your real event title",
 *   excerpt: "2-3 sentences describing what actually happened.",
 * }
 */

type Event = {
  date: string
  tag: string
  title: string
  excerpt: string
}

// Add real events here when they happen
const events: Event[] = []

export default function NewsSection() {
  const hasEvents = events.length > 0

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-600">
              Latest Updates
            </span>
            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
              News &amp; Events
            </h2>
            <p className="mt-2 text-gray-500">
              Donation camps, awareness drives, and platform updates — all in one place.
            </p>
          </div>
          {hasEvents && (
            <Link
              href="/about"
              className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
            >
              View All Updates →
            </Link>
          )}
        </div>

        {/* Coming Soon state — shown when no real events exist */}
        {!hasEvents && (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white px-8 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
              📅
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">
              Events &amp; Updates Coming Soon
            </h3>
            <p className="mx-auto mt-3 max-w-md text-gray-500 leading-7">
              We will be posting real news, donation camp announcements, and platform updates here.
              Check back soon, or follow us on WhatsApp for the latest.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/donors/register"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700"
              >
                🩸 Register as Donor
              </Link>
              <Link
                href="/requests"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Post Blood Request
              </Link>
            </div>
          </div>
        )}

        {/* Real events list — rendered when events array is populated */}
        {hasEvents && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((item, i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                      {item.tag}
                    </span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold leading-snug text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
