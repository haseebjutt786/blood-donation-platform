import Link from "next/link"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/donors", label: "Find Donor" },
  { href: "/requests", label: "Blood Requests" },
  { href: "/donors/register", label: "Register as Donor" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const cities = [
  "Faisalabad", "Lahore", "Karachi", "Islamabad",
  "Rawalpindi", "Multan", "Peshawar", "Quetta",
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.5C9.5 7 5 9.5 5 14a7 7 0 0014 0c0-4.5-4.5-7-7-11.5z"/>
                </svg>
              </div>
              <span className="text-xl font-black text-white">BloodConnect</span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              A free platform connecting blood donors with patients in need across Pakistan.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://wa.me/923414467213"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition hover:bg-green-600 hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="mailto:bloodconnect@gmail.com"
                aria-label="Email us"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition hover:bg-red-600 hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>

            {/* Emergency CTA */}
            <div className="mt-6 rounded-xl border border-white/8 bg-white/4 p-4">
              <p className="text-xs font-bold text-white">🚨 Emergency Blood Request</p>
              <p className="mt-1 text-xs text-gray-500">Need blood urgently? Post a request instantly — free, no account needed.</p>
              <Link
                href="/requests"
                className="mt-3 inline-block rounded-lg bg-red-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-600"
              >
                Post Request Now
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Faisalabad SEO link */}
            <div className="mt-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                Featured City
              </h3>
              <Link
                href="/faisalabad-blood-donors"
                className="text-sm text-red-400 transition hover:text-red-300"
              >
                Blood Donors in Faisalabad →
              </Link>
            </div>
          </div>

          {/* Blood groups + cities */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
              Find by Blood Group
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {bloodGroups.map(g => (
                <Link
                  key={g}
                  href={`/donors?bloodGroup=${encodeURIComponent(g)}`}
                  aria-label={`Find ${g} blood donors`}
                  className="rounded-lg border border-white/8 bg-white/4 py-2 text-center text-xs font-black text-red-400 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                >
                  {g}
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                Cities
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cities.map(city => (
                  <Link
                    key={city}
                    href={`/donors?city=${encodeURIComponent(city)}`}
                    className="rounded-full border border-white/8 px-2.5 py-1 text-xs text-gray-500 transition hover:border-red-600/50 hover:text-red-400"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
              Contact
            </h3>
            <address className="not-italic space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-red-500">📍</span>
                <span className="text-gray-400">Faisalabad, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-red-500">📞</span>
                <a
                  href="tel:+923414467213"
                  className="text-gray-400 transition hover:text-white"
                >
                  +92 341 4467213
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-red-500">✉️</span>
                <a
                  href="mailto:bloodconnect@gmail.com"
                  className="text-gray-400 transition hover:text-white"
                >
                  bloodconnect@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500">🕐</span>
                <span className="text-gray-400">Platform available 24/7</span>
              </div>
            </address>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Blood Connect Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="transition hover:text-gray-400">FAQ</Link>
            <Link href="/privacy" className="transition hover:text-gray-400">Privacy</Link>
            <Link href="/contact" className="transition hover:text-gray-400">Contact</Link>
            <span>🇵🇰 Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
