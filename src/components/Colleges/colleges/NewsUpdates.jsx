"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Newspaper, CalendarMonth, ArrowForward } from "@mui/icons-material"

export default function NewsUpdates({ news = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">News & Updates</h3>

      <div className="space-y-6">
        {news.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row">
              {item.image && (
                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                  <Image
                    src={item.image || "/placeholder.svg?height=300&width=400"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className={`p-5 ${item.image ? "md:w-2/3" : "w-full"}`}>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <CalendarMonth className="w-4 h-4 mr-1" />
                  <span>
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h4 className="font-semibold text-lg text-gray-800 mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">{item.content}</p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors group"
                  >
                    Read more
                    <ArrowForward className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {news.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Newspaper style={{ fontSize: 48 }} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No news or updates available</p>
          </div>
        )}
      </div>
    </div>
  )
}
