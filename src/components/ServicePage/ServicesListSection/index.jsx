"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  FaSearch,
  FaDesktop,
  FaChartLine,
  FaBullhorn,
  FaShieldAlt,
  FaGraduationCap,
  FaGlobe,
  FaEnvelope,
  FaMobile,
  FaArrowRight,
} from "react-icons/fa"
import {
  DesignServices,
  BarChart,
  Campaign,
  Security,
  School,
  Language,
  Email,
  PhoneIphone,
  SearchOutlined,
  ClearOutlined,
} from "@mui/icons-material"

const services = [
  {
    id: 1,
    title: "Website Designing",
    icon: <DesignServices className="w-5 h-5" />,
    reactIcon: <FaDesktop className="w-4 h-4" />,
    category: "Design",
    tags: ["responsive", "modern", "ui/ux", "frontend", "design", "website"],
    description:
      "Modern, responsive websites tailored to your brand and audience. We ensure every pixel serves a purpose and reflects your identity. Optimized for user experience and conversions.",
    image: "/services/servicesListImages/website-designing.webp",
    price: "Starting from ₹75,000",
    duration: "2-4 weeks",
  },
  {
    id: 2,
    title: "SEO Optimization",
    icon: <BarChart className="w-5 h-5" />,
    reactIcon: <FaChartLine className="w-4 h-4" />,
    category: "Marketing",
    tags: ["seo", "ranking", "organic", "traffic", "optimization", "google"],
    description:
      "Boost your rankings on search engines and attract organic traffic. We implement proven SEO strategies tailored to your niche. From technical SEO to content, we cover it all.",
    image: "/services/servicesListImages/seo-optimization.webp",
    price: "Starting from ₹45,000",
    duration: "3-6 months",
  },
  {
    id: 3,
    title: "Digital Marketing",
    icon: <Campaign className="w-5 h-5" />,
    reactIcon: <FaBullhorn className="w-4 h-4" />,
    category: "Marketing",
    tags: ["ppc", "social media", "ads", "campaigns", "marketing", "roi"],
    description:
      "Complete marketing campaigns including PPC, social, and strategy. Drive leads through customized digital funnels. Measurable results that maximize your ad spend ROI.",
    image: "/services/servicesListImages/digital-marketing.webp",
    price: "Starting from ₹60,000",
    duration: "Ongoing",
  },
  {
    id: 4,
    title: "Website Security",
    icon: <Security className="w-5 h-5" />,
    reactIcon: <FaShieldAlt className="w-4 h-4" />,
    category: "Security",
    tags: ["security", "ssl", "protection", "monitoring", "firewall", "backup"],
    description:
      "We secure your website with the latest tools and SSL integrations. Regular vulnerability scans and proactive threat prevention. Peace of mind with 24/7 monitoring support.",
    image: "/services/servicesListImages/website-security.webp",
    price: "Starting from ₹22,500",
    duration: "Ongoing",
  },
  {
    id: 5,
    title: "Online Training",
    icon: <School className="w-5 h-5" />,
    reactIcon: <FaGraduationCap className="w-4 h-4" />,
    category: "Education",
    tags: ["training", "courses", "learning", "certification", "skills", "education"],
    description:
      "Learn SEO, design, and digital marketing through our online programs. Expert-led modules with real-world assignments. Certification and support to help you grow.",
    image: "/services/servicesListImages/online-training.webp",
    price: "Starting from ₹15,000",
    duration: "Self-paced",
  },
  {
    id: 6,
    title: "Domain & Hosting",
    icon: <Language className="w-5 h-5" />,
    reactIcon: <FaGlobe className="w-4 h-4" />,
    category: "Infrastructure",
    tags: ["domain", "hosting", "dns", "email", "server", "website"],
    description:
      "One-stop solutions for domains and fast hosting services. Get custom domain emails and DNS management. Launch your website quickly and professionally.",
    image: "/services/servicesListImages/domain-hosting.webp",
    price: "Starting from ₹7,500",
    duration: "Annual",
  },
  {
    id: 7,
    title: "Email Marketing",
    icon: <Email className="w-5 h-5" />,
    reactIcon: <FaEnvelope className="w-4 h-4" />,
    category: "Marketing",
    tags: ["email", "campaigns", "automation", "newsletters", "subscribers", "conversion"],
    description:
      "Email campaigns that engage your audience and boost conversions. From design to delivery, we optimize every step. Build relationships with your subscribers effectively.",
    image: "/services/servicesListImages/email-marketing.webp",
    price: "Starting from ₹30,000",
    duration: "Monthly",
  },
  {
    id: 8,
    title: "Mobile Optimization",
    icon: <PhoneIphone className="w-5 h-5" />,
    reactIcon: <FaMobile className="w-4 h-4" />,
    category: "Development",
    tags: ["mobile", "responsive", "optimization", "speed", "performance", "app"],
    description:
      "Ensure your site looks and works great on all mobile devices. Responsive design and fast loading speed are our priorities. Deliver a seamless mobile user experience.",
    image: "/services/servicesListImages/mobile-optimization.webp",
    price: "Starting from ₹37,500",
    duration: "2-3 weeks",
  },
]

