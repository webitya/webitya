import { carsData } from "@/components/Cars/data/cars-data"
import CarDetailPageClient from "./CarDetailPageClient"
import Footer from "@/components/FooterEl"


// ✅ Metadata for SEO
export async function generateMetadata({ params }) {
  // Await the params before accessing its properties
  const slug = await params.slug
  const car = carsData.find((car) => car.slug === slug)

  if (!car) {
    return {
      title: "Car Not Found",
      description: "The requested car could not be found.",
    }
  }

  return {
    title: `${car.brand} ${car.name} - Luxury Car Details`,
    description: `Explore the ${car.year} ${car.brand} ${car.name}. ${car.power}hp, 0-60mph in ${car.acceleration}s. Starting at $${car.price.toLocaleString()}.`,
    openGraph: {
      images: [car.image],
    },
  }
}

export default async function CarDetailPage({ params }) {
  // Await the params before passing to the client component
  const awaitedParams = {
    slug: await params.slug,
  }

  return (
    <>
      <CarDetailPageClient params={awaitedParams} />
      <Footer/>
    </>
  )
}
