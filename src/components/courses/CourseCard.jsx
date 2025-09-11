"use client"
import { FiClock, FiUsers, FiStar, FiPlay } from "react-icons/fi"

export default function CourseCard({ course, onEnroll }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          ₹{course.price.toLocaleString()}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <FiClock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <FiUsers className="w-4 h-4 mr-1" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center">
            <FiStar className="w-4 h-4 mr-1 text-yellow-400" />
            <span>4.8</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Instructor: {course.instructor}</p>
          <div className="flex flex-wrap gap-2">
            {course.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onEnroll(course.id)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Enroll Now
          </button>
          <a
            href={`/courses/${course.id}`}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <FiPlay className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
