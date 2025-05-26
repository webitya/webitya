"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  AccessTime,
  PlayCircle,
  Person,
  Star,
  Assignment,
  CheckCircle,
  Language,
  Code,
  Web,
  Storage,
  Build,
  Cloud,
} from "@mui/icons-material"

// Icon mapping
const iconMap = {
  Language: Language,
  Code: Code,
  Web: Web,
  Storage: Storage,
  Build: Build,
  Cloud: Cloud,
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function CourseCard({ course, index }) {
  const IconComponent = iconMap[course.iconName] || Code

  // Safely extract primitive values
  const {
    id,
    title,
    description,
    duration,
    level,
    rating,
    students,
    projects,
    category,
    color,
    comingSoon,
    isNew,
    isPopular,
    features = [],
  } = course

  // Ensure lectures is a number
  const lectureCount = Array.isArray(course.lectures) ? course.lectures.length : course.lectures || 0

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden relative group"
    >
      {comingSoon && (
        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          Coming Soon
        </div>
      )}

      {isNew && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          New!
        </div>
      )}

      {isPopular && (
        <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10 flex items-center gap-1">
          <Star className="text-xs" />
          Popular
        </div>
      )}

      <div className={`bg-gradient-to-br ${color} p-8 text-white relative overflow-hidden`}>
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 bg-white bg-opacity-20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
            <IconComponent className="text-4xl" />
          </motion.div>
          <div className="flex items-center gap-1">
            <Star className="text-yellow-300 text-lg" />
            <span className="font-semibold">{rating}</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-3 relative z-10">{title}</h3>
        <p className="text-sm opacity-90 leading-relaxed relative z-10">{description}</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <AccessTime className="text-blue-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <PlayCircle className="text-red-500" />
            <span>{lectureCount} Lectures</span>
          </div>
          <div className="flex items-center gap-2">
            <Person className="text-green-500" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-2">
            <Assignment className="text-purple-500" />
            <span>{projects}+ Projects</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              level === "Beginner"
                ? "bg-green-100 text-green-800"
                : level === "Intermediate"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {level}
          </span>
          <span className="text-sm text-gray-500">{category}</span>
        </div>

        {/* Course Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {features.map((feature, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded flex items-center gap-1">
                <CheckCircle className="text-xs text-green-500" />
                {feature}
              </span>
            ))}
          </div>
        </div>

        {comingSoon ? (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed"
          >
            Coming Soon
          </button>
        ) : (
          <Link href={`/online-learning/${id}`}>
            <motion.button
              className={`w-full bg-gradient-to-r ${color} text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-white bg-opacity-20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Start Learning</span>
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  )
}
