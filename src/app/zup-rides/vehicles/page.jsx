"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  FilterList,
  TwoWheeler,
  ElectricBike,
  DirectionsBike,
  Speed,
  LocalGasStation,
  Sort,
} from "@mui/icons-material"
import { getAllVehicles, getAllVehicleTypes, getAllVehicleBrands, getMinMaxPrices } from "../../../components/ZupRides/data/vehicles"
import Footer from "@/components/FooterEl"

export default function VehiclesPage() {
  const allVehicles = getAllVehicles()
  const vehicleTypes = getAllVehicleTypes()
  const vehicleBrands = getAllVehicleBrands()
  const { min: minPrice, max: maxPrice } = getMinMaxPrices()

  const [vehicles, setVehicles] = useState(allVehicles)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
  const [sortOption, setSortOption] = useState("popularity")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort vehicles when filters change
  useEffect(() => {
    let filteredVehicles = [...allVehicles]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredVehicles = filteredVehicles.filter(
        (vehicle) =>
          vehicle.name.toLowerCase().includes(query) ||
          vehicle.type.toLowerCase().includes(query) ||
          vehicle.brand.toLowerCase().includes(query),
      )
    }

    // Apply type filter
    if (selectedTypes.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) => selectedTypes.includes(vehicle.type))
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) => selectedBrands.includes(vehicle.brand))
    }

    // Apply price filter
    filteredVehicles = filteredVehicles.filter(
      (vehicle) => vehicle.pricing.daily >= priceRange[0] && vehicle.pricing.daily <= priceRange[1],
    )

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        filteredVehicles.sort((a, b) => a.pricing.daily - b.pricing.daily)
        break
      case "price-high-low":
        filteredVehicles.sort((a, b) => b.pricing.daily - a.pricing.daily)
        break
      case "popularity":
        filteredVehicles.sort((a, b) => b.popularityScore - a.popularityScore)
        break
      case "name-a-z":
        filteredVehicles.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    setVehicles(filteredVehicles)
  }, [searchQuery, selectedTypes, selectedBrands, priceRange, sortOption, allVehicles])

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handlePriceChange = (e, index) => {
    const newValue = Number.parseInt(e.target.value)
    setPriceRange((prev) => {
      const newRange = [...prev]
      newRange[index] = newValue
      return newRange
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTypes([])
    setSelectedBrands([])
    setPriceRange([minPrice, maxPrice])
    setSortOption("popularity")
  }

  const getVehicleIcon = (type) => {
    const lowerType = type.toLowerCase()
    if (lowerType.includes("electric")) return <ElectricBike className="text-purple-600" />
    if (lowerType.includes("scooter")) return <DirectionsBike className="text-purple-600" />
    return <TwoWheeler className="text-purple-600" />
  }

  return (
   <>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Vehicles</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore our wide range of bikes and scooters for your perfect ride
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white sticky top-16 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* Sort Options */}
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-700 hidden md:block">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                </select>
                <Sort className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              <FilterList className="mr-1" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 bg-white p-4 rounded-lg shadow-md sticky top-36 h-fit`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-300"
              >
                Clear All
              </button>
            </div>

            {/* Vehicle Type Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Vehicle Type</h3>
              <div className="space-y-2">
                {vehicleTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="rounded text-purple-600 focus:ring-purple-500 mr-2"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Brand</h3>
              <div className="space-y-2">
                {vehicleBrands.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="rounded text-purple-600 focus:ring-purple-500 mr-2"
                    />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Daily Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            </div>

            {/* Close Button (Mobile) */}
            <button
              onClick={() => setShowFilters(false)}
              className="md:hidden w-full bg-purple-600 text-white px-4 py-2 rounded-lg mt-4"
            >
              Apply Filters
            </button>
          </div>

          {/* Vehicle Listing */}
          <div className="flex-grow">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{vehicles.length}</span> vehicles
              </p>
            </div>

            {/* Vehicle Grid */}
            {vehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={vehicle.mainImage || "/placeholder.svg"}
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                      />
                      {!vehicle.availability && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Not Available
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        {getVehicleIcon(vehicle.type)}
                        <h3 className="text-xl font-semibold text-gray-900 ml-2">{vehicle.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        {vehicle.type} | {vehicle.brand}
                      </p>
                      <p className="text-gray-600 mb-4 line-clamp-2">{vehicle.shortDescription}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded">
                          <Speed className="text-gray-500 w-4 h-4 mr-1" />
                          <span>{vehicle.specifications.mileage}</span>
                        </div>
                        {vehicle.specifications.engine ? (
                          <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded">
                            <LocalGasStation className="text-gray-500 w-4 h-4 mr-1" />
                            <span>{vehicle.specifications.engine.split(",")[0]}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded">
                            <ElectricBike className="text-gray-500 w-4 h-4 mr-1" />
                            <span>Electric</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-purple-700 font-bold">₹{vehicle.pricing.daily}/day</div>
                          <div className="text-gray-500 text-sm">₹{vehicle.pricing.hourly}/hour</div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/zup-rides/vehicles/${vehicle.id}`}
                            className="bg-white border border-purple-600 text-purple-600 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition duration-300 text-sm"
                          >
                            View Details
                          </Link>
                          {/* <Link
                            href={`/zup-rides/vehicles/${vehicle.id}?book=true`}
                            className="bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition duration-300 text-sm"
                          >
                            Book Now
                          </Link> */}
                           <Link
                href={`/zup-rides/booking?vehicleId=${vehicle.id}&plan=daily`}
                className="bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition duration-300 text-sm"
              >
                Book Now
              </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Search style={{ fontSize: 48 }} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
                <p className="text-gray-600 mb-4">We couldn't find any vehicles matching your search criteria.</p>
                <button
                  onClick={clearFilters}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Clear Filters
                </button>
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
