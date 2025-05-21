"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa"

export default function SuccessModal({ paymentInfo, onClose }) {
  useEffect(() => {
    // Redirect to Google Drive after 5 seconds
    const timer = setTimeout(() => {
      window.open(paymentInfo.driveUrl, "_blank")
    }, 5000)

    return () => clearTimeout(timer)
  }, [paymentInfo.driveUrl])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-[#46b450] text-6xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for purchasing <span className="font-semibold">{paymentInfo.courseTitle}</span>
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">{paymentInfo.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment ID:</span>
              <span className="font-medium">{paymentInfo.paymentId}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            You will be redirected to the course materials in 5 seconds. If not, please click the button below.
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={paymentInfo.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#0073aa] hover:bg-[#005d8a] text-white py-3 px-6 rounded-md font-medium transition duration-300"
          >
            Access Course Materials <FaExternalLinkAlt className="ml-2" />
          </motion.a>

          <button onClick={onClose} className="mt-4 text-gray-500 hover:text-gray-700 transition duration-300">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
