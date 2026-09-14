"use client"

import { useState, useEffect } from "react"

export type SessionUser = {
  id: string
  name: string
  email: string
  role: "donor" | "admin"
}

const CACHE_KEY = "bc_user"

function readCache(): SessionUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as SessionUser) : null
  } catch {
    return null
  }
}

function writeCache(user: SessionUser | null) {
  if (typeof window === "undefined") return
  try {
    if (user) sessionStorage.setItem(CACHE_KEY, JSON.stringify(user))
    else sessionStorage.removeItem(CACHE_KEY)
  } catch {}
}

export function useSession() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show cached user instantly while we verify with server
    const cached = readCache()
    if (cached) {
      setUser(cached)
      setLoading(false)
    }

    // Always verify with server
    fetch("/api/auth/me", { credentials: "include" })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setUser(data.user)
          writeCache(data.user)
        } else {
          setUser(null)
          writeCache(null)
        }
      })
      .catch(() => {
        // Keep cached value on network error, don't wipe session
      })
      .finally(() => setLoading(false))
  }, [])

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    writeCache(null)
    setUser(null)
    window.location.href = "/"
  }

  return { user, loading, logout }
}
