import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Thalassemia Patients & Blood Donation | Blood Connect Pakistan",
  description:
    "Thalassemia patients in Pakistan need regular blood transfusions to survive. Learn how blood donation helps thalassemia patients and how you can find or become a donor today.",
}

export default function ThalassemiaPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-72 w-full md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1200&auto=format&fit=crop&q=80"
            alt="Thalassemia patient receiving a blood transfusion in a hospital"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
              Ongoing Need
            </span>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">
              Thalassemia Patients
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="space-y-6 text-gray-600 leading-8">

          <p className="text-lg font-medium text-gray-800">
            Thalassemia is a genetic blood disorder in which the body is unable to produce
            adequate amounts of healthy haemoglobin — the protein in red blood cells that
            carries oxygen. Without enough healthy red blood cells, the body is starved of
            oxygen and cannot function normally.
          </p>

          <p>
            Patients with moderate to severe thalassemia depend entirely on regular blood
            transfusions to survive. These transfusions are typically needed every two to four
            weeks throughout the patient&apos;s life. Without them, the condition leads to severe
            anaemia, organ damage, and in children, stunted growth and development. The
            blood used must be carefully matched to the patient&apos;s blood group to avoid
            dangerous reactions.
          </p>

          <p>
            Pakistan has one of the highest rates of thalassemia in the world. A significant
            portion of the population carries the thalassemia trait without knowing it. Many
            patients — especially in rural areas — struggle to find adequate blood supplies
            because local hospitals cannot maintain large standing reserves of matched blood.
            Families of thalassemia patients often have to locate donors themselves before
            each transfusion.
          </p>

          <p>
            Registering as a blood donor on Blood Connect means that a thalassemia patient&apos;s
            family can find you when they need blood, contact you directly, and arrange a
            donation at a nearby hospital or blood bank. A single donor who donates regularly
            can provide years of life-sustaining support to a thalassemia patient in their city.
          </p>

        </div>

        {/* Key facts */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: "🔄", fact: "Every 2–4 weeks", label: "Transfusion frequency for severe cases" },
            { icon: "🧬", fact: "Lifelong condition", label: "Patients need blood support throughout life" },
            { icon: "🩸", fact: "Matched blood", label: "Must be compatible with patient's blood group" },
          ].map(f => (
            <div key={f.fact} className="rounded-2xl bg-red-50 p-5 text-center">
              <span className="text-3xl">{f.icon}</span>
              <p className="mt-2 font-black text-gray-900">{f.fact}</p>
              <p className="mt-1 text-xs text-gray-500">{f.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl bg-[#B91C1C] p-8 text-white text-center">
          <h2 className="text-2xl font-black">Help a Thalassemia Patient Today</h2>
          <p className="mt-3 text-red-100">
            Register as a blood donor and be discoverable by thalassemia families in your city.
            It takes 2 minutes and could provide years of life-saving support.
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

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-gray-700"
        >
          ← Back to Home
        </Link>
      </section>

    </main>
  )
}
