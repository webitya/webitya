"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Car360Viewer({ carImages, carName }) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [autoRotate, setAutoRotate] = useState(false)
  const containerRef = useRef(null)

  // Default images if none provided
  const images = carImages || [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800&text=30",
    "/placeholder.svg?height=600&width=800&text=60",
    "/placeholder.svg?height=600&width=800&text=90",
    "/placeholder.svg?height=600&width=800&text=120",
    "/placeholder.svg?height=600&width=800&text=150",
    "/placeholder.svg?height=600&width=800&text=180",
    "/placeholder.svg?height=600&width=800&text=210",
    "/placeholder.svg?height=600&width=800&text=240",
    "/placeholder.svg?height=600&width=800&text=270",
    "/placeholder.svg?height=600&width=800&text=300",
    "/placeholder.svg?height=600&width=800&text=330",
  ]

  // Auto-rotate functionality
  useEffect(() => {
    let interval
    if (autoRotate && !isDragging) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % images.length)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [autoRotate, isDragging, images.length])

  // Mouse/touch event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const deltaX = clientX - startX

    if (Math.abs(deltaX) > 10) {
      const direction = deltaX > 0 ? -1 : 1
      setCurrentFrame((prev) => {
        const newFrame = (prev + direction + images.length) % images.length
        setStartX(clientX)
        return newFrame
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [images])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-b from-zinc-900 to-black rounded-sm overflow-hidden border border-zinc-800 shadow-xl">
      {/* 360 Viewer */}
      <div
        ref={containerRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentFrame ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`${carName || "Car"} - View ${index}`}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-3 rounded-full ${
            autoRotate ? "bg-white text-black" : "bg-black/50 text-white hover:bg-white/20"
          } backdrop-blur-sm transition-all duration-300`}
          aria-label={autoRotate ? "Stop rotation" : "Start rotation"}
        >
          {autoRotate ? (
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
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
          )}
        </motion.button>

        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
          <span className="font-light">Drag to rotate</span>
        </div>
      </div>

      {/* Frame indicator */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        {currentFrame + 1} / {images.length}
      </div>
    </div>
  )
}
