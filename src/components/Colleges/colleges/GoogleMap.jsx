"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { LocationOn, Directions, Phone, Language } from "@mui/icons-material"

export default function GoogleMap({ location, name, address }) {
  const mapRef = useRef(null)

  useEffect(() => {
    // This is a placeholder for actual Google Maps integration
    // In a real implementation, you would use the Google Maps API
    if (mapRef.current) {
      const mapElement = mapRef.current

      // Add a placeholder map image
      mapElement.innerHTML = `
        <div class="relative w-full h-full bg-gray-100 flex items-center justify-center rounded-xl overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-indigo-900/20"></div>
          <div class="text-center z-10">
            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <LocationOn style="font-size: 24px" class="text-purple-600" />
            </div>
            <p class="text-gray-700 font-medium">${name}</p>
            <p class="text-gray-500 text-sm mt-1">${location?.latitude.toFixed(6) || 0}, ${location?.longitude.toFixed(6) || 0}</p>
          </div>
        </div>
      `
    }
  }, [location, name])

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Location</h3>

      <div className="rounded-xl overflow-hidden border h-96 shadow-inner" ref={mapRef}></div>

      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 p-4 rounded-xl"
        >
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            <LocationOn className="text-purple-600 mr-2" /> Address
          </h4>
          <p className="text-gray-700 ml-7">{address}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${location?.latitude},${location?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
            >
              <Directions className="mr-2" />
              Get Directions
            </a>

            <a
              href={`tel:+1234567890`}
              className="inline-flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <Phone className="mr-2" />
              Call College
            </a>

            <a
              href={`https://maps.google.com/?q=${location?.latitude},${location?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Language className="mr-2" />
              View on Google Maps
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
