import { bikesData } from "@/components/Bikes/data/bikes-data"
import BikeDetailClientPage from "./BikeDetailClientPage"
import Footer from "@/components/FooterEl"

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params
  const bike = bikesData.find((b) => b.slug === slug)

  if (!bike) {
    return {
      title: "Bike Not Found | Webitya",
      description: "The bike you're looking for doesn't exist or has been removed.",
    }
  }

  return {
    title: `${bike.name} - ${bike.brand} | Webitya Bikes`,
    description: `Explore the ${bike.name} - ${bike.tagline}. Check specifications, features, colors, and pricing details. Book a test ride today.`,
    openGraph: {
      title: `${bike.name} - ${bike.brand} | Webitya Bikes`,
      description: `Explore the ${bike.name} - ${bike.tagline}. Check specifications, features, colors, and pricing details.`,
      images: [bike.images[0] || "/og-bikes.jpg"],
    },
  }
}

// Generate static paths for all bikes
export async function generateStaticParams() {
  return bikesData.map((bike) => ({
    slug: bike.slug,
  }))
}

export default function BikeDetailPage({ params }) {
 
  return (
    <>
    <BikeDetailClientPage slug={params.slug} />
  <Footer/>
    </>
  )
 
}
