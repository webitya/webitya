export const metadata = {
  title: "Our Services - Digital Marketing & Web Development | Webitya",
  description:
    "Comprehensive digital marketing services including SEO, PPC, social media marketing, web development, and more. Transform your business with our expert solutions.",
  keywords: [
    "digital marketing services",
    "SEO services",
    "PPC advertising",
    "social media marketing",
    "web development",
    "content marketing",
    "email marketing",
    "digital agency",
    "online marketing",
    "website design",
  ],
  authors: [{ name: "Webitya" }],
  creator: "Webitya",
  publisher: "Webitya",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Our Services - Digital Marketing & Web Development | Webitya",
    description:
      "Comprehensive digital marketing services including SEO, PPC, social media marketing, web development, and more. Transform your business with our expert solutions.",
    url: "https://webitya.com/services",
    siteName: "Webitya",
    images: [
      {
        url: "/services-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Webitya Digital Marketing Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services - Digital Marketing & Web Development | Webitya",
    description:
      "Comprehensive digital marketing services including SEO, PPC, social media marketing, web development, and more. Transform your business with our expert solutions.",
    images: ["/services-twitter-image.jpg"],
    creator: "@webitya",
  },
  alternates: {
    canonical: "https://webitya.com/services",
  },
  category: "Digital Marketing Services",
}


import Footer from "@/components/FooterEl"
import ServicesCTA from "@/components/ServicePage/ServicesCTA"
import ServicesHeroSection from "@/components/ServicePage/ServicesHeroSection"
import ServicesListSection from "@/components/ServicePage/ServicesListSection"
import ServicesNavigation from "@/components/ServicePage/ServicesNavigation"
import ServiceProcessSection from "@/components/ServicePage/ServicesProcessSection"
import ServicesTestimonials from "@/components/ServicePage/ServicesTestimonials"
import Script from "next/script"

export default function ServicesPage() {
  const navLinks = [
    { id: "hero", label: "Our Services" },
    { id: "list", label: "What We Offer" },
    { id: "process", label: "Our Process" },
    { id: "testimonials", label: "Testimonials" },
    { id: "cta", label: "Get Started" },
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Webitya",
    url: "https://webitya.com",
    logo: "https://webitya.com/logo.png",
    description: "Leading digital marketing agency providing comprehensive online marketing solutions",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-7970409108",
      contactType: "customer service",
    },
    sameAs: [
      "https://facebook.com/webitya",
      "https://twitter.com/webitya",
      "https://linkedin.com/company/webitya",
      "https://instagram.com/webitya",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO Services",
            description: "Search Engine Optimization to improve your website's visibility",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "PPC Advertising",
            description: "Pay-per-click advertising campaigns for immediate results",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Social Media Marketing",
            description: "Comprehensive social media management and advertising",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description: "Custom website development and design services",
          },
        },
      ],
    },
  }

  return (
    <>
      <Script
        id="services-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="flex bg-gray-50 text-gray-800 min-h-screen">
        <ServicesNavigation navLinks={navLinks} />

        <main className="w-full">
          <section id="hero" className="scroll-mt-20 mt-13">
            <ServicesHeroSection />
          </section>
          <section id="list" className="scroll-mt-20">
            <ServicesListSection />
          </section>
          <section id="process" className="scroll-mt-20">
            <ServiceProcessSection/>
          </section>
          <section id="testimonials" className="scroll-mt-20">
            <ServicesTestimonials />
          </section>
          <section id="cta" className="scroll-mt-20">
            <ServicesCTA />
          </section>
          <Footer />
        </main>
      </div>
    </>
  )
}
