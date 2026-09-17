import Link from "next/link"

export default function VolunteerCTA() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-red-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-rose-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left */}
          <div>
            <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-semibold text-red-300">
              Get Involved
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Become a Volunteer
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-400">
              You don&apos;t need to donate blood to save lives. Help us organize donation camps,
              spread awareness in your community, or assist patients in finding donors.
              Every hour you give helps someone live.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/volunteer"
                className="rounded-2xl bg-red-600 px-7 py-4 font-bold text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500"
              >
                Register as Volunteer
              </Link>
              <Link
                href="/donors/register"
                className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                🩸 Register as Donor
              </Link>
            </div>
          </div>

          {/* Right — role cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: "🏕️", title: "Camp Organizer", desc: "Help organize blood donation camps in your city or town." },
              { icon: "📢", title: "Awareness Advocate", desc: "Spread awareness in schools, mosques, and communities." },
              { icon: "🚗", title: "Transport Support", desc: "Help donors reach hospitals or escort blood units safely." },
              { icon: "💻", title: "Digital Volunteer", desc: "Help with social media, content, and platform promotion." },
            ].map(role => (
              <div
                key={role.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/8 hover:border-red-500/30"
              >
                <span className="text-3xl">{role.icon}</span>
                <h3 className="mt-3 font-bold text-white">{role.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{role.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
