import { colleges, sponsoredColleges } from "@/components/Colleges/data/collegesList"
import CollegeDetailsClient from "./CollegeDetailsClient"
import Footer from "@/components/FooterEl"

// Generate static paths for all colleges
export async function generateStaticParams() {
  const allColleges = [...colleges, ...sponsoredColleges]
  return allColleges.map((college) => ({
    slug: college.slug,
  }))
}

export async function generateMetadata({ params }) {
  // Combine regular and sponsored colleges
  const allColleges = [...colleges, ...sponsoredColleges]

  // Find college by slug
  const college = allColleges.find((c) => c.slug === params.slug)

  if (!college) {
    return {
      title: "College Not Found | Webitya",
      description: "The college you are looking for could not be found.",
    }
  }

  return {
    title: college.metaTitle || `${college.name} | Top College in ${college.city} | Webitya`,
    description:
      college.metaDescription ||
      `Learn about ${college.name}, a leading ${college.type} college in ${college.city}, ${college.state}. Explore courses, admission details, campus facilities, and more.`,
    keywords: college.tags?.join(", ") || `${college.name}, college, education, ${college.city}, ${college.state}`,
    openGraph: {
      title: college.metaTitle || `${college.name} | Webitya`,
      description: college.metaDescription || college.shortDescription,
      images: [college.bannerImage || "/placeholder.svg?height=400&width=1200"],
      url: `https://webitya.com/colleges/${college.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: college.metaTitle || `${college.name} | Webitya`,
      description: college.metaDescription || college.shortDescription,
      images: [college.bannerImage || "/placeholder.svg?height=400&width=1200"],
    },
  }
}

export default function CollegeDetailsPage({ params }) {
  return (
    <>
    <CollegeDetailsClient slug={params.slug} />
    <Footer/>
    </>
  )
}
