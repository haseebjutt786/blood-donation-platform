import type { Metadata } from "next"
import Link from "next/link"
import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact Us | Blood Connect Pakistan",
  description:
    "Contact Blood Connect Pakistan. For blood emergencies, general inquiries, or support — reach us by phone, WhatsApp, or email. For urgent blood requests, use the platform directly.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-[#B91C1C] px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-black md:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-red-100">
            Have a question, report an issue, or want to get involved?
            We&apos;re here to help. For blood emergencies, use the platform directly — it&apos;s faster.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">

          {/* LEFT — Contact info + Emergency CTA */}
          <div className="space-y-6">

            {/* Contact details card */}
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-xl font-black text-gray-900">Get In Touch</h2>
              <p className="mt-2 text-sm text-gray-500">
                For urgent blood requests, please use the platform directly —
                it will connect you with a donor much faster than a contact form.
              </p>

              <div className="mt-7 space-y-5">
                {[
                  {
                    icon: "📍",
                    label: "Location",
                    content: "Faisalabad, Punjab, Pakistan",
                    href: null,
                  },
                  {
                    icon: "📞",
                    label: "Phone / WhatsApp",
                    content: "+92 341 4467213",
                    href: "tel:+923414467213",
                  },
                  {
                    icon: "✉️",
                    label: "Email",
                    content: "bloodconnect@gmail.com",
                    href: "mailto:bloodconnect@gmail.com",
                  },
                  {
                    icon: "🕐",
                    label: "Response Time",
                    content: "We aim to respond within 24 hours",
                    href: null,
                  },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-0.5 font-semibold text-gray-800 transition hover:text-[#B91C1C]"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="mt-0.5 font-semibold text-gray-800">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp quick CTA */}
              <a
                href="https://wa.me/923414467213"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-xl bg-green-600 py-3.5 font-bold text-white transition hover:bg-green-700"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Emergency CTA */}
            <div className="overflow-hidden rounded-3xl bg-[#B91C1C] p-8 text-white">
              <div className="flex items-start gap-4">
                <span className="text-4xl">🚨</span>
                <div>
                  <h3 className="text-xl font-black">Blood Emergency?</h3>
                  <p className="mt-2 text-sm leading-6 text-red-100">
                    Don&apos;t wait for a reply. Post a blood request on the platform now and
                    connect with available donors in your city within minutes.
                  </p>
                  <Link
                    href="/requests"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#B91C1C] transition hover:bg-gray-50"
                  >
                    Post Blood Request →
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ link */}
            <div className="rounded-3xl bg-gray-900 p-7 text-white">
              <h3 className="font-black">Common Questions?</h3>
              <p className="mt-1.5 text-sm text-gray-400">
                Most questions are already answered in our FAQ section.
              </p>
              <Link
                href="/faq"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/15"
              >
                View FAQ →
              </Link>
            </div>

          </div>

          {/* RIGHT — Contact form */}
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <h2 className="text-xl font-black text-gray-900">Send a Message</h2>
            <p className="mt-2 text-sm text-gray-500">
              For general inquiries, reports, or feedback. We read every message.
            </p>
            <ContactForm />
          </div>

        </div>
      </div>

    </main>
  )
}
