"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function CategoryList({ categories }) {
  if (!categories || categories.length === 0) {
    return null
  }

  // Remove "All" from the list for this component
  const filteredCategories = categories.filter((cat) => cat !== "All")

  return (
    <div className="space-y-2">
      {filteredCategories.map((category, index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link
            href={`/news/category/${category.toLowerCase()}`}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <span className="group-hover:text-emerald-600 transition-colors">{category}</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
              {Math.floor(Math.random() * 20) + 1}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
