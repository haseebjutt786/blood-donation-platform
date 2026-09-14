"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import DonorCard from "./DonorCard"
import type { Donor } from "../../types/donor"

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

function DonorsContent() {
  const searchParams = useSearchParams()

  const [bloodGroup, setBloodGroup] = useState(
    searchParams.get("bloodGroup") || "All"
  )
  const [city, setCity] = useState(searchParams.get("city") || "")
  const [results, setResults] = useState<Donor[]>([])
  const [loading, setLoading] = useState(true)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState("")

  const fetchDonors = useCallback(async (bg = bloodGroup, c = city) => {
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams()
      if (bg && bg !== "All") params.set("bloodGroup", bg)
      if (c.trim()) params.set("city", c.trim())
      const res = await fetch(`/api/donors?${params.toString()}`)
      const data = await res.json()
      if (data.success) setResults(data.donors)
      else setError(data.message || "Failed to load donors")
    } catch {
      setError("Failed to connect. Please try again.")
    } finally {
      setLoading(false)
      setSearched(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const bg = searchParams.get("bloodGroup") || "All"
    const c = searchParams.get("city") || ""
    setBloodGroup(bg)
    setCity(c)
    fetchDonors(bg, c)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchDonors(bloodGroup, city)
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-red-600 px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold md:text-5xl">
            Find a Blood Donor
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-red-100">
            Search available blood donors by blood group and location.
            Every donor can help save a life.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="mx-auto -mt-8 max-w-6xl px-6 pb-12">
        <div className="rounded-2xl bg-white p-6 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold text-gray-900">Search Donors</h2>

          <form onSubmit={handleSearch}>
            <div className="grid gap-5 md:grid-cols-3">

              {/* Blood Group */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  {bloodGroups.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Islamabad"
                  maxLength={50}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Search button aligned with fields */}
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                >
                  {loading ? "Searching…" : "Search Donors"}
                </button>
              </div>

            </div>
          </form>

        </div>
      </section>

      {/* Results Section */}
      <section className="mx-auto max-w-6xl px-6 pb-16">

        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Donors
          </h2>
          {!loading && searched && (
            <span className="text-sm text-gray-500">
              {results.length} {results.length === 1 ? "donor" : "donors"} found
            </span>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-6 py-4 text-red-700 mb-6">
            {error}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-2xl bg-white p-6 shadow-sm animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                    <div className="h-3 w-24 rounded bg-gray-200" />
                  </div>
                  <div className="h-14 w-14 rounded-full bg-gray-200" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="h-6 w-24 rounded-full bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && searched && results.length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mb-4 text-5xl">🩸</div>
            <h3 className="text-xl font-semibold text-gray-900">No donors found</h3>
            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Try a different blood group or city, or be the first to register.
            </p>
            <Link
              href="/donors/register"
              className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700"
            >
              Become a Donor
            </Link>
          </div>
        )}

        {/* Donor Cards */}
        {!loading && results.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>
        )}

      </section>

    </main>
  )
}

export default function DonorsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50">
        <section className="bg-red-600 px-6 py-16 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold md:text-5xl">Find a Blood Donor</h1>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className="rounded-2xl bg-white p-6 shadow-sm animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                    <div className="h-3 w-24 rounded bg-gray-200" />
                  </div>
                  <div className="h-14 w-14 rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    }>
      <DonorsContent />
    </Suspense>
  )
}
