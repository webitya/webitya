"use client"
import { FiPlay, FiClock, FiCheckCircle } from "react-icons/fi"

export default function CourseProgress({ courses }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Courses</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No courses enrolled yet.</p>
          <a
            href="/live-learning"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Browse Courses
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">My Courses</h3>
        <a href="/live-learning" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-12 h-12 rounded-lg object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {course.progress === 100 ? (
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <FiPlay className="w-5 h-5 text-blue-500" />
                )}
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{course.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <FiClock className="w-4 h-4 mr-1" />
                <span>{course.timeSpent || "0h"} spent</span>
              </div>
              <a href={`/courses/${course.id}`} className="text-blue-600 hover:text-blue-700 font-medium">
                Continue
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
