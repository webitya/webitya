"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaWhatsapp, FaLock, FaCheck, FaCreditCard, FaRupeeSign } from "react-icons/fa"
import { SiPhonepe } from "react-icons/si"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { createPayment } from "../lib/payment-service"

export default function PaymentModal({ isOpen, onClose, course }) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("phonepe")
  const [paymentStatus, setPaymentStatus] = useState("initial")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [step, setStep] = useState(1)
  const [orderId, setOrderId] = useState("")
  const [error, setError] = useState("")

  const handleNextStep = (e) => {
    e.preventDefault()
    if (!email || !name || !phone) {
      toast.error("Please fill in all required fields")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number")
      return
    }

    setStep(2)
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setError("")
    setPaymentStatus("processing")

    try {
      const generatedOrderId = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`
      setOrderId(generatedOrderId)

      const paymentData = {
        amount: course.price,
        orderId: generatedOrderId,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        courseId: course.id,
        courseTitle: course.title,
        paymentMethod: paymentMethod,
      }

      const response = await createPayment(paymentData)

      if (response.success) {
        if (paymentMethod === "phonepe") {
          window.location.href = response.paymentUrl
        } else if (paymentMethod === "whatsapp") {
          const message = `I want to purchase the "${course.title}" course for ₹${course.price}. My order ID is ${generatedOrderId}. My name: ${name}, Email: ${email}, Phone: ${phone}`
          window.open(`https://wa.me/919693245941?text=${encodeURIComponent(message)}`, "_blank")
          setPaymentStatus("success")
          setStep(3)
        } else if (paymentMethod === "card") {
          router.push(`/wordpress-courses/payment/card?orderId=${generatedOrderId}`)
        }
      } else {
        throw new Error(response.message || "Payment initialization failed")
      }
    } catch (err) {
      console.error("Payment error:", err)
      setPaymentStatus("error")
      setError(err.message || "Payment processing failed. Please try again.")
      toast.error("Payment failed. Please try again.")
    }
  }

  const handleCloseSuccess = () => {
    onClose()
    router.push(`/wordpress-courses/thank-you?orderId=${orderId}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            className="relative max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#21759b]/30 to-[#21759b]/10 rounded-2xl blur-lg opacity-70"></div>
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/50">
              <div className="flex justify-between items-center p-4 border-b border-gray-200/50">
                <h3 className="text-xl font-semibold text-gray-900">
                  {step === 1 ? "Your Information" : step === 2 ? "Select Payment Method" : "Payment Successful"}
                </h3>
                {step !== 3 && (
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 hover:bg-gray-100/50 p-2 rounded-full transition-colors duration-200 focus:outline-none"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="p-6">
                {step !== 3 && (
                  <div className="flex items-center justify-center mb-6">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 1 ? "bg-[#21759b] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      1
                    </div>
                    <div
                      className={`h-1 w-16 ${step >= 2 ? "bg-[#21759b]" : "bg-gray-200"} transition-colors duration-300`}
                    ></div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 2 ? "bg-[#21759b] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      2
                    </div>
                  </div>
                )}

                {step !== 3 && (
                  <div className="mb-6">
                    <div className="bg-[#21759b]/5 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Course:</span>
                        <span className="font-medium">{course.title}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Original Price:</span>
                        <span className="font-medium">₹{course.price * 2}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Discount:</span>
                        <span className="font-medium text-green-600">-₹{course.price}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200/50">
                        <span className="text-gray-900 font-semibold">Total:</span>
                        <span className="font-bold text-xl text-[#21759b]">₹{course.price}</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 ? (
                  <form onSubmit={handleNextStep}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#21759b] focus:border-[#21759b] transition-colors duration-200"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#21759b] focus:border-[#21759b] transition-colors duration-200"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#21759b] focus:border-[#21759b] transition-colors duration-200"
                          placeholder="Enter your 10-digit phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#21759b] hover:bg-[#1d6586] transition-colors duration-200"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                ) : step === 2 ? (
                  <form onSubmit={handlePayment}>
                    <div className="space-y-3">
                      <label className="relative flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="phonepe"
                          checked={paymentMethod === "phonepe"}
                          onChange={() => setPaymentMethod("phonepe")}
                          className="h-4 w-4 text-[#21759b] focus:ring-[#21759b]"
                        />
                        <div className="ml-3 flex items-center">
                          <SiPhonepe className="text-purple-600 text-xl mr-2" />
                          <div>
                            <span className="font-medium">PhonePe</span>
                            <p className="text-xs text-gray-500">Fast and secure payment</p>
                          </div>
                        </div>
                        {paymentMethod === "phonepe" && <FaCheck className="absolute right-3 text-green-500" />}
                      </label>

                      {/* <label className="relative flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="h-4 w-4 text-[#21759b] focus:ring-[#21759b]"
                        />
                        <div className="ml-3 flex items-center">
                          <FaCreditCard className="text-blue-500 text-xl mr-2" />
                          <div>
                            <span className="font-medium">Credit/Debit Card</span>
                            <p className="text-xs text-gray-500">All major cards accepted</p>
                          </div>
                        </div>
                        {paymentMethod === "card" && <FaCheck className="absolute right-3 text-green-500" />}
                      </label> */}

                      <label className="relative flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="whatsapp"
                          checked={paymentMethod === "whatsapp"}
                          onChange={() => setPaymentMethod("whatsapp")}
                          className="h-4 w-4 text-[#21759b] focus:ring-[#21759b]"
                        />
                        <div className="ml-3 flex items-center">
                          <FaWhatsapp className="text-green-500 text-xl mr-2" />
                          <div>
                            <span className="font-medium">WhatsApp UPI</span>
                            <p className="text-xs text-gray-500">Pay directly via WhatsApp</p>
                          </div>
                        </div>
                        {paymentMethod === "whatsapp" && <FaCheck className="absolute right-3 text-green-500" />}
                      </label>
                    </div>

                    {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

                    <div className="flex items-center mt-4 mb-6 text-xs text-gray-600">
                      <FaLock className="text-gray-400 mr-2" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={paymentStatus === "processing"}
                        className={`flex-1 flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#21759b] hover:bg-[#1d6586] transition-colors duration-200 ${
                          paymentStatus === "processing" ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {paymentStatus === "processing" ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaRupeeSign className="mr-1" />
                            Pay ₹{course.price}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheck className="text-green-500 text-3xl" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h4>
                    <p className="text-gray-600 mb-6">
                      Thank you for purchasing {course.title}. Your order has been confirmed.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-medium">{orderId}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Amount Paid:</span>
                        <span className="font-medium">₹{course.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium">
                          {paymentMethod === "phonepe"
                            ? "PhonePe"
                            : paymentMethod === "card"
                              ? "Credit/Debit Card"
                              : "WhatsApp UPI"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                      We've sent the course access details to your email address. You can start learning right away!
                    </p>
                    <button
                      onClick={handleCloseSuccess}
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#21759b] hover:bg-[#1d6586] transition-colors duration-200"
                    >
                      Start Learning
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
