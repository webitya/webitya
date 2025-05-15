"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

export default function RelatedNews({ articles }) {
  if (!articles || articles.length === 0) {
    return <div className="text-slate-500 text-center py-4">No related articles found</div>
  }

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/news/${article.slug}`} className="flex gap-3 group">
            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <h4 className="font-medium line-clamp-2 group-hover:text-emerald-600 transition-colors text-sm">
                {article.title}
              </h4>
              <div className="flex items-center text-xs text-slate-500 mt-1">
                <Calendar size={12} className="mr-1 text-emerald-600" />
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
