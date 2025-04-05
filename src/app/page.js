"use client";

import HomeServicesSection from "@/components/Homepage/Services";
import HomeClientLogos from "@/components/Homepage/ClientLogos";
import HomeHero from "@/components/Homepage/HomeHero";
import HomeBusinessSection from "@/components/Homepage/BusinessSection";
import HomeAboutUs from "@/components/Homepage/HomeAboutUs";
import Head from "next/head";

const WebityaHero = () => {
  return (
    <>
      <Head>
        <title>Webitya - Best Digital Marketing & SEO Services</title>
        <meta name="description" content="Webitya offers top SEO, PPC, and digital marketing services to grow your online presence." />
        <meta name="keywords" content="SEO, Digital Marketing, PPC, Social Media Marketing, Webitya" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Webitya - Leading Digital Marketing Agency" />
        <meta property="og:description" content="Get expert SEO and PPC services from Webitya to boost your business growth." />
        <meta property="og:url" content="https://webitya.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://webitya.com/your-og-image.jpg" />
        <link rel="canonical" href="https://webitya.com/" />
      </Head>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Webitya",
          "url": "https://webitya.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://webitya.com/?s={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What services does Webitya offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Webitya provides SEO, PPC, social media marketing, and web development services."
              }
            },
            {
              "@type": "Question",
              "name": "How can I contact Webitya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can contact Webitya via email at contact@webitya.com or call +91 8709392484."
              }
            }
          ]
        })}
      </script>
      <HomeHero />
      <HomeAboutUs />
      <HomeBusinessSection />
      <HomeServicesSection />
      <HomeClientLogos />
    </>
  );
};

export default WebityaHero;
