"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "../../../lib/useSession"
import LocationDropdowns, { type LocationSelection } from "../../../components/LocationDropdowns"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

type FormData = {
  name: string
  email: string
  phone: string
  bloodGroup: string
  province: string
  city: string
  area: string
}

type FieldErrors = Partial<Record<keyof FormData, string>>

const emptyForm: FormData = {
  name: "", email: "", phone: "",
  bloodGroup: "", province: "", city: "", area: "",
}

// ── Validation helpers ──────────────────────────────────────────────────────

/** Valid email: exactly one @, domain has exactly one dot, no consecutive dots */
function isValidEmail(email: string): boolean {
  // Strict RFC-style check — catches ahmed@gmail.com.com, a@@b.com, etc.
  const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/
  if (!re.test(email)) return false
  // Reject multiple dots after @ like gmail.com.com
  const domain = email.split("@")[1]
  const parts = domain.split(".")
  if (parts.length > 2) return false  // e.g. gmail.com.com → 3 parts
  if (parts.some(p => p.length === 0)) return false
  return true
}

/**
 * Pakistan phone validation:
 * - Must be exactly 11 digits
 * - Must start with 03
 * - Allows optional dash after first 4 digits: 03XX-XXXXXXX
 */
function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-]/g, "")
  if (!/^03\d{9}$/.test(cleaned)) return false
  return true
}

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {}

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = "Full name must be at least 2 characters"
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required"
  } else if (!isValidEmail(data.email.trim())) {
    errors.email = "Enter a valid email address (e.g. ahmed@gmail.com)"
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required"
  } else if (!isValidPhone(data.phone.trim())) {
    const cleaned = data.phone.replace(/[\s\-]/g, "")
    if (!cleaned.startsWith("03")) {
      errors.phone = "Phone must start with 03 (Pakistani number)"
    } else if (cleaned.length < 11) {
      errors.phone = `Phone number is too short — ${cleaned.length}/11 digits entered`
    } else if (cleaned.length > 11) {
      errors.phone = "Phone number is too long — must be exactly 11 digits"
    } else {
      errors.phone = "Enter a valid Pakistani phone number (e.g. 0312-3456789)"
    }
  }

  if (!data.bloodGroup) {
    errors.bloodGroup = "Please select your blood group"
  }

  if (!data.province) {
    errors.province = "Please select your province"
  }

  if (!data.city.trim() || data.city.trim().length < 2) {
    errors.city = "Please select your city"
  }

  if (!data.area.trim() || data.area.trim().length < 2) {
    errors.area = "Area / locality is required"
  }

  return errors
}

// ── Success Toast ──────────────────────────────────────────────────────────

function SuccessToast({ name, countdown }: { name: string; countdown: number }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
        {/* Animated checkmark */}
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">You&apos;re a Donor! 🩸</h2>
        <p className="mt-3 text-gray-500">
          Thank you <strong className="text-gray-800">{name}</strong>! You have been registered
          as a blood donor. People in need can now find and contact you.
        </p>

        {/* Countdown bar */}
        <div className="mt-6">
          <p className="mb-2 text-sm text-gray-400">
            Redirecting to donors list in <strong className="text-red-600">{countdown}s</strong>…
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-red-600 transition-all duration-1000 ease-linear"
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            />
          </div>
        </div>

        <Link
          href="/donors"
          className="mt-5 inline-block rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700 transition"
        >
          Go to Donors Now →
        </Link>
      </div>
    </div>
  )
}

// ── Field error component ──────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
      <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {msg}
    </p>
  )
}

