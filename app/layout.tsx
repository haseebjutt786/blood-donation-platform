import type { Metadata } from "next"
import { Geist } from "next/font/google"
import ClientLayout from "../components/ClientLayout"
import Footer from "../components/Footer"
import Link from "next/link"
import "./globals.css"

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], weight: ["400","500","600","700","800","900"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://blood-donation-platform-lyart.vercel.app"),
  title: {
    default: "Blood Connect | Find Blood Donors in Faisalabad & Pakistan — Free, 24/7",
    template: "%s | Blood Connect Pakistan",
  },
  description:
    "Find verified blood donors in Faisalabad and across Pakistan instantly. Search by blood group and city. Post emergency blood requests. Free platform — no middlemen, direct contact. A+, O-, B+ donors available 24/7.",
  keywords: [
    "blood donors Faisalabad",
    "blood donation Faisalabad Pakistan",
    "find blood donor Pakistan",
    "blood bank Faisalabad",
    "O negative blood donor Pakistan",
    "emergency blood request",
    "blood connect Pakistan",
    "donate blood Faisalabad",
    "blood group search Pakistan",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://blood-donation-platform-lyart.vercel.app",
    siteName: "Blood Connect Pakistan",
    title: "Blood Connect | Find Blood Donors in Faisalabad & Pakistan",
    description: "Free blood donor search platform for Pakistan. Find A+, O-, B+ donors in Faisalabad, Lahore, Karachi & more. Post emergency requests instantly.",
    images: [{
      url: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200&auto=format&fit=crop&q=80",
      width: 1200, height: 630,
      alt: "Blood donation — find blood donors in Pakistan instantly",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Connect | Find Blood Donors in Pakistan",
    description: "Free, 24/7 blood donor search. Find donors in Faisalabad, Lahore, Karachi & more.",
    images: ["https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200&auto=format&fit=crop&q=80"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  themeColor: "#B91C1C",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Blood Connect Pakistan",
          url: "https://blood-donation-platform-lyart.vercel.app",
          description: "Free blood donor search platform for Pakistan. Find verified donors by blood group and city.",
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: "https://blood-donation-platform-lyart.vercel.app/donors?bloodGroup={bloodGroup}&city={city}" },
            "query-input": "required name=bloodGroup",
          },
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Blood Connect Pakistan",
          url: "https://blood-donation-platform-lyart.vercel.app",
          description: "Free blood donor matching platform connecting patients with donors across Pakistan.",
          address: { "@type": "PostalAddress", addressLocality: "Faisalabad", addressRegion: "Punjab", addressCountry: "PK" },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+92-341-4467213",
            email: "bloodconnect@gmail.com",
            contactType: "customer support",
            areaServed: "PK",
            availableLanguage: ["English","Urdu"],
          },
        })}} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ClientLayout>{children}</ClientLayout>
        <Footer />
        {/* Floating emergency button — mobile only */}
        <Link href="/requests" className="floating-emergency">
          🚨 Emergency Request
        </Link>
      </body>
    </html>
  )
}
