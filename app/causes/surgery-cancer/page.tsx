import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Surgery & Cancer Patients & Blood Donation | Blood Connect Pakistan",
  description:
    "Cancer patients and surgical patients in Pakistan need regular blood support. Learn how blood donation enables life-saving surgeries and cancer treatment, and how to help.",
}

export default function SurgeryCancerPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-72 w-full md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=1200&auto=format&fit=crop&q=80"
            alt="Medical professional in surgery — blood donation supports surgical procedures and cancer treatment"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
              Surgical
            </span>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">
              Surgery &amp; Cancer Patients
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="space-y-6 text-gray-600 leading-8">

          <p className="text-lg font-medium text-gray-800">
            Surgical procedures and cancer treatments are two of the most common reasons patients
            require blood transfusions. In both cases, access to safe, compatible blood is not
            optional — it is a prerequisite for treatment.
          </p>

          <p>
            Major surgeries — including cardiac procedures, organ transplants, and trauma
            operations — can require multiple units of blood both during and after the procedure.
            Surgeons cannot begin certain high-risk operations without knowing that adequate blood
            reserves are available and ready. When blood is unavailable, life-saving procedures
            are delayed or cancelled.
          </p>

          <p>
            Cancer patients undergoing chemotherapy often experience severe drops in red blood
            cell and platelet counts as a side effect of treatment. These patients regularly need
            blood transfusions to maintain their strength and continue their treatment cycles.
            Bone marrow transplant patients, in particular, can require ongoing blood support
            for extended periods during recovery.
          </p>

          <p>
            In many cities across Pakistan — particularly outside Karachi, Lahore, and Islamabad
            — hospitals cannot stockpile large quantities of each blood group. Patients and their
            families are often responsible for sourcing compatible donors before procedures.
            Blood Connect makes this process direct and immediate: search by blood group, find
            a registered donor, and make contact within minutes.
          </p>

        </div>

        {/* Key facts */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: "🏥", fact: "Pre-surgery need", label: "Blood must be available before operations begin" },
            { icon: "♋", fact: "Ongoing support", label: "Cancer patients need blood throughout treatment" },
            { icon: "🧪", fact: "Matched type", label: "Blood group must be compatible with the patient" },
          ].map(f => (
            <div key={f.fact} className="rounded-2xl bg-blue-50 p-5 text-center">
              <span className="text-3xl">{f.icon}</span>
              <p className="mt-2 font-black text-gray-900">{f.fact}</p>
              <p className="mt-1 text-xs text-gray-500">{f.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl bg-[#B91C1C] p-8 text-white text-center">
          <h2 className="text-2xl font-black">Support a Patient&apos;s Treatment</h2>
          <p className="mt-3 text-red-100">
            Register as a donor today. When a patient in your city needs blood before surgery
            or during cancer treatment, you could be the person they find.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/donors/register"
              className="rounded-xl bg-white px-7 py-3 font-bold text-[#B91C1C] transition hover:bg-gray-100"
            >
              🩸 Register as Donor
            </Link>
            <Link
              href="/donors"
              className="rounded-xl border border-white/40 px-7 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Find a Donor
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
