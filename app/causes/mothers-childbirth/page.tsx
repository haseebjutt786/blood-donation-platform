import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Mothers in Childbirth & Blood Donation | Blood Connect Pakistan",
  description:
    "Severe bleeding during childbirth is a leading cause of maternal death in Pakistan. Learn how blood donation saves mothers' lives and how to become a donor in your city.",
}

export default function MothersChildbirthPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-72 w-full md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&auto=format&fit=crop&q=80"
            alt="Maternity care — blood donation saves mothers' lives during childbirth in Pakistan"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block rounded-full bg-pink-600 px-3 py-1 text-xs font-bold text-white">
              Maternity
            </span>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">
              Mothers in Childbirth
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="space-y-6 text-gray-600 leading-8">

          <p className="text-lg font-medium text-gray-800">
            Severe bleeding — known medically as postpartum haemorrhage — is one of the
            most serious complications that can occur during or after childbirth. It can
            develop rapidly and requires immediate medical intervention, including blood
            transfusion, to prevent death.
          </p>

          <p>
            When postpartum haemorrhage occurs, the need for compatible blood becomes urgent
            within minutes. Medical staff must act quickly to replace the blood the mother
            has lost and stabilise her condition. In cases where the hospital has adequate
            blood reserves on hand, outcomes are generally much better. But when blood is not
            available and a compatible donor cannot be found quickly, the results can be fatal.
          </p>

          <p>
            In Pakistan, maternal mortality — particularly in rural and semi-urban areas — is
            closely linked to the availability of blood during obstetric emergencies. Many
            district and tehsil-level hospitals do not maintain fully stocked blood banks.
            When an emergency occurs, families are often asked to find a compatible donor
            immediately. The delay in locating that donor can be the difference between the
            mother surviving or not.
          </p>

          <p>
            Blood Connect addresses this gap directly. When a maternity emergency arises, a
            family member or nurse can search the platform for donors with a compatible blood
            group in the same city, call them immediately, and arrange a donation at the nearest
            facility. Being a registered donor in your city means that when a mother needs
            blood urgently, she and her newborn have a better chance of surviving.
          </p>

        </div>

        {/* Key facts */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: "⚡", fact: "Minutes count", label: "Postpartum bleeding can escalate very quickly" },
            { icon: "🏥", fact: "Hospital gaps", label: "Many rural hospitals lack adequate blood reserves" },
            { icon: "👶", fact: "Two lives", label: "The mother and her newborn both depend on fast access" },
          ].map(f => (
            <div key={f.fact} className="rounded-2xl bg-pink-50 p-5 text-center">
              <span className="text-3xl">{f.icon}</span>
              <p className="mt-2 font-black text-gray-900">{f.fact}</p>
              <p className="mt-1 text-xs text-gray-500">{f.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl bg-[#B91C1C] p-8 text-white text-center">
          <h2 className="text-2xl font-black">Help Save a Mother&apos;s Life</h2>
          <p className="mt-3 text-red-100">
            Register as a blood donor and be reachable when a maternity emergency happens in
            your city. Your registration could protect both a mother and her newborn.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/donors/register"
              className="rounded-xl bg-white px-7 py-3 font-bold text-[#B91C1C] transition hover:bg-gray-100"
            >
              🩸 Register as Donor
            </Link>
            <Link
              href="/requests"
              className="rounded-xl border border-white/40 px-7 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Post Urgent Request
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
