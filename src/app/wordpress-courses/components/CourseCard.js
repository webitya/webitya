"use client"

import { motion } from "framer-motion"
import { FaPlay, FaDownload, FaShoppingCart, FaCheck } from "react-icons/fa"

export default function CourseCard({ course, index, onPlayIntro, onPlayDemo, onBuy, onDownloadSyllabus }) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[#21759b]/20 to-[#21759b]/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative">
          <img
            src={course.image || "/placeholder.svg?height=200&width=400"}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={onPlayDemo}
              className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-[#21759b] hover:scale-105 transition-transform duration-200 shadow-md"
              aria-label="Play demo video"
            >
              <FaPlay className="text-lg" />
            </button>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-[#21759b] px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              ₹{course.price}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={onPlayIntro}
                className="flex items-center justify-center p-2 bg-[#21759b]/10 rounded-full hover:bg-[#21759b]/20 transition-colors duration-200"
                aria-label="Play introduction video"
              >
                <FaPlay className="text-[#21759b]" />
              </button>
              <button
                onClick={onDownloadSyllabus}
                className="flex items-center justify-center p-2 bg-[#21759b]/10 rounded-full hover:bg-[#21759b]/20 transition-colors duration-200"
                aria-label="Download syllabus"
              >
                <FaDownload className="text-[#21759b]" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 text-[#21759b]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {course.id === 1 ? "10+" : course.id === 2 ? "12+" : "15+"} hours
              </span>
            </div>
          </div>

          <ul className="mb-6 space-y-2">
            {course.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 bg-[#21759b]/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                  <FaCheck className="text-[#21759b] text-xs" />
                </span>
                <span className="text-gray-600 text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <motion.button
            onClick={onBuy}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-[#21759b] hover:bg-[#1d6586] transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaShoppingCart className="mr-2" />
            Enroll Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
