"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, LocationOn, School, Star, VerifiedUser } from "@mui/icons-material"

export default function SponsoredCollegeCarousel({ colleges }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const carousel = useRef()
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === colleges.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? colleges.length - 1 : prevIndex - 1))
  }

  // Auto slide
  useEffect(() => {
    if (autoplay) {
      timeoutRef.current = setTimeout(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex, autoplay])

  const pauseAutoplay = () => {
    setAutoplay(false)
  }

  const resumeAutoplay = () => {
    setAutoplay(true)
  }

  return (
    <div className="relative" onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/50 transition-colors shadow-md"
        >
          <ChevronLeft />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/50 transition-colors shadow-md"
        >
          <ChevronRight />
        </button>
      </div>

      <motion.div ref={carousel} className="overflow-hidden cursor-grab">
        <AnimatePresence mode="wait">
          {colleges.map((college, index) => (
            <motion.div
              key={`${college.id}-${index}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                x: index === currentIndex ? 0 : 100,
                display: index === currentIndex ? "block" : "none",
              }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="min-w-full"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-xl mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                    <Image
                      src={college.image || "/placeholder.svg?height=400&width=600"}
                      alt={college.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:bg-gradient-to-t md:from-black/50 md:to-transparent">
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        SPONSORED
                      </div>

                      {college.verified && (
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                          <VerifiedUser fontSize="small" className="mr-1 w-3 h-3" />
                          Verified
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 md:hidden">
                        <div className="flex items-center text-white mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={i < Math.floor(college.rating) ? "text-yellow-500" : "text-white/30"}
                              fontSize="small"
                            />
                          ))}
                          <span className="ml-1 text-sm">({college.rating}/5)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 w-full md:w-3/5">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-white border flex-shrink-0">
                        <Image
                          src={college.logo || "/placeholder.svg?height=64&width=64"}
                          alt={`${college.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-800">{college.name}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <LocationOn fontSize="small" className="mr-1" />
                          <span>
                            {college.city}, {college.state}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <School fontSize="small" className="mr-1" />
                          <span>{college.type}</span>

                          <span className="mx-1">•</span>

                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={i < Math.floor(college.rating) ? "text-yellow-500" : "text-gray-300"}
                                style={{ width: "14px", height: "14px" }}
                              />
                            ))}
                            <span className="ml-1">({college.rating})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-gray-600">{college.shortDescription}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {college.tags?.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Link
                        href={`/colleges/${college.id}`}
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
                      >
                        View Details
                      </Link>
                      <a
                        href={college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-center mt-4 gap-2">
        {colleges.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