// ── Input class helper ─────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
    hasError
      ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 bg-gray-50 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
  }`
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function RegisterDonorPage() {
  const router = useRouter()
  const { user, loading: sessionLoading } = useSession()

  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [submitError, setSubmitError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [countdown, setCountdown] = useState(3)

  // Track location dropdown selection separately
  const [locationSel, setLocationSel] = useState<LocationSelection>({
    province: "", city: "", hospital: "", customHospital: false,
  })

  const handleLocationChange = (sel: LocationSelection) => {
    setLocationSel(sel)
    setFormData(prev => ({ ...prev, province: sel.province, city: sel.city }))
    setFieldErrors(prev => ({ ...prev, province: undefined, city: undefined }))
  }

  // Redirect if not logged in
  useEffect(() => {
    if (!sessionLoading && !user) {
      router.push("/login?from=/donors/register")
    }
  }, [user, sessionLoading, router])

  // Countdown + auto-redirect after success
  useEffect(() => {
    if (!showSuccess) return
    if (countdown <= 0) {
      router.push("/donors")
      return
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [showSuccess, countdown, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear field-level error as user types
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    }
    setSubmitError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    // Client-side validation
    const errors = validate(formData)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      // Scroll to first error
      const firstErrorField = document.querySelector("[data-field-error]")
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setFieldErrors({})
    setLoading(true)

    try {
      const res = await fetch("/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          bloodGroup: formData.bloodGroup,
          city: formData.city.trim(),
          area: formData.area.trim(),
        }),
      })
      const data = await res.json()

      if (data.success) {
        setFormData(emptyForm)
        setFieldErrors({})
        setLocationSel({ province: "", city: "", hospital: "", customHospital: false })
        setShowSuccess(true)
        setCountdown(3)
      } else {
        setSubmitError(data.message || "Registration failed. Please try again.")
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-200 border-t-red-600" />
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      {/* Success overlay */}
      {showSuccess && <SuccessToast name={user.name} countdown={countdown} />}

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 px-4 py-12">
        <div className="mx-auto max-w-2xl">

          <Link
            href="/donors"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-red-600"
          >
            ← Back to Donors
          </Link>

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="h-1.5 bg-gradient-to-r from-red-500 via-red-600 to-red-700" />

            <div className="p-8 md:p-10">

              {/* Header */}
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-3xl">
                  🩸
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Register as a Donor</h1>
                <p className="mt-2 text-sm text-gray-500">
                  Your information will help people find you when they need blood.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Registering as <strong>{user.name}</strong>
                </div>
              </div>

              {/* Global submit error */}
              {submitError && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <svg className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div data-field-error={fieldErrors.name ? "true" : undefined}>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="name" value={formData.name}
                      onChange={handleChange} placeholder="Ahmed Khan"
                      className={inputClass(!!fieldErrors.name)}
                    />
                    <FieldError msg={fieldErrors.name} />
                  </div>

                  <div data-field-error={fieldErrors.email ? "true" : undefined}>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email" name="email" value={formData.email}
                      onChange={handleChange} placeholder="ahmed@gmail.com"
                      autoComplete="email"
                      className={inputClass(!!fieldErrors.email)}
                    />
                    <FieldError msg={fieldErrors.email} />
                  </div>
                </div>

                {/* Phone + Blood Group */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div data-field-error={fieldErrors.phone ? "true" : undefined}>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel" name="phone" value={formData.phone}
                      onChange={handleChange} placeholder="03XX-XXXXXXX"
                      maxLength={12}
                      className={inputClass(!!fieldErrors.phone)}
                    />
                    <FieldError msg={fieldErrors.phone} />
                    {!fieldErrors.phone && (
                      <p className="mt-1 text-xs text-gray-400">Pakistani number starting with 03 (11 digits)</p>
                    )}
                  </div>

                  <div data-field-error={fieldErrors.bloodGroup ? "true" : undefined}>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Blood Group <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="bloodGroup" value={formData.bloodGroup}
                      onChange={handleChange}
                      className={inputClass(!!fieldErrors.bloodGroup)}
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <FieldError msg={fieldErrors.bloodGroup} />
                  </div>
                </div>

                {/* Province → City (cascade dropdowns) */}
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                  <p className="mb-3 text-sm font-semibold text-gray-700">📍 Location</p>
                  <LocationDropdowns
                    showHospital={false}
                    onChange={handleLocationChange}
                    errors={{
                      province: fieldErrors.province,
                      city: fieldErrors.city,
                    }}
                  />
                </div>

                {/* Area / Locality (free text) */}
                <div data-field-error={fieldErrors.area ? "true" : undefined}>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Area / Locality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" name="area" value={formData.area}
                    onChange={handleChange} placeholder="F-6, Blue Area, G-10…"
                    className={inputClass(!!fieldErrors.area)}
                  />
                  <FieldError msg={fieldErrors.area} />
                </div>

                {/* Info */}
                <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs text-blue-700">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Your phone number will be visible to people searching for blood donors. Make sure it is correct.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-red-600 py-4 font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Registering…
                    </span>
                  ) : (
                    "🩸 Register as Donor"
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
