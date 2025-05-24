"use client"

import { motion } from "framer-motion"
import { FaQuoteLeft, FaQuoteRight, FaShare, FaHeart } from "react-icons/fa"
import { BsStars } from "react-icons/bs"

export default function QuoteCard({ quote }) {
  const softGradients = [
    "from-rose-300 to-pink-300",
    "from-purple-300 to-indigo-300",
    "from-green-300 to-emerald-400",
    "from-orange-300 to-yellow-300",
    "from-blue-300 to-cyan-300",
    "from-red-300 to-rose-400",
  ]

  const randomGradient = softGradients[Math.floor(Math.random() * softGradients.length)]

  return (
    <motion.div
      className={`bg-gradient-to-br ${randomGradient} rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group`}
      whileHover={{ rotate: 1, scale: 1.03, y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 opacity-30 group-hover:opacity-50 transition-opacity duration-300 text-white drop-shadow-sm">
        <FaQuoteLeft size={24} />
      </div>
      <div className="absolute bottom-4 right-4 opacity-30 group-hover:opacity-50 transition-opacity duration-300 text-white drop-shadow-sm">
        <FaQuoteRight size={24} />
      </div>
      <motion.div
        className="absolute top-4 right-4 opacity-20 text-white drop-shadow-sm"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <BsStars size={20} />
      </motion.div>

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-3xl" />

      <div className="relative z-10 text-center text-shadow">
        <motion.p
          className="text-lg font-light mb-8 leading-relaxed tracking-wide text-white drop-shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          "{quote.text}"
        </motion.p>

        <motion.div
          className="w-16 h-0.5 bg-white/50 mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />

        <div className="mb-6">
          <motion.p
            className="font-medium text-sm opacity-90 text-white drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.7 }}
          >
            — {quote.author}
          </motion.p>
          {quote.source && (
            <motion.p
              className="text-xs opacity-80 mt-2 text-white drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.9 }}
            >
              {quote.source}
            </motion.p>
          )}
        </div>

        <div className="flex justify-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="text-white/90 hover:text-white transition-colors duration-300 p-2 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <FaShare size={14} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="text-white/90 hover:text-white transition-colors duration-300 p-2 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <FaHeart size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
