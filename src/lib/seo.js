// SEO utility functions
export function generateCourseMetadata(course) {
  return {
    title: `${course.title} - Online Course | Webitya LMS`,
    description: `${course.description} Learn ${course.title} with expert instructors. ${course.duration} course with certificate. Price: ₹${course.price}`,
    keywords: `${course.title.toLowerCase()}, online course, ${course.level.toLowerCase()}, programming, web development, python, digital marketing`,
    openGraph: {
      title: `${course.title} - Online Course`,
      description: course.description,
      type: "article",
      images: [
        {
          url: course.thumbnail || "/og-course-default.jpg",
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} - Online Course`,
      description: course.description,
      images: [course.thumbnail || "/og-course-default.jpg"],
    },
  }
}

export function generateBreadcrumbStructuredData(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export function generateFAQStructuredData(faqs) {
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

export function generateReviewStructuredData(reviews) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: reviews.averageRating,
    reviewCount: reviews.totalReviews,
    bestRating: 5,
    worstRating: 1,
  }
}
