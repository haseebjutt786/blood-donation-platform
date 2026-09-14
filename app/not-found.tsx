import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="text-7xl mb-6">🩸</div>
      <h1 className="text-5xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-xl font-semibold text-gray-700">Page not found</p>
      <p className="mt-2 max-w-md text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Go Home
        </Link>
        <Link
          href="/donors"
          className="rounded-lg border border-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
        >
          Find Donors
        </Link>
      </div>
    </main>
  )
}
