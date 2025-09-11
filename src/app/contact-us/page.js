export const metadata = {
  title: "Contact Us - Webitya | Get in Touch with Digital Marketing Experts",
  description:
    "Contact Webitya for professional digital marketing services. Located in Ranchi, Jharkhand. Call +91 9693245941 or email webitya@gmail.com for web development, SEO, and digital solutions.",
  keywords:
    "contact webitya, digital marketing ranchi, web development jharkhand, SEO services contact, webitya contact details, digital agency ranchi",
  authors: [{ name: "Webitya" }],
  creator: "Webitya",
  publisher: "Webitya",
  robots: "index, follow",
  openGraph: {
    title: "Contact Us - Webitya | Digital Marketing Experts in Ranchi",
    description:
      "Get in touch with Webitya for professional digital marketing services. Located in Ranchi, Jharkhand. Expert web development, SEO, and digital solutions.",
    url: "https://webitya.com/contact",
    siteName: "Webitya",
    images: [
      {
        url: "/contact-webitya-digital-marketing.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Webitya - Digital Marketing Agency in Ranchi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Webitya | Digital Marketing Experts",
    description: "Get in touch with Webitya for professional digital marketing services in Ranchi, Jharkhand.",
    images: ["/contact-webitya-digital-marketing.jpg"],
  },
  alternates: {
    canonical: "https://webitya.com/contact",
  },
  other: {
    "contact:phone_number": "+91 9693245941",
    "contact:email": "webitya@gmail.com",
    "contact:region": "Ranchi, Jharkhand, India",
    "business:contact_data:street_address": "Ranchi",
    "business:contact_data:locality": "Ranchi",
    "business:contact_data:region": "Jharkhand",
    "business:contact_data:country_name": "India",
  },
}


import ContactHero from "@/components/ContactUs/ContactHero"
import ContactMapSection from "@/components/ContactUs/ContactMap"
import Footer from "@/components/FooterEl"
import Script from "next/script"

export default function ContactUs() {
  return (
    <>
      <ContactHero />
      <ContactMapSection />
      <Footer/>

      <Script
        id="contact-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            mainEntity: {
              "@type": "Organization",
              name: "Webitya",
              url: "https://webitya.com",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9693245941",
                email: "webitya@gmail.com",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ranchi",
                addressRegion: "Jharkhand",
                addressCountry: "India",
              },
              sameAs: [
                "https://facebook.com/webitya",
                "https://twitter.com/webitya",
                "https://linkedin.com/company/webitya",
              ],
            },
          }),
        }}
      />
    </>
  )
}
