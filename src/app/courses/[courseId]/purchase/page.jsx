"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import PaymentButton from "@/components/payment/PaymentButton"
import { FiCheck, FiClock, FiUsers, FiDownload, FiShield, FiRefreshCw } from "react-icons/fi"

export default function PurchasePage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState("")

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))

    fetchCourse()

    return () => {
      document.body.removeChild(script)
    }
  }, [params.courseId, router])

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${params.courseId}`)
      const data = await response.json()

      if (response.ok) {
        setCourse(data.course)

        // If user already has access, redirect to course
        if (data.course.hasAccess) {
          router.push(`/courses/${params.courseId}`)
          return
        }
      }
    } catch (error) {
      console.error("Error fetching course:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = (data) => {
    setPaymentSuccess(true)
    setPaymentError("")

    // Update user data in localStorage
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
    currentUser.purchasedCourses = currentUser.purchasedCourses || []
    if (!currentUser.purchasedCourses.includes(params.courseId)) {
      currentUser.purchasedCourses.push(params.courseId)
    }
    localStorage.setItem("user", JSON.stringify(currentUser))

    // Redirect to course after 3 seconds
    setTimeout(() => {
      router.push(`/courses/${params.courseId}`)
    }, 3000)
  }

  const handlePaymentError = (error) => {
    setPaymentError(error)
    setPaymentSuccess(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600">The course you're trying to purchase doesn't exist.</p>
        </div>
      </div>
    )
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Congratulations! You have successfully enrolled in <strong>{course.title}</strong>.
          </p>
          <p className="text-sm text-gray-500 mb-6">You will be redirected to the course in a few seconds...</p>
          <button
            onClick={() => router.push(`/courses/${params.courseId}`)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Course
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-8 py-6 bg-blue-600 text-white">
            <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
            <p className="mt-2 opacity-90">You're one step away from starting your learning journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Course Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Course Details</h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <FiClock className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                <div className="space-y-2">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <FiCheck className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <FiDownload className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Downloadable study materials</span>
                  </div>
                  <div className="flex items-center">
                    <FiRefreshCw className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Lifetime access to course content</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Course Price:</span>
                  <span className="text-2xl font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Taxes:</span>
                  <span className="text-gray-900">Included</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">₹{course.price.toLocaleString()}</span>
                </div>
              </div>

              {paymentError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
                  {paymentError}
                </div>
              )}

              <PaymentButton
                courseId={params.courseId}
                course={course}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />

              <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                <FiShield className="w-4 h-4 mr-2" />
                <span>Secure payment powered by Razorpay</span>
              </div>

              <div className="mt-6 text-xs text-gray-500 text-center">
                <p>By completing this purchase, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
