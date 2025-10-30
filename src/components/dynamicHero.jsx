"use client"

import { motion } from "framer-motion"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import VerifiedIcon from "@mui/icons-material/Verified"
import PhoneIcon from "@mui/icons-material/Phone"

export default function DynamicHero({ keyword }) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 md:py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-4">
              <VerifiedIcon className="text-blue-600" fontSize="small" />
              <span className="text-blue-600 font-semibold text-xs tracking-wide">TRUSTED BY 500+ BUSINESSES</span>
            </div>

            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
              {keyword.title.split(" | ")[0]}
            </h1>

            <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed font-medium">{keyword.content}</p>

            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-200">
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-xs text-gray-600 font-medium mt-1">Happy Clients</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  1000+
                </div>
                <div className="text-xs text-gray-600 font-medium mt-1">Projects Done</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  10+
                </div>
                <div className="text-xs text-gray-600 font-medium mt-1">Years Experience</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="/contact-us"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold text-base hover:shadow-2xl transition-all duration-300"
              >
                Get Free Consultation
                <ArrowForwardIcon fontSize="small" />
              </motion.a>
              <motion.a
                href="tel:+91XXXXXXXXXX"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-bold text-base hover:bg-blue-50 transition-all duration-300"
              >
                <PhoneIcon fontSize="small" />
                Call Us Now
              </motion.a>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-2xl p-1 shadow-xl">
              <img
                src={keyword.image || "/placeholder.svg?height=400&width=500&query=professional-services"}
                alt={keyword.title}
                className="w-full h-80 md:h-96 object-cover rounded-2xl"
              />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 max-w-xs border-l-4 border-blue-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUpIcon className="text-green-500 text-xl" />
                <span className="font-bold text-gray-900 text-sm">300% ROI Growth</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">Average client growth in 6 months</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
