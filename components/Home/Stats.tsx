"use client"

import { useState, useEffect } from "react"
import CountUp from "./CountUp"

type StatsData = {
  users: number
  donors: number
  activeDonors: number
  requests: number
  fulfilledRequests: number
}

const FALLBACK: StatsData = {
  users: 0, donors: 0, activeDonors: 0, requests: 0, fulfilledRequests: 0,
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/stats")
      .then(r => r.json())
      .then(data => {
        setStats(data.success ? data.stats : FALLBACK)
        setLoaded(true)
      })
      .catch(() => { setStats(FALLBACK); setLoaded(true) })
  }, [])

  const s = stats ?? FALLBACK

  const items = [
    {
      value: s.users,
      suffix: s.users >= 1000 ? "k+" : "+",
      divisor: s.users >= 1000 ? 1000 : 1,
      label: "Registered Users",
      icon: "👥",
      color: "from-red-500 to-rose-600",
    },
    {
      value: s.activeDonors,
      suffix: s.activeDonors >= 1000 ? "k+" : "+",
      divisor: s.activeDonors >= 1000 ? 1000 : 1,
      label: "Active Donors",
      icon: "🩸",
      color: "from-red-600 to-red-700",
    },
    {
      value: s.requests,
      suffix: s.requests >= 1000 ? "k+" : "+",
      divisor: s.requests >= 1000 ? 1000 : 1,
      label: "Blood Requests",
      icon: "📋",
      color: "from-rose-500 to-pink-600",
    },
    {
      value: s.fulfilledRequests,
      suffix: s.fulfilledRequests >= 1000 ? "k+" : "+",
      divisor: s.fulfilledRequests >= 1000 ? 1000 : 1,
      label: "Lives Helped",
      icon: "❤️",
      color: "from-red-700 to-rose-800",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-red-50 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-red-50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-600">
            Our Impact
          </span>
          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
            Lives Changed Through Blood Donation
          </h2>
          <p className="mt-3 text-gray-500">
            Real numbers, updated live from our database.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Gradient accent top */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.color}`} />

              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-xl shadow-md`}>
                {item.icon}
              </div>

              <div className="flex items-end gap-1">
                {loaded ? (
                  <CountUp
                    end={item.divisor === 1000 ? item.value / 1000 : item.value}
                    decimals={item.divisor === 1000 ? 1 : 0}
                    className="text-4xl font-black text-gray-900"
                  />
                ) : (
                  <span className="h-10 w-20 animate-pulse rounded-lg bg-gray-100 inline-block" />
                )}
                {loaded && item.value > 0 && (
                  <span className="mb-1 text-2xl font-black text-red-600">{item.suffix}</span>
                )}
              </div>

              <p className="mt-2 text-sm font-medium text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
