"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { FaTimes, FaPlay } from "react-icons/fa"

export default function VideoModal({ videoId, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Handle escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  // Get video content based on videoId
  const getVideoContent = () => {
    // In a real implementation, you would have different videos for each ID
    // For now, we'll just show a placeholder

    // For course intro video
    if (videoId === "course-intro-video") {
      return {
        title: "WordPress Courses Overview",
        description: "Learn how our courses can transform your WordPress skills",
      }
    }

    // For course preview videos
    if (videoId === "basic-wordpress-intro") {
      return {
        title: "Basic WordPress Course Preview",
        description: "A quick overview of what you'll learn in our Basic WordPress course",
      }
    }

    if (videoId === "blogging-wordpress-intro") {
      return {
        title: "Blogging WordPress Course Preview",
        description: "See what's included in our comprehensive Blogging WordPress course",
      }
    }

    if (videoId === "ecommerce-wordpress-intro") {
      return {
        title: "E-commerce WordPress Course Preview",
        description: "Discover how to build online stores with our E-commerce WordPress course",
      }
    }

    // For testimonial videos
    if (videoId.startsWith("testimonial-video")) {
      const testimonialNumber = videoId.split("-")[2]
      return {
        title: `Student Testimonial ${testimonialNumber}`,
        description: "Hear what our students have to say about our WordPress courses",
      }
    }

    // Default
    return {
      title: "Video Preview",
      description: "Watch this video to learn more",
    }
  }

  const videoContent = getVideoContent()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg overflow-hidden max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h3 className="text-xl font-bold">{videoContent.title}</h3>
            <p className="text-gray-600 text-sm">{videoContent.description}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition duration-300">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video bg-black">
          {/* In a real implementation, you would embed an actual video here */}
          {/* For now, we'll just show a placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-center text-white p-4">
              <div className="mb-4">
                <FaPlay className="text-5xl mx-auto" />
              </div>
              <p className="text-xl font-semibold mb-2">{videoContent.title}</p>
              <p className="text-gray-300">
                This is a placeholder for the actual video content.
                <br />
                In a real implementation, a video player would be embedded here.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
