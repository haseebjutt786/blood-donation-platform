import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — Blood Connect",
  description: "Learn about Blood Connect, our mission, and how we help connect blood donors with people in need.",
}

const stats = [
  { value: "8", label: "Blood Types Supported" },
  { value: "100%", label: "Free Platform" },
  { value: "24/7", label: "Always Available" },
  { value: "❤️", label: "Made with Purpose" },
]

const howItWorks = [
  {
    step: "1",
    title: "Register as a Donor",
    description:
      "Fill in your details — blood group, city, and contact. It takes less than 2 minutes.",
    icon: "📝",
  },
  {
    step: "2",
    title: "Get Discovered",
    description:
      "People in need search by blood group and city. Your profile becomes visible to those who need you.",
    icon: "🔍",
  },
  {
    step: "3",
    title: "Connect Directly",
    description:
      "Requesters contact you directly by phone. No middleman, no delays.",
    icon: "📞",
  },
  {
    step: "4",
    title: "Save a Life",
    description:
      "Donate blood and make a real difference in someone's life.",
    icon: "🩸",
  },
]

const team = [
  {
    name: "Built for Pakistan",
    description:
      "Blood Connect was created to solve a real problem — finding blood donors quickly in a medical emergency.",
  },
  {
    name: "Open & Free",
    description:
      "The platform is completely free for donors and requesters. No fees, no subscriptions.",
  },
  {
    name: "Privacy First",
    description:
      "Your contact details are only shared with people actively searching for a blood group match.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-red-600 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-4xl">
            🩸
          </div>
          <h1 className="text-4xl font-bold md:text-5xl">About Blood Connect</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-red-100">
            We are on a mission to make blood donation easy, fast, and accessible for everyone.
            When every minute matters, we help you find the right donor instantly.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-gray-50 py-14">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-red-600">{s.value}</p>
              <p className="mt-2 text-sm text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-600">
                Our Mission
              </span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Connecting donors with people who need blood — fast
              </h2>
              <p className="mt-4 leading-8 text-gray-600">
                In Pakistan and across the world, thousands of people need blood
                transfusions every day. The challenge is not a shortage of willing
                donors — it is finding them in time.
              </p>
              <p className="mt-4 leading-8 text-gray-600">
                Blood Connect bridges that gap. We provide a simple, searchable
                platform where donors register their availability and requesters
                can find them instantly by blood group and location.
              </p>
            </div>
            <div className="rounded-2xl bg-red-50 p-8">
              <div className="space-y-4">
                {team.map(t => (
                  <div key={t.name} className="rounded-xl bg-white p-5 shadow-sm">
                    <h3 className="font-bold text-gray-900">{t.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-3 text-gray-500">Simple, fast, and free.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map(step => (
              <div key={step.step} className="rounded-2xl bg-white p-6 shadow-sm text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
                  {step.icon}
                </div>
                <div className="mb-2 inline-block rounded-full bg-red-600 px-3 py-0.5 text-xs font-bold text-white">
                  Step {step.step}
                </div>
                <h3 className="mt-2 font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blood compatibility note */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Every Blood Type Matters</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Whether you are A+, O-, AB+, or anything in between — your blood is valuable.
            Rare blood groups are especially critical. Register today and you might save
            a life that no one else can.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => (
              <span key={g} className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-red-600 shadow-sm border border-red-100">
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold">Ready to make a difference?</h2>
          <p className="mt-4 text-red-100">
            Join thousands of donors and help save lives in your community.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donors/register"
              className="rounded-lg bg-white px-7 py-3 font-semibold text-red-600 hover:bg-gray-100"
            >
              Register as Donor
            </Link>
            <Link
              href="/donors"
              className="rounded-lg border border-white px-7 py-3 font-semibold text-white hover:bg-white/10"
            >
              Find a Donor
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
