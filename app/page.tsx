import type { Metadata } from "next"
import Hero from "../components/Home/hero"
import BloodGroups from "../components/Home/BloodGroups"
import Stats from "../components/Home/Stats"
import Mission from "../components/Home/Mission"
import Causes from "../components/Home/Causes"
import NewsSection from "../components/Home/NewsSection"
import VolunteerCTA from "../components/Home/VolunteerCTA"
import FAQ from "../components/Home/FAQ"
import EmergencyCTA from "../components/Home/EmergencyCTA"

export const metadata: Metadata = {
  title: "Blood Connect | Find Blood Donors in Faisalabad & Pakistan — Free, 24/7",
  description:
    "Find blood donors in Pakistan instantly. Blood Connect connects patients with verified donors across Faisalabad, Lahore, Karachi & more. Search by blood group and city. Free, 24/7.",
  openGraph: {
    title: "Blood Connect | Find Blood Donors in Pakistan",
    description: "Free blood donor platform for Pakistan. Find A+, O-, B+ donors instantly. Search by blood group and city.",
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <BloodGroups />
      <Stats />
      <Mission />
      <Causes />
      <EmergencyCTA />
      <NewsSection />
      <VolunteerCTA />
      <FAQ />
    </main>
  )
}
