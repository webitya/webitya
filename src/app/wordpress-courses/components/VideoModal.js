"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaPlay } from "react-icons/fa"

export default function VideoModal({ isOpen, onClose, videoUrl, title }) {
  const modalRef = useRef()

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            ref={modalRef}
            className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-white/50"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#21759b]/20 to-[#21759b]/5 rounded-2xl blur-lg opacity-70"></div>

            <div className="relative">
              <div className="flex justify-between items-center p-4 border-b border-gray-200/50">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaPlay className="text-[#21759b] mr-2" />
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 hover:bg-gray-100/50 p-2 rounded-full transition-colors duration-200 focus:outline-none"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>

              <div className="relative pt-[56.25%] bg-black">
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-6 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Course Preview</h4>
                    <p className="text-gray-600 text-sm">
                      Get a glimpse of what you'll learn in this comprehensive WordPress course.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-[#21759b] text-white rounded-full text-sm font-medium hover:bg-[#1d6586] transition-colors duration-200"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
