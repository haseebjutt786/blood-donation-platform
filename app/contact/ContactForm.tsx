"use client"

import { useState } from "react"

const emptyForm = { name: "", email: "", subject: "", message: "" }

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setForm(emptyForm)
      } else {
        setError(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please try again or reach us on WhatsApp.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✅
        </div>
        <h3 className="font-bold text-green-900">Message Sent!</h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm font-semibold text-green-700 underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ahmed Khan"
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#B91C1C] focus:bg-white focus:ring-2 focus:ring-red-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#B91C1C] focus:bg-white focus:ring-2 focus:ring-red-100"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Subject
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#B91C1C] focus:bg-white focus:ring-2 focus:ring-red-100"
        >
          <option value="">Select a subject</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Report an Issue">Report an Issue</option>
          <option value="Donor Account Help">Donor Account Help</option>
          <option value="Partnership">Partnership</option>
          <option value="Feedback">Feedback</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here…"
          rows={5}
          required
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#B91C1C] focus:bg-white focus:ring-2 focus:ring-red-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#B91C1C] py-3.5 font-bold text-white shadow-md shadow-red-200 transition hover:bg-red-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending…
          </span>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        For urgent blood needs, please{" "}
        <a href="/requests" className="font-semibold text-[#B91C1C] hover:underline">
          post a blood request
        </a>{" "}
        instead — it&apos;s much faster.
      </p>

    </form>
  )
}
