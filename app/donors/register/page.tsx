"use client"

import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import type { LocationData } from "../../../components/LocationPicker"

// Dynamic import — Leaflet requires browser APIs, no SSR
const LocationPicker = dynamic(
  () => import("../../../components/LocationPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] w-full animate-pulse rounded-xl bg-gray-100 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading map…</p>
      </div>
    ),
  }
)

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

type FormData = {
  name: string
  email: string
  phone: string
  bloodGroup: string
  city: string
  area: string
}

const emptyForm: FormData = {
  name: "",
  email: "",
  phone: "",
  bloodGroup: "",
  city: "",
  area: "",
}

export default function RegisterDonorPage() {
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const payload = {
        ...formData,
        // Include location if selected (optional)
        ...(location && {
          location: { lat: location.lat, lng: location.lng },
        }),
      }

      const res = await fetch("/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess("You are now registered as a donor! Thank you for saving lives.")
        setFormData(emptyForm)
        setLocation(null)
      } else {
        setError(data.message || "Registration failed")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
              🩸
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Register as a Donor</h1>
            <p className="mt-2 text-sm text-gray-500">
              Your information will help people find you when they need blood.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="name" value={formData.name}
                  onChange={handleChange} placeholder="Ahmed Khan" required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="you@example.com" required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            {/* Phone + Blood Group */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel" name="phone" value={formData.phone}
                  onChange={handleChange} placeholder="03XX-XXXXXXX" required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select
                  name="bloodGroup" value={formData.bloodGroup}
                  onChange={handleChange} required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            {/* City + Area */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="city" value={formData.city}
                  onChange={handleChange} placeholder="Islamabad" required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Area / Locality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="area" value={formData.area}
                  onChange={handleChange} placeholder="F-6, Blue Area…" required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            {/* Map Location Picker */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <LocationPicker
                value={location}
                onChange={setLocation}
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Registering…" : "Register as Donor"}
            </button>

          </form>
        </div>
      </div>
    </main>
  )
}
