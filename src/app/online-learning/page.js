"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { FilterList } from "@mui/icons-material"
import CourseCard from "@/components/OnlineLearning/online-learning/CourseCard"
import HeroSection from "@/components/OnlineLearning/online-learning/HeroSection"
import StatsSection from "@/components/OnlineLearning/online-learning/StatsSection"
import FeaturesSection from "@/components/OnlineLearning/online-learning/FeaturesSection"
import { courses } from "@/components/OnlineLearning/data/courses"
import { COURSE_LEVELS, COURSE_CATEGORIES } from "@/components/OnlineLearning/lib/constants"

export default function OnlineLearningPage() {
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const levelMatch = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel
    const categoryMatch = selectedCategory === "all" || course.category === selectedCategory
    return levelMatch && categoryMatch
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <StatsSection />

      {/* Courses Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Structured learning paths designed to take you from beginner to professional. Each course includes
              hands-on projects, interactive quizzes, and direct YouTube integration.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <FilterList className="text-gray-600" />
              <span className="text-gray-700 font-medium">Filter by:</span>
            </div>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              {COURSE_LEVELS.map((level) => (
                <option key={level} value={level.toLowerCase()}>
                  {level}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {COURSE_CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Course Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>

          {filteredCourses.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-600 text-lg">No courses found matching your filters.</p>
            </motion.div>
          )}
        </div>
      </section>

      <FeaturesSection />
    </div>
  )
}
