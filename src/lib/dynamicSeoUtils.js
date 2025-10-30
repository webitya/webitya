export const generateJsonLd = (keyword, baseUrl) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/${keyword.slug}`,
    name: `WEBITYA - ${keyword.service} in ${keyword.location}`,
    image: `${baseUrl}${keyword.image}`,
    description: keyword.description,
    url: `${baseUrl}/${keyword.slug}`,
    telephone: "+91-XXXXXXXXXX",
    email: "info@webitya.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Address",
      addressLocality: keyword.location,
      addressRegion: keyword.state,
      postalCode: "XXXXX",
      addressCountry: "IN",
    },
    areaServed: [
      {
        "@type": "City",
        name: keyword.location,
      },
      {
        "@type": "State",
        name: keyword.state,
      },
    ],
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/webitya",
      "https://www.instagram.com/webitya",
      "https://www.linkedin.com/company/webitya",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
  }
}

export const generateServiceSchema = (keyword, baseUrl) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/${keyword.slug}`,
    name: keyword.service,
    description: keyword.description,
    provider: {
      "@type": "LocalBusiness",
      name: "WEBITYA",
      url: baseUrl,
    },
    areaServed: {
      "@type": "City",
      name: keyword.location,
    },
    serviceType: keyword.service,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${keyword.service} Services`,
      itemListElement: keyword.bulletPoints.map((point, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: point,
        },
      })),
    },
  }
}

export const generateBreadcrumb = (keyword, baseUrl) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: keyword.location,
        item: `${baseUrl}?location=${keyword.location}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: keyword.service,
        item: `${baseUrl}/${keyword.slug}`,
      },
    ],
  }
}

export const generateFaqSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export const generateOrganizationSchema = (baseUrl) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WEBITYA",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: "Professional digital marketing and web development services across India",
    telephone: "+91-XXXXXXXXXX",
    email: "info@webitya.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ranchi",
      addressRegion: "Jharkhand",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.facebook.com/webitya",
      "https://www.instagram.com/webitya",
      "https://www.linkedin.com/company/webitya",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+91-XXXXXXXXXX",
      email: "info@webitya.com",
    },
  }
}

export const generateAggregateRatingSchema = (testimonials) => {
  const avgRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: avgRating.toFixed(1),
    ratingCount: testimonials.length,
    bestRating: "5",
    worstRating: "1",
  }
}
