"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"

export default function NewsBanner({ news }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  // Auto-rotate banner
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length)
      }, 6000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [news.length, isPaused])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length)
    resetTimer()
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length)
    resetTimer()
  }

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 6000)
  }

  if (!news || news.length === 0) return null

  // Calculate reading time (rough estimate)
  const contentLength = news[currentIndex].content.join(" ").split(" ").length
  const readingTime = Math.ceil(contentLength / 200) // Assuming 200 words per minute

  return (
    <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="overflow-hidden h-[400px] md:h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={news[currentIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <div className="relative h-full">
              <Image
                src={news[currentIndex].image || "/placeholder.svg"}
                alt={news[currentIndex].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-6 md:p-10 w-full">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-4 mb-4 text-white/80 text-sm">
                      <span className="inline-block bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
                        {news[currentIndex].category}
                      </span>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(news[currentIndex].date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {readingTime} min read
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{news[currentIndex].title}</h2>
                    <p className="text-white/90 mb-6 line-clamp-2 md:line-clamp-3">{news[currentIndex].summary}</p>
                    <Link
                      href={`/news/${news[currentIndex].slug}`}
                      className="inline-flex items-center bg-white text-emerald-700 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                    >
                      Read Full Story
                      <ChevronRight size={18} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {news.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/40"}`}
            onClick={() => {
              setCurrentIndex(index)
              resetTimer()
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
