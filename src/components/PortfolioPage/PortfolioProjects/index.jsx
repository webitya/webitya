"use client"

import { useState, useMemo } from "react"
import SearchIcon from "@mui/icons-material/Search"
import LaunchIcon from "@mui/icons-material/Launch"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

const categories = ["All", "Website", "SEO", "Paid Ads", "UI/UX", "Content"]

const levenshteinDistance = (str1, str2) => {
  const matrix = []
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
      }
    }
  }
  return matrix[str2.length][str1.length]
}

const sampleProjects = [
  {
    title: "Modern Business Website",
    category: "Website",
    image: "/portfolio/portfolioImages/modern-website.webp",
    url: "/projects/modern-business-website",
    description: "Responsive modern business website with clean design",
    tags: ["responsive", "modern", "business", "clean"],
  },
  {
    title: "Advanced SEO Strategy",
    category: "SEO",
    image: "/portfolio/portfolioImages/advance-seo.webp",
    url: "/projects/advanced-seo-strategy",
    description: "Comprehensive SEO strategy for improved rankings",
    tags: ["seo", "strategy", "rankings", "optimization"],
  },
  {
    title: "Facebook Ads Campaign",
    category: "Paid Ads",
    image: "/portfolio/portfolioImages/facebook-ads.webp",
    url: "/projects/facebook-ads-campaign",
    description: "High-converting Facebook advertising campaign",
    tags: ["facebook", "ads", "social media", "campaign"],
  },
  {
    title: "UI Redesign for App",
    category: "UI/UX",
    image: "/portfolio/portfolioImages/ui-mobile-apps.webp",
    url: "/projects/ui-redesign-app",
    description: "Mobile app UI redesign with improved user experience",
    tags: ["ui", "ux", "mobile", "app", "redesign"],
  },
  {
    title: "eCommerce Website",
    category: "Website",
    image: "/portfolio/portfolioImages/e-commerce-website.webp",
    url: "/projects/ecommerce-website",
    description: "Full-featured eCommerce website with payment integration",
    tags: ["ecommerce", "shopping", "payment", "online store"],
  },
  {
    title: "Google Ads Setup",
    category: "Paid Ads",
    image: "/portfolio/portfolioImages/google-ads.webp",
    url: "/projects/google-ads-setup",
    description: "Professional Google Ads campaign setup and optimization",
    tags: ["google", "ads", "ppc", "adwords"],
  },
  {
    title: "Brand Style Guide",
    category: "UI/UX",
    image: "/portfolio/portfolioImages/brand-style.webp",
    url: "/projects/brand-style-guide",
    description: "Comprehensive brand style guide and identity design",
    tags: ["brand", "style", "guide", "identity", "design"],
  },
  {
    title: "SEO for Blog",
    category: "SEO",
    image: "/portfolio/portfolioImages/seo-blogs.webp",
    url: "/projects/seo-blog",
    description: "Blog SEO optimization for increased organic traffic",
    tags: ["seo", "blog", "content", "organic traffic"],
  },
  {
    title: "Content Strategy Plan",
    category: "Content",
    image: "/portfolio/portfolioImages/content-strategy.webp",
    url: "/projects/content-strategy-plan",
    description: "Strategic content planning and marketing approach",
    tags: ["content", "strategy", "marketing", "planning"],
  },
  {
    title: "Corporate Website",
    category: "Website",
    image: "/portfolio/portfolioImages/corporate-website.webp",
    url: "/projects/corporate-website",
    description: "Professional corporate website with modern design",
    tags: ["corporate", "professional", "business", "website"],
  },
  {
    title: "Instagram Ad Design",
    category: "Paid Ads",
    image: "/portfolio/portfolioImages/instagram-ads.webp",
    url: "/projects/instagram-ad-design",
    description: "Creative Instagram ad designs for social media marketing",
    tags: ["instagram", "ads", "social media", "creative"],
  },
  {
    title: "SEO Audit Report",
    category: "SEO",
    image: "/portfolio/portfolioImages/seo-audits.webp",
    url: "/projects/seo-audit-report",
    description: "Detailed SEO audit and improvement recommendations",
    tags: ["seo", "audit", "analysis", "recommendations"],
  },
  {
    title: "SaaS UI Kit",
    category: "UI/UX",
    image: "/portfolio/portfolioImages/saas-ui-kit.webp",
    url: "/projects/saas-ui-kit",
    description: "Complete SaaS UI kit with modern components",
    tags: ["saas", "ui kit", "components", "design system"],
  },
  {
    title: "Landing Page Design",
    category: "Website",
    image: "/portfolio/portfolioImages/landing-page-design.webp",
    url: "/projects/landing-page-design",
    description: "High-converting landing page design and development",
    tags: ["landing page", "conversion", "design", "marketing"],
  },
  {
    title: "Content Calendar",
    category: "Content",
    image: "/portfolio/portfolioImages/content-calender.webp",
    url: "/projects/content-calendar",
    description: "Strategic content calendar for social media planning",
    tags: ["content", "calendar", "social media", "planning"],
  },
  {
    title: "B2B Ads Funnel",
    category: "Paid Ads",
    image: "/portfolio/portfolioImages/b2b-ads-funnel.webp",
    url: "/projects/b2b-ads-funnel",
    description: "B2B advertising funnel for lead generation",
    tags: ["b2b", "ads", "funnel", "lead generation"],
  },
]

