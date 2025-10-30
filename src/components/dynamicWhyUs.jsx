"use client"

import { motion } from "framer-motion"
import StarIcon from "@mui/icons-material/Star"
import SecurityIcon from "@mui/icons-material/Security"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import GroupsIcon from "@mui/icons-material/Groups"

export default function DynamicWhyUs() {
  const reasons = [
    {
      icon: EmojiEventsIcon,
      title: "Award-Winning Team",
      description: "Industry experts with proven track record",
    },
    {
      icon: TrendingUpIcon,
      title: "Proven Results",
      description: "300% average ROI growth for clients",
    },
    {
      icon: SecurityIcon,
      title: "100% Transparent",
      description: "Clear reporting and full visibility",
    },
    {
      icon: SupportAgentIcon,
      title: "24/7 Support",
      description: "Dedicated support team always ready",
    },
    {
      icon: GroupsIcon,
      title: "Dedicated Team",
      description: "Personal account manager assigned",
    },
    {
      icon: StarIcon,
      title: "5-Star Rated",
      description: "Trusted by 500+ satisfied clients",
    },
  ]

  return (
    <section id="why-us" className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-3">
            <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-xs font-semibold">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Why WEBITYA?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're not just a service provider, we're your growth partner
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                  <Icon className="text-blue-600 text-lg" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">{reason.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{reason.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
