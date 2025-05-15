"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

export default function SponsoredSidebar({ sponsored }) {
  if (!sponsored) return null

  return (
    <motion.div
      className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-sm border border-amber-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-1">
        <div className="relative h-40 overflow-hidden rounded-lg">
          <Image src={sponsored.image || "/placeholder.svg"} alt={sponsored.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-3">
              <span className="inline-block bg-amber-400 text-amber-900 font-semibold px-2 py-0.5 rounded text-xs mb-1">
                Sponsored
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h4 className="font-bold text-amber-900 mb-2">{sponsored.title}</h4>
          <p className="text-amber-800 text-sm line-clamp-2 mb-3">{sponsored.summary}</p>
          <Link
            href={`/news/${sponsored.slug}`}
            className="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors"
          >
            Learn more
            <ExternalLink size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
