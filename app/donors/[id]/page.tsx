import Link from "next/link"
import { notFound } from "next/navigation"
import type { Donor } from "../../../types/donor"

type Props = {
  params: Promise<{ id: string }>
}

async function getDonor(id: string): Promise<Donor | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/donors/${id}`, { cache: "no-store" })
    if (!res.ok) return null
    const data = await res.json()
    if (!data.success) return null
    return data.donor
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const donor = await getDonor(id)
  if (!donor) return { title: "Donor Not Found — Blood Connect" }
  return {
    title: `${donor.name} (${donor.bloodGroup}) — Blood Connect`,
    description: `${donor.name} is a blood donor in ${donor.city}. Blood group: ${donor.bloodGroup}.`,
  }
}

export default async function DonorProfilePage({ params }: Props) {
  const { id } = await params
  const donor = await getDonor(id)

  if (!donor) notFound()

  const createdDate = new Date(donor.createdAt).toLocaleDateString("en-PK", {
    year: "numeric", month: "long", day: "numeric",
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">

        <Link
          href="/donors"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-red-600"
        >
          ← Back to Donors
        </Link>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          {/* Top accent */}
          <div className={`h-2 ${donor.available ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-gray-300 to-gray-400"}`} />

          <div className="p-8 md:p-10">

            {/* Header */}
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-2xl font-black text-red-600 shadow-inner">
                {donor.bloodGroup}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900">{donor.name}</h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <span>📍</span>
                  <span>{donor.city}, {donor.area}</span>
                </p>
                <div className="mt-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${
                    donor.available
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    <span className={`h-2 w-2 rounded-full ${donor.available ? "bg-green-500" : "bg-gray-400"}`} />
                    {donor.available ? "Available to Donate" : "Currently Unavailable"}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-7 border-t border-gray-100" />

            {/* Details */}
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard icon="🩸" label="Blood Group" value={donor.bloodGroup} highlight />
              <InfoCard icon="🏙️" label="City" value={donor.city} />
              <InfoCard icon="📍" label="Area" value={donor.area} />
              <InfoCard icon="📞" label="Phone" value={donor.phone} />
              <InfoCard icon="✉️" label="Email" value={donor.email} />
              <InfoCard icon="📅" label="Registered On" value={createdDate} />
            </div>

            {/* Divider */}
            <div className="my-7 border-t border-gray-100" />

            {/* CTA */}
            {donor.available ? (
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-xl">✅</span>
                  <div>
                    <p className="font-bold text-green-900">This donor is available</p>
                    <p className="text-sm text-green-700">You can contact them directly</p>
                  </div>
                </div>
                <a
                  href={`tel:${donor.phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700"
                >
                  📞 Call {donor.phone}
                </a>
              </div>
            ) : (
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-center">
                <p className="font-semibold text-gray-700">This donor is currently unavailable</p>
                <p className="mt-1.5 text-sm text-gray-500">
                  Try searching for other donors or{" "}
                  <Link href="/requests" className="font-semibold text-red-600 hover:underline">
                    post a blood request
                  </Link>.
                </p>
                <Link
                  href="/donors"
                  className="mt-4 inline-block rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Find Other Donors
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  )
}

function InfoCard({ icon, label, value, highlight }: {
  icon: string; label: string; value: string; highlight?: boolean
}) {
  return (
    <div className={`rounded-xl px-4 py-3 ${highlight ? "bg-red-50 border border-red-100" : "bg-gray-50"}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{icon} {label}</p>
      <p className={`mt-1 font-semibold ${highlight ? "text-red-700" : "text-gray-800"}`}>{value}</p>
    </div>
  )
}
