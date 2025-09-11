"use client"
import { useState } from "react"
import { FiChevronDown, FiChevronRight, FiPlay, FiLock, FiClock } from "react-icons/fi"

export default function ChapterList({ chapters, hasAccess, onLessonSelect, currentLesson }) {
  const [expandedChapters, setExpandedChapters] = useState(new Set([1]))

  const toggleChapter = (chapterId) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId)
    } else {
      newExpanded.add(chapterId)
    }
    setExpandedChapters(newExpanded)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Course Content</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {chapters.map((chapter) => (
          <div key={chapter.id}>
            {/* Chapter Header */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {expandedChapters.has(chapter.id) ? (
                    <FiChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                  ) : (
                    <FiChevronRight className="w-5 h-5 text-gray-400 mr-3" />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{chapter.lessons.length} lessons</p>
                  </div>
                </div>
              </div>
            </button>

            {/* Chapter Lessons */}
            {expandedChapters.has(chapter.id) && (
              <div className="bg-gray-50">
                {chapter.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => hasAccess && onLessonSelect(lesson)}
                    disabled={!hasAccess}
                    className={`w-full px-12 py-3 text-left hover:bg-gray-100 transition-colors duration-200 ${
                      currentLesson?.id === lesson.id ? "bg-blue-50 border-r-4 border-blue-500" : ""
                    } ${!hasAccess ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {hasAccess ? (
                          <FiPlay className="w-4 h-4 text-blue-600 mr-3" />
                        ) : (
                          <FiLock className="w-4 h-4 text-gray-400 mr-3" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{lesson.title}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FiClock className="w-3 h-3 mr-1" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                      {!hasAccess && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Premium</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {!hasAccess && (
        <div className="bg-yellow-50 border-t border-yellow-200 px-6 py-4">
          <p className="text-sm text-yellow-800">
            <FiLock className="w-4 h-4 inline mr-2" />
            Purchase this course to access all video lessons and materials.
          </p>
        </div>
      )}
    </div>
  )
}
