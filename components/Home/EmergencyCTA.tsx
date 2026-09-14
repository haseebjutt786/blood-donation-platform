import Link from "next/link"

export default function EmergencyCTA() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl bg-red-600 px-8 py-14 text-center text-white">

        <h2 className="text-3xl font-bold sm:text-4xl">
          Need Blood Urgently?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-red-100">
          Create a blood request and connect with available donors
          who can help you.
        </p>

        <Link
          href="/requests"
          className="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-red-600 hover:bg-gray-100"
        >
          Create Blood Request
        </Link>

      </div>
    </section>
  )
}