import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Accident & Trauma Victims & Blood Donation | Blood Connect Pakistan",
  description:
    "Accident and trauma victims in Pakistan urgently need blood transfusions. Learn how emergency blood donation saves lives and how to post or respond to an urgent blood request.",
}

export default function AccidentTraumaPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-72 w-full md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&auto=format&fit=crop&q=80"
            alt="Emergency medical care — accident and trauma victim receiving treatment"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white">
              Emergency
            </span>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">
              Accident &amp; Trauma Victims
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="space-y-6 text-gray-600 leading-8">

          <p className="text-lg font-medium text-gray-800">
            Road accidents, industrial injuries, and other traumatic events can cause sudden,
            severe blood loss that is immediately life-threatening. The faster blood can be
            transfused, the greater the chance of survival.
          </p>

          <p>
            In major trauma cases, patients can lose a significant portion of their blood volume
            within minutes. Emergency surgeons need immediate access to large quantities of
            compatible blood to stabilise a patient before and during surgery. The time between
            the accident and the first transfusion is often the critical window that determines
            whether a patient survives.
          </p>

          <p>
            In Pakistan, emergency blood needs are particularly acute because many hospitals —
            especially those outside major cities — do not maintain large on-site blood reserves.
            When an accident victim arrives at a rural hospital, the medical team may urgently
            need to locate compatible donors within hours. This is where Blood Connect plays a
            direct role: families and medical staff can search for donors by blood group in their
            city and reach them immediately by phone.
          </p>

          <p>
            By registering as a donor, you make yourself reachable to anyone in your city who
            needs your blood group in an emergency. In accidents, hours matter — and a donor
            who responds quickly can be the reason a patient survives.
          </p>

        </div>

        {/* Key facts */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: "⏱️", fact: "Hours matter", label: "Speed of blood availability determines survival" },
            { icon: "🚨", fact: "Immediate need", label: "No time to wait — donors must be reachable now" },
            { icon: "📞", fact: "Direct contact", label: "Families call donors directly through the platform" },
          ].map(f => (
            <div key={f.fact} className="rounded-2xl bg-orange-50 p-5 text-center">
              <span className="text-3xl">{f.icon}</span>
              <p className="mt-2 font-black text-gray-900">{f.fact}</p>
              <p className="mt-1 text-xs text-gray-500">{f.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl bg-[#B91C1C] p-8 text-white text-center">
          <h2 className="text-2xl font-black">Be Ready for an Emergency</h2>
          <p className="mt-3 text-red-100">
            Register as a donor so you appear in emergency searches. Or post a blood request
            right now if someone you know has been in an accident and needs blood urgently.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/requests"
              className="rounded-xl bg-white px-7 py-3 font-bold text-[#B91C1C] transition hover:bg-gray-100"
            >
              🚨 Post Emergency Request
            </Link>
            <Link
              href="/donors/register"
              className="rounded-xl border border-white/40 px-7 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Register as Donor
            </Link>
          </div>
        </div>

        <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-gray-700">
          ← Back to Home
        </Link>
      </section>

    </main>
  )
}
