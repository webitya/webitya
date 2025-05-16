"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { carsData } from "@/components/Cars/data/cars-data"

export default function CarComparisonTool({ initialCars = [] }) {
  const [selectedCars, setSelectedCars] = useState(
    initialCars.length > 0 ? initialCars.map((car) => car.id) : [1, 2], // Default to first two cars
  )
  const [showCarSelector, setShowCarSelector] = useState(false)
  const [selectorIndex, setSelectorIndex] = useState(0)

  const comparisonCars = selectedCars.map((id) => carsData.find((car) => car.id === id)).filter(Boolean)

  const handleAddCar = (index) => {
    setSelectorIndex(index)
    setShowCarSelector(true)
  }

  const handleSelectCar = (carId) => {
    const newSelectedCars = [...selectedCars]
    newSelectedCars[selectorIndex] = carId
    setSelectedCars(newSelectedCars)
    setShowCarSelector(false)
  }

  const handleRemoveCar = (index) => {
    if (selectedCars.length <= 2) return // Keep at least 2 cars

    const newSelectedCars = [...selectedCars]
    newSelectedCars.splice(index, 1)
    setSelectedCars(newSelectedCars)
  }

  const handleAddNewCar = () => {
    if (selectedCars.length >= 4) return // Limit to 4 cars

    // Find a car not already selected
    const availableCars = carsData.filter((car) => !selectedCars.includes(car.id))
    if (availableCars.length > 0) {
      setSelectedCars([...selectedCars, availableCars[0].id])
    }
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-sm border border-zinc-800 shadow-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-700 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold font-playfair">Car Comparison</h3>
          <p className="text-gray-400 mt-1">Compare specifications and features side by side</p>
        </div>

        {selectedCars.length < 4 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddNewCar}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-sm flex items-center gap-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Add Car
          </motion.button>
        )}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-black/30">
              <th className="p-4 font-medium text-gray-400 w-1/4">Specifications</th>
              {comparisonCars.map((car, index) => (
                <th key={car.id} className="p-4 min-w-[200px]">
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="relative w-12 h-12 overflow-hidden rounded-sm">
                        <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold">{car.name}</h4>
                        <p className="text-sm text-gray-400">{car.brand}</p>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 flex gap-1">
                      <button
                        onClick={() => handleAddCar(index)}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Change car"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>

                      {selectedCars.length > 2 && (
                        <button
                          onClick={() => handleRemoveCar(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove car"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-zinc-800">
              <td className="p-4 font-medium text-gray-400">Price</td>
              {comparisonCars.map((car) => (
                <td key={`${car.id}-price`} className="p-4 font-semibold">
                  ${car.price.toLocaleString()}
                </td>
              ))}
            </tr>

            <tr className="border-b border-zinc-800">
              <td className="p-4 font-medium text-gray-400">Engine</td>
              {comparisonCars.map((car) => (
                <td key={`${car.id}-engine`} className="p-4">
                  {car.engine}
                </td>
              ))}
            </tr>

            <tr className="border-b border-zinc-800">
              <td className="p-4 font-medium text-gray-400">Power</td>
              {comparisonCars.map((car) => (
                <td key={`${car.id}-power`} className="p-4">
                  <div className="flex items-center gap-2">
                    <span>{car.power} hp</span>
                    <div className="w-24 bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white"
                        style={{ width: `${Math.min((car.power / 1500) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            <tr className="border-b border-zinc-800">
              <td className="p-4 font-medium text-gray-400">0-60 mph</td>
              {comparisonCars.map((car) => (
                <td key={`${car.id}-acceleration`} className="p-4">
                  <div className="flex items-center gap-2">
                    <span>{car.acceleration}s</span>
                    <div className="w-24 bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white"
                        style={{ width: `${Math.min(100 - (car.acceleration / 12) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            <tr className="border-b border-zinc-800">
              <td className="p-4 font-medium text-gray-400">Top Speed</td>
              {comparisonCars.map((car) => (
                <td key={`${car.id}-topSpeed`} className="p-4">
                  <div className="flex items-center gap-2">
                    <span>{car.topSpeed} mph</span>
                    <div className="w-24 bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white"
                        style={{ width: `${Math.min((car.topSpeed / 300) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-medium text-gray-400">Key Features</td>
              {comparisonCars.map((car) => (
                <td key={`${car.id}-features`} className="p-4">
                  <ul className="space-y-1">
                    {car.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white mt-0.5"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Car selector modal */}
      {showCarSelector && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-zinc-900 rounded-sm border border-zinc-800 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-playfair">Select a Car</h3>
              <button
                onClick={() => setShowCarSelector(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
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
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carsData.map((car) => (
                <button
                  key={car.id}
                  onClick={() => handleSelectCar(car.id)}
                  className={`flex items-center gap-3 p-3 rounded-sm transition-all ${
                    selectedCars.includes(car.id)
                      ? "bg-white/10 border border-white/30"
                      : "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700"
                  }`}
                >
                  <div className="relative w-16 h-16 overflow-hidden rounded-sm flex-shrink-0">
                    <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold">{car.name}</h4>
                    <p className="text-sm text-gray-400">{car.brand}</p>
                    <p className="text-sm">${car.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
