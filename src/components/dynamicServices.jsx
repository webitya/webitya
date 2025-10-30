"use client"

import { motion } from "framer-motion"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import SpeedIcon from "@mui/icons-material/Speed"
import SecurityIcon from "@mui/icons-material/Security"

export default function DynamicServices({ bulletPoints }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const features = [
    { icon: LightbulbIcon, title: "Strategic Planning", desc: "Data-driven strategies tailored to your goals" },
    { icon: TrendingUpIcon, title: "Targeted Approach", desc: "Reach the right audience at the right time" },
    { icon: SpeedIcon, title: "Fast Results", desc: "Quick implementation with measurable outcomes" },
    { icon: SecurityIcon, title: "Secure & Reliable", desc: "Enterprise-grade security and reliability" },
  ]

  return (
    <section id="services" className="py-16 md:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              OUR SERVICES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">What We Offer</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions designed to transform your business and drive sustainable growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4 mb-14">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(59, 130, 246, 0.12)" }}
                className="text-center p-5 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Icon className="text-white text-lg" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Services List */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Core Services</h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-2 gap-4"
        >
          {bulletPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 6, boxShadow: "0 12px 25px rgba(59, 130, 246, 0.15)" }}
              className="flex gap-4 p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg border border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircleIcon
                  className="text-blue-600 group-hover:text-purple-600 transition-colors"
                  fontSize="medium"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {point}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Expert implementation of {point.toLowerCase()} to maximize your business potential
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
