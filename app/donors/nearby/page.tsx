"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import type { Donor } from "../../../types/donor"

// Dynamic imports — Leaflet needs browser APIs
const NearbyMap = dynamic(() => import("./NearbyMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] w-full animate-pulse rounded-2xl bg-gray-100 flex items-center justify-center">
      <p className="text-sm text-gray-400">Loading map…</p>
    </div>
  ),
})

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const RADIUS_OPTIONS = [1, 2, 5, 10, 20, 50]

type NearbyDonor = Donor & { distanceKm: number }

export default function NearbyDonorsPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [gpsLoading, setGpsLoading] = useState(false)
  const [gpsError, setGpsError] = useState("")

  const [bloodGroup, setBloodGroup] = useState("All")
  const [radius, setRadius] = useState(5)

  const [donors, setDonors] = useState<NearbyDonor[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState("")

  // Auto-fetch when location + params change
  const didMount = useRef(false)
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return }
    if (userLocation) fetchNearby()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, bloodGroup, radius])

  const getGPS = () => {
    setGpsError("")
    setGpsLoading(true)

    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.")
      setGpsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false)
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      },
      (err) => {
        setGpsLoading(false)
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError("Location permission denied. Please allow location access in your browser.")
        } else {
          setGpsError("Could not get your location. Please try again.")
        }
      },
      { timeout: 10000 }
    )
  }

  const fetchNearby = async () => {
    if (!userLocation) return
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams({
        lat: userLocation.lat.toString(),
        lng: userLocation.lng.toString(),
        radius: radius.toString(),
      })
      if (bloodGroup !== "All") params.set("bloodGroup", bloodGroup)

      const res = await fetch(`/api/donors/nearby?${params.toString()}`)
      const data = await res.json()
      if (data.success) setDonors(data.donors)
      else setError(data.message || "Failed to fetch nearby donors")
    } catch {
      setError("Connection error. Please try again.")
    } finally {
      setLoading(false)
      setSearched(true)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userLocation) {
      setGpsError("Please allow location access first.")
      return
    }
    fetchNearby()
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-red-600 px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold md:text-5xl">Nearby Blood Donors</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-red-100">
            Find available blood donors near your location — within 1 km, 5 km or more.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">

        {/* GPS + Filters */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="mb-5 font-bold text-gray-900">Search Settings</h2>

          {/* GPS button */}
          {!userLocation ? (
            <div className="mb-5">
              <button
                onClick={getGPS}
                disabled={gpsLoading}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {gpsLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Getting your location…
                  </>
                ) : (
                  <>📍 Allow Location Access</>
                )}
              </button>
              <p className="mt-2 text-xs text-gray-500">
                We need your location to find donors near you. Your location is never stored.
              </p>
            </div>
          ) : (
            <div className="mb-5 flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
              <span className="text-green-600 text-lg">✓</span>
              <div>
                <p className="text-sm font-semibold text-green-800">Location detected</p>
                <p className="font-mono text-xs text-green-600">
                  {userLocation.lat.toFixed(5)}, {userLocation.lng.toFixed(5)}
                </p>
              </div>
              <button
                onClick={() => { setUserLocation(null); setDonors([]); setSearched(false) }}
                className="ml-auto text-xs text-gray-400 hover:text-red-500"
              >
                Change
              </button>
            </div>
          )}

          {gpsError && (
            <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700">
              ⚠️ {gpsError}
            </div>
          )}

          {/* Filters */}
          <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={e => setBloodGroup(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Search Radius
              </label>
              <select
                value={radius}
                onChange={e => setRadius(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                {RADIUS_OPTIONS.map(r => (
                  <option key={r} value={r}>{r} km</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading || !userLocation}
                className="w-full rounded-lg bg-red-600 px-6 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Searching…" : "Search Nearby"}
              </button>
            </div>
          </form>
        </div>

        {/* Map + Results side by side on desktop */}
        {userLocation && (
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Map */}
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="mb-3 text-sm font-semibold text-gray-700">
                📍 Your location + nearby donors
              </p>
              <NearbyMap
                userLocation={userLocation}
                donors={donors}
                radius={radius}
              />
            </div>

            {/* Donor list */}
            <div className="space-y-4">
              {/* Header */}
              {searched && !loading && (
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Results</h2>
                  <span className="text-sm text-gray-500">
                    {donors.length} {donors.length === 1 ? "donor" : "donors"} within {radius} km
                  </span>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="space-y-3">
                  {[1,2,3].map(n => (
                    <div key={n} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gray-200 shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-32 rounded bg-gray-200" />
                          <div className="h-3 w-24 rounded bg-gray-200" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty */}
              {searched && !loading && donors.length === 0 && !error && (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
                  <div className="mb-3 text-4xl">🔍</div>
                  <p className="font-semibold text-gray-700">No donors found within {radius} km</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Try increasing the radius or changing the blood group.
                  </p>
                </div>
              )}

              {/* Donor cards */}
              {!loading && donors.map(donor => (
                <div
                  key={donor._id}
                  className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg font-bold text-red-600">
                      {donor.bloodGroup}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-gray-900 truncate">{donor.name}</p>
                        <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          {donor.distanceKm} km away
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        📍 {donor.city}, {donor.area}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={
                          donor.available
                            ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700"
                            : "rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500"
                        }>
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
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* No location yet — instructions */}
        {!userLocation && !gpsError && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mb-4 text-5xl">📍</div>
            <h3 className="text-xl font-semibold text-gray-900">Allow location to search nearby</h3>
            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Click <strong>Allow Location Access</strong> above to find blood donors near you.
              Your location is only used for this search and is never saved.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-2xl border border-red-100 bg-red-50 px-8 py-8 text-center">
          <p className="font-semibold text-gray-800">Are you a blood donor?</p>
          <p className="mt-1 text-sm text-gray-600">
            Register with your location so people near you can find you instantly.
          </p>
          <Link
            href="/donors/register"
            className="mt-4 inline-block rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Register as Donor with Location
          </Link>
        </div>

      </div>
    </main>
  )
}
