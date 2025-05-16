"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function ColorConfigurator({ car }) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedInterior, setSelectedInterior] = useState(0)

  // Sample colors and interiors (would be replaced with actual car data)
  const exteriorColors = [
    { name: "Obsidian Black", hex: "#0f0f0f", image: car?.image || "/placeholder.svg?height=600&width=800" },
    { name: "Arctic White", hex: "#f5f5f5", image: "/placeholder.svg?height=600&width=800&text=White" },
    { name: "Sapphire Blue", hex: "#0f4c81", image: "/placeholder.svg?height=600&width=800&text=Blue" },
    { name: "Emerald Green", hex: "#2e8b57", image: "/placeholder.svg?height=600&width=800&text=Green" },
    { name: "Ruby Red", hex: "#9b111e", image: "/placeholder.svg?height=600&width=800&text=Red" },
    { name: "Champagne Gold", hex: "#f7e7ce", image: "/placeholder.svg?height=600&width=800&text=Gold" },
  ]

  const interiorColors = [
    { name: "Black Leather", hex: "#1a1a1a", image: "/placeholder.svg?height=300&width=500&text=Black+Interior" },
    { name: "Cream Leather", hex: "#f5f5dc", image: "/placeholder.svg?height=300&width=500&text=Cream+Interior" },
    { name: "Cognac Leather", hex: "#a05c17", image: "/placeholder.svg?height=300&width=500&text=Cognac+Interior" },
    { name: "Navy Leather", hex: "#1c2951", image: "/placeholder.svg?height=300&width=500&text=Navy+Interior" },
  ]

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-sm border border-zinc-800 shadow-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-700">
        <h3 className="text-xl font-bold font-playfair">
          Personalize Your {car?.brand} {car?.name}
        </h3>
        <p className="text-gray-400 mt-1">Configure your dream vehicle with our extensive customization options</p>
      </div>

      {/* Main configurator area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Car preview */}
        <div className="md:col-span-2 relative h-[300px] md:h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={exteriorColors[selectedColor].image || "/placeholder.svg"}
                alt={`${car?.name} in ${exteriorColors[selectedColor].name}`}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Color name overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-sm">
              <span className="text-sm font-light">Exterior:</span>
              <span className="ml-2 font-medium">{exteriorColors[selectedColor].name}</span>
            </div>
            <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-sm">
              <span className="text-sm font-light">Interior:</span>
              <span className="ml-2 font-medium">{interiorColors[selectedInterior].name}</span>
            </div>
          </div>
        </div>

        {/* Configuration options */}
        <div className="p-6 bg-black/30">
          {/* Exterior colors */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3">Exterior Color</h4>
            <div className="grid grid-cols-3 gap-2">
              {exteriorColors.map((color, index) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(index)}
                  className={`relative h-12 rounded-sm transition-all duration-300 ${
                    selectedColor === index ? "ring-2 ring-white scale-105" : "ring-1 ring-zinc-700 hover:ring-zinc-500"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                >
                  {selectedColor === index && (
                    <div className="absolute -top-1 -right-1 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Interior colors */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3">Interior Trim</h4>
            <div className="grid grid-cols-2 gap-2">
              {interiorColors.map((color, index) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedInterior(index)}
                  className={`relative h-12 rounded-sm transition-all duration-300 ${
                    selectedInterior === index
                      ? "ring-2 ring-white scale-105"
                      : "ring-1 ring-zinc-700 hover:ring-zinc-500"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                >
                  {selectedInterior === index && (
                    <div className="absolute -top-1 -right-1 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Wheels */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3">Wheel Options</h4>
            <div className="grid grid-cols-2 gap-2">
              {["Standard", "Sport", "Luxury", "Performance"].map((wheel, index) => (
                <button
                  key={wheel}
                  className={`py-2 px-3 rounded-sm text-sm transition-all duration-300 ${
                    index === 0 ? "bg-white text-black" : "bg-zinc-800 text-white hover:bg-zinc-700"
                  }`}
                >
                  {wheel}
                </button>
              ))}
            </div>
          </div>

          {/* Price calculation */}
          <div className="mt-auto pt-4 border-t border-zinc-700">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Base Price:</span>
              <span>${car?.price?.toLocaleString() || "450,000"}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Options:</span>
              <span>$24,500</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-zinc-700 mt-2">
              <span>Total:</span>
              <span>${((car?.price || 450000) + 24500).toLocaleString()}</span>
            </div>
          </div>

          {/* Action button */}
          <button className="w-full mt-4 bg-gradient-to-r from-white to-gray-200 text-black py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg font-semibold">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}
