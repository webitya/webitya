"use client"
import { useRouter } from "next/navigation"
import { FiX, FiRefreshCw, FiArrowLeft } from "react-icons/fi"

export default function PaymentFailedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <FiX className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Failed</h2>
          <p className="text-lg text-gray-600 mb-8">
            We couldn't process your payment. This could be due to insufficient funds, network issues, or other
            technical problems.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-8">
          <p className="text-sm text-yellow-800">
            Don't worry! No amount has been deducted from your account. You can try again or contact our support team
            for assistance.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </button>

          <button
            onClick={() => router.push("/live-learning")}
            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Contact our support team at support@webitya.com</p>
        </div>
      </div>
    </div>
  )
}
