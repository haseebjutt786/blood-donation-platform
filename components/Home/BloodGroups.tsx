import Link from "next/link"

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]

export default function BloodGroups() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Find Blood by Group
          </h2>

          <p className="mt-3 text-gray-600">
            Select a blood group to find available donors.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {bloodGroups.map((group) => (
            <Link
              key={group}
              href={`/donors?bloodGroup=${group}`}
              className="rounded-xl border border-gray-200 bg-white p-5 text-center font-bold text-red-600 shadow-sm transition hover:-translate-y-1 hover:border-red-300 hover:shadow-md"
            >
              {group}
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}