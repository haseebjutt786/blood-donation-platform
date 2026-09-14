"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "../../lib/useSession"
import type { Donor } from "../../types/donor"
import type { BloodRequest } from "../../types/request"

// ─── Sub-components ────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color }: {
  label: string; value: string | number; sub?: string; color: string
}) {
  return (
    <div className={`rounded-2xl p-6 ${color}`}>
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {sub && <p className="mt-1 text-xs opacity-60">{sub}</p>}
    </div>
  )
}

function SidebarBtn({ label, icon, active, onClick }: {
  label: string; icon: string; active?: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition text-left ${
        active
          ? "bg-red-600 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  )
}

function SidebarLink({ href, label, icon }: {
  href: string; label: string; icon: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  )
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: sessionLoading, logout } = useSession()

  const [donorProfile, setDonorProfile] = useState<Donor | null>(null)
  const [donorLoading, setDonorLoading] = useState(false)
  const [requests, setRequests] = useState<BloodRequest[]>([])
  const [requestsLoading, setRequestsLoading] = useState(true)
  const [tab, setTab] = useState<"overview" | "requests" | "profile">("overview")
  const [availToggling, setAvailToggling] = useState(false)
  const [toastMsg, setToastMsg] = useState("")

  // Redirect if not logged in
  useEffect(() => {
    if (!sessionLoading && !user) {
      router.push("/login")
    }
  }, [user, sessionLoading, router])

  // Load donor profile by email
  useEffect(() => {
    if (!user) return
    setDonorLoading(true)
    fetch(`/api/donors?showAll=1`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          const match = data.donors.find((d: Donor) => d.email === user.email)
          setDonorProfile(match || null)
        }
      })
      .catch(() => {})
      .finally(() => setDonorLoading(false))
  }, [user])

  // Load open requests for donor's blood group city
  useEffect(() => {
    setRequestsLoading(true)
    fetch("/api/requests")
      .then(r => r.json())
      .then(data => {
        if (data.success) setRequests(data.requests)
      })
      .catch(() => {})
      .finally(() => setRequestsLoading(false))
  }, [])

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(""), 3000)
  }

  const toggleAvailability = async () => {
    if (!donorProfile) return
    setAvailToggling(true)
    try {
      const res = await fetch(`/api/donors/${donorProfile._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: !donorProfile.available }),
      })
      const data = await res.json()
      if (data.success) {
        setDonorProfile(data.donor)
        showToast(`Availability set to ${data.donor.available ? "Available" : "Unavailable"}`)
      }
    } catch {
      showToast("Failed to update availability")
    } finally {
      setAvailToggling(false)
    }
  }

  // Loading / redirect states
  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-200 border-t-red-600" />
          <p className="mt-4 text-sm text-gray-500">Loading…</p>
        </div>
      </div>
    )
  }

  if (!user) return null // will redirect

  const urgentRequests = requests.filter(r => r.urgency === "urgent")

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-gray-900 px-5 py-3 text-sm text-white shadow-xl">
          {toastMsg}
        </div>
      )}

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10">

        {/* ── Sidebar ── */}
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="rounded-2xl bg-white p-4 shadow-sm">

            {/* User info */}
            <div className="mb-5 rounded-xl bg-red-50 p-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-600">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <p className="mt-2 font-semibold text-gray-900 text-sm">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 capitalize">
                {user.role}
              </span>
            </div>

            <nav className="space-y-1">
              <SidebarBtn label="Overview" icon="📊" active={tab === "overview"} onClick={() => setTab("overview")} />
              <SidebarBtn label="Blood Requests" icon="🩸" active={tab === "requests"} onClick={() => setTab("requests")} />
              <SidebarBtn label="My Profile" icon="👤" active={tab === "profile"} onClick={() => setTab("profile")} />
              <hr className="my-2" />
              <SidebarLink href="/donors" label="Find Donors" icon="🔍" />
              <SidebarLink href="/donors/register" label="Donor Register" icon="📝" />
              <SidebarLink href="/requests" label="All Requests" icon="📋" />
            </nav>

            <button
              onClick={logout}
              className="mt-4 w-full rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            >
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">

          {/* Mobile tab bar */}
          <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
            {(["overview", "requests", "profile"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  tab === t ? "bg-red-600 text-white" : "bg-white text-gray-600 border"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Page title */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.name.split(" ")[0]} 👋
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here is your Blood Connect dashboard
            </p>
          </div>

          {/* ── OVERVIEW TAB ── */}
          <div className={tab === "overview" ? "" : "hidden md:block"}>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <StatCard
                label="Total Requests"
                value={requests.length}
                sub="Open blood requests"
                color="bg-white border border-gray-100 text-gray-900 shadow-sm"
              />
              <StatCard
                label="Urgent Requests"
                value={urgentRequests.length}
                sub="Need immediate help"
                color="bg-red-50 text-red-900"
              />
              <StatCard
                label="Your Status"
                value={donorProfile ? (donorProfile.available ? "Available" : "Unavailable") : "Not Registered"}
                sub={donorProfile ? `Blood group: ${donorProfile.bloodGroup}` : "Register as donor"}
                color={donorProfile?.available ? "bg-green-50 text-green-900" : "bg-gray-50 text-gray-700"}
              />
              <StatCard
                label="Blood Group"
                value={donorProfile?.bloodGroup || "—"}
                sub={donorProfile ? `${donorProfile.city}, ${donorProfile.area}` : "Not set"}
                color="bg-blue-50 text-blue-900"
              />
            </div>

            {/* Donor profile card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900">Donor Profile</h2>
                {!donorProfile && (
                  <Link
                    href="/donors/register"
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Register as Donor
                  </Link>
                )}
              </div>

              {donorLoading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 w-48 rounded bg-gray-200" />
                  <div className="h-4 w-36 rounded bg-gray-200" />
                </div>
              ) : donorProfile ? (
                <div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-600">
                      {donorProfile.bloodGroup}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{donorProfile.name}</p>
                      <p className="text-sm text-gray-500">
                        📍 {donorProfile.city}, {donorProfile.area}
                      </p>
                      <p className="text-sm text-gray-500">📞 {donorProfile.phone}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Availability</p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        Toggle to update your availability status
                      </p>
                    </div>
                    <button
                      onClick={toggleAvailability}
                      disabled={availToggling}
                      className={`relative h-7 w-14 rounded-full transition-colors focus:outline-none ${
                        donorProfile.available ? "bg-green-500" : "bg-gray-300"
                      } disabled:opacity-60`}
                      aria-label="Toggle availability"
                    >
                      <span
                        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                          donorProfile.available ? "translate-x-7" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Link
                      href={`/donors/${donorProfile._id}`}
                      className="flex-1 rounded-lg border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View Public Profile
                    </Link>
                    <Link
                      href="/donors/register"
                      className="flex-1 rounded-lg border border-red-200 py-2.5 text-center text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Update Profile
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center">
                  <p className="text-4xl mb-3">🩸</p>
                  <p className="font-medium text-gray-700">You are not registered as a donor yet</p>
                  <p className="mt-1 text-sm text-gray-500">Register to appear in donor searches and help save lives.</p>
                  <Link
                    href="/donors/register"
                    className="mt-5 inline-block rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Register as Donor
                  </Link>
                </div>
              )}
            </div>

            {/* Recent urgent requests */}
            {urgentRequests.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">🚨 Urgent Requests</h2>
                  <Link href="/requests" className="text-sm text-red-600 hover:underline">
                    View all →
                  </Link>
                </div>
                <div className="space-y-3">
                  {urgentRequests.slice(0, 3).map(req => (
                    <div key={req._id} className="flex items-center gap-4 rounded-xl bg-red-50 p-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                        {req.bloodGroup}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{req.patientName}</p>
                        <p className="text-xs text-gray-500">{req.hospital} · {req.city}</p>
                      </div>
                      <a
                        href={`tel:${req.contactPhone}`}
                        className="shrink-0 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                      >
                        Call
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── REQUESTS TAB ── */}
          <div className={tab === "requests" ? "mt-0" : "hidden"}>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">All Open Blood Requests</h2>
                <Link href="/requests" className="text-sm text-red-600 hover:underline">
                  View full page →
                </Link>
              </div>
              {requestsLoading ? (
                <div className="space-y-3 animate-pulse">
                  {[1,2,3].map(n => (
                    <div key={n} className="h-16 rounded-xl bg-gray-100" />
                  ))}
                </div>
              ) : requests.length === 0 ? (
                <p className="py-8 text-center text-gray-500">No open requests right now.</p>
              ) : (
                <div className="space-y-3">
                  {requests.map(req => (
                    <div key={req._id} className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 hover:bg-gray-50">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        req.urgency === "urgent" ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-600"
                      }`}>
                        {req.bloodGroup}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 truncate">{req.patientName}</p>
                          {req.urgency === "urgent" && (
                            <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">Urgent</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{req.hospital} · {req.city}</p>
                      </div>
                      <a
                        href={`tel:${req.contactPhone}`}
                        className="shrink-0 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                      >
                        📞 Call
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── PROFILE TAB ── */}
          <div className={tab === "profile" ? "mt-0" : "hidden"}>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="mb-5 font-bold text-gray-900">Account Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Full Name", value: user.name },
                  { label: "Email Address", value: user.email },
                  { label: "Account Role", value: user.role.charAt(0).toUpperCase() + user.role.slice(1) },
                  { label: "User ID", value: user.id.slice(-8).toUpperCase() },
                ].map(row => (
                  <div key={row.label} className="rounded-xl bg-gray-50 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{row.label}</p>
                    <p className="mt-1 font-semibold text-gray-800">{row.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={logout}
                  className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
