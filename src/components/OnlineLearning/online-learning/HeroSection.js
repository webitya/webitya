"use client"
import { motion } from "framer-motion"
import { School, Star, Person, PlayCircle, TrendingUp } from "@mui/icons-material"

export default function HeroSection() {
  return (
    <motion.section
      className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-4 -right-4 w-72 h-72 bg-white bg-opacity-10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-8 -left-8 w-96 h-96 bg-white bg-opacity-5 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <School className="text-8xl mx-auto mb-6 drop-shadow-lg" />
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Webitya Online Learning
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Master web development with our comprehensive courses designed for Indian learners. From HTML basics to
          advanced JavaScript - learn with practical projects, interactive quizzes, and real-world examples.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-8 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-3 bg-white bg-opacity-20 px-6 py-3 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <Star className="text-yellow-400" />
            <span className="font-semibold">4.9+ Rating</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 bg-white bg-opacity-20 px-6 py-3 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <Person />
            <span className="font-semibold">10,000+ Students</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 bg-white bg-opacity-20 px-6 py-3 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <PlayCircle />
            <span className="font-semibold">200+ Hours Content</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 bg-white bg-opacity-20 px-6 py-3 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <TrendingUp />
            <span className="font-semibold">95% Success Rate</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.button
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Learning Today 🚀
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
