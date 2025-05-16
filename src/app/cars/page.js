"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { carsData, sponsoredCars } from "@/components/Cars/data/cars-data"
import CarCarousel from "@/components/Cars/cars/car-carousel"
import Sidebar from "@/components/Cars/cars/sidebar"
import SponsoredCarCard from "@/components/Cars/cars/sponsored-car-card"
import { useToast } from "@/components/Cars/ui/use-toast"
import Footer from "@/components/FooterEl"

export default function CarsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCars, setFilteredCars] = useState(carsData)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Get filter values from URL
  const brandFilter = searchParams.get("brand") || ""
  const minPrice = searchParams.get("minPrice") || 0
  const maxPrice = searchParams.get("maxPrice") || 10000000

  // Apply filters when URL params change
  useEffect(() => {
    setIsLoading(true)

    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      let result = carsData

      // Apply brand filter
      if (brandFilter) {
        result = result.filter((car) => car.brand.toLowerCase() === brandFilter.toLowerCase())
      }

      // Apply price filter
      result = result.filter((car) => car.price >= Number(minPrice) && car.price <= Number(maxPrice))

      // Apply search term
      if (searchTerm) {
        result = result.filter(
          (car) =>
            car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.brand.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      setFilteredCars(result)
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [brandFilter, minPrice, maxPrice, searchTerm])

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Apply filters
  const applyFilters = (filters) => {
    const params = new URLSearchParams(searchParams)

    if (filters.brand) {
      params.set("brand", filters.brand)
    } else {
      params.delete("brand")
    }

    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice)
    } else {
      params.delete("minPrice")
    }

    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice)
    } else {
      params.delete("maxPrice")
    }

    router.push(`/cars?${params.toString()}`)

    toast({
      title: "Filters Applied",
      description: "Your car selection has been updated.",
      duration: 3000,
    })
  }

  // Featured cars for carousel
  const featuredCars = carsData.filter((car) => car.featured)

  // Insert sponsored cars
  const insertSponsoredCars = (cars) => {
    if (cars.length === 0 || sponsoredCars.length === 0) return cars

    const result = [...cars]

    // Insert a sponsored car after every 3 regular cars
    sponsoredCars.forEach((sponsoredCar, index) => {
      const insertPosition = (index + 1) * 3
      if (insertPosition < result.length) {
        result.splice(insertPosition, 0, { ...sponsoredCar, isSponsored: true })
      }
    })

    return result
  }

  const carsWithSponsored = insertSponsoredCars(filteredCars)

  return (
  <>
    <div className="min-h-screen bg-black">
      {/* Premium Car Carousel */}
      <section className="relative">
        <CarCarousel cars={featuredCars} />
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            className="md:hidden bg-gradient-to-r from-zinc-800 to-zinc-900 text-white px-4 py-3 rounded-sm mb-4 shadow-lg flex items-center justify-center gap-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M7 12h10" />
              <path d="M10 18h4" />
            </svg>
            {sidebarOpen ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Sidebar */}
          <AnimatePresence>
            {(sidebarOpen || (!sidebarOpen && window.innerWidth >= 768)) && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`w-full md:w-1/4 ${sidebarOpen ? "block" : "hidden md:block"}`}
              >
                <Sidebar
                  currentBrand={brandFilter}
                  currentMinPrice={minPrice}
                  currentMaxPrice={maxPrice}
                  onApplyFilters={applyFilters}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Car Listings */}
          <div className="w-full md:w-3/4">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for cars..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-white shadow-lg"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold font-playfair">
                {filteredCars.length} {filteredCars.length === 1 ? "Car" : "Cars"} Available
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Sort by:</span>
                <select className="bg-zinc-900 border border-zinc-800 rounded-sm px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-white">
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Car Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 animate-pulse"
                  >
                    <div className="h-48 bg-zinc-800"></div>
                    <div className="p-4">
                      <div className="h-6 bg-zinc-800 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-zinc-800 rounded w-1/2 mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-5 bg-zinc-800 rounded w-1/3"></div>
                        <div className="h-5 bg-zinc-800 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : carsWithSponsored.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carsWithSponsored.map((car) =>
                  car.isSponsored ? (
                    <SponsoredCarCard key={`sponsored-${car.id}`} car={car} />
                  ) : (
                    <motion.div
                      key={car.id}
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <Link href={`/cars/${car.slug}`}>
                        <div className="bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 hover:border-zinc-700 transition duration-300 shadow-lg hover:shadow-xl group">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={car.image || "/placeholder.svg"}
                              alt={car.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {car.featured && (
                              <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 shadow-md">
                                FEATURED
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-bold text-white">{car.name}</h3>
                                <p className="text-gray-400 text-sm">{car.brand}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-white font-bold">${car.price.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs">{car.year}</p>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-between text-sm text-gray-400">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                                {car.power} hp
                              </div>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {car.acceleration}s
                              </div>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                  />
                                </svg>
                                {car.topSpeed} mph
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-zinc-800">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">View Details</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-white group-hover:translate-x-1 transition-transform"
                                >
                                  <path d="M5 12h14" />
                                  <path d="m12 5 7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ),
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-900 rounded-sm border border-zinc-800 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto mb-6 text-gray-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
                <h3 className="text-xl text-gray-400 mb-4">No cars found matching your criteria</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={() => {
                    router.push("/cars")
                    setSearchTerm("")
                  }}
                  className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredCars.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-1">
                  <button className="w-10 h-10 flex items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-gray-400 hover:bg-zinc-800 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-sm border border-zinc-800 bg-white text-black font-medium">
                    1
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-gray-400 hover:bg-zinc-800 transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-gray-400 hover:bg-zinc-800 transition-colors">
                    3
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-gray-400 hover:bg-zinc-800 transition-colors">
                    10
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-gray-400 hover:bg-zinc-800 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  )
}
