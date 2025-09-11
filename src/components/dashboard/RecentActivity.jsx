"use client"
import { FiPlay, FiDownload, FiAward, FiShoppingCart } from "react-icons/fi"

export default function RecentActivity({ activities }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case "lesson_completed":
        return FiPlay
      case "material_downloaded":
        return FiDownload
      case "certificate_earned":
        return FiAward
      case "course_purchased":
        return FiShoppingCart
      default:
        return FiPlay
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case "lesson_completed":
        return "text-green-600 bg-green-100"
      case "material_downloaded":
        return "text-blue-600 bg-blue-100"
      case "certificate_earned":
        return "text-yellow-600 bg-yellow-100"
      case "course_purchased":
        return "text-purple-600 bg-purple-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No recent activity.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type)
          const colorClass = getActivityColor(activity.type)

          return (
            <div key={index} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(activity.timestamp)}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 text-center">
        <a href="/activity" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All Activity
        </a>
      </div>
    </div>
  )
}
