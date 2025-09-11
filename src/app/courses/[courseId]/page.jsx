"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import VideoPlayer from "@/components/video/VideoPlayer"
import ChapterList from "@/components/courses/ChapterList"
import { FiStar, FiClock, FiUsers, FiDownload, FiShoppingCart, FiPlay } from "react-icons/fi"

export default function CoursePage() {
  const params = useParams()
  const [course, setCourse] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    fetchCourse()
  }, [params.courseId])

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem("token")
      const headers = {}
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(`/api/courses/${params.courseId}`, { headers })
      const data = await response.json()

      if (response.ok) {
        setCourse(data.course)
        // Set first lesson as current if user has access
        if (data.course.hasAccess && data.course.chapters.length > 0) {
          setCurrentLesson(data.course.chapters[0].lessons[0])
        }
      }
    } catch (error) {
      console.error("Error fetching course:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson)
  }

  const handlePurchase = () => {
    if (!user) {
      window.location.href = "/login"
      return
    }
    window.location.href = `/courses/${params.courseId}/purchase`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.description}</p>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <FiStar className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="font-medium">4.8</span>
                  <span className="text-gray-500 ml-1">(1,234 reviews)</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <FiUsers className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">What you'll learn:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">₹{course.price.toLocaleString()}</div>
                  <p className="text-gray-600">One-time payment</p>
                </div>

                {course.hasAccess ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                      <p className="text-green-800 font-medium">✓ You have access to this course</p>
                    </div>
                    {course.studyMaterials && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Study Materials</h4>
                        <div className="space-y-2">
                          {course.studyMaterials.map((material, index) => (
                            <a
                              key={index}
                              href={material.url}
                              className="flex items-center p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
                            >
                              <FiDownload className="w-4 h-4 text-blue-600 mr-3" />
                              <span className="text-sm">{material.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center"
                  >
                    <FiShoppingCart className="w-5 h-5 mr-2" />
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            {currentLesson && course.hasAccess ? (
              <VideoPlayer videoId={currentLesson.videoId} title={currentLesson.title} />
            ) : (
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiPlay className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    {course.hasAccess ? "Select a lesson to start learning" : "Preview not available"}
                  </h3>
                  <p className="text-gray-300">
                    {course.hasAccess
                      ? "Choose a lesson from the course content"
                      : "Purchase the course to access video content"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Chapter List */}
          <div className="lg:col-span-1">
            <ChapterList
              chapters={course.chapters}
              hasAccess={course.hasAccess}
              onLessonSelect={handleLessonSelect}
              currentLesson={currentLesson}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
