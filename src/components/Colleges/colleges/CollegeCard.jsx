"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { LocationOn, School, Star, StarBorder, Bookmark, BookmarkBorder, VerifiedUser } from "@mui/icons-material"

export default function CollegeCard({ college, isSponsored = false }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Render stars for rating
  const renderRating = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="text-yellow-500" fontSize="small" />)
      } else {
        stars.push(<StarBorder key={i} className="text-yellow-500" fontSize="small" />)
      }
    }
    return stars
  }

  const toggleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)

    // Save to localStorage
    const bookmarkedColleges = JSON.parse(localStorage.getItem("bookmarkedColleges") || "[]")

    if (!isBookmarked) {
      bookmarkedColleges.push(college.id)
    } else {
      const index = bookmarkedColleges.indexOf(college.id)
      if (index > -1) {
        bookmarkedColleges.splice(index, 1)
      }
    }

    localStorage.setItem("bookmarkedColleges", JSON.stringify(bookmarkedColleges))
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden ${isSponsored ? "ring-2 ring-purple-500" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isSponsored && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1.5 text-center">
          SPONSORED
        </div>
      )}

      <div className="relative h-48">
        <Image
          src={college.image || "/placeholder.svg?height=200&width=400"}
          alt={college.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="absolute top-2 right-2">
            <button
              onClick={toggleBookmark}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
            >
              {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
            </button>
          </div>

          {college.verified && (
            <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
              <VerifiedUser fontSize="small" className="mr-1 w-3 h-3" />
              Verified
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center text-white mb-1">
              {renderRating(college.rating)}
              <span className="ml-1 text-sm">({college.rating}/5)</span>
            </div>

            <h3 className="font-bold text-lg text-white line-clamp-1">{college.name}</h3>

            <div className="flex items-center text-white/80 text-sm mt-1">
              <LocationOn fontSize="small" className="mr-1 w-4 h-4" />
              <span>
                {college.city}, {college.state}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-white border flex-shrink-0">
            <Image
              src={college.logo || "/placeholder.svg?height=48&width=48"}
              alt={`${college.name} logo`}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center text-gray-500 text-sm">
              <School fontSize="small" className="mr-1 w-4 h-4" />
              <span>{college.type}</span>

              {college.established && (
                <>
                  <span className="mx-1">•</span>
                  <span>Est. {college.established}</span>
                </>
              )}
            </div>

            <p className="mt-2 text-gray-600 text-sm line-clamp-2">{college.shortDescription}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {college.tags?.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
              {tag}
            </span>
          ))}
          {college.tags?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{college.tags.length - 3} more
            </span>
          )}
        </div>

        <Link
          href={`/colleges/${college.slug}`}
          className="mt-4 block w-full text-center py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}
