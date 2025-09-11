"use client"

import { useState } from "react"
import Script from "next/script"
import { CheckCircle, User, CalendarIcon, CreditCard, ArrowLeft, ArrowRight } from "lucide-react"
import { FaPaypal } from "react-icons/fa"
import { SiRazorpay } from "react-icons/si"
import Footer from "@/components/FooterEl"

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "Japan",
  "Brazil",
  "Mexico",
]

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
]

export default function ScheduleMeeting() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    selectedDate: null,
    selectedTime: "",
    paymentMethod: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStep1Valid = () => {
    return formData.name && formData.company && formData.email && formData.phone && formData.country
  }

  const isStep2Valid = () => {
    return formData.selectedDate && formData.selectedTime
  }

  const getMinDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 2) // Minimum 2 days from today
    return today
  }

  const isDateDisabled = (date) => {
    return date < getMinDate()
  }

  const generateCalendarDays = () => {
    const year = selectedMonth.getFullYear()
    const month = selectedMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDate = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      if (formData.paymentMethod === "razorpay") {
        await handleRazorpayPayment()
      } else if (formData.paymentMethod === "paypal") {
        await handlePayPalPayment()
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRazorpayPayment = async () => {
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    if (!razorpayKey) {
      console.error("Razorpay key not found")
      alert("Payment configuration error. Please contact support.")
      return
    }

    try {
      const orderResponse = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1, // means ₹1 (server multiplies by 100)
          currency: "INR",
          receipt: `meeting_${Date.now()}`,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create order")
      }

      const { order } = await orderResponse.json()

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "Webitya",
        description: "Meeting Schedule Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("/api/verify-razorpay-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userDetails: formData,
                paymentDetails: {
                  amount: 1,
                  currency: "INR",
                  service: "Meeting Schedule",
                  meetingDate: `${formData.selectedDate?.toDateString()} at ${formData.selectedTime}`,
                },
              }),
            })

            if (!verifyResponse.ok) {
              throw new Error("Verification request failed")
            }

            const result = await verifyResponse.json()

            if (result.success && result.verified) {
              const receiptData = {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                type: "meeting",
                amount: 1,
                currency: "INR",
                service: "Meeting Schedule",
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                paymentMethod: "Razorpay",
                meetingDate: `${formData.selectedDate?.toDateString()} at ${formData.selectedTime}`,
                timestamp: new Date().toISOString(),
              }

              localStorage.setItem("receiptData", JSON.stringify(receiptData))
              window.location.href = `/receipt?payment_id=${response.razorpay_payment_id}&type=meeting&amount=50&currency=INR`
            } else {
              throw new Error(result.error || "Payment verification failed")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            alert("Payment verification failed. Please contact support.")
            setIsLoading(false)
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
          },
        },
      }

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
        throw new Error("Razorpay not loaded")
      }
    } catch (error) {
      console.error("Razorpay payment error:", error)
      alert("Payment initialization failed. Please try again.")
      setIsLoading(false)
    }
  }

  const handlePayPalPayment = async () => {
    try {
      const orderResponse = await fetch("/api/create-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1, // $1 USD
          currency: "USD",
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create PayPal order")
      }

      const { order } = await orderResponse.json()

      const approveLink = order.links?.find((link) => link.rel === "approve")
      if (approveLink) {
        window.location.href = approveLink.href
      } else {
        throw new Error("PayPal approval link not found")
      }
    } catch (error) {
      console.error("PayPal payment error:", error)
      alert("PayPal payment initialization failed. Please try again.")
      setIsLoading(false)
    }
  }

  const ProgressIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              currentStep >= step ? "bg-black text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
          </div>
          {step < 3 && <div className={`w-12 h-0.5 mx-2 ${currentStep > step ? "bg-black" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  )

  const StepHeader = ({ icon: Icon, title, description }) => (
    <div className="text-center mb-6">
      <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <Icon className="w-6 h-6 text-sky-600" />
      </div>
      <h2 className="text-xl font-bold text-black mb-1">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg p-6 shadow-lg border border-gray-200">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-black font-medium">Processing payment...</p>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-white py-6 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black mb-2">Schedule a Meeting</h1>
            <p className="text-gray-600 text-sm">Book your consultation with our experts</p>
          </div>

          <ProgressIndicator />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              {currentStep === 1 && (
                <div>
                  <StepHeader
                    icon={User}
                    title="Your Information"
                    description="Tell us about yourself and your business"
                  />

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-medium text-black mb-1">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-xs font-medium text-black mb-1">
                          Company Name *
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => updateFormData("company", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-black mb-1">
                        Business Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                        placeholder="Enter your business email"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-medium text-black mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-xs font-medium text-black mb-1">
                          Country *
                        </label>
                        <select
                          id="country"
                          value={formData.country}
                          onChange={(e) => updateFormData("country", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                        >
                          <option value="">Select your country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setCurrentStep(2)}
                      disabled={!isStep1Valid()}
                      className="bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium flex items-center text-sm"
                    >
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <StepHeader
                    icon={CalendarIcon}
                    title="Select Date & Time"
                    description="Choose your preferred meeting date and time"
                  />

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-medium text-black mb-3">Select Date *</label>
                      <div className="flex justify-center">
                        <div className="bg-white border border-gray-300 rounded-md p-3">
                          <div className="flex items-center justify-between mb-3">
                            <button
                              onClick={() =>
                                setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))
                              }
                              className="p-1 hover:bg-gray-100 rounded-md"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <h3 className="text-sm font-semibold">
                              {selectedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                            </h3>
                            <button
                              onClick={() =>
                                setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))
                              }
                              className="p-1 hover:bg-gray-100 rounded-md"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                              <div key={day} className="p-1 text-center text-xs font-medium text-gray-600">
                                {day}
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-7 gap-1">
                            {generateCalendarDays().map((date, index) => {
                              const isCurrentMonth = date.getMonth() === selectedMonth.getMonth()
                              const isSelected =
                                formData.selectedDate && date.toDateString() === formData.selectedDate.toDateString()
                              const isDisabled = isDateDisabled(date)

                              return (
                                <button
                                  key={index}
                                  onClick={() => !isDisabled && isCurrentMonth && updateFormData("selectedDate", date)}
                                  disabled={isDisabled || !isCurrentMonth}
                                  className={`p-1.5 text-xs rounded-md ${
                                    isSelected
                                      ? "bg-sky-500 text-white"
                                      : isDisabled || !isCurrentMonth
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "hover:bg-gray-100 text-black"
                                  }`}
                                >
                                  {date.getDate()}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {formData.selectedDate && (
                      <div>
                        <label className="block text-xs font-medium text-black mb-3">Select Time *</label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => updateFormData("selectedTime", time)}
                              className={`p-2 rounded-md border font-medium text-xs ${
                                formData.selectedTime === time
                                  ? "bg-sky-500 text-white border-sky-500"
                                  : "bg-white hover:bg-gray-50 border-gray-300 text-black"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.selectedDate && formData.selectedTime && (
                      <div className="bg-sky-50 p-3 rounded-lg border border-sky-200">
                        <p className="text-xs font-medium text-black">Selected Meeting:</p>
                        <p className="text-sky-600 font-semibold text-sm">
                          {formData.selectedDate.toDateString()} at {formData.selectedTime}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="border border-gray-300 hover:bg-gray-50 text-black px-6 py-2 rounded-md font-medium flex items-center text-sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      disabled={!isStep2Valid()}
                      className="bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium flex items-center text-sm"
                    >
                      Continue to Payment <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <StepHeader icon={CreditCard} title="Payment" description="Complete your meeting booking" />

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-black mb-3 text-sm">Meeting Summary</h3>
                      <div className="space-y-1 text-xs">
                        <p>
                          <span className="font-medium">Name:</span> {formData.name}
                        </p>
                        <p>
                          <span className="font-medium">Company:</span> {formData.company}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span> {formData.selectedDate?.toDateString()}
                        </p>
                        <p>
                          <span className="font-medium">Time:</span> {formData.selectedTime}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-black mb-3">Select Payment Method *</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                          onClick={() => updateFormData("paymentMethod", "razorpay")}
                          className={`p-4 rounded-lg border-2 flex flex-col items-center space-y-2 ${
                            formData.paymentMethod === "razorpay"
                              ? "border-black bg-black text-white"
                              : "border-gray-300 bg-white hover:bg-gray-50 text-black"
                          }`}
                        >
                          <SiRazorpay className="w-6 h-6" />
                          <div className="text-center">
                            <p className="font-semibold text-sm">Razorpay</p>
                          </div>
                        </button>

                        <button
                          onClick={() => updateFormData("paymentMethod", "paypal")}
                          className={`p-4 rounded-lg border-2 flex flex-col items-center space-y-2 ${
                            formData.paymentMethod === "paypal"
                              ? "border-black bg-black text-white"
                              : "border-gray-300 bg-white hover:bg-gray-50 text-black"
                          }`}
                        >
                          <FaPaypal className="w-6 h-6" />
                          <div className="text-center">
                            <p className="font-semibold text-sm">PayPal</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="bg-sky-50 p-3 rounded-lg border border-sky-200">
                      <p className="text-xs text-gray-600 text-center">
                        🔒 Your payment information is secure and encrypted
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="border border-gray-300 hover:bg-gray-50 text-black px-6 py-2 rounded-md font-medium flex items-center text-sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={!formData.paymentMethod || isLoading}
                      className="bg-sky-500 hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium text-sm"
                    >
                      {isLoading ? "Processing..." : "Pay Now"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
