"use client"
import { FiBook, FiClock, FiTrendingUp, FiAward } from "react-icons/fi"

export default function DashboardStats({ stats }) {
  const statItems = [
    {
      title: "Enrolled Courses",
      value: stats.enrolledCourses || 0,
      icon: FiBook,
      color: "bg-blue-500",
      change: "+2 this month",
    },
    {
      title: "Hours Learned",
      value: stats.hoursLearned || 0,
      icon: FiClock,
      color: "bg-green-500",
      change: "+12 this week",
    },
    {
      title: "Progress",
      value: `${stats.averageProgress || 0}%`,
      icon: FiTrendingUp,
      color: "bg-purple-500",
      change: "+5% this week",
    },
    {
      title: "Certificates",
      value: stats.certificates || 0,
      icon: FiAward,
      color: "bg-yellow-500",
      change: "Keep learning!",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => {
        const Icon = item.icon
        return (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{item.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{item.value}</p>
                <p className="text-xs text-gray-500 mt-1">{item.change}</p>
              </div>
              <div className={`${item.color} p-3 rounded-full`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
