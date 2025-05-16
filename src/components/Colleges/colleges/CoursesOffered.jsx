"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Book, ExpandMore, ExpandLess, School, Info, CalendarMonth, AttachMoney } from "@mui/icons-material"

export default function CoursesOffered({ courses = [] }) {
  const [expandedCourse, setExpandedCourse] = useState(null)

  const toggleCourse = (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null)
    } else {
      setExpandedCourse(courseId)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Courses Offered</h3>

      <div className="space-y-4">
        {courses?.map((course) => (
          <motion.div
            key={course.id}
            className="border rounded-xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-gray-50 to-white hover:from-purple-50 hover:to-white transition-colors"
              onClick={() => toggleCourse(course.id)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                  <Book />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{course.name}</h4>
                  <p className="text-sm text-gray-500 flex items-center flex-wrap gap-x-3">
                    <span className="flex items-center">
                      <CalendarMonth className="mr-1 w-3 h-3" /> {course.duration}
                    </span>
                    <span className="flex items-center">
                      <School className="mr-1 w-3 h-3" /> {course.level}
                    </span>
                    <span className="flex items-center">
                      <Info className="mr-1 w-3 h-3" /> {course.seats} Seats
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-purple-600 mr-2 bg-purple-50 px-2 py-1 rounded-full">
                  {course.seats} Seats
                </span>
                {expandedCourse === course.id ? <ExpandLess /> : <ExpandMore />}
              </div>
            </div>

            <AnimatePresence>
              {expandedCourse === course.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t">
                    <p className="text-gray-700 mb-6">{course.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                            <Info className="w-4 h-4" />
                          </span>
                          Eligibility
                        </h5>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          {course.eligibility?.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-2 flex-shrink-0"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                            <School className="w-4 h-4" />
                          </span>
                          Specializations
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {course.specializations?.map((spec, index) => (
                            <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <h5 className="font-medium text-gray-800 mb-4 flex items-center">
                        <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                          <AttachMoney className="w-4 h-4" />
                        </span>
                        Fee Structure
                      </h5>
                      <div className="overflow-x-auto bg-gray-50 rounded-xl">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 rounded-tl-xl">
                                Category
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                                Amount
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 rounded-tr-xl">
                                Duration
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {course.fees?.map((fee, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="px-4 py-3 text-sm text-gray-700">{fee.category}</td>
                                <td className="px-4 py-3 text-sm font-medium text-purple-700">
                                  ₹{fee.amount.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">{fee.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {courses?.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <School style={{ fontSize: 48 }} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No courses information available</p>
          </div>
        )}
      </div>
    </div>
  )
}
