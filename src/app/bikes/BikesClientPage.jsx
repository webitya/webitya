"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Grid, List, ChevronLeft, ChevronRight, Filter, X } from "lucide-react"
import { bikesData } from "@/components/Bikes/data/bikes-data"
import { sponsoredBikes } from "@/components/Bikes/data/sponsored-data"
import { festivalBanners } from "@/components/Bikes/data/festival-data"
import { sendEnquiry } from "@/components/Bikes/lib/email-service"
import { toast } from "@/components/Bikes/components/ui/use-toast"
import { Toaster } from "@/components/Bikes/components/ui/toaster"

export default function BikesClientPage() {
  const [bikes, setBikes] = useState(bikesData)
  const [filteredBikes, setFilteredBikes] = useState(bikesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "I'm interested in learning more about your bikes. Please provide information.",
  })
  const [filters, setFilters] = useState({
    brand: "",
    priceRange: "",
    category: "",
  })

  // Combined carousel items (featured bikes + festival banners)
  const carouselItems = [...festivalBanners, ...bikesData.filter((bike) => bike.featured).slice(0, 3)]

  // Filter bikes based on search and filters
  useEffect(() => {
    let result = bikesData

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (bike) =>
          bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bike.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bike.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply brand filter
    if (filters.brand) {
      result = result.filter((bike) => bike.brand === filters.brand)
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((bike) => bike.category === filters.category)
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      result = result.filter((bike) => bike.price >= min && bike.price <= max)
    }

    setFilteredBikes(result)
  }, [searchTerm, filters])

  // Handle carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }

  // Auto-advance carousel with proper cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    // Clean up interval on component unmount or when currentSlide changes
    return () => clearInterval(interval)
  }, [currentSlide])

  // Get unique brands and categories for filters
  const brands = [...new Set(bikesData.map((bike) => bike.brand))]
  const categories = [...new Set(bikesData.map((bike) => bike.category))]

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await sendEnquiry({
        ...formData,
        subject: "General Bikes Enquiry",
      })

      toast({
        title: "Enquiry Submitted",
        description: "We've received your enquiry and will contact you soon.",
        variant: "success",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "I'm interested in learning more about your bikes. Please provide information.",
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your enquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {/* Hero Carousel */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
        {/* Carousel items */}
        <div className="absolute inset-0">
          {carouselItems.map((item, index) => {
            const isFestival = item.type === "festival"

            return (
              <div
                key={isFestival ? `festival-${item.id}` : `bike-${item.id}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={
                      isFestival
                        ? item.image
                        : item.heroImage || item.images[0] || "/placeholder.svg?height=1200&width=2000"
                    }
                    alt={isFestival ? item.name : item.name}
                    fill
                    className="object-cover"
                    priority={index === 0 || index === currentSlide}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                    <div className="container mx-auto px-4 md:px-8">
                      <div className="max-w-xl text-white">
                        {isFestival ? (
                          <>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.name}</h1>
                            <p className="text-xl mb-6">{item.description}</p>
                            <div className="flex gap-4">
                              <span className="bg-red-600 px-4 py-2 rounded-md font-bold">{item.discount}</span>
                              <Link
                                href={item.link}
                                className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded-md font-medium transition-colors"
                              >
                                {item.buttonText}
                              </Link>
                            </div>
                            {item.validTill && (
                              <p className="mt-4 text-sm bg-white/20 inline-block px-3 py-1 rounded-full">
                                Valid till: {item.validTill}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.name}</h1>
                            <p className="text-xl mb-6">{item.tagline}</p>
                            <div className="flex gap-4">
                              <span className="bg-white text-black px-4 py-2 rounded-md font-bold">
                                ₹{item.price.toLocaleString()}
                              </span>
                              <Link
                                href={`/bikes/${item.slug}`}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                              >
                                Explore
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search bikes..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md ${viewMode === "grid" ? "bg-red-500 text-white" : "bg-gray-200"}`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md ${viewMode === "list" ? "bg-red-500 text-white" : "bg-gray-200"}`}
                    aria-label="List view"
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`md:hidden p-2 rounded-md ${showFilters ? "bg-red-500 text-white" : "bg-gray-200"}`}
                    aria-label="Toggle filters"
                  >
                    {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? "block" : "hidden md:grid"}`}>
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select
                    id="brand"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <select
                    id="priceRange"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  >
                    <option value="">All Prices</option>
                    <option value="0-100000">Under ₹1,00,000</option>
                    <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                    <option value="200000-500000">₹2,00,000 - ₹5,00,000</option>
                    <option value="500000-1000000">₹5,00,000 - ₹10,00,000</option>
                    <option value="1000000-10000000">Above ₹10,00,000</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">Showing {filteredBikes.length} bikes</p>
              {Object.values(filters).some((value) => value !== "") && (
                <button
                  onClick={() => {
                    setFilters({ brand: "", priceRange: "", category: "" })
                    setSearchTerm("")
                  }}
                  className="text-red-600 text-sm hover:underline flex items-center gap-1"
                >
                  <X className="w-4 h-4" /> Clear Filters
                </button>
              )}
            </div>

            {/* Bikes Grid/List */}
            {filteredBikes.length > 0 ? (
              <div
                className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}`}
              >
                {filteredBikes.map((bike) => (
                  <motion.div
                    key={bike.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}
                  >
                    <div className={`${viewMode === "list" ? "w-1/3" : "w-full"} relative`}>
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={bike.images[0] || "/placeholder.svg?height=300&width=400"}
                          alt={bike.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {bike.onSale && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </div>
                      )}
                      {bike.festivalOffer && (
                        <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded text-center">
                          {bike.festivalOffer.name}
                        </div>
                      )}
                    </div>
                    <div className={`${viewMode === "list" ? "w-2/3 p-4" : "p-4"}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-bold">{bike.name}</h2>
                        <div className="text-right">
                          <span className="text-red-600 font-bold">₹{bike.price.toLocaleString()}</span>
                          {bike.oldPrice && (
                            <div className="text-sm text-gray-500 line-through">₹{bike.oldPrice.toLocaleString()}</div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {bike.brand} | {bike.category}
                      </p>
                      {viewMode === "list" && (
                        <p className="text-sm text-gray-600 mb-4">{bike.description.substring(0, 150)}...</p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{bike.engineCC}cc</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{bike.mileage} kmpl</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{bike.topSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link
                          href={`/bikes/${bike.slug}`}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/bikes/${bike.slug}#enquiry`}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Enquire
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-600 mb-4">No bikes found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setFilters({ brand: "", priceRange: "", category: "" })
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            {/* Enquiry Form */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-bold mb-4">Request Information</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Your Phone"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="I'm interested in..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition-colors ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>

            {/* Sponsored Bikes */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-bold mb-4">Sponsored</h3>
              <div className="space-y-4">
                {sponsoredBikes.map((bike) => (
                  <Link
                    key={bike.id}
                    href={`/bikes/${bike.slug}`}
                    className="block group hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <Image
                          src={bike.images[0] || "/placeholder.svg?height=150&width=150"}
                          alt={bike.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-red-600 transition-colors">{bike.name}</h4>
                        <p className="text-sm text-gray-500">{bike.brand}</p>
                        <p className="text-sm font-bold text-red-600">₹{bike.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest Bikes */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Latest Bikes</h3>
              <div className="space-y-4">
                {bikesData.slice(0, 5).map((bike) => (
                  <Link
                    key={bike.id}
                    href={`/bikes/${bike.slug}`}
                    className="block group hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <Image
                          src={bike.images[0] || "/placeholder.svg?height=150&width=150"}
                          alt={bike.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-red-600 transition-colors">{bike.name}</h4>
                        <p className="text-sm text-gray-500">{bike.brand}</p>
                        <p className="text-sm font-bold text-red-600">₹{bike.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
