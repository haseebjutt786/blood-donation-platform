import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Blood Connect Pakistan",
  description:
    "Blood Connect Privacy Policy — how we collect, use, and protect your personal information as a blood donor or platform user in Pakistan.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-[#B91C1C] px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black md:text-5xl">Privacy Policy</h1>
          <p className="mx-auto mt-4 max-w-xl text-red-100">
            How Blood Connect collects, uses, and protects your information.
          </p>
          <p className="mt-3 text-xs text-red-300">Last updated: January 2025</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 md:p-12">
          <div className="prose prose-gray max-w-none">

            <div className="space-y-10 text-gray-600 leading-8">

              <section>
                <h2 className="text-xl font-black text-gray-900">1. What is Blood Connect?</h2>
                <p className="mt-3">
                  Blood Connect is a free online platform that connects blood donors with patients who need
                  blood across Pakistan. It allows donors to register their availability and patients or their
                  families to search for matching donors by blood group and city, then contact them directly.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-gray-900">2. Information We Collect</h2>
                <p className="mt-3">
                  When you register as a blood donor, we collect:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm">
                  <li>Your full name</li>
                  <li>Email address (used for account login only)</li>
                  <li>Phone number (shown to people searching for your blood group)</li>
                  <li>Blood group</li>
                  <li>City and area of residence</li>
                </ul>
                <p className="mt-4">
                  When you post a blood request, we collect the patient name, blood group needed,
                  city, hospital name, and a contact phone number for the request.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-gray-900">3. How We Use Your Information</h2>
                <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Donor profiles</strong> are shown in search results when someone searches for your
                    blood group in your city. Your name, blood group, city, and phone number are visible to
                    users searching the platform.
                  </li>
                  <li>
                    <strong>Blood requests</strong> are shown publicly on the platform so that donors can
                    see urgent requests and reach out.
                  </li>
                  <li>
                    <strong>Email addresses</strong> are used only for account login and password recovery.
                    They are never shown publicly.
                  </li>
                  <li>We do not use your data for advertising, analytics resale, or marketing purposes.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-black text-gray-900">4. Who Can See Your Phone Number?</h2>
                <p className="mt-3">
                  Your phone number is visible to anyone who visits the Blood Connect platform and searches
                  for your blood group in your city. This is intentional — it allows patients to contact
                  you directly in an emergency.
                </p>
                <p className="mt-3">
                  If you wish to stop being contactable, you can toggle your availability to
                  &ldquo;Unavailable&rdquo; in your dashboard, or delete your donor profile entirely.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-gray-900">5. Data Storage and Security</h2>
                <p className="mt-3">
                  Your data is stored securely on MongoDB Atlas, a cloud database service. Passwords are
                  hashed and never stored in plain text. We use HTTPS encryption for all data transmission.
                </p>
                <p className="mt-3">
                  We do not sell, rent, or share your personal data with any third party, advertiser, or
                  organization.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-gray-900">6. Your Rights</h2>
                <p className="mt-3">You have the right to:</p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm">
                  <li>Access the information stored about you in your dashboard</li>
                  <li>Update or correct your donor profile at any time</li>
                  <li>Toggle your availability so you do not appear in search results</li>
                  <li>Request deletion of your account and all associated data by contacting us</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-black text-gray-900">7. Cookies</h2>
                <p className="mt-3">
                  Blood Connect uses a single session cookie to keep you logged in while using the platform.
                  This cookie is essential for the platform to function. We do not use tracking cookies,
                  advertising cookies, or third-party analytics tools.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-gray-900">8. Changes to This Policy</h2>
                <p className="mt-3">
                  We may update this privacy policy from time to time. Any changes will be posted on this
                  page with an updated date. By continuing to use the platform, you agree to the current
                  version of this policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-gray-900">9. Contact</h2>
                <p className="mt-3">
                  If you have any questions about this privacy policy or how your data is handled, please
                  contact us:
                </p>
                <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-5 text-sm">
                  <p>📞 <a href="tel:+923414467213" className="font-semibold text-[#B91C1C] hover:underline">+92 341 4467213</a></p>
                  <p className="mt-2">✉️ <a href="mailto:bloodconnect@gmail.com" className="font-semibold text-[#B91C1C] hover:underline">bloodconnect@gmail.com</a></p>
                  <p className="mt-2">📍 Faisalabad, Punjab, Pakistan</p>
                </div>
              </section>

            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B91C1C] hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

    </main>
  )
}
