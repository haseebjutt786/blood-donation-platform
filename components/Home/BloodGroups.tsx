import Link from "next/link"

const bloodGroups = [
  { group: "A+", label: "A Positive", donors: "Most common" },
  { group: "A-", label: "A Negative", donors: "Universal plasma" },
  { group: "B+", label: "B Positive", donors: "Common" },
  { group: "B-", label: "B Negative", donors: "Rare" },
  { group: "AB+", label: "AB Positive", donors: "Universal recipient" },
  { group: "AB-", label: "AB Negative", donors: "Rarest type" },
  { group: "O+", label: "O Positive", donors: "Most needed" },
  { group: "O-", label: "O Negative", donors: "Universal donor" },
]

export default function BloodGroups() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 text-center">
          <span className="section-label">Quick Search</span>
          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
            Find Donors by Blood Group
          </h2>
          <p className="mt-3 text-gray-500">
            Select your needed blood group to see available donors across Pakistan instantly.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 stagger">
          {bloodGroups.map(({ group, label, donors }) => (
            <Link
              key={group}
              href={`/donors?bloodGroup=${encodeURIComponent(group)}`}
              aria-label={`Find ${label} blood donors`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-[#B91C1C]/40 hover:shadow-lg hover:shadow-red-900/8 focus:outline-none focus:ring-2 focus:ring-[#B91C1C] focus:ring-offset-2"
            >
              {/* Blood drop icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 group-hover:bg-[#B91C1C]/10 transition-colors">
                <svg className="h-6 w-6 text-[#B91C1C]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.5C9.5 7 5 9.5 5 14a7 7 0 0014 0c0-4.5-4.5-7-7-11.5z"/>
                </svg>
              </div>
              <span className="text-xl font-black text-gray-900">{group}</span>
              <span className="text-xs text-gray-400 leading-tight">{donors}</span>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          All blood groups available · Donors from 50+ cities across Pakistan
        </p>

      </div>
    </section>
  )
}
