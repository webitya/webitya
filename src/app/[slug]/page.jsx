import { getKeywordBySlug, getAllSlugs } from "@/data/dynamicKeywords"
import {
  generateJsonLd,
  generateBreadcrumb,
  generateServiceSchema,
  generateOrganizationSchema,
} from "@/lib/dynamicSeoUtils"
import DynamicHero from "@/components/dynamicHero"
import DynamicServices from "@/components/dynamicServices"
import DynamicProcessSteps from "@/components/dynamicProcessSteps"
import DynamicStats from "@/components/dynamicStats"
import DynamicWhyUs from "@/components/dynamicWhyUs"
import DynamicTestimonials from "@/components/dynamicTestimonials"
import DynamicFAQ from "@/components/dynamicFAQ"
import DynamicCTA from "@/components/dynamicCTA"
import Footer from "@/components/FooterEl"

export async function generateStaticParams() {
  return getAllSlugs()
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const keyword = getKeywordBySlug(resolvedParams.slug)

  if (!keyword) {
    return {
      title: "Service Not Found",
      description: "The requested service page could not be found",
    }
  }

  return {
    title: keyword.title,
    description: keyword.description,
    keywords: keyword.keywords.join(", "),
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    openGraph: {
      title: keyword.title,
      description: keyword.description,
      image: keyword.image,
      type: "website",
      url: `https://webitya.com/${keyword.slug}`,
      siteName: "WEBITYA",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: keyword.title,
      description: keyword.description,
      image: keyword.image,
      creator: "@webitya",
    },
    canonical: `https://webitya.com/${keyword.slug}`,
    alternates: {
      canonical: `https://webitya.com/${keyword.slug}`,
    },
  }
}

export default async function DynamicPage({ params }) {
  const resolvedParams = await params
  const keyword = getKeywordBySlug(resolvedParams.slug)

  if (!keyword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-xl text-gray-600">The requested service page could not be found.</p>
        </div>
      </div>
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://webitya.com"

  const jsonLd = generateJsonLd(keyword, baseUrl)
  const breadcrumb = generateBreadcrumb(keyword, baseUrl)
  const serviceSchema = generateServiceSchema(keyword, baseUrl)
  const organizationSchema = generateOrganizationSchema(baseUrl)

  const faqs = [
    {
      question: `What makes your ${keyword.service} services different?`,
      answer: `Our ${keyword.service} services are tailored specifically for businesses in ${keyword.location}, ${keyword.state}. We combine industry best practices with local market insights to deliver exceptional results.`,
    },
    {
      question: `How long does it take to see results?`,
      answer: `Most clients start seeing measurable improvements within 4-6 weeks. We provide detailed monthly reports so you can track progress.`,
    },
    {
      question: `What is your pricing model?`,
      answer: `We offer flexible pricing models tailored to your budget and goals. Contact us for a free consultation and custom quote.`,
    },
    {
      question: `Do you provide ongoing support?`,
      answer: `We provide 24/7 support to all our clients with a dedicated account manager.`,
    },
    {
      question: `Can you work with businesses of all sizes?`,
      answer: `Yes! We work with startups, small businesses, and large enterprises with scalable solutions.`,
    },
    {
      question: `How do you measure success?`,
      answer: `We measure success through clear KPIs aligned with your business goals with transparent reporting.`,
    },
  ]

  const faqSchema = {
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <DynamicHero keyword={keyword} />
      <DynamicServices bulletPoints={keyword.bulletPoints} />
      <DynamicProcessSteps />
      <DynamicStats />
      <DynamicWhyUs />
      <DynamicTestimonials />
      <DynamicFAQ keyword={keyword} />
      <DynamicCTA />
      <Footer/>
    </>
  )
}
