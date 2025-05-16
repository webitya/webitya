"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function SponsoredCarCard({ car }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-1 md:col-span-2 lg:col-span-3"
    >
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-sm overflow-hidden border border-zinc-700 shadow-lg relative">
        <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 z-10">SPONSORED</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="relative h-64 md:h-full">
            <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
          </div>
          <div className="p-6 md:col-span-2">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{car.name}</h3>
                <p className="text-gray-400 text-lg mb-4">{car.brand}</p>
                <p className="text-gray-300 mb-6 line-clamp-2">{car.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-zinc-800/50 p-3 rounded-sm">
                    <p className="text-gray-400 text-xs">Power</p>
                    <p className="text-white font-semibold">{car.power} hp</p>
                  </div>
                  <div className="bg-zinc-800/50 p-3 rounded-sm">
                    <p className="text-gray-400 text-xs">0-60 mph</p>
                    <p className="text-white font-semibold">{car.acceleration}s</p>
                  </div>
                  <div className="bg-zinc-800/50 p-3 rounded-sm">
                    <p className="text-gray-400 text-xs">Top Speed</p>
                    <p className="text-white font-semibold">{car.topSpeed} mph</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-white">${car.price.toLocaleString()}</p>
                <Link
                  href={`/cars/${car.slug}`}
                  className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg flex items-center"
                >
                  View Details
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
                    className="ml-2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
