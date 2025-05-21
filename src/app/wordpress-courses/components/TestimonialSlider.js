"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaQuoteLeft, FaStar } from "react-icons/fa"

export default function TestimonialCarousel({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#21759b]/20 to-[#21759b]/5 rounded-2xl blur-lg opacity-70"></div>
      <div className="relative bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#21759b]/30 to-[#21759b]/10 rounded-full blur-sm"></div>
                <img
                  src={testimonials[activeIndex].image || "/placeholder.svg?height=200&width=200"}
                  alt={testimonials[activeIndex].name}
                  className="relative w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-sm"
                />
              </div>

              <div className="flex justify-center mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-yellow-400 text-lg mx-0.5" />
                ))}
              </div>
            </div>

            <div className="md:w-2/3 text-center md:text-left">
              <FaQuoteLeft className="text-3xl text-[#21759b]/20 mb-4" />
              <p className="text-lg text-gray-700 mb-6 italic">{testimonials[activeIndex].quote}</p>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{testimonials[activeIndex].name}</h4>
                <p className="text-[#21759b]">{testimonials[activeIndex].title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full mx-1 transition-colors duration-200 ${
              index === activeIndex ? "bg-[#21759b]" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
