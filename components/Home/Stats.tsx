"use client"

import { useState, useEffect } from "react"

type StatsData = {
  users: number
  donors: number
  activeDonors: number
  requests: number
  fulfilledRequests: number
}

function formatNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k+`
  return n > 0 ? `${n}+` : "0"
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null)

  useEffect(() => {
    fetch("/api/stats")
      .then(r => r.json())
      .then(data => { if (data.success) setStats(data.stats) })
      .catch(() => {})
  }, [])

  const items = [
    {
      value: stats ? formatNum(stats.users) : "—",
      label: "Registered Users",
    },
    {
      value: stats ? formatNum(stats.activeDonors) : "—",
      label: "Active Donors",
    },
    {
      value: stats ? formatNum(stats.requests) : "—",
      label: "Blood Requests",
    },
    {
      value: stats ? formatNum(stats.fulfilledRequests) : "—",
      label: "Lives Helped",
    },
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {items.map((stat) => (
          <div key={stat.label} className="text-center">
            <h3 className={`text-3xl font-bold text-red-600 transition-all ${!stats ? "animate-pulse" : ""}`}>
              {stat.value}
            </h3>
            <p className="mt-2 text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
