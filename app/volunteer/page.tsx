"use client"

import { useState } from "react"
import Link from "next/link"

const roles = [
  { icon: "🏕️", title: "Camp Organizer", desc: "Plan and organize blood donation camps in schools, mosques, and community centers." },
  { icon: "📢", title: "Awareness Advocate", desc: "Educate your community about blood donation through talks, posters, and social media." },
  { icon: "🚗", title: "Transport Support", desc: "Help donors reach hospitals or assist in transporting blood units safely." },
  { icon: "💻", title: "Digital Volunteer", desc: "Manage social media, create content, and help grow our online presence." },
  { icon: "🩸", title: "Blood Donor", desc: "The most direct way to help. Register as a donor and save lives with your blood." },
  { icon: "📞", title: "Helpline Support", desc: "Help patients and families find donors through our volunteer helpline." },
]

const emptyForm = { name: "", email: "", phone: "", city: "", role: "", message: "" }

export default function VolunteerPage() {
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    // Simulate submission (replace with real API when needed)
    await new Promise(r => setTimeout(r, 1000))
    setSuccess(true)
    setLoading(false)
    setForm(emptyForm)
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-rose-500 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            Get Involved
          </span>
          <h1 className="mt-5 text-4xl font-black md:text-5xl lg:text-6xl">Become a Volunteer</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-red-100">
            You don&apos;t need to donate blood to save lives. Join the Blood Connect volunteer
            network and help us connect donors with patients across Pakistan.
          </p>
        </div>
      </section>

      {/* Roles grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-black text-gray-900">Volunteer Roles</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map(r => (
            <div key={r.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="text-3xl">{r.icon}</span>
              <h3 className="mt-3 font-bold text-gray-900">{r.title}</h3>
              <p className="mt-1.5 text-sm text-gray-500 leading-6">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-2xl px-6 pb-20">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-red-600 to-rose-600" />
          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-black text-gray-900">Register as Volunteer</h2>
            <p className="mt-2 text-sm text-gray-500">Fill in the form and we&apos;ll be in touch within 48 hours.</p>

            {success ? (
              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">✅</div>
                <h3 className="font-bold text-green-900">Thank you for volunteering!</h3>
                <p className="mt-2 text-sm text-green-700">We&apos;ll contact you within 48 hours. Jazak Allah Khair!</p>
                <Link href="/" className="mt-4 inline-block text-sm font-semibold text-red-600 hover:underline">← Back to Home</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">⚠️ {error}</div>}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Ahmed Khan" required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="03XX-XXXXXXX" required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">City *</label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="Faisalabad" required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Preferred Role *</label>
                  <select name="role" value={form.role} onChange={handleChange} required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100">
                    <option value="">Select a role</option>
                    {roles.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Why do you want to volunteer?</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us a bit about yourself and your motivation…" rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full rounded-xl bg-red-600 py-4 font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 active:scale-95 disabled:opacity-60">
                  {loading ? "Submitting…" : "Register as Volunteer"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
