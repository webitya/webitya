"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export default function NewsCard({ news }) {
  const formattedDate = new Date(news.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate reading time (rough estimate)
  const contentLength = news.content.join(" ").split(" ").length
  const readingTime = Math.ceil(contentLength / 200) // Assuming 200 words per minute

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/news/${news.slug}`} className="block h-full">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-medium px-2 py-1 rounded">
            {news.category}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1 text-emerald-600" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1 text-emerald-600" />
              {readingTime} min read
            </div>
          </div>

          <h3 className="font-bold text-xl mb-2 line-clamp-2 text-slate-800 group-hover:text-emerald-700 transition-colors">
            {news.title}
          </h3>
          <p className="text-slate-600 line-clamp-3 mb-4 text-sm">{news.summary}</p>

          <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
            Read more
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
