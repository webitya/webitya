"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { FaExpand, FaHeart, FaDownload, FaTimes } from "react-icons/fa"
import { BsStars } from "react-icons/bs"

export default function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl border border-white/30"
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setSelectedImage(image)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="aspect-square bg-gradient-to-br from-peach-300 via-coral-300 to-rose-300 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/50 transition-all duration-500"></div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/10 backdrop-blur-sm">
                <motion.div whileHover={{ scale: 1.1 }} className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                  <FaExpand className="text-white" size={20} />
                </motion.div>
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-medium truncate mb-1">{image.title}</p>
                <p className="text-white/80 text-xs">{image.category}</p>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-3 right-3 text-white/30 group-hover:text-white/50 transition-colors duration-300">
                <BsStars size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-3xl max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/30"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={16} />
            </motion.button>

            <div className="aspect-video bg-gradient-to-br from-peach-300 via-coral-300 to-rose-300 relative">
              {/* Action Buttons */}
              <div className="absolute top-6 left-6 flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-rose-400/50 transition-all duration-300"
                >
                  <FaHeart size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-blue-400/50 transition-all duration-300"
                >
                  <FaDownload size={16} />
                </motion.button>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute bottom-6 right-6 text-white/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <BsStars size={24} />
              </motion.div>
            </div>

            <div className="p-8">
              <motion.h3
                className="text-3xl font-light text-slate-700 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedImage.title}
              </motion.h3>
              <motion.p
                className="text-slate-600 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {selectedImage.description}
              </motion.p>
              <motion.div
                className="flex items-center justify-between text-sm text-slate-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-peach-200 to-coral-200 px-4 py-2 rounded-full text-coral-600 font-medium">
                  {selectedImage.category}
                </span>
                <span className="font-medium">Created: {selectedImage.date}</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
