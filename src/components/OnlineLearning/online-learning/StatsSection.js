"use client"
import { motion } from "framer-motion"
import { TrendingUp, School, Assignment, EmojiEvents } from "@mui/icons-material"

const stats = [
  {
    icon: <School className="text-3xl" />,
    number: "15+",
    label: "Courses Available",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <TrendingUp className="text-3xl" />,
    number: "10,000+",
    label: "Students Enrolled",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Assignment className="text-3xl" />,
    number: "500+",
    label: "Projects Completed",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <EmojiEvents className="text-3xl" />,
    number: "95%",
    label: "Success Rate",
    color: "from-orange-500 to-red-500",
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`bg-gradient-to-r ${stat.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}
              >
                {stat.icon}
              </div>
              <motion.div
                className="text-4xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
