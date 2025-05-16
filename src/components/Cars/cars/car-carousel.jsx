"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function CarCarousel({ cars }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  const nextSlide = useCallback(() => {
    setDirection("right")
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length)
  }, [cars.length])

  const prevSlide = useCallback(() => {
    setDirection("left")
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length)
  }, [cars.length])

  // Auto-advance slides
  useEffect(() => {
    let interval

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [nextSlide, isAutoPlaying])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  if (!cars || cars.length === 0) {
    return null
  }

  return (
    <div className="relative h-[80vh] overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={cars[currentIndex].image || "/placeholder.svg"}
              alt={cars[currentIndex].name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="inline-block bg-white text-black px-3 py-1 text-sm font-bold mb-4">FEATURED</span>
                  <h2 className="text-4xl md:text-7xl font-bold font-playfair mb-2">{cars[currentIndex].name}</h2>
                  <p className="text-xl md:text-2xl text-gray-300 mb-6">
                    {cars[currentIndex].brand} • {cars[currentIndex].year}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/cars/${cars[currentIndex].slug}`}
                      className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg group flex items-center"
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
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href={`/contact?car=${cars[currentIndex].slug}`}
                      className="bg-transparent border border-white text-white px-6 py-3 rounded-sm hover:bg-white/10 transition"
                    >
                      Inquire Now
                    </Link>
                  </div>
                </motion.div>

                {/* Car Specs */}
                <motion.div
                  className="grid grid-cols-3 gap-4 mt-8 max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="bg-black/50 backdrop-blur-sm p-3 rounded-sm">
                    <p className="text-gray-400 text-xs">Power</p>
                    <p className="text-white font-semibold">{cars[currentIndex].power} hp</p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-3 rounded-sm">
                    <p className="text-gray-400 text-xs">0-60 mph</p>
                    <p className="text-white font-semibold">{cars[currentIndex].acceleration}s</p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-3 rounded-sm">
                    <p className="text-gray-400 text-xs">Top Speed</p>
                    <p className="text-white font-semibold">{cars[currentIndex].topSpeed} mph</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-white hover:text-black text-white p-3 rounded-full z-10 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-white hover:text-black text-white p-3 rounded-full z-10 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {cars.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? "right" : "left")
              setCurrentIndex(index)
            }}
            className={`h-2 w-8 rounded-full transition-all ${
              index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-6 right-6 bg-black/50 hover:bg-white hover:text-black text-white p-2 rounded-full z-10 transition-all duration-300"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
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
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
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
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>
    </div>
  )
}
