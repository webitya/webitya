"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle, RadioButtonUnchecked, Lock, PlayCircle } from "@mui/icons-material"

export default function ProgressTracker({ lectures, currentLecture, completedLectures = [], courseId = "html" }) {
  const completedCount = completedLectures.length
  const progressPercentage = Math.round((completedCount / lectures.length) * 100)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800 text-center">Course Progress</h3>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          {completedCount} of {lectures.length} lectures completed
        </div>
      </div>

      {/* Lecture List */}
      <div className="space-y-3">
        {lectures.map((lecture, index) => {
          const isCompleted = completedLectures.includes(lecture.id)
          const isCurrent = currentLecture === lecture.id
          const isLocked = index > 0 && !completedLectures.includes(lectures[index - 1].id) && !isCurrent

          return (
            <motion.div
              key={lecture.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {isLocked ? (
                <div className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 bg-gray-50 opacity-60">
                  <Lock className="text-gray-400 text-xl flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-400">{lecture.title}</h4>
                    <p className="text-sm text-gray-300">{lecture.duration}</p>
                  </div>
                </div>
              ) : (
                <Link href={`/online-learning/${courseId}/lecture-${index + 1}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? "bg-blue-50 border-2 border-blue-200 shadow-md"
                        : isCompleted
                          ? "bg-green-50 hover:bg-green-100"
                          : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="text-green-500 text-xl" />
                      ) : isCurrent ? (
                        <PlayCircle className="text-blue-500 text-xl" />
                      ) : (
                        <RadioButtonUnchecked className="text-gray-400 text-xl" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h4
                        className={`font-medium ${
                          isCurrent ? "text-blue-700" : isCompleted ? "text-green-700" : "text-gray-700"
                        }`}
                      >
                        {lecture.title}
                      </h4>
                      <p className="text-sm text-gray-600">{lecture.duration}</p>
                    </div>

                    {isCurrent && (
                      <motion.div
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Current
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
