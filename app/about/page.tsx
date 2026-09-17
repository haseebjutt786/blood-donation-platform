import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About | Blood Connect Pakistan",
  description:
    "Blood Connect is a free platform that connects blood donors with patients in need across Pakistan. Search by blood group and city, post emergency requests, and get connected directly — no middlemen.",
}

const trustPoints = [
  {
    icon: "🆓",
    title: "100% Free",
    desc: "No fees for donors, patients, or anyone. The platform is completely free to use, forever.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    desc: "Search for donors by blood group and city and see matching results immediately — no waiting.",
  },
  {
    icon: "📞",
    title: "Direct Contact",
    desc: "Patients or their families contact donors directly by phone. No middleman, no delays.",
  },
  {
    icon: "🔒",
    title: "Privacy First",
    desc: "Your phone number is only shown when someone searches for your specific blood group. We never share data with third parties.",
  },
  {
    icon: "🗺️",
    title: "All of Pakistan",
    desc: "Donors and patients from every province — Punjab, Sindh, KPK, Balochistan, AJK, and more.",
  },
  {
    icon: "🕐",
    title: "Always Available",
    desc: "The platform runs 24/7. Emergency requests can be posted and found at any hour of the day.",
  },
]

const steps = [
  {
    n: "1",
    icon: "📝",
    title: "Register as a Donor",
    desc: "Create a free account and fill in your blood group, city, and phone number. Your profile becomes searchable by anyone in Pakistan who needs your blood group.",
  },
  {
    n: "2",
    icon: "🔍",
    title: "Search for Donors",
    desc: "Anyone — no account needed — can search for donors by blood group and city. Results show available donors with direct contact information.",
  },
  {
    n: "3",
    icon: "🚨",
    title: "Post an Emergency Request",
    desc: "If you can't find a matching donor, post a blood request with the patient's details, hospital, and your contact number. It goes live instantly.",
  },
  {
    n: "4",
    icon: "📞",
    title: "Get Connected",
    desc: "Donors or their families are contacted directly. No platform fee, no approval process — just a direct connection between someone who can help and someone who needs it.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#B91C1C] px-6 py-24 text-center text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-black md:text-5xl lg:text-6xl">About Blood Connect</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
            A free platform that connects blood donors with patients in need across Pakistan —
            instantly, directly, and without any middlemen.
          </p>
        </div>
      </section>

      {/* What is Blood Connect */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div className="relative h-80 overflow-hidden rounded-3xl shadow-xl lg:h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80"
                alt="Blood donation — connecting donors and patients in Pakistan"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </div>

            <div>
              <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700">
                What We Do
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight text-gray-900">
                Finding Blood Donors
                <span className="block text-[#B91C1C]">Should Take Minutes, Not Hours</span>
              </h2>
              <div className="mt-5 space-y-4 text-gray-600 leading-8">
                <p>
                  When a patient needs blood urgently in Pakistan, families often spend hours — sometimes
                  days — calling contacts, posting on social media, and hoping someone responds in time.
                  In that delay, conditions worsen. Some patients do not survive the search.
                </p>
                <p>
                  <strong>Blood Connect</strong> was built to remove that delay. Donors register once with
                  their blood group and city. When someone needs blood, they search the platform and find
                  matching donors instantly — then contact them directly by phone.
                </p>
                <p>
                  No fees. No waiting. No middlemen. Just a direct connection between a donor and a patient
                  who needs them.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/donors/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#B91C1C] px-6 py-3 font-bold text-white shadow-md shadow-red-200 transition hover:bg-red-800"
                >
                  🩸 Register as Donor
                </Link>
                <Link
                  href="/donors"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3 font-bold text-gray-700 transition hover:border-[#B91C1C] hover:text-[#B91C1C]"
                >
                  Find a Donor
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="bg-[#B91C1C] px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-red-300">Our Purpose</p>
          <blockquote className="mt-4 text-2xl font-black leading-relaxed sm:text-3xl">
            &ldquo;No one in Pakistan should lose their life because they could not find a willing
            blood donor in time.&rdquo;
          </blockquote>
          <p className="mt-5 text-sm text-red-200">
            Blood Connect exists to make blood donation accessible to every patient, in every city,
            at any hour — completely free.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700">
              Simple Process
            </span>
            <h2 className="mt-3 text-3xl font-black text-gray-900">How It Works</h2>
            <p className="mt-3 text-gray-500">Four steps between a patient in need and a donor ready to help.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(s => (
              <div key={s.n} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl">
                  {s.icon}
                </div>
                <span className="inline-block rounded-full bg-[#B91C1C] px-3 py-0.5 text-xs font-bold text-white">
                  Step {s.n}
                </span>
                <h3 className="mt-3 font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700">
              Why Trust Us
            </span>
            <h2 className="mt-3 text-3xl font-black text-gray-900">Built for Pakistan. Trusted by Donors.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map(v => (
              <div
                key={v.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="text-3xl">{v.icon}</span>
                <h3 className="mt-3 font-bold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#B91C1C] px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-black">Ready to Help?</h2>
          <p className="mt-4 text-red-100">
            Register as a blood donor in 2 minutes — or search for a donor right now.
            It&apos;s free, instant, and could save a life today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donors/register"
              className="rounded-xl bg-white px-7 py-3 font-bold text-[#B91C1C] transition hover:bg-gray-100"
            >
              Register as Donor
            </Link>
            <Link
              href="/donors"
              className="rounded-xl border border-white/40 px-7 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Find a Donor
            </Link>
            <Link
              href="/requests"
              className="rounded-xl border border-white/40 px-7 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Post Blood Request
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