const PortfolioProjects = () => {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [visibleCount, setVisibleCount] = useState(8)
  const [searchHistory, setSearchHistory] = useState([])
  const router = useRouter()

  const filteredProjects = useMemo(() => {
    const projects = sampleProjects.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory

      if (!search.trim()) return matchesCategory

      const searchTerm = search.toLowerCase()
      let score = 0

      if (project.title.toLowerCase().includes(searchTerm)) score += 10
      if (project.title.toLowerCase().startsWith(searchTerm)) score += 5
      if (project.category.toLowerCase().includes(searchTerm)) score += 8
      if (project.description.toLowerCase().includes(searchTerm)) score += 3

      project.tags.forEach((tag) => {
        if (tag.toLowerCase().includes(searchTerm)) score += 6
        if (tag.toLowerCase().startsWith(searchTerm)) score += 3
      })

      const fuzzyMatch = (str, term) => {
        if (str.length === 0 || term.length === 0) return false
        const distance = levenshteinDistance(str.toLowerCase(), term)
        return distance <= Math.max(1, Math.floor(term.length * 0.3))
      }

      if (fuzzyMatch(project.title, searchTerm)) score += 4
      project.tags.forEach((tag) => {
        if (fuzzyMatch(tag, searchTerm)) score += 2
      })

      project.searchScore = score
      return matchesCategory && score > 0
    })

    if (search.trim()) {
      projects.sort((a, b) => (b.searchScore || 0) - (a.searchScore || 0))
    }

    return projects
  }, [search, selectedCategory])

  const suggestions = useMemo(() => {
    if (!search.trim()) return []

    const searchTerm = search.toLowerCase()
    const projectSuggestions = sampleProjects
      .map((project) => {
        let score = 0
        let matchType = ""

        if (project.title.toLowerCase().includes(searchTerm)) {
          score += 10
          matchType = "title"
        }
        if (project.category.toLowerCase().includes(searchTerm)) {
          score += 8
          matchType = matchType || "category"
        }
        project.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(searchTerm)) {
            score += 6
            matchType = matchType || "tag"
          }
        })

        return { ...project, suggestionScore: score, matchType }
      })
      .filter((project) => project.suggestionScore > 0)
      .sort((a, b) => b.suggestionScore - a.suggestionScore)
      .slice(0, 6)

    const tagSuggestions = [...new Set(sampleProjects.flatMap((p) => p.tags))]
      .filter((tag) => tag.toLowerCase().includes(searchTerm))
      .slice(0, 3)
      .map((tag) => ({ type: "tag", value: tag, matchType: "tag" }))

    return [...projectSuggestions, ...tagSuggestions]
  }, [search])

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === "tag") {
      setSearch(suggestion.value)
    } else {
      setSearch(suggestion.title)
      // Don't change category when clicking suggestion - let search work across all categories
    }

    if (!searchHistory.includes(search) && search.trim()) {
      setSearchHistory((prev) => [search, ...prev.slice(0, 4)])
    }

    setShowSuggestions(false)
  }

  const handleCardClick = (project) => {
    router.push(project.url)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8)
  }

  const handleClearSearch = () => {
    setSearch("")
    setShowSuggestions(false)
    setSelectedCategory("All")
  }

  return (
    <section className="py-12 px-4 md:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>

      <div className="flex justify-center mb-6 relative">
        <div className="relative w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects, categories and requirement..."
              className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setShowSuggestions(e.target.value.trim().length > 0)
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onFocus={() => {
                if (search.trim()) setShowSuggestions(true)
              }}
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            {search && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            )}

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded-lg mt-2 shadow-xl z-20 max-h-80 overflow-y-auto">
                {suggestions.map((suggestion, i) => (
                  <li
                    key={i}
                    className="px-4 py-3 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.type === "tag" ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs">#</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">#{suggestion.value}</div>
                          <div className="text-xs text-gray-500">Tag</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <img
                          src={suggestion.image || "/placeholder.svg"}
                          alt={suggestion.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{suggestion.title}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            <span>{suggestion.category}</span>
                            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{suggestion.matchType}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {searchHistory.length > 0 && !search && (
            <div className="mt-2 text-xs text-gray-500">
              Recent:{" "}
              {searchHistory.slice(0, 3).map((term, i) => (
                <button
                  key={i}
                  onClick={() => setSearch(term)}
                  className="ml-2 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {search && (
        <div className="text-center mb-4 text-sm text-gray-600">
          Found {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} for "{search}"
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category)
              setVisibleCount(8)
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
              selectedCategory === category
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } transition`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProjects.slice(0, visibleCount).map((project, i) => (
          <div
            key={i}
            className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden border border-gray-200 cursor-pointer transform hover:-translate-y-1 group"
            onClick={() => handleCardClick(project)}
          >
            <div className="h-48 md:h-40 w-full bg-gray-200 overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </div>
            <div className="p-4 relative">
              <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{project.category}</p>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <span>Powered by</span>
                <Link href="/" onClick={(e) => e.stopPropagation()}>
                  <Image
                    src="/brand/logo1.png"
                    alt="Webitya Logo"
                    width={70}
                    height={20}
                    className="object-contain cursor-pointer"
                  />
                </Link>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.url, "_blank")
                }}
                className="absolute bottom-2 right-2 p-1 text-gray-400 hover:text-blue-600 group-hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                title="Visit Project"
              >
                <LaunchIcon className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {search ? "No projects found matching your search criteria" : "No projects found"}
          </div>
          <div className="text-sm text-gray-400 mb-4">Try adjusting your search terms</div>
          <button onClick={handleClearSearch} className="text-blue-600 hover:text-blue-700 text-sm">
            Clear search
          </button>
        </div>
      )}

      {visibleCount < filteredProjects.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Load More ({filteredProjects.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </section>
  )
}

export default PortfolioProjects
