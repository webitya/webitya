import Footer from "@/components/FooterEl"
import PortfolioCTA from "@/components/PortfolioPage/PortfolioCTA"
import PortfolioHeroSection from "@/components/PortfolioPage/PortfolioHeroSection"
import PortfolioOurProcessSection from "@/components/PortfolioPage/PortfolioOurProcess"
import PortfolioProjectsSection from "@/components/PortfolioPage/PortfolioProjects"

export const metadata = {
  title: "Portfolio - Professional Web Development & Digital Solutions",
  description:
    "Explore our comprehensive portfolio of web development projects, including corporate websites, e-commerce platforms, landing pages, and digital marketing solutions. Professional development services with proven results.",
  keywords:
    "portfolio, web development, website design, e-commerce, landing pages, digital marketing, corporate websites, professional development",
  authors: [{ name: "Your Company Name" }],
  openGraph: {
    title: "Portfolio - Professional Web Development & Digital Solutions",
    description:
      "Explore our comprehensive portfolio of web development projects, including corporate websites, e-commerce platforms, landing pages, and digital marketing solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Professional Web Development & Digital Solutions",
    description: "Explore our comprehensive portfolio of web development projects and digital solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Portfolio() {
  return (
    <>
      <PortfolioHeroSection />
      <PortfolioProjectsSection />
      <PortfolioOurProcessSection />
      <PortfolioCTA />
      <Footer />
    </>
  )
}
