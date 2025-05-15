"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function SponsoredCard({ sponsored }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-amber-200"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <Link href={`/news/${sponsored.slug}`} className="block">
          <div className="relative h-52 overflow-hidden">
            <Image
              src={sponsored.image || "/placeholder.svg"}
              alt={sponsored.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4">
                <span className="inline-block bg-amber-400 text-amber-900 font-semibold px-2 py-1 rounded text-xs mb-2">
                  Sponsored
                </span>
                <h3 className="font-bold text-xl text-white">{sponsored.title}</h3>
              </div>
            </div>
          </div>

          <div className="p-5">
            <p className="text-amber-900 line-clamp-3 mb-4 text-sm">{sponsored.summary}</p>
            <div className="flex items-center text-amber-700 font-medium group-hover:text-amber-800 transition-colors">
              Learn more
              <ExternalLink size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}
