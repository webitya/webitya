"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LeadershipImpactLight() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Soft Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-96 h-96 bg-blue-100 blur-3xl rounded-full top-[-60px] left-[-80px]"></div>
        <div className="absolute w-80 h-80 bg-sky-100 blur-2xl rounded-full bottom-[-40px] right-[-60px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-blue-500 font-semibold mb-3 tracking-wide uppercase text-sm">
              Sales Syllabus Academy
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-6 relative inline-block">
              <span className="relative z-10">Practical Leadership Learning for Real-World Impact</span>
              <span className="absolute bottom-[-10px] left-0 w-full h-2 bg-blue-200 z-0 rounded"></span>
            </h2>

            <p className="text-slate-700 text-lg mb-4">
           Sales Syllabus Academy is a leadership development platform designed for experienced professionals (10+ years in sales, marketing, or business) who aspire to enter top management roles.
            </p>

            <p className="text-slate-600 mb-4">
          We offer a high-impact alternative to elite institutions like ISB, Harvard, and IIMs—delivering programs rooted in real market data, business demand, and hands-on consulting experience.
            </p>

            <p className="text-slate-600 mb-4">
          Our 100% practical, simulation-based learning approach bridges the gap between theory and execution, helping professional’s master strategies that drive real business results.
            </p>

            <p className="text-xl font-medium text-blue-500 mt-6">
              Learn. Earn. Lead—with Sales Syllabus Academy.
            </p>
          </motion.div>

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src="/leadership-concept.jpg" // Replace with your image
              alt="Leadership Simulation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
