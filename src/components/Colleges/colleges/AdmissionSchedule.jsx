"use client"

import { motion } from "framer-motion"
import { CalendarMonth, CheckCircle, Error, AccessTime } from "@mui/icons-material"

export default function AdmissionSchedule({ schedule = [] }) {
  // Sort schedule by date
  const sortedSchedule = [...schedule].sort((a, b) => new Date(a.date) - new Date(b.date))

  // Get status based on dates
  const getStatus = (date) => {
    const eventDate = new Date(date)
    const today = new Date()

    if (eventDate < today) {
      return {
        status: "completed",
        icon: <CheckCircle className="text-green-500" />,
        bgColor: "bg-green-50",
        borderColor: "border-green-500",
        textColor: "text-green-800",
      }
    } else if (eventDate.toDateString() === today.toDateString()) {
      return {
        status: "today",
        icon: <AccessTime className="text-yellow-500" />,
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-500",
        textColor: "text-yellow-800",
      }
    } else {
      return {
        status: "upcoming",
        icon: <CalendarMonth className="text-gray-400" />,
        bgColor: "bg-gray-50",
        borderColor: "border-gray-300",
        textColor: "text-gray-600",
      }
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Admission Schedule</h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-indigo-500 to-gray-200"></div>

        <div className="space-y-6">
          {sortedSchedule.map((event, index) => {
            const { status, icon, bgColor, borderColor, textColor } = getStatus(event.date)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-0 w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 ${borderColor} shadow-md z-10`}
                >
                  {icon}
                </div>

                <div className={`p-4 rounded-xl ${bgColor} border border-l-4 ${borderColor} shadow-sm`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className={`font-semibold ${textColor}`}>{event.title}</h4>
                    <p className="text-sm text-gray-500 md:ml-4">{formatDate(event.date)}</p>
                  </div>

                  <p className="mt-2 text-gray-700">{event.description}</p>

                  {event.important && (
                    <div className="mt-3 flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                      <Error className="w-4 h-4 mr-2" />
                      <span>Important: {event.important}</span>
                    </div>
                  )}

                  {status === "today" && (
                    <div className="mt-3 flex justify-end">
                      <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-sm hover:shadow-md text-sm">
                        Take Action Now
                      </button>
                    </div>
                  )}

                  {status === "upcoming" && (
                    <div className="mt-3 flex justify-end">
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md text-sm">
                        Set Reminder
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}

          {schedule.length === 0 && (
            <div className="text-center py-12 pl-16 bg-gray-50 rounded-xl">
              <CalendarMonth style={{ fontSize: 48 }} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No admission schedule available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
