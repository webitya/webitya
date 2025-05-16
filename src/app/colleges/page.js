import Footer from "@/components/FooterEl"
import CollegesClientPage from "./CollegesClientPage"

export const metadata = {
  title: "Top Colleges in India | Find Best Colleges & Universities | Webitya",
  description:
    "Explore top colleges and universities across India. Find detailed information about courses, admissions, campus facilities, and more to make an informed decision about your education.",
  keywords:
    "colleges in India, top universities, education, admission, courses, engineering colleges, medical colleges, arts colleges",
}

export default function CollegesPage() {
  return (
    <>
    <CollegesClientPage />
    <Footer/>
    </>
  )
}
