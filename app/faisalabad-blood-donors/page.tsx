import type { Metadata } from "next"
import Link from "next/link"
import { connectDB } from "../../lib/db"
import Donor from "../../models/Donor"

export const metadata: Metadata = {
  title: "Blood Donors in Faisalabad | Find Blood Donation Faisalabad Pakistan",
  description:
    "Find blood donors in Faisalabad Pakistan instantly. All blood groups — A+, O-, B+, AB+ available. Free blood donor search platform. 24/7 service. Direct contact, no middlemen.",
  keywords: [
    "blood donors Faisalabad",
    "blood donation Faisalabad",
    "blood bank Faisalabad",
    "O negative blood Faisalabad",
    "find blood donor Faisalabad Pakistan",
    "Faisalabad blood group",
    "blood donation camp Faisalabad",
  ],
  openGraph: {
    title: "Blood Donors in Faisalabad | Blood Donation Faisalabad Pakistan",
    description: "Find verified blood donors in Faisalabad. All blood groups available. Free platform — direct contact, no middlemen.",
    url: "https://blood-donation-platform-lyart.vercel.app/faisalabad-blood-donors",
  },
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const hospitals = [
  "Allied Hospital Faisalabad",
  "DHQ Hospital Faisalabad",
  "National Hospital Faisalabad",
  "Aziz Fatima Hospital",
  "Children Hospital Faisalabad",
  "Niazi Medical Complex",
]

async function getFaisalabadStats() {
  try {
    await connectDB()
    const total = await Donor.countDocuments({ city: { $regex: "faisalabad", $options: "i" } })
    const available = await Donor.countDocuments({ city: { $regex: "faisalabad", $options: "i" }, available: true })
    return { total, available }
  } catch {
    return { total: 0, available: 0 }
  }
}

export default async function FaisalabadPage() {
  const stats = await getFaisalabadStats()

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero with local SEO */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-rose-500 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm mb-4">
            📍 Faisalabad, Punjab — Pakistan
          </span>
          <h1 className="text-4xl font-black md:text-5xl lg:text-6xl">
            Blood Donors in Faisalabad
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-red-100">
            Find verified blood donors in Faisalabad instantly. All blood groups available —
            A+, A-, B+, B-, AB+, AB-, O+, O-. Free, direct contact, 24/7.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donors?city=Faisalabad"
              className="rounded-2xl bg-white px-8 py-4 font-bold text-red-600 shadow-xl transition hover:bg-gray-50 active:scale-95"
            >
              🔍 Find Faisalabad Donors
            </Link>
            <Link
              href="/requests"
              className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
            >
              🚨 Post Emergency Request
            </Link>
          </div>
        </div>
      </section>

      {/* Local stats */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-red-50 p-6 text-center">
              <p className="text-3xl font-black text-red-600">{stats.total > 0 ? `${stats.total}+` : "Growing"}</p>
              <p className="mt-1 text-sm text-gray-600">Faisalabad Donors Registered</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-6 text-center">
              <p className="text-3xl font-black text-green-600">{stats.available > 0 ? `${stats.available}+` : "Active"}</p>
              <p className="mt-1 text-sm text-gray-600">Currently Available</p>
            </div>
            <div className="col-span-2 rounded-2xl bg-gray-50 p-6 text-center sm:col-span-1">
              <p className="text-3xl font-black text-gray-900">24/7</p>
              <p className="mt-1 text-sm text-gray-600">Platform Always Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blood group quick links */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-black text-gray-900">
          Find Blood Donors by Blood Group in Faisalabad
        </h2>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {bloodGroups.map(g => (
            <Link
              key={g}
              href={`/donors?bloodGroup=${encodeURIComponent(g)}&city=Faisalabad`}
              className="rounded-2xl border border-red-200 bg-white p-4 text-center font-black text-red-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-600 hover:text-white hover:shadow-md"
            >
              {g}
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Click any blood group to see available donors in Faisalabad matching that type.
        </p>
      </section>

      {/* Hospitals */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-2xl font-black text-gray-900">Major Hospitals in Faisalabad</h2>
          <p className="mb-6 text-gray-500">
            If you need blood for a patient at any of these hospitals, post a request and donors
            near the hospital will be notified.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hospitals.map(h => (
              <div key={h} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <span className="text-red-500">🏥</span>
                <span className="text-sm font-semibold text-gray-800">{h}</span>
              </div>
            ))}
          </div>
          <Link
            href="/requests"
            className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700 transition"
          >
            Post Request for Any Hospital →
          </Link>
        </div>
      </section>

      {/* Local SEO text block */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-xl font-black text-gray-900">Blood Donation in Faisalabad — About Our Service</h2>
          <div className="mt-4 space-y-4 text-gray-600 leading-7 text-sm">
            <p>
              <strong>Blood Connect</strong> is Faisalabad&apos;s free blood
              donor matching platform. We connect patients and their families with verified, willing
              blood donors across Faisalabad — including areas like Peoples Colony, Jinnah Colony,
              Millat Town, Canal Road, Gulistan Colony, and more.
            </p>
            <p>
              Finding blood in an emergency in Faisalabad can be extremely difficult — especially for
              rare blood groups like O- or AB-. Our platform allows donors to register once and be
              discoverable 24/7 by anyone who needs them.
            </p>
            <p>
              If you are in Faisalabad and need blood urgently, post a blood request above. If you are
              a resident of Faisalabad willing to donate blood, register as a donor — it takes 2 minutes
              and could save a life.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-black">Be a Hero in Faisalabad</h2>
          <p className="mt-3 text-red-100">Register as a blood donor today. Someone in your city needs you.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link href="/donors/register" className="rounded-xl bg-white px-7 py-3 font-bold text-red-600 hover:bg-gray-50 transition">
              Register as Donor
            </Link>
            <Link href="/donors?city=Faisalabad" className="rounded-xl border border-white/30 px-7 py-3 font-bold text-white hover:bg-white/10 transition">
              Find Donors in Faisalabad
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
