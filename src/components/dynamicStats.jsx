"use client"

import { motion } from "framer-motion"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import PeopleIcon from "@mui/icons-material/People"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"

export default function DynamicStats() {
  const stats = [
    {
      icon: TrendingUpIcon,
      number: "300%",
      label: "Average ROI Growth",
      description: "Our clients see 300% average ROI increase within 6 months",
    },
    {
      icon: PeopleIcon,
      number: "500+",
      label: "Happy Clients",
      description: "Trusted by 500+ businesses across India for digital transformation",
    },
    {
      icon: EmojiEventsIcon,
      number: "1000+",
      label: "Projects Completed",
      description: "Successfully delivered 1000+ projects with 98% client satisfaction",
    },
    {
      icon: ThumbUpIcon,
      number: "4.9/5",
      label: "Average Rating",
      description: "Consistently rated 4.9/5 stars by our satisfied clients",
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                  className="bg-white bg-opacity-20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm"
                >
                  <Icon className="text-white text-2xl" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
                <div className="text-base font-semibold mb-2">{stat.label}</div>
                <p className="text-blue-100 text-xs leading-relaxed">{stat.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
