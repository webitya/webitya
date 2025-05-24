"use client"

import { motion } from "framer-motion"
import { FaCalendar, FaUser, FaEye, FaHeart } from "react-icons/fa"
import { BsFlower1 } from "react-icons/bs"

export default function ArticleCard({ article }) {
  return (
    <motion.div
      className="bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-500 group relative"
      whileHover={{ y: -8 }}
    >
      {/* Decorative Element */}
      <div className="absolute top-4 right-4 text-rose-200 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
        <BsFlower1 size={24} />
      </div>

      <div className="relative h-52 bg-gradient-to-br from-rose-200 via-peach-200 to-coral-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-rose-300/30 to-coral-300/30"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="bg-white/90 text-rose-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 line-clamp-2 leading-relaxed group-hover:text-rose-600 transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed font-light">{article.excerpt}</p>

        <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaUser size={12} className="text-rose-400" />
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendar size={12} className="text-lavender-400" />
              <span>{article.date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <motion.button
            className="bg-gradient-to-r from-rose-300 to-coral-300 text-white px-6 py-3 rounded-full text-sm font-medium hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(251, 113, 133, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Read More
          </motion.button>
          <div className="flex items-center space-x-4 text-slate-400">
            <motion.div className="flex items-center space-x-1" whileHover={{ scale: 1.1 }}>
              <FaEye size={14} />
              <span className="text-sm">{article.views}</span>
            </motion.div>
            <motion.div className="flex items-center space-x-1" whileHover={{ scale: 1.1, color: "#f87171" }}>
              <FaHeart size={14} />
              <span className="text-sm">{article.likes}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
