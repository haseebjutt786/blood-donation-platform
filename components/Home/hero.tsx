import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-red-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">

        <div>
          <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            🩸 Every Drop Can Save a Life
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find Blood.
            <span className="block text-red-600">
              Save Lives.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Connect with blood donors in your area and help someone
            when they need it the most.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/donors"
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Find a Donor
            </Link>

            <Link
              href="/donors/register"
              className="rounded-lg border border-red-600 px-6 py-3 font-semibold text-red-600 hover:bg-red-50"
            >
              Become a Donor
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-5xl">
              🩸
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Someone needs your blood
            </h2>

            <p className="mt-3 text-center text-gray-500">
              Your donation could be the reason someone gets another
              chance at life.
            </p>

            <Link
              href="/donors/register"
              className="mt-6 block rounded-lg bg-red-600 py-3 text-center font-semibold text-white hover:bg-red-700"
            >
              Register as Donor
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}