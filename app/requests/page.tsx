"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import type { BloodRequest } from "../../types/request"
import type { LocationData } from "../../components/LocationPicker"

// Dynamic import — Leaflet needs browser APIs
const LocationPicker = dynamic(
  () => import("../../components/LocationPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] w-full animate-pulse rounded-xl bg-gray-100 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading map…</p>
      </div>
    ),
  }
)

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const urgencyBadge = (urgency: string) =>
  urgency === "urgent"
    ? "bg-red-100 text-red-700 border border-red-200"
    : "bg-blue-50 text-blue-700 border border-blue-200"

const statusBadge = (status: string) => {
  if (status === "open") return "bg-green-100 text-green-700"
  if (status === "fulfilled") return "bg-gray-100 text-gray-500"
  return "bg-orange-100 text-orange-700"
}

function RequestCard({ req }: { req: BloodRequest }) {
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const h = Math.floor(diff / 3600000)
    const d = Math.floor(h / 24)
    if (d > 0) return `${d}d ago`
    if (h > 0) return `${h}h ago`
    return "Just now"
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition hover:-translate-y-1 hover:shadow-md">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg font-bold text-red-600">
            {req.bloodGroup}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{req.patientName}</h3>
            <p className="text-sm text-gray-500">📍 {req.city}</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${urgencyBadge(req.urgency)}`}>
          {req.urgency === "urgent" ? "🚨 Urgent" : "Normal"}
        </span>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-1.5 text-sm text-gray-600">
        <p>🏥 <span className="font-medium">{req.hospital}</span></p>
        {req.message && <p className="text-gray-500 italic">&ldquo;{req.message}&rdquo;</p>}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusBadge(req.status)}`}>
          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
        </span>
        <span className="text-xs text-gray-400">{timeAgo(req.createdAt)}</span>
      </div>

      {/* Contact button */}
      {req.status === "open" && (
        <a
          href={`tel:${req.contactPhone}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          📞 Contact — {req.contactPhone}
        </a>
      )}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="h-14 w-14 rounded-full bg-gray-200 shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-3 w-24 rounded bg-gray-200" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-3/4 rounded bg-gray-200" />
      </div>
      <div className="mt-5 h-9 w-full rounded-lg bg-gray-200" />
    </div>
  )
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [bloodGroup, setBloodGroup] = useState("All")
  const [city, setCity] = useState("")
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [form, setForm] = useState({
    patientName: "", bloodGroup: "", city: "", hospital: "",
    contactPhone: "", message: "", urgency: "normal",
  })
  const [requestLocation, setRequestLocation] = useState<LocationData | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")

  const fetchRequests = async (bg = bloodGroup, c = city) => {
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams()
      if (bg !== "All") params.set("bloodGroup", bg)
      if (c.trim()) params.set("city", c.trim())
      const res = await fetch(`/api/requests?${params.toString()}`)
      const data = await res.json()
      if (data.success) setRequests(data.requests)
      else setError(data.message || "Failed to load requests")
    } catch {
      setError("Failed to connect. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchRequests(bloodGroup, city)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setFormError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")
    setFormSuccess("")
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        ...(requestLocation && {
          location: { lat: requestLocation.lat, lng: requestLocation.lng },
        }),
      }
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setFormSuccess("Blood request posted successfully!")
        setForm({ patientName: "", bloodGroup: "", city: "", hospital: "", contactPhone: "", message: "", urgency: "normal" })
        setRequestLocation(null)
        setShowForm(false)
        fetchRequests()
      } else {
        setFormError(data.message || "Submission failed")
      }
    } catch {
      setFormError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-red-600 px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold md:text-5xl">Blood Requests</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-red-100">
            People in need are searching for blood donors right now.
            If you can help, please reach out directly.
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-red-600 transition hover:bg-gray-100"
          >
            {showForm ? "✕ Cancel" : "🩸 Post a Blood Request"}
          </button>
        </div>
      </section>

      {/* Post Request Form */}
      {showForm && (
        <section className="mx-auto max-w-2xl px-4 py-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Post a Blood Request</h2>

            {formError && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="patientName" value={form.patientName} onChange={handleFormChange}
                    placeholder="Full name" required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bloodGroup" value={form.bloodGroup} onChange={handleFormChange} required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.slice(1).map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="city" value={form.city} onChange={handleFormChange}
                    placeholder="Islamabad" required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Hospital <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="hospital" value={form.hospital} onChange={handleFormChange}
                    placeholder="PIMS Hospital" required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="contactPhone" value={form.contactPhone} onChange={handleFormChange}
                    placeholder="03XX-XXXXXXX" required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Urgency</label>
                  <select
                    name="urgency" value={form.urgency} onChange={handleFormChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Additional Message
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleFormChange}
                  placeholder="Any additional details..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 resize-none"
                />
              </div>

              {/* Map Location Picker */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <LocationPicker
                  value={requestLocation}
                  onChange={setRequestLocation}
                />
              </div>

              <button
                type="submit" disabled={submitting}
                className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Posting…" : "Post Blood Request"}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Filter */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <form onSubmit={handleSearch} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[140px]">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Blood Group</label>
              <select
                value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-red-500"
              >
                {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
              <input
                type="text" value={city} onChange={e => setCity(e.target.value)}
                placeholder="e.g. Lahore" maxLength={50}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-red-500"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              Filter
            </button>
          </div>
        </form>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Open Requests</h2>
          {!loading && (
            <span className="text-sm text-gray-500">{requests.length} {requests.length === 1 ? "request" : "requests"}</span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map(n => <SkeletonCard key={n} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && requests.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mb-4 text-5xl">🩸</div>
            <h3 className="text-xl font-semibold text-gray-900">No open requests</h3>
            <p className="mx-auto mt-2 max-w-md text-gray-500">
              No blood requests match your filters right now.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700"
            >
              Post a Request
            </button>
          </div>
        )}

        {/* Cards */}
        {!loading && requests.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map(req => <RequestCard key={req._id} req={req} />)}
          </div>
        )}

        {/* Donor CTA */}
        {!loading && requests.length > 0 && (
          <div className="mt-12 rounded-2xl bg-red-600 px-8 py-10 text-center text-white">
            <h3 className="text-2xl font-bold">Are you a blood donor?</h3>
            <p className="mx-auto mt-2 max-w-xl text-red-100">
              Register as a donor so people in need can find and contact you directly.
            </p>
            <Link
              href="/donors/register"
              className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-red-600 hover:bg-gray-100"
            >
              Register as Donor
            </Link>
          </div>
        )}
      </section>

    </main>
  )
}
