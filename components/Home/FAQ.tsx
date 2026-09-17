"use client"

import { useState } from "react"

const faqs = [
  {
    q: "What is Blood Connect and who runs it?",
    a: "Blood Connect is a free blood donor discovery platform based in Faisalabad, Pakistan. We connect blood donors with patients who need blood urgently across all provinces. The platform is completely free to use — for donors, patients, and hospitals.",
  },
  {
    q: "Which cities and areas do you cover?",
    a: "We cover all major cities across Pakistan including Faisalabad, Lahore, Karachi, Islamabad, Rawalpindi, Multan, Peshawar, Quetta, and hundreds of smaller cities and towns. Anyone in Pakistan can register as a donor or post a blood request.",
  },
  {
    q: "How do I become a blood donor?",
    a: "Simply create a free account, then go to 'Register as Donor' and fill in your name, blood group, city, area, and phone number. Once registered, people searching for your blood group in your area can contact you directly.",
  },
  {
    q: "How do I request blood for a patient?",
    a: "Go to the 'Blood Requests' page and click 'Post a Blood Request'. Fill in the patient details, hospital, blood group, and your contact number. The request will be visible to all donors and visitors on the platform immediately.",
  },
  {
    q: "Is my personal data safe?",
    a: "Yes. We take privacy seriously. Your phone number is only shown to people actively searching for your specific blood group. We never share your data with third parties or advertisers.",
  },
  {
    q: "Is this platform completely free?",
    a: "Yes — 100% free. For donors, for patients, forever. Blood Connect is a social welfare initiative with no commercial purpose.",
  },
  {
    q: "Who is eligible to donate blood?",
    a: "Generally, anyone between 18–60 years old, weighing more than 50kg, and in good health can donate blood. Donors should wait at least 3 months between donations. Consult a doctor if you have any chronic illness.",
  },
  {
    q: "How can I contact you?",
    a: "You can reach us via email at bloodconnect@gmail.com, WhatsApp at +92 341 4467213, or visit our Contact page. For emergency blood requests, use the platform directly — it is the fastest way.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6">

        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-600">
            Common Questions
          </span>
          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-500">
            Everything you need to know about Blood Connect and blood donation in Pakistan.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl border transition ${
                open === i ? "border-red-200 shadow-md" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-bold text-gray-900">{faq.q}</span>
                <span
                  className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                    open === i ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {open === i ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </button>
              {open === i && (
                <div className="border-t border-gray-100 px-6 pb-5 pt-4 text-gray-600 leading-7">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
