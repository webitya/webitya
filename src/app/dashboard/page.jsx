"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import DashboardStats from "@/components/dashboard/DashboardStats"
import CourseProgress from "@/components/dashboard/CourseProgress"
import RecentActivity from "@/components/dashboard/RecentActivity"
import LearningGoals from "@/components/dashboard/LearningGoals"
import { getAllCourses } from "@/lib/courses"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({})
  const [courses, setCourses] = useState([])
  const [activities, setActivities] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Load dashboard data
    loadDashboardData(parsedUser)
  }, [router])

  const loadDashboardData = async (userData) => {
    try {
      // Get all courses
      const allCourses = getAllCourses()

      // Filter user's enrolled courses
      const enrolledCourses = allCourses.filter(
        (course) => userData.purchasedCourses && userData.purchasedCourses.includes(course.id),
      )

      // Add mock progress data
      const coursesWithProgress = enrolledCourses.map((course) => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
        timeSpent: `${Math.floor(Math.random() * 20)}h ${Math.floor(Math.random() * 60)}m`,
      }))

      setCourses(coursesWithProgress)

      // Calculate stats
      const totalProgress = coursesWithProgress.reduce((sum, course) => sum + course.progress, 0)
      const averageProgress =
        coursesWithProgress.length > 0 ? Math.round(totalProgress / coursesWithProgress.length) : 0

      setStats({
        enrolledCourses: coursesWithProgress.length,
        hoursLearned: Math.floor(Math.random() * 50) + 10,
        averageProgress,
        certificates: coursesWithProgress.filter((course) => course.progress === 100).length,
      })

      // Mock recent activities
      setActivities([
        {
          type: "lesson_completed",
          title: "Completed React Hooks lesson",
          description: "Web Development Course",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          type: "material_downloaded",
          title: "Downloaded Python Cheat Sheet",
          description: "Python Programming Course",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
        {
          type: "course_purchased",
          title: "Enrolled in Digital Marketing",
          description: "New course purchase",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      ])

      // Load goals from localStorage
      const savedGoals = localStorage.getItem(`goals_${userData.id}`)
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals))
      } else {
        setGoals([
          {
            id: 1,
            title: "Complete Web Development course",
            completed: false,
            createdAt: new Date(),
          },
          {
            id: 2,
            title: "Learn React fundamentals",
            completed: true,
            createdAt: new Date(),
          },
        ])
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateGoals = (updatedGoals) => {
    setGoals(updatedGoals)
    if (user) {
      localStorage.setItem(`goals_${user.id}`, JSON.stringify(updatedGoals))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Continue your learning journey and achieve your goals.</p>
        </div>

        {/* Stats */}
        <DashboardStats stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <CourseProgress courses={courses} />
            <RecentActivity activities={activities} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <LearningGoals goals={goals} onUpdateGoals={handleUpdateGoals} />

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/live-learning"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Browse Courses
                </a>
                <a
                  href="/profile"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Edit Profile
                </a>
                <a
                  href="/settings"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
