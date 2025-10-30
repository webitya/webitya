"use client"

import { motion } from "framer-motion"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import PhoneIcon from "@mui/icons-material/Phone"

export default function DynamicCTA() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Ready to Grow Your Business?</h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Join 500+ businesses that have transformed their online presence with WEBITYA
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a
              href="/contact-us"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg text-sm"
            >
              Get Free Consultation
              <ArrowForwardIcon fontSize="small" />
            </motion.a>
            <motion.a
              href="tel:+91XXXXXXXXXX"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors text-sm"
            >
              <PhoneIcon fontSize="small" />
              Call Us Now
            </motion.a>
          </div>

          <p className="text-blue-100 text-xs mt-4">No credit card required • Free consultation • No obligation</p>
        </motion.div>
      </div>
    </section>
  )
}
