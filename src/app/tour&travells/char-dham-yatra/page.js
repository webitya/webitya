import CharDhamCTA from "@/components/CharDhamYatra/CharDhamCTA";
import CharDhamFAQS from "@/components/CharDhamYatra/CharDhamFAQS";
import CharDhamGallery from "@/components/CharDhamYatra/CharDhamGallery";
import CharDhamCarousel from "@/components/CharDhamYatra/CharDhamHero";
import CharDhamRouteMap from "@/components/CharDhamYatra/CharDhamRouteMap";
import CharDhamServices from "@/components/CharDhamYatra/CharDhamServices";
import CharDhamTestimonials from "@/components/CharDhamYatra/CharDhamTestimonials";
import CharDhamTrustedAgents from "@/components/CharDhamYatra/CharDhamTrustedAgents";
import PackageCardDetail from "@/components/CharDhamYatra/PackageCardHome";
import Footer from "@/components/FooterEl";

export const metadata = {
  title: "Char Dham Yatra 2025 | Webitya",
  description:
    "Book your Char Dham Yatra 2025 with Webitya. Complete pilgrimage package with travel, stay, meals, and spiritual guidance.",
  keywords: [
    "Char Dham Yatra",
    "Kedarnath",
    "Badrinath",
    "Gangotri",
    "Yamunotri",
    "Uttarakhand Yatra",
    "2025 Char Dham Package",
    "Webitya Yatra",
  ],
  alternates: {
    canonical: "https://www.webitya.com/char-dham-yatra",
  },
  openGraph: {
    title: "Char Dham Yatra 2025 | Webitya",
    description:
      "Spiritual journey simplified – Webitya’s Char Dham Yatra package for 2025 covers everything you need.",
    url: "https://www.webitya.com/char-dham-yatra",
    type: "website",
  },
};

export default function CharDhamYatra() {
  return (
    <main className="mx-auto">
      <div className="bg-black text-white text-center py-2 px-2 text-xl">This Page In Maintainace Mode Coming Soon..</div>
      <CharDhamCarousel />
      <div className="bg-black text-white text-center py-2 px-2 text-xl">This Page In Maintainace Mode Coming Soon..</div>
      <PackageCardDetail />
      
      <CharDhamServices />
      <CharDhamGallery/>
      <CharDhamTrustedAgents/>
      <CharDhamRouteMap/>
      <CharDhamTestimonials/>
      <CharDhamFAQS/>
      <CharDhamCTA/>

      <Footer/>
    </main>
  );
}
