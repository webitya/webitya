"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { colleges, sponsoredColleges } from "@/components/Colleges/data/collegesList"
import { LocationOn, School } from "@mui/icons-material"

export default function RelatedColleges({ currentCollegeId, state, type }) {
  const [relatedColleges, setRelatedColleges] = useState([])

  useEffect(() => {
    // Combine regular and sponsored colleges
    const allColleges = [...colleges, ...sponsoredColleges]

    // Find colleges in the same state or of the same type, excluding current college
    const related = allColleges
      .filter((college) => college.id !== currentCollegeId && (college.state === state || college.type === type))
      .slice(0, 3) // Limit to 3 colleges

    setRelatedColleges(related)
  }, [currentCollegeId, state, type])

  if (relatedColleges.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Similar Colleges</h3>

      <div className="space-y-4">
        {relatedColleges.map((college, index) => (
          <motion.div
            key={college.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-white border flex-shrink-0">
              <Image
                src={college.logo || "/placeholder.svg?height=64&width=64"}
                alt={`${college.name} logo`}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex-grow">
              <Link
                href={`/colleges/${college.slug}`}
                className="font-medium text-gray-800 hover:text-purple-600 transition-colors"
              >
                {college.name}
              </Link>

              <div className="flex items-center text-gray-500 text-xs mt-1">
                <LocationOn fontSize="small" className="mr-1 w-3 h-3" />
                <span>
                  {college.city}, {college.state}
                </span>
              </div>

              <div className="flex items-center text-gray-500 text-xs mt-1">
                <School fontSize="small" className="mr-1 w-3 h-3" />
                <span>{college.type}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
