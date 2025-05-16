"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Close, ZoomIn, ArrowBack, ArrowForward } from "@mui/icons-material"

export default function CampusGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = (e) => {
    e.stopPropagation()
    const newIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    setSelectedIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  const goToNext = (e) => {
    e.stopPropagation()
    const newIndex = selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
    setSelectedIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Campus Gallery</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images?.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(image, index)}
          >
            <Image
              src={image.url || "/placeholder.svg?height=300&width=300"}
              alt={image.caption || `Campus image ${index + 1}`}
              fill
              className="object-cover transition-transform group-hover:scale-110 duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <ZoomIn className="text-white" />
            </div>
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {image.caption}
              </div>
            )}
          </motion.div>
        ))}

        {images?.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No gallery images available</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
              onClick={closeLightbox}
            >
              <Close />
            </button>

            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
                  onClick={goToPrevious}
                >
                  <ArrowBack />
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
                  onClick={goToNext}
                >
                  <ArrowForward />
                </button>
              </>
            )}

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.url || "/placeholder.svg?height=800&width=1200"}
                  alt={selectedImage.caption || "Campus image"}
                  fill
                  className="object-contain"
                />
              </div>

              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center">
                  {selectedImage.caption}
                </div>
              )}
            </motion.div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex(index)
                    setSelectedImage(images[index])
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedIndex ? "bg-white w-4" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
