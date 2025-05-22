"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { FaCheck, FaPlay, FaArrowLeft } from "react-icons/fa"
import { getOrderDetails } from "../lib/payment-service"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  const orderId = searchParams.get("orderId")

  useEffect(() => {
    if (!orderId) {
      router.push("/wordpress-courses")
      return
    }

    async function fetchOrderDetails() {
      try {
        const response = await getOrderDetails(orderId)

        if (response.success) {
          setOrderDetails(response.order)
        } else {
          router.push("/wordpress-courses")
        }
      } catch (error) {
        console.error("Error fetching order details:", error)
        router.push("/wordpress-courses")
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#21759b] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your order details...</p>
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">Order not found or payment verification failed.</p>
          <button
            onClick={() => router.push("/wordpress-courses")}
            className="px-4 py-2 bg-[#21759b] text-white rounded-lg"
          >
            Return to Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#21759b] to-[#1d6586] p-8 text-white">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <FaCheck className="text-[#21759b] text-2xl" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">Thank You for Your Purchase!</h1>
            <p className="text-center mt-2 text-white/90">Your order has been confirmed and processed successfully.</p>
          </div>

          <div className="p-8">
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Course:</span>
                  <span className="font-medium">{orderDetails.courseTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium">₹{orderDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{orderDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Date:</span>
                  <span className="font-medium">{new Date(orderDetails.purchaseDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-[#21759b]/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#21759b] font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Check Your Email</h3>
                  <p className="text-gray-600">
                    We've sent course access details to {orderDetails.customerEmail}. Please check your inbox.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-[#21759b]/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#21759b] font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Access Your Course</h3>
                  <p className="text-gray-600">
                    Use the login details provided in the email to access your course dashboard.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-[#21759b]/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#21759b] font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Start Learning</h3>
                  <p className="text-gray-600">
                    Begin your WordPress journey and reach out to our support team if you need any assistance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/wordpress-courses")}
                className="flex-1 flex items-center justify-center px-4 py-3 border border-[#21759b] rounded-lg text-[#21759b] hover:bg-[#21759b]/5 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" />
                Back to Courses
              </button>
              <button
                onClick={() => window.open("https://webitya.com/dashboard", "_blank")}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-[#21759b] text-white rounded-lg hover:bg-[#1d6586] transition-colors duration-200"
              >
                <FaPlay className="mr-2" />
                Start Learning
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>If you have any questions, please contact our support team at support@webitya.com</p>
        </div>
      </div>
    </div>
  )
}
