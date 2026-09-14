import Link from "next/link"
import type { Donor } from "../../types/donor"

type DonorCardProps = {
  donor: Donor
}

export default function DonorCard({ donor }: DonorCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      {/* Donor Information */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{donor.name}</h3>
          <p className="mt-1 text-sm text-gray-500">📍 {donor.city}</p>
          {donor.area && (
            <p className="text-xs text-gray-400">{donor.area}</p>
          )}
        </div>

        {/* Blood Group */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-lg font-bold text-red-600">
          {donor.bloodGroup}
        </div>
      </div>

      {/* Status + Action */}
      <div className="mt-5 flex items-center justify-between">
        <span
          className={
            donor.available
              ? "rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
              : "rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500"
          }
        >
          {donor.available ? "✓ Available" : "Unavailable"}
        </span>

        <Link
          href={`/donors/${donor._id}`}
          className="text-sm font-semibold text-red-600 hover:text-red-700"
        >
          View Profile →
        </Link>
      </div>

    </div>
  )
}
