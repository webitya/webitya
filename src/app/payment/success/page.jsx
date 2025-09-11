"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { FiCheck, FiArrowRight } from "react-icons/fi"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [courseId, setCourseId] = useState("")

  useEffect(() => {
    const courseIdParam = searchParams.get("courseId")
    if (courseIdParam) {
      setCourseId(courseIdParam)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <FiCheck className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Congratulations! Your course enrollment has been confirmed. You now have full access to all course
            materials.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push(courseId ? `/courses/${courseId}` : "/dashboard")}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {courseId ? "Start Learning" : "Go to Dashboard"}
            <FiArrowRight className="ml-2 h-4 w-4" />
          </button>

          <button
            onClick={() => router.push("/live-learning")}
            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Browse More Courses
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>A confirmation email has been sent to your registered email address.</p>
        </div>
      </div>
    </div>
  )
}
