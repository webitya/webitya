import Footer from "@/components/FooterEl"
import BikesClientPage from "./BikesClientPage"

export const metadata = {
  title: "Explore Premium Bikes Collection | Webitya",
  description:
    "Browse our extensive collection of premium bikes with detailed specifications, features, and competitive pricing. Find your perfect ride today.",
  openGraph: {
    title: "Explore Premium Bikes Collection | Webitya",
    description:
      "Browse our extensive collection of premium bikes with detailed specifications, features, and competitive pricing.",
    images: ["/og-bikes.jpg"],
  },
}

export default function BikesPage() {
  return (
    <>
    <BikesClientPage />
    <Footer/>
    </>
  )
}