const ServicesListSection = () => {
  const [search, setSearch] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredServices = useMemo(() => {
    let filtered = services

    // Search filter
    if (search.trim()) {
      const searchTerm = search.toLowerCase()
      filtered = filtered.filter((service) => {
        return (
          service.title.toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm) ||
          service.category.toLowerCase().includes(searchTerm) ||
          service.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        )
      })
    }

    return filtered
  }, [search])

  const searchSuggestions = useMemo(() => {
    if (!search.trim() || search.length < 2) return []

    const searchTerm = search.toLowerCase()
    const suggestions = []

    services.forEach((service) => {
      if (service.title.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: "service",
          text: service.title,
          service: service,
        })
      }

      service.tags.forEach((tag) => {
        if (tag.toLowerCase().includes(searchTerm) && !suggestions.find((s) => s.text === tag)) {
          suggestions.push({
            type: "tag",
            text: tag,
            service: service,
          })
        }
      })
    })

    return suggestions.slice(0, 6)
  }, [search])

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.text)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setSearch("")
    setShowSuggestions(false)
  }

  return (
    <section className="py-8 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-balance">
            What We <span className="text-blue-600">Offer</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            A comprehensive suite of digital services designed to accelerate your business growth and establish a
            powerful online presence.
          </p>
        </div>

        <div className="mb-6 space-y-3">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search services, categories, or features..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-10 pr-10 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white shadow-md hover:shadow-lg"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ClearOutlined className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-2 py-1.5 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                  >
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      {suggestion.service.reactIcon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-xs">{suggestion.service.title}</div>
                      <div className="text-xs text-gray-500 capitalize">
                        {suggestion.type === "tag" ? `Tag: ${suggestion.text}` : suggestion.service.category}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
            >
              {/* Service Image */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-1">{service.icon}</div>
              </div>

              {/* Card Content */}
              <div className="p-3 space-y-2">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-lg mt-0.5">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">{service.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {service.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer"
                      onClick={() => setSearch(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Pricing and Duration */}
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-green-600">{service.price}</span>
                  <span className="text-gray-500">{service.duration}</span>
                </div>

                {/* CTA Section */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <Link
                    href="/contact-us"
                    className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors group/cta text-xs"
                  >
                    Get Started
                    <FaArrowRight className="w-2.5 h-2.5 group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">
                    <Image
                      src="/brand/logo1.png"
                      alt="Webitya Logo"
                      width={40}
                      height={12}
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center">
              <FaSearch className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-3 text-xs">Try adjusting your search terms</p>
            <button
              onClick={() => setSearch("")}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
            >
              View All Services
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ServicesListSection
