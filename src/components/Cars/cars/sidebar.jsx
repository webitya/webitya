"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Car brands for filter
const carBrands = [
  "Rolls Royce",
  "Bugatti",
  "Lamborghini",
  "Ferrari",
  "Bentley",
  "Aston Martin",
  "Porsche",
  "McLaren",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Jaguar",
  "Land Rover",
  "Tata",
  "Suzuki",
  "Ford",
  "Mustang",
]

export default function Sidebar({ currentBrand, currentMinPrice, currentMaxPrice, onApplyFilters }) {
  const [brand, setBrand] = useState(currentBrand || "")
  const [minPrice, setMinPrice] = useState(currentMinPrice || 0)
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice || 10000000)
  const [priceRange, setPriceRange] = useState([Number(currentMinPrice) || 0, Number(currentMaxPrice) || 10000000])
  const [bodyTypes, setBodyTypes] = useState([])

  // Update state when props change
  useEffect(() => {
    setBrand(currentBrand || "")
    setMinPrice(currentMinPrice || 0)
    setMaxPrice(currentMaxPrice || 10000000)
    setPriceRange([Number(currentMinPrice) || 0, Number(currentMaxPrice) || 10000000])
  }, [currentBrand, currentMinPrice, currentMaxPrice])

  // Handle filter application
  const handleApplyFilters = () => {
    onApplyFilters({
      brand,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      bodyTypes: bodyTypes.length > 0 ? bodyTypes : undefined,
    })
  }

  // Handle reset filters
  const handleResetFilters = () => {
    setBrand("")
    setMinPrice(0)
    setMaxPrice(10000000)
    setPriceRange([0, 10000000])
    setBodyTypes([])
    onApplyFilters({
      brand: "",
      minPrice: 0,
      maxPrice: 10000000,
      bodyTypes: [],
    })
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 rounded-sm p-6 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-6 font-playfair flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M3 6h18" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
        Filters
      </h2>

      {/* Brand Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
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
            className="mr-2"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Brand
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="all-brands"
              name="brand"
              checked={brand === ""}
              onChange={() => setBrand("")}
              className="w-4 h-4 text-white bg-zinc-800 border-zinc-700 focus:ring-white focus:ring-1"
            />
            <label htmlFor="all-brands" className="ml-2 text-sm font-medium text-gray-300">
              All Brands
            </label>
          </div>

          {carBrands.map((brandName) => (
            <div key={brandName} className="flex items-center">
              <input
                type="radio"
                id={brandName.toLowerCase().replace(/\s+/g, "-")}
                name="brand"
                checked={brand.toLowerCase() === brandName.toLowerCase()}
                onChange={() => setBrand(brandName.toLowerCase())}
                className="w-4 h-4 text-white bg-zinc-800 border-zinc-700 focus:ring-white focus:ring-1"
              />
              <label
                htmlFor={brandName.toLowerCase().replace(/\s+/g, "-")}
                className="ml-2 text-sm font-medium text-gray-300"
              >
                {brandName}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
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
            className="mr-2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
            <path d="M12 18V6" />
          </svg>
          Price Range
        </h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Min: ${Number(priceRange[0]).toLocaleString()}</span>
              <span className="text-sm text-gray-400">Max: ${Number(priceRange[1]).toLocaleString()}</span>
            </div>
            <div className="relative h-2 bg-zinc-800 rounded-lg">
              <div
                className="absolute h-full bg-white rounded-lg"
                style={{
                  left: `${(priceRange[0] / 10000000) * 100}%`,
                  right: `${100 - (priceRange[1] / 10000000) * 100}%`,
                }}
              ></div>
              <input
                type="range"
                min="0"
                max="10000000"
                step="10000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="10000000"
                step="10000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Price Presets */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPriceRange([0, 50000])}
              className={`text-xs py-1 px-2 rounded-sm border ${
                priceRange[0] === 0 && priceRange[1] === 50000
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-gray-300 border-zinc-700 hover:border-white"
              }`}
            >
              Under $50k
            </button>
            <button
              onClick={() => setPriceRange([50000, 100000])}
              className={`text-xs py-1 px-2 rounded-sm border ${
                priceRange[0] === 50000 && priceRange[1] === 100000
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-gray-300 border-zinc-700 hover:border-white"
              }`}
            >
              $50k - $100k
            </button>
            <button
              onClick={() => setPriceRange([100000, 500000])}
              className={`text-xs py-1 px-2 rounded-sm border ${
                priceRange[0] === 100000 && priceRange[1] === 500000
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-gray-300 border-zinc-700 hover:border-white"
              }`}
            >
              $100k - $500k
            </button>
            <button
              onClick={() => setPriceRange([500000, 10000000])}
              className={`text-xs py-1 px-2 rounded-sm border ${
                priceRange[0] === 500000 && priceRange[1] === 10000000
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-gray-300 border-zinc-700 hover:border-white"
              }`}
            >
              $500k+
            </button>
          </div>
        </div>
      </div>

      {/* Body Type Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
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
            className="mr-2"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="3" x2="21" y1="9" y2="9" />
            <line x1="3" x2="21" y1="15" y2="15" />
            <line x1="9" x2="9" y1="3" y2="21" />
            <line x1="15" x2="15" y1="3" y2="21" />
          </svg>
          Body Type
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {["Coupe", "Sedan", "SUV", "Convertible", "Hypercar", "Roadster"].map((type) => (
            <div key={type} className="flex items-center">
              <input
                type="checkbox"
                id={`type-${type.toLowerCase()}`}
                checked={bodyTypes.includes(type.toLowerCase())}
                onChange={() => {
                  if (bodyTypes.includes(type.toLowerCase())) {
                    setBodyTypes(bodyTypes.filter((t) => t !== type.toLowerCase()))
                  } else {
                    setBodyTypes([...bodyTypes, type.toLowerCase()])
                  }
                }}
                className="w-4 h-4 text-white bg-zinc-800 border-zinc-700 focus:ring-white focus:ring-1"
              />
              <label htmlFor={`type-${type.toLowerCase()}`} className="ml-2 text-sm font-medium text-gray-300">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleApplyFilters}
          className="bg-gradient-to-r from-white to-gray-200 text-black py-2 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg flex items-center justify-center"
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
            className="mr-2"
          >
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="bg-transparent border border-white text-white py-2 rounded-sm hover:bg-white/10 transition flex items-center justify-center"
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
            className="mr-2"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Reset Filters
        </button>
      </div>
    </motion.div>
  )
}
