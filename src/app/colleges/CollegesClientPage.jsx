"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, FilterList, School } from "@mui/icons-material"
import SponsoredCollegeCarousel from "@/components/Colleges//colleges/SponsoredCollegeCarousel"
import CollegeCard from "@/components/Colleges//colleges/CollegeCard"
import { colleges } from "@/components/Colleges/data/collegesList"
import { sponsoredColleges } from "@/components/Colleges/data/sponsoredColleges"

export default function CollegesClientPage() {
  const [filteredColleges, setFilteredColleges] = useState(colleges)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [availableCities, setAvailableCities] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Dynamic states and types from college data
  const [availableStates, setAvailableStates] = useState([])
  const [availableTypes, setAvailableTypes] = useState([])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Extract unique states, cities, and types from college data
  useEffect(() => {
    // Combine regular and sponsored colleges
    const allColleges = [...colleges, ...sponsoredColleges]

    // Extract unique states
    const states = [...new Set(allColleges.map((college) => college.state))].sort()
    setAvailableStates(states)

    // Extract unique types
    const types = [...new Set(allColleges.map((college) => college.type))].sort()
    setAvailableTypes(types)
  }, [])

  // Get unique cities based on selected state
  useEffect(() => {
    if (selectedState) {
      // Combine regular and sponsored colleges
      const allColleges = [...colleges, ...sponsoredColleges]

      // Filter colleges by selected state and extract unique cities
      const stateCities = [
        ...new Set(allColleges.filter((college) => college.state === selectedState).map((college) => college.city)),
      ].sort()

      setAvailableCities(stateCities)
    } else {
      setAvailableCities([])
    }
  }, [selectedState])

  // Filter colleges based on search and filters
  useEffect(() => {
    let results = colleges

    if (searchTerm) {
      results = results.filter(
        (college) =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.state.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedState) {
      results = results.filter((college) => college.state === selectedState)
    }

    if (selectedCity) {
      results = results.filter((college) => college.city === selectedCity)
    }

    if (selectedType) {
      results = results.filter((college) => college.type === selectedType)
    }

    setFilteredColleges(results)
  }, [searchTerm, selectedState, selectedCity, selectedType])

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedState("")
    setSelectedCity("")
    setSelectedType("")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading colleges...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Sponsored Colleges */}
      <section className="relative bg-gradient-to-r from-purple-900 to-indigo-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Perfect College</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Explore top colleges across India and discover your path to success
            </p>
          </motion.div>

          {/* Sponsored Colleges Carousel */}
          <SponsoredCollegeCarousel colleges={sponsoredColleges} />
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges by name, city or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value)
                  setSelectedCity("")
                }}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All States</option>
                {availableStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              >
                <option value="">All Cities</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Types</option>
                {availableTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <button
                onClick={resetFilters}
                className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Colleges Listing Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{filteredColleges.length} Colleges Found</h2>
            <div className="flex items-center gap-2">
              <FilterList className="text-purple-600" />
              <span className="text-gray-600">
                Filters Applied: {(selectedState ? 1 : 0) + (selectedCity ? 1 : 0) + (selectedType ? 1 : 0)}
              </span>
            </div>
          </div>

          {/* College Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college, index) => {
              // Insert sponsored college card after every 5 regular college cards
              const cards = []
              cards.push(<CollegeCard key={college.id} college={college} />)

              if ((index + 1) % 5 === 0 && sponsoredColleges[Math.floor(index / 5) % sponsoredColleges.length]) {
                const sponsoredCollege = sponsoredColleges[Math.floor(index / 5) % sponsoredColleges.length]
                cards.push(
                  <CollegeCard
                    key={`sponsored-${sponsoredCollege.id}`}
                    college={sponsoredCollege}
                    isSponsored={true}
                  />,
                )
              }

              return cards
            })}
          </div>

          {filteredColleges.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <School style={{ fontSize: 64 }} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Colleges Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
