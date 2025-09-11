import AboutHeroSection from "@/components/AboutUsPage/AboutUsHeroSection"
import TeamSection from "@/components/AboutUsPage/AboutTeamSection"
import AboutInternsSection from "@/components/AboutUsPage/AboutOurInterns"
import AboutUsCTA from "@/components/AboutUsPage/AboutUsCTA"
import AboutVisionMissionSection from "@/components/AboutUsPage/AboutVisionMission"
import Footer from "@/components/FooterEl"
import AboutNavigation from "@/components/AboutUsPage/AboutNavigation"
import Script from "next/script"

export const metadata = {
  title: "About Webitya - Leading Digital Marketing Agency | Our Story & Team",
  description:
    "Learn about Webitya's journey, vision, and expert team. Discover how our digital marketing professionals help businesses grow online with innovative strategies and proven results.",
  keywords: [
    "about webitya",
    "digital marketing agency",
    "marketing team",
    "company story",
    "digital marketing experts",
    "online marketing professionals",
    "web development team",
    "SEO specialists",
    "PPC experts",
    "social media marketing team",
  ],
  authors: [{ name: "Webitya Team" }],
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
    title: "About Webitya - Leading Digital Marketing Agency",
    description:
      "Meet the expert team behind Webitya's success. Learn about our vision, mission, and commitment to helping businesses thrive in the digital landscape.",
    url: "https://webitya.com/about",
    siteName: "Webitya",
    images: [
      {
        url: "/about-webitya-team.jpg",
        width: 1200,
        height: 630,
        alt: "Webitya Digital Marketing Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Webitya - Leading Digital Marketing Agency",
    description:
      "Meet our expert digital marketing team and learn about Webitya's mission to help businesses succeed online.",
    images: ["/about-webitya-team.jpg"],
    creator: "@webitya",
  },
  alternates: {
    canonical: "https://webitya.com/about",
  },
  other: {
    "company:founded": "2020",
    "company:industry": "Digital Marketing",
    "company:employees": "50-100",
    "company:location": "India",
  },
}

export default function About() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Webitya",
      url: "https://webitya.com",
      logo: "https://webitya.com/logo.png",
      foundingDate: "2020",
      description:
        "Leading digital marketing agency helping businesses grow online with innovative strategies and proven results.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      sameAs: ["https://twitter.com/webitya", "https://linkedin.com/company/webitya", "https://facebook.com/webitya"],
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 50,
        maxValue: 100,
      },
      knowsAbout: [
        "Digital Marketing",
        "SEO",
        "PPC Advertising",
        "Social Media Marketing",
        "Web Development",
        "Content Marketing",
      ],
    },
  }

  return (
    <>
      <Script
        id="about-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="flex min-h-screen">
        <AboutNavigation />

        <main className="w-full" role="main" aria-label="About Webitya content">
          <section id="about" aria-labelledby="hero-heading">
            <AboutHeroSection />
          </section>
          <section id="vision-mission" aria-labelledby="vision-mission-heading">
            <AboutVisionMissionSection />
          </section>
          <section id="team" aria-labelledby="team-heading">
            <TeamSection />
          </section>
          <section id="interns" aria-labelledby="interns-heading">
            <AboutInternsSection />
          </section>
          <section id="cta" aria-labelledby="cta-heading">
            <AboutUsCTA />
          </section>
          <Footer />
        </main>
      </div>
    </>
  )
}
