import Link from "next/link"
import { notFound } from "next/navigation"
import DonorMapClient from "./DonorMapClient"
import type { Donor } from "../../../types/donor"

type Props = {
  params: Promise<{ id: string }>
}

async function getDonor(id: string): Promise<Donor | null> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/donors/${id}`,
      { cache: "no-store" }
    )
    const data = await res.json()
    if (!data.success) return null
    return data.donor
  } catch {
    return null
  }
}

export default async function DonorProfilePage({ params }: Props) {
  const { id } = await params
  const donor = await getDonor(id)

  if (!donor) notFound()

  const createdDate = new Date(donor.createdAt).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Extract coordinates if available
  const coords = donor.location?.coordinates
    ? { lat: donor.location.coordinates[1], lng: donor.location.coordinates[0] }
    : null

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">

        <Link
          href="/donors"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600"
        >
          ← Back to Donors
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          {/* Header */}
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-3xl font-bold text-red-600">
              {donor.bloodGroup}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{donor.name}</h1>
              <p className="mt-1 text-gray-500">📍 {donor.city}, {donor.area}</p>
              <span className={
                donor.available
                  ? "mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
                  : "mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500"
              }>
                {donor.available ? "✓ Available to Donate" : "Currently Unavailable"}
              </span>
            </div>
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Details grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailRow label="Blood Group" value={donor.bloodGroup} />
            <DetailRow label="City" value={donor.city} />
            <DetailRow label="Area" value={donor.area} />
            <DetailRow label="Phone" value={donor.phone} />
            <DetailRow label="Email" value={donor.email} />
            <DetailRow label="Registered On" value={createdDate} />
          </div>

          {/* Location map */}
          {coords && (
            <>
              <hr className="my-6 border-gray-100" />
              <div>
                <p className="mb-3 text-sm font-semibold text-gray-700">📍 Donor Location</p>
                <DonorMapClient
                  lat={coords.lat}
                  lng={coords.lng}
                  label={`${donor.name} — ${donor.bloodGroup}`}
                />
                <p className="mt-2 font-mono text-xs text-gray-400 text-center">
                  {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                </p>
              </div>
            </>
          )}

          <hr className="my-6 border-gray-100" />

          {/* CTA */}
          {donor.available ? (
            <div className="rounded-xl bg-green-50 border border-green-200 px-5 py-4">
              <p className="font-semibold text-green-800">This donor is available</p>
              <p className="mt-1 text-sm text-green-700">
                Contact directly at{" "}
                <a href={`tel:${donor.phone}`} className="font-semibold underline">
                  {donor.phone}
                </a>
              </p>
            </div>
          ) : (
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-5 py-4">
              <p className="font-semibold text-gray-700">This donor is currently unavailable</p>
              <p className="mt-1 text-sm text-gray-500">
                Try searching for other donors or{" "}
                <Link href="/requests" className="text-red-600 font-semibold hover:underline">
                  post a blood request
                </Link>.
              </p>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 font-semibold text-gray-800">{value}</p>
    </div>
  )
}
