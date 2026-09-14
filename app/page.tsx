import Hero from "../components/Home/hero"
import BloodGroups from "../components/Home/BloodGroups"
import Stats from "../components/Home/Stats"
import EmergencyCTA from "../components/Home/EmergencyCTA"

export default function Home() {
  return (
    <main>
      <Hero />
      <BloodGroups />
      <Stats />
      <EmergencyCTA />
    </main>
  )
}
