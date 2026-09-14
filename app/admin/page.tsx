"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "../../lib/useSession"
import { useRouter } from "next/navigation"

// ─── Types ──────────────────────────────────────────────────────────────────

type AdminStats = {
  totalUsers: number
  totalDonors: number
  availableDonors: number
  totalRequests: number
  openRequests: number
  urgentRequests: number
  fulfilledRequests: number
}

type User = {
  _id: string
  name: string
  email: string
  role: "donor" | "admin"
  createdAt: string
}

type Donor = {
  _id: string
  name: string
  email: string
  phone: string
  bloodGroup: string
  city: string
  area: string
  available: boolean
  createdAt: string
}

type BloodRequest = {
  _id: string
  patientName: string
  bloodGroup: string
  city: string
  hospital: string
  contactPhone: string
  urgency: "urgent" | "normal"
  status: "open" | "fulfilled" | "cancelled"
  createdAt: string
}

// ─── Reusable components ─────────────────────────────────────────────────────

function StatCard({ icon, label, value, color }: {
  icon: string; label: string; value: number | string; color: string
}) {
  return (
    <div className={`rounded-2xl p-5 ${color}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm font-medium opacity-70">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    open: "bg-green-100 text-green-700",
    fulfilled: "bg-gray-100 text-gray-500",
    cancelled: "bg-orange-100 text-orange-700",
    urgent: "bg-red-100 text-red-700",
    normal: "bg-blue-50 text-blue-700",
    admin: "bg-purple-100 text-purple-700",
    donor: "bg-gray-100 text-gray-600",
  }
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${map[status] ?? "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter()
  const { user, loading: sessionLoading, logout } = useSession()

  const [tab, setTab] = useState<"overview" | "users" | "donors" | "requests">("overview")
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [donors, setDonors] = useState<Donor[]>([])
  const [requests, setRequests] = useState<BloodRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState("")

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  // Redirect if not admin
  useEffect(() => {
    if (!sessionLoading && (!user || user.role !== "admin")) {
      router.push(user ? "/dashboard" : "/login")
    }
  }, [user, sessionLoading, router])

  // Load stats on mount
  useEffect(() => {
    if (!user || user.role !== "admin") return
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(d => { if (d.success) setStats(d.stats) })
      .catch(() => {})
  }, [user])

  // Load tab data when tab changes
  useEffect(() => {
    if (!user || user.role !== "admin") return
    if (tab === "users") loadUsers()
    if (tab === "donors") loadDonors()
    if (tab === "requests") loadRequests()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, user])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const d = await fetch("/api/admin/users").then(r => r.json())
      if (d.success) setUsers(d.users)
    } catch {} finally { setLoading(false) }
  }

  const loadDonors = async () => {
    setLoading(true)
    try {
      const d = await fetch("/api/admin/donors").then(r => r.json())
      if (d.success) setDonors(d.donors)
    } catch {} finally { setLoading(false) }
  }

  const loadRequests = async () => {
    setLoading(true)
    try {
      const d = await fetch("/api/admin/requests").then(r => r.json())
      if (d.success) setRequests(d.requests)
    } catch {} finally { setLoading(false) }
  }

  const changeUserRole = async (userId: string, role: "donor" | "admin") => {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    })
    const data = await res.json()
    if (data.success) {
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role } : u))
      showToast(`Role changed to ${role}`)
    } else {
      showToast(data.message)
    }
  }

  const deleteUser = async (userId: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" })
    const data = await res.json()
    if (data.success) {
      setUsers(prev => prev.filter(u => u._id !== userId))
      showToast("User deleted")
    } else {
      showToast(data.message)
    }
  }

  const deleteDonor = async (donorId: string, name: string) => {
    if (!confirm(`Delete donor "${name}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/donors/${donorId}`, { method: "DELETE" })
    const data = await res.json()
    if (data.success) {
      setDonors(prev => prev.filter(d => d._id !== donorId))
      showToast("Donor deleted")
    } else {
      showToast(data.message)
    }
  }

  const updateRequestStatus = async (reqId: string, status: string) => {
    const res = await fetch(`/api/admin/requests/${reqId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    const data = await res.json()
    if (data.success) {
      setRequests(prev => prev.map(r => r._id === reqId ? { ...r, status: status as BloodRequest["status"] } : r))
      showToast(`Status → ${status}`)
    } else {
      showToast(data.message)
    }
  }

  const deleteRequest = async (reqId: string, name: string) => {
    if (!confirm(`Delete request for "${name}"?`)) return
    const res = await fetch(`/api/admin/requests/${reqId}`, { method: "DELETE" })
    const data = await res.json()
    if (data.success) {
      setRequests(prev => prev.filter(r => r._id !== reqId))
      showToast("Request deleted")
    } else {
      showToast(data.message)
    }
  }

  // ── Guard ──
  if (sessionLoading || !user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-200 border-t-red-600" />
      </div>
    )
  }

  const tabs = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "users", label: "Users", icon: "👥" },
    { key: "donors", label: "Donors", icon: "🩸" },
    { key: "requests", label: "Requests", icon: "📋" },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-gray-900 px-5 py-3 text-sm text-white shadow-xl animate-fade-in">
          {toast}
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white text-lg">⚙️</span>
            <div>
              <h1 className="font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">Blood Connect</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 md:inline">
              Admin: {user.name}
            </span>
            <Link
              href="/dashboard"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* Tab Bar */}
        <div className="mb-8 flex gap-2 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                tab === t.key
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
              {t.key === "users" && users.length > 0 && (
                <span className={`ml-1 rounded-full px-1.5 text-xs ${tab === t.key ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                  {users.length}
                </span>
              )}
              {t.key === "donors" && donors.length > 0 && (
                <span className={`ml-1 rounded-full px-1.5 text-xs ${tab === t.key ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                  {donors.length}
                </span>
              )}
              {t.key === "requests" && requests.length > 0 && (
                <span className={`ml-1 rounded-full px-1.5 text-xs ${tab === t.key ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                  {requests.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {tab === "overview" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Platform Overview</h2>

            {stats ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon="👥" label="Total Users" value={stats.totalUsers} color="bg-white border border-gray-100 text-gray-900 shadow-sm" />
                <StatCard icon="🩸" label="Total Donors" value={stats.totalDonors} color="bg-white border border-gray-100 text-gray-900 shadow-sm" />
                <StatCard icon="✅" label="Available Donors" value={stats.availableDonors} color="bg-green-50 text-green-900" />
                <StatCard icon="📋" label="Total Requests" value={stats.totalRequests} color="bg-white border border-gray-100 text-gray-900 shadow-sm" />
                <StatCard icon="🔓" label="Open Requests" value={stats.openRequests} color="bg-blue-50 text-blue-900" />
                <StatCard icon="🚨" label="Urgent Requests" value={stats.urgentRequests} color="bg-red-50 text-red-900" />
                <StatCard icon="💚" label="Fulfilled" value={stats.fulfilledRequests} color="bg-green-50 text-green-900" />
                <StatCard icon="📊" label="Fulfillment Rate" value={stats.totalRequests > 0 ? `${Math.round((stats.fulfilledRequests / stats.totalRequests) * 100)}%` : "0%"} color="bg-purple-50 text-purple-900" />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1,2,3,4,5,6,7,8].map(n => (
                  <div key={n} className="h-20 rounded-2xl bg-gray-200 animate-pulse" />
                ))}
              </div>
            )}

            {/* Quick actions */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="mb-4 font-bold text-gray-900">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setTab("users")} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  👥 Manage Users
                </button>
                <button onClick={() => setTab("donors")} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  🩸 Manage Donors
                </button>
                <button onClick={() => setTab("requests")} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  📋 Manage Requests
                </button>
                <Link href="/donors" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  🔍 View Donors Page
                </Link>
                <Link href="/requests" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  📩 View Requests Page
                </Link>
              </div>
            </div>


          </div>
        )}

        {/* ── USERS TAB ── */}
        {tab === "users" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">All Users</h2>
              <button onClick={loadUsers} className="text-sm text-red-600 hover:underline">Refresh</button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1,2,3,4].map(n => <div key={n} className="h-16 rounded-xl bg-gray-200 animate-pulse" />)}
              </div>
            ) : users.length === 0 ? (
              <p className="py-12 text-center text-gray-500">No users found.</p>
            ) : (
              <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left">
                        <th className="px-4 py-3 font-semibold text-gray-600">Name</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Email</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Role</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Joined</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map(u => (
                        <tr key={u._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">
                            <div className="flex items-center gap-2">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                                {u.name.charAt(0).toUpperCase()}
                              </span>
                              {u.name}
                              {u._id === user.id && (
                                <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-xs text-blue-600">You</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{u.email}</td>
                          <td className="px-4 py-3"><Badge status={u.role} /></td>
                          <td className="px-4 py-3 text-gray-400 text-xs">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {u._id !== user.id && (
                                <>
                                  {u.role === "donor" ? (
                                    <button
                                      onClick={() => changeUserRole(u._id, "admin")}
                                      className="rounded-lg bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700 hover:bg-purple-200"
                                    >
                                      Make Admin
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => changeUserRole(u._id, "donor")}
                                      className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-200"
                                    >
                                      Make Donor
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteUser(u._id, u.name)}
                                    className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── DONORS TAB ── */}
        {tab === "donors" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">All Donors</h2>
              <button onClick={loadDonors} className="text-sm text-red-600 hover:underline">Refresh</button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1,2,3,4].map(n => <div key={n} className="h-16 rounded-xl bg-gray-200 animate-pulse" />)}
              </div>
            ) : donors.length === 0 ? (
              <p className="py-12 text-center text-gray-500">No donors found.</p>
            ) : (
              <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left">
                        <th className="px-4 py-3 font-semibold text-gray-600">Name</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Blood</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">City</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Phone</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {donors.map(d => (
                        <tr key={d._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">{d.name}</p>
                            <p className="text-xs text-gray-400">{d.email}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-600">
                              {d.bloodGroup}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{d.city}, {d.area}</td>
                          <td className="px-4 py-3 text-gray-500">{d.phone}</td>
                          <td className="px-4 py-3">
                            <Badge status={d.available ? "open" : "cancelled"} />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Link
                                href={`/donors/${d._id}`}
                                className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-200"
                              >
                                View
                              </Link>
                              <button
                                onClick={() => deleteDonor(d._id, d.name)}
                                className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── REQUESTS TAB ── */}
        {tab === "requests" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">All Blood Requests</h2>
              <button onClick={loadRequests} className="text-sm text-red-600 hover:underline">Refresh</button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1,2,3,4].map(n => <div key={n} className="h-16 rounded-xl bg-gray-200 animate-pulse" />)}
              </div>
            ) : requests.length === 0 ? (
              <p className="py-12 text-center text-gray-500">No requests found.</p>
            ) : (
              <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left">
                        <th className="px-4 py-3 font-semibold text-gray-600">Patient</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Blood</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Hospital / City</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Urgency</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {requests.map(req => (
                        <tr key={req._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">{req.patientName}</p>
                            <p className="text-xs text-gray-400">{req.contactPhone}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-600">
                              {req.bloodGroup}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            <p>{req.hospital}</p>
                            <p className="text-xs text-gray-400">{req.city}</p>
                          </td>
                          <td className="px-4 py-3"><Badge status={req.urgency} /></td>
                          <td className="px-4 py-3"><Badge status={req.status} /></td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1.5">
                              {req.status !== "open" && (
                                <button
                                  onClick={() => updateRequestStatus(req._id, "open")}
                                  className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 hover:bg-green-200"
                                >
                                  Open
                                </button>
                              )}
                              {req.status !== "fulfilled" && (
                                <button
                                  onClick={() => updateRequestStatus(req._id, "fulfilled")}
                                  className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600 hover:bg-gray-200"
                                >
                                  Fulfilled
                                </button>
                              )}
                              {req.status !== "cancelled" && (
                                <button
                                  onClick={() => updateRequestStatus(req._id, "cancelled")}
                                  className="rounded bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700 hover:bg-orange-200"
                                >
                                  Cancel
                                </button>
                              )}
                              <button
                                onClick={() => deleteRequest(req._id, req.patientName)}
                                className="rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
