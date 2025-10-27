
import WebityaHero from "@/components/webitya-hero"
import Script from "next/script"

export const metadata = {
  title: "Webitya - Best Digital Marketing & SEO Services",
  description:
    "Webitya offers top SEO, PPC, and digital marketing services to grow your online presence. Get expert digital marketing solutions for your business.",
  keywords: "SEO, Digital Marketing, PPC, Social Media Marketing, Webitya, Google Ads, Facebook Ads, Content Marketing",
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
    title: "Webitya - Leading Digital Marketing Agency",
    description:
      "Get expert SEO and PPC services from Webitya to boost your business growth. Professional digital marketing solutions.",
    url: "https://webitya.com",
    siteName: "Webitya",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://webitya.com/your-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Webitya Digital Marketing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webitya - Leading Digital Marketing Agency",
    description: "Get expert SEO and PPC services from Webitya to boost your business growth.",
    images: ["https://webitya.com/your-og-image.jpg"],
  },
  alternates: {
    canonical: "https://webitya.com/",
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function Home() {
  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Webitya",
            url: "https://webitya.com",
            description:
              "Leading digital marketing agency offering SEO, PPC, and comprehensive digital marketing services",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://webitya.com/?s={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Webitya",
            url: "https://webitya.com",
            logo: "https://webitya.com/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-7368899030",
              contactType: "customer service",
              email: "contact@webitya.com",
            },
            sameAs: [
              "https://www.facebook.com/webitya",
              "https://www.linkedin.com/company/webitya",
              "https://twitter.com/webitya",
            ],
          }),
        }}
      />

      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What services does Webitya offer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Webitya provides comprehensive digital marketing services including SEO, PPC advertising, social media marketing, content marketing, and web development services to help businesses grow their online presence.",
                },
              },
              {
                "@type": "Question",
                name: "How can I contact Webitya?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can contact Webitya via email at contact@webitya.com or call +91 7368899030. We're available to discuss your digital marketing needs.",
                },
              },
            ],
          }),
        }}
      />

      <WebityaHero />
    </>
  )
}
