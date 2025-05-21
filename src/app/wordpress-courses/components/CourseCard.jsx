"use client"

import { motion } from "framer-motion"
import { FaWhatsapp, FaDownload, FaClock, FaBookOpen, FaPlay } from "react-icons/fa"
import { MdPayment } from "react-icons/md"

export default function CourseCard({ course, index, onPaymentSelect, onDownloadSyllabus, onWatchIntro }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4"
      style={{ borderColor: course.color }}
    >
      <div className="p-6">
        <div className="flex justify-center mb-4">{course.icon}</div>
        <h3 className="text-xl font-bold text-center mb-2">{course.title}</h3>
        <p className="text-gray-600 text-center mb-4">{course.description}</p>

        <div className="flex justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <FaClock className="mr-1 text-[#0073aa]" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <FaBookOpen className="mr-1 text-[#0073aa]" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>

        <div className="border-t border-b border-gray-200 py-4 my-4">
          <ul className="space-y-2">
            {course.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <svg
                  className="h-5 w-5 text-[#46b450] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-gray-900">₹{course.price}</span>
          <span className="text-gray-600"> only</span>
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onWatchIntro(course.introVideo)}
            className="w-full py-3 px-4 bg-[#f8f9fa] hover:bg-gray-100 text-gray-800 rounded-md flex items-center justify-center transition duration-300 border border-gray-300"
          >
            <FaPlay className="mr-2 text-[#0073aa]" />
            Watch Preview
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPaymentSelect(course, "whatsapp")}
            className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center justify-center transition duration-300"
          >
            <FaWhatsapp className="mr-2" />
            Pay via WhatsApp
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPaymentSelect(course, "razorpay")}
            className="w-full py-3 px-4 bg-[#0073aa] hover:bg-[#005d8a] text-white rounded-md flex items-center justify-center transition duration-300"
          >
            <MdPayment className="mr-2" />
            Pay with Razorpay
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onDownloadSyllabus(course.syllabus, course.title)}
            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md flex items-center justify-center transition duration-300 border border-gray-300"
          >
            <FaDownload className="mr-2" />
            Download Syllabus
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
