import Hero from "./academy-page-hero"
import Why from "./academy-page-why"
import WhoFor from "./academy-page-who-for"
import HowItWorks from "./academy-page-how-it-works"
import Roles from "./academy-page-roles"
import Testimonials from "./academy-page-testimonials"
import Assessment from "./academy-page-assessment"
import CTA from "./academy-page-cta"

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Hero />
      <Why />
      <WhoFor />
      <HowItWorks />
      <Roles />
      <Testimonials />
      <Assessment />
      <CTA />
    </div>
  )
}
