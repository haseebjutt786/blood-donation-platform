import type { Metadata } from "next"
import Link from "next/link"
import FAQ from "../../components/Home/FAQ"

export const metadata: Metadata = {
  title: "FAQ | Blood Connect Pakistan",
  description: "Frequently asked questions about Blood Connect — Pakistan's free blood donor platform. Learn how to find donors, register, post requests, and more.",
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-red-600 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-black md:text-5xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-red-100">
            Everything you need to know about Blood Connect and blood donation in Pakistan.
          </p>
        </div>
      </section>

      <FAQ />

      <section className="pb-20 text-center">
        <p className="text-gray-500">Still have questions?</p>
        <Link href="/contact" className="mt-3 inline-block rounded-xl bg-red-600 px-7 py-3.5 font-bold text-white hover:bg-red-700 transition">
          Contact Us →
        </Link>
      </section>

    </main>
  )
}
