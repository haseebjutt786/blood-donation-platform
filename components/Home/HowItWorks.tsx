import Link from "next/link"

const steps = [
  {
    n: "01",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Register or Search",
    desc: "Donors register in 2 minutes with their blood group, city, and phone number. Patients search for matching donors by blood group and location — no account needed to search.",
    cta: { label: "Register as Donor", href: "/donors/register" },
  },
  {
    n: "02",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Post a Request",
    desc: "If you can't find a matching donor, post an emergency blood request. Enter the patient name, blood group, hospital, and your contact number. The request goes live immediately.",
    cta: { label: "Post Blood Request", href: "/requests" },
  },
  {
    n: "03",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Connect Directly",
    desc: "Families contact matching donors directly by phone. No waiting, no middleman, no fee. Donors respond and arrange blood donation at the nearest hospital or blood bank.",
    cta: { label: "Find Donors Now", href: "/donors" },
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <span className="section-label">Simple Process</span>
          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
            How Blood Connect Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Three simple steps between a patient in need and a blood donor ready to help.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-6 lg:grid-cols-3 stagger">

          {/* Connecting line — desktop only */}
          <div className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-14 hidden h-0.5 bg-gradient-to-r from-red-100 via-[#B91C1C]/30 to-red-100 lg:block" aria-hidden="true" />

          {steps.map((step, i) => (
            <div
              key={step.n}
              className="group relative card p-8 text-center transition hover:border-[#B91C1C]/20"
            >
              {/* Step number badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-block rounded-full bg-[#B91C1C] px-3.5 py-0.5 text-xs font-black tracking-wider text-white shadow-md">
                  STEP {step.n}
                </span>
              </div>

              {/* Icon */}
              <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#B91C1C] transition group-hover:bg-[#B91C1C] group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-900/20">
                {step.icon}
              </div>

              {/* Arrow between steps — desktop */}
              {i < 2 && (
                <div className="absolute -right-3.5 top-14 z-10 hidden lg:flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100" aria-hidden="true">
                  <svg className="h-4 w-4 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}

              <h3 className="mt-5 text-xl font-black text-gray-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-500">{step.desc}</p>

              <Link
                href={step.cta.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#B91C1C] transition hover:gap-2.5"
              >
                {step.cta.label}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
