"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AccessTime, CheckCircle, ArrowBack, YouTube, Assignment, Quiz, PlayCircle, Star } from "@mui/icons-material"
import { htmlCourseData } from "@/components/OnlineLearning/data/courses/html-course"
import { javascriptCourseData } from "@/components/OnlineLearning/data/courses/javascript-course"
import { useEffect, useState } from "react"

// Define courses data directly in the component
const coursesData = {
  html: htmlCourseData,
  javascript: javascriptCourseData,
}

export default function CoursePage({ params }) {
  const [course, setCourse] = useState(null)
  const [courseId, setCourseId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCourse() {
      try {
        const resolvedParams = await params
        const foundCourse = coursesData[resolvedParams.course]

        if (!foundCourse) {
          notFound()
          return
        }

        setCourse(foundCourse)
        setCourseId(resolvedParams.course)
      } catch (error) {
        console.error("Error loading course:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadCourse()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    notFound()
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <motion.section
        className={`bg-gradient-to-r ${course.color} text-white py-20 relative overflow-hidden`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 bg-white bg-opacity-10 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-60 h-60 bg-white bg-opacity-5 rounded-full"
            animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/online-learning" className="inline-flex items-center gap-2 mb-8 hover:underline group">
            <ArrowBack className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Courses</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-3xl">🎓</span>
                </div>
                <div>
                  <h1 className="text-5xl font-bold mb-2">{course.title}</h1>
                  <p className="text-xl opacity-90">{course.subtitle}</p>
                </div>
              </motion.div>

              <motion.p
                className="text-lg opacity-90 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {course.description}
              </motion.p>

              <motion.div
                className="flex items-center gap-6 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <Star className="text-yellow-300" />
                  <span>{course.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <PlayCircle />
                  <span>{course.students} Students</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold mb-2">{course.duration}</div>
                <div className="text-sm opacity-80">Duration</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold mb-2">{course.lectures.length}</div>
                <div className="text-sm opacity-80">Lectures</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold mb-2">{course.level}</div>
                <div className="text-sm opacity-80">Level</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold mb-2">{course.projects}+</div>
                <div className="text-sm opacity-80">Projects</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Course Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  📚 <span>Course Overview</span>
                </h2>
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  <p>{course.overview}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  🎯 <span>Who Should Take This Course?</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.targetAudience.map((audience, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <CheckCircle className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{audience}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  ✨ <span>What You Will Achieve</span>
                </h2>
                <div className="space-y-4">
                  {course.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-6 sticky top-6"
              >
                <h3 className="text-2xl font-bold mb-6 text-center">Course Lectures</h3>
                <div className="space-y-3">
                  {course.lectures.map((lecture, index) => (
                    <Link key={index} href={`/online-learning/${courseId}/lecture-${index + 1}`} className="block">
                      <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-r ${course.color} text-white flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                              {lecture.title}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <AccessTime className="text-xs" />
                                <span>{lecture.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <YouTube className="text-xs text-red-500" />
                                <span>Video</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {lecture.hasQuiz && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  <Quiz className="text-xs" />
                                  Quiz
                                </span>
                              )}
                              {lecture.hasProject && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  <Assignment className="text-xs" />
                                  Project
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <motion.div
                  className="mt-8 pt-6 border-t"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <Link href={`/online-learning/${courseId}/lecture-1`}>
                    <motion.button
                      className={`w-full bg-gradient-to-r ${course.color} text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start Course Now 🚀
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
