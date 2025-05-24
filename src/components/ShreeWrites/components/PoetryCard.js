"use client"

import { motion } from "framer-motion"
import { FaHeart, FaQuoteLeft } from "react-icons/fa"
import { BsFlower2, BsStars } from "react-icons/bs"

export default function PoetryCard({ poem }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-lavender-50 via-white to-purple-50 rounded-3xl p-10 shadow-2xl border border-lavender-200/50 relative overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-6 right-6 text-lavender-200 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
        <BsFlower2 size={28} />
      </div>
      <div className="absolute top-8 left-8 text-purple-200 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
        <FaQuoteLeft size={20} />
      </div>
      <motion.div
        className="absolute bottom-6 right-8 text-lavender-300 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <BsStars size={16} />
      </motion.div>

      {/* Soft Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-lavender-300 to-purple-300 rounded-3xl transform rotate-1"></div>
      </div>

      <div className="relative z-10">
        <motion.h3
          className="text-2xl font-light text-slate-700 mb-8 text-center tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {poem.title}
        </motion.h3>

        <div className="space-y-4 mb-8">
          {poem.verses.map((verse, index) => (
            <motion.p
              key={index}
              className="text-slate-600 leading-loose text-center italic font-light text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.3 }}
              whileHover={{ scale: 1.02, color: "#7c3aed" }}
            >
              {verse}
            </motion.p>
          ))}
        </div>

        {/* Decorative Line */}
        <motion.div
          className="w-24 h-0.5 bg-gradient-to-r from-lavender-300 to-purple-300 mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            <span className="font-medium text-lavender-600">By {poem.author}</span>
            <span className="mx-3 text-lavender-300">•</span>
            <span>{poem.date}</span>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-rose-400 hover:text-rose-500 transition-colors duration-300"
            >
              <FaHeart size={18} />
            </motion.button>
            <span className="text-sm text-slate-500 font-medium">{poem.likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
