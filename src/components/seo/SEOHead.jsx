import Head from "next/head"

export default function SEOHead({
  title = "Webitya LMS - Learn, Grow, Succeed",
  description = "Master in-demand skills with our comprehensive online courses in Web Development, Python, and Digital Marketing. Join thousands of successful students.",
  keywords = "online learning, web development course, python programming, digital marketing, LMS, e-learning, coding bootcamp, programming courses",
  image = "/og-image.jpg",
  url = "https://webitya.com",
  type = "website",
  author = "Webitya Team",
  publishedTime,
  modifiedTime,
  course,
  price,
}) {
  const fullTitle = title.includes("Webitya") ? title : `${title} | Webitya LMS`
  const fullUrl = url.startsWith("http") ? url : `https://webitya.com${url}`
  const fullImage = image.startsWith("http") ? image : `https://webitya.com${image}`

  // Generate structured data for courses
  const courseStructuredData = course
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.description,
        provider: {
          "@type": "Organization",
          name: "Webitya LMS",
          url: "https://webitya.com",
        },
        instructor: {
          "@type": "Person",
          name: course.instructor || "Webitya Team",
        },
        courseMode: "online",
        educationalLevel: course.level,
        timeRequired: course.duration,
        offers: {
          "@type": "Offer",
          price: price || course.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: fullUrl,
        },
        image: course.thumbnail || fullImage,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "1234",
        },
      }
    : null

  // Organization structured data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Webitya LMS",
    url: "https://webitya.com",
    logo: "https://webitya.com/logo.png",
    description:
      "Leading online learning platform offering comprehensive courses in Web Development, Python Programming, and Digital Marketing",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-XXXXXXXXXX",
      contactType: "customer service",
      email: "support@webitya.com",
    },
    sameAs: [
      "https://facebook.com/webitya",
      "https://twitter.com/webitya",
      "https://linkedin.com/company/webitya",
      "https://instagram.com/webitya",
    ],
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Webitya LMS" />
      <meta property="og:locale" content="en_US" />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@webitya" />
      <meta name="twitter:creator" content="@webitya" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      {courseStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseStructuredData),
          }}
        />
      )}

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://checkout.razorpay.com" />
    </Head>
  )
}
