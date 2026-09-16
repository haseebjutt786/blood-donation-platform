"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "../../lib/useSession"
import LocationDropdowns, { type LocationSelection } from "../../components/LocationDropdowns"
import type { BloodRequest } from "../../types/request"

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(h / 24)
  if (d > 0) return `${d}d ago`
  if (h > 0) return `${h}h ago`
  return "Just now"
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  return urgency === "urgent" ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 border border-red-200">
      🚨 Urgent
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
      Normal
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    open: "bg-green-100 text-green-700",
    fulfilled: "bg-gray-100 text-gray-500",
    cancelled: "bg-orange-100 text-orange-700",
  }
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${map[status] ?? map.open}`}>
      {status}
    </span>
  )
}

function RequestCard({ req }: { req: BloodRequest }) {
  return (
    <div className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-lg font-black text-red-600">
            {req.bloodGroup}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{req.patientName}</h3>
            <p className="text-sm text-gray-500">📍 {req.city}</p>
          </div>
        </div>
        <UrgencyBadge urgency={req.urgency} />
      </div>

      <div className="mt-4 space-y-1.5 text-sm text-gray-600">
        <p>🏥 <span className="font-medium">{req.hospital}</span></p>
        {req.message && (
          <p className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500 italic">
            &ldquo;{req.message}&rdquo;
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <StatusBadge status={req.status} />
        <span className="text-xs text-gray-400">{timeAgo(req.createdAt)}</span>
      </div>

      {req.status === "open" && (
        <a
          href={`tel:${req.contactPhone}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95"
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
        <div className="h-14 w-14 rounded-2xl bg-gray-200 shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-3 w-24 rounded bg-gray-200" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-3/4 rounded bg-gray-200" />
      </div>
      <div className="mt-5 h-11 w-full rounded-xl bg-gray-200" />
    </div>
  )
}

const emptyForm = {
  patientName: "", bloodGroup: "", city: "", hospital: "",
  contactPhone: "", message: "", urgency: "normal",
}

export default function RequestsPage() {
  const { user, loading: sessionLoading } = useSession()

  const [requests, setRequests] = useState<BloodRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [bloodGroup, setBloodGroup] = useState("All")
  const [city, setCity] = useState("")
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState(emptyForm)
  const [reqLocation, setReqLocation] = useState<LocationSelection>({
    province: "", city: "", hospital: "", customHospital: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")

  const handleLocationChange = (sel: LocationSelection) => {
    setReqLocation(sel)
    setFormError("")
  }

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

  useEffect(() => { fetchRequests() }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

    // Validate location fields
    if (!reqLocation.province) {
      setFormError("Please select a province")
      return
    }
    if (!reqLocation.city) {
      setFormError("Please select a city")
      return
    }
    const hospital = reqLocation.customHospital
      ? reqLocation.hospital.trim()
      : reqLocation.hospital
    if (!hospital) {
      setFormError("Please select or enter a hospital name")
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        ...form,
        city: reqLocation.city,
        hospital,
      }
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setFormSuccess("Blood request posted successfully!")
        setForm(emptyForm)
        setReqLocation({ province: "", city: "", hospital: "", customHospital: false })
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

  // Handle post request button click — require login
  const handlePostClick = () => {
    if (!user && !sessionLoading) {
      window.location.href = "/login?from=/requests"
      return
    }
    setShowForm(!showForm)
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-500 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm mb-4">
            🩸 Lives Depend on You
          </span>
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Blood Requests</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-red-100">
            People in need are searching for blood donors right now.
            If you can help, please reach out directly.
          </p>
          <button
            onClick={handlePostClick}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-red-600 shadow-lg transition hover:bg-gray-50 hover:shadow-xl active:scale-95"
          >
            {showForm ? "✕ Cancel" : "🩸 Post a Blood Request"}
          </button>
          {!user && !sessionLoading && (
            <p className="mt-3 text-sm text-red-200">
              You need to{" "}
              <Link href="/login?from=/requests" className="font-semibold text-white underline">
                sign in
              </Link>{" "}
              to post a request
            </p>
          )}
        </div>
      </section>

      {/* Post Request Form — only shown when logged in */}
      {showForm && user && (
        <section className="mx-auto max-w-2xl px-4 -mt-2 pb-4">
          <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-xl">🩸</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Post a Blood Request</h2>
                <p className="text-xs text-gray-500">Fill in the details below</p>
              </div>
            </div>

            {formError && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                ⚠️ {formError}
              </div>
            )}
            {formSuccess && (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                ✅ {formSuccess}
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
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bloodGroup" value={form.bloodGroup} onChange={handleFormChange} required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.slice(1).map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              {/* Province → City → Hospital cascade dropdowns */}
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                <p className="mb-3 text-sm font-semibold text-gray-700">🏥 Hospital Location</p>
                <LocationDropdowns
                  showHospital={true}
                  onChange={handleLocationChange}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="contactPhone" value={form.contactPhone} onChange={handleFormChange}
                    placeholder="03XX-XXXXXXX" required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Urgency</label>
                  <select
                    name="urgency" value={form.urgency} onChange={handleFormChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">🚨 Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Additional Message
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleFormChange}
                  placeholder="Any additional details about the patient or situation..."
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 resize-none"
                />
              </div>

              <button
                type="submit" disabled={submitting}
                className="w-full rounded-xl bg-red-600 py-3.5 font-semibold text-white transition hover:bg-red-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Posting…" : "Post Blood Request"}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Filter bar */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <form onSubmit={handleSearch} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[140px]">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">Blood Group</label>
              <select
                value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              >
                {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">City</label>
              <input
                type="text" value={city} onChange={e => setCity(e.target.value)}
                placeholder="e.g. Lahore" maxLength={50}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 transition active:scale-95"
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
            <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-500 shadow-sm border">
              {requests.length} {requests.length === 1 ? "request" : "requests"}
            </span>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map(n => <SkeletonCard key={n} />)}
          </div>
        )}

        {!loading && !error && requests.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">🩸</div>
            <h3 className="text-xl font-semibold text-gray-900">No open requests</h3>
            <p className="mx-auto mt-2 max-w-md text-gray-500">
              No blood requests match your filters right now.
            </p>
            <button
              onClick={handlePostClick}
              className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700"
            >
              Post a Request
            </button>
          </div>
        )}

        {!loading && requests.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map(req => <RequestCard key={req._id} req={req} />)}
          </div>
        )}

        {!loading && requests.length > 0 && (
          <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-red-700 to-red-500 px-8 py-12 text-center text-white">
            <h3 className="text-2xl font-bold">Are you a blood donor?</h3>
            <p className="mx-auto mt-2 max-w-xl text-red-100">
              Register as a donor so people in need can find and contact you directly.
            </p>
            <Link
              href="/donors/register"
              className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-red-600 hover:bg-gray-100 transition"
            >
              Register as Donor
            </Link>
          </div>
        )}
      </section>

    </main>
  )
}
