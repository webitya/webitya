"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import {
  ArrowBack,
  CalendarMonth,
  AccessTime,
  LocalOffer,
  CheckCircle,
  CreditCard,
  Money,
  AccountBalance,
  Email,
  Phone,
  Person,
} from "@mui/icons-material"
import { sendBookingConfirmation, getAllVehicles, processRazorpayPayment, verifyRazorpayPayment } from "./actions"
import Footer from "@/components/FooterEl"

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const vehicleId = searchParams.get("vehicleId") || "1"
  const initialPlan = searchParams.get("plan") || "hourly"

  const [vehicle, setVehicle] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(initialPlan)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [bookingStep, setBookingStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingId, setBookingId] = useState("")
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  // User details
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true)
        // Import vehicles data dynamically
        const vehiclesData = await getAllVehicles()

        if (Array.isArray(vehiclesData) && vehiclesData.length > 0) {
          setVehicles(vehiclesData)

          // Set the selected vehicle
          if (vehicleId) {
            const selectedVehicle = vehiclesData.find((v) => v.id === vehicleId) || vehiclesData[0]
            setVehicle(selectedVehicle)
          }
        } else {
          console.error("Vehicles data is not in expected format:", vehiclesData)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error loading vehicles:", error)
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [vehicleId])

  useEffect(() => {
    if (vehicle && startDate && endDate) {
      calculatePrice()
    }
  }, [vehicle, selectedPlan, startDate, endDate, startTime, endTime, promoApplied])

  const calculatePrice = () => {
    if (!vehicle) return

    let price = 0
    let days = 0
    let hours = 0

    if (selectedPlan === "hourly" && startTime && endTime) {
      const start = new Date(`${startDate}T${startTime}`)
      const end = new Date(`${endDate}T${endTime}`)
      const diffMs = end - start
      hours = Math.ceil(diffMs / (1000 * 60 * 60))
      price = hours * vehicle.pricing.hourly
    } else if (selectedPlan === "daily") {
      const start = new Date(startDate)
      const end = new Date(endDate)
      days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
      price = days * vehicle.pricing.daily
    } else if (selectedPlan === "weekly") {
      const start = new Date(startDate)
      const end = new Date(endDate)
      days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
      const weeks = Math.ceil(days / 7)
      price = weeks * vehicle.pricing.weekly
    } else if (selectedPlan === "monthly") {
      const start = new Date(startDate)
      const end = new Date(endDate)
      days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
      const months = Math.ceil(days / 30)
      price = months * vehicle.pricing.monthly
    }

    // Apply discount if promo code is applied
    if (promoApplied) {
      setDiscount(price * 0.1) // 10% discount
      price = price * 0.9
    } else {
      setDiscount(0)
    }

    setTotalPrice(price)
  }

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan)
    // Reset dates and times when changing plans
    setStartDate("")
    setEndDate("")
    setStartTime("")
    setEndTime("")
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "zup10") {
      setPromoApplied(true)
    } else {
      alert("Invalid promo code")
    }
  }

  const handleContinue = () => {
    if (bookingStep === 1) {
      // Validate first step
      if (!startDate || !endDate || (selectedPlan === "hourly" && (!startTime || !endTime))) {
        alert("Please fill in all required fields")
        return
      }
      setBookingStep(2)
    } else if (bookingStep === 2) {
      // Validate user details
      if (!userName || !userEmail || !userPhone) {
        alert("Please fill in all required fields")
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userEmail)) {
        alert("Please enter a valid email address")
        return
      }

      // Validate phone number
      const phoneRegex = /^\d{10}$/
      if (!phoneRegex.test(userPhone)) {
        alert("Please enter a valid 10-digit phone number")
        return
      }

      // Process payment
      processPayment()
    }
  }

  const processPayment = async () => {
    setIsProcessing(true)

    // Generate a random booking ID
    const generatedBookingId = "ZUP" + Math.floor(Math.random() * 10000)
    setBookingId(generatedBookingId)

    if (paymentMethod === "razorpay") {
      // Initialize Razorpay
      if (window.Razorpay && razorpayLoaded) {
        try {
          // Create an order on the server
          const orderData = await processRazorpayPayment({
            amount: totalPrice + 1000, // Including security deposit
            currency: "INR",
            receipt: generatedBookingId,
          })

          initRazorpay(generatedBookingId, orderData)
        } catch (error) {
          console.error("Error creating Razorpay order:", error)
          alert("Failed to initialize payment. Please try again.")
          setIsProcessing(false)
        }
      } else {
        // If Razorpay is not loaded yet, wait a bit and try again
        setTimeout(() => {
          if (window.Razorpay) {
            processPayment()
          } else {
            alert("Failed to load payment gateway. Please try again.")
            setIsProcessing(false)
          }
        }, 2000)
      }
    } else if (paymentMethod === "cod") {
      // Simulate COD processing
      setTimeout(async () => {
        await handleBookingSuccess(generatedBookingId)
      }, 1500)
    }
  }

  const initRazorpay = (bookingId, orderData) => {
    const totalAmount = totalPrice + 1000 // Including security deposit

    const options = {
      key: orderData.key || "rzp_live_xkYfvkSJJJucnU", // Use the key from the server or fallback
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "Zup Rides",
      description: `Booking for ${vehicle?.name}`,
      image: "/placeholder-logo.svg",
      order_id: orderData.orderId, // This should come from your server
      handler: async (response) => {
        // Handle successful payment
        try {
          // Verify the payment
          const verificationResult = await verifyRazorpayPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          })

          if (verificationResult.verified) {
            await handleBookingSuccess(bookingId, response.razorpay_payment_id)
          } else {
            throw new Error("Payment verification failed")
          }
        } catch (error) {
          console.error("Payment verification error:", error)
          alert("Payment verification failed. Please contact support.")
          setIsProcessing(false)
        }
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: userPhone,
      },
      notes: {
        booking_id: bookingId,
        vehicle_id: vehicleId,
      },
      theme: {
        color: "#7C3AED", // Purple color for Razorpay theme
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false)
          console.log("Payment cancelled by user")
        },
      },
    }

    try {
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Razorpay error:", error)
      alert("Payment gateway error. Please try again.")
      setIsProcessing(false)
    }
  }

  const handleBookingSuccess = async (bookingId, paymentId = null) => {
    try {
      // Prepare booking details
      const bookingDetails = {
        bookingId,
        paymentId,
        paymentMethod,
        userName,
        userEmail,
        userPhone,
        vehicleName: vehicle.name,
        vehicleBrand: vehicle.brand,
        vehicleType: vehicle.type,
        plan: selectedPlan,
        startDate,
        endDate,
        startTime: selectedPlan === "hourly" ? startTime : null,
        endTime: selectedPlan === "hourly" ? endTime : null,
        basePrice: totalPrice + discount,
        discount,
        securityDeposit: 1000,
        totalAmount: totalPrice + 1000,
      }

      // Send confirmation emails
      await sendBookingConfirmation(bookingDetails)

      setEmailSent(true)
      setIsProcessing(false)
      setBookingStep(3)
    } catch (error) {
      console.error("Error processing booking:", error)
      alert("There was an error processing your booking. Please try again.")
      setIsProcessing(false)
    }
  }

  const getMinEndDate = () => {
    if (!startDate) return ""
    return startDate
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle not found</h1>
          <Link href="/zup-rides/vehicles" className="text-purple-600 hover:underline">
            Browse all vehicles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Load Razorpay script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        strategy="lazyOnload"
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href={`/zup-rides/vehicles/${vehicleId}`}
              className="inline-flex items-center text-purple-600 hover:underline"
            >
              <ArrowBack className="w-4 h-4 mr-1" /> Back to vehicle details
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Your Ride</h1>

          {bookingStep < 3 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-6">
                  {/* Progress Steps */}
                  <div className="flex mb-8">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          bookingStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        1
                      </div>
                      <span className="text-sm mt-1">Booking Details</span>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className={`h-1 w-full ${bookingStep >= 2 ? "bg-purple-600" : "bg-gray-200"}`}></div>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          bookingStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        2
                      </div>
                      <span className="text-sm mt-1">Payment</span>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className={`h-1 w-full ${bookingStep >= 3 ? "bg-purple-600" : "bg-gray-200"}`}></div>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          bookingStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        3
                      </div>
                      <span className="text-sm mt-1">Confirmation</span>
                    </div>
                  </div>

                  {bookingStep === 1 && (
                    <>
                      <h2 className="text-xl font-semibold mb-6">Booking Details</h2>

                      {/* Rental Plans */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Rental Plan</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <button
                            type="button"
                            className={`p-3 rounded-lg text-center ${
                              selectedPlan === "hourly" ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => handlePlanChange("hourly")}
                          >
                            <p className="text-xl font-bold">₹{vehicle.pricing.hourly}</p>
                            <p className="text-sm">per hour</p>
                          </button>
                          <button
                            type="button"
                            className={`p-3 rounded-lg text-center ${
                              selectedPlan === "daily" ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => handlePlanChange("daily")}
                          >
                            <p className="text-xl font-bold">₹{vehicle.pricing.daily}</p>
                            <p className="text-sm">per day</p>
                          </button>
                          <button
                            type="button"
                            className={`p-3 rounded-lg text-center ${
                              selectedPlan === "weekly" ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => handlePlanChange("weekly")}
                          >
                            <p className="text-xl font-bold">₹{vehicle.pricing.weekly}</p>
                            <p className="text-sm">per week</p>
                          </button>
                          <button
                            type="button"
                            className={`p-3 rounded-lg text-center ${
                              selectedPlan === "monthly" ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => handlePlanChange("monthly")}
                          >
                            <p className="text-xl font-bold">₹{vehicle.pricing.monthly}</p>
                            <p className="text-sm">per month</p>
                          </button>
                        </div>
                      </div>

                      {/* Date Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
                            <CalendarMonth className="w-4 h-4 inline mr-1" />
                            Start Date
                          </label>
                          <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-2">
                            <CalendarMonth className="w-4 h-4 inline mr-1" />
                            End Date
                          </label>
                          <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={getMinEndDate()}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      {/* Time Selection (for hourly rentals) */}
                      {selectedPlan === "hourly" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-2">
                              <AccessTime className="w-4 h-4 inline mr-1" />
                              Start Time
                            </label>
                            <input
                              type="time"
                              id="start-time"
                              value={startTime}
                              onChange={(e) => setStartTime(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-2">
                              <AccessTime className="w-4 h-4 inline mr-1" />
                              End Time
                            </label>
                            <input
                              type="time"
                              id="end-time"
                              value={endTime}
                              onChange={(e) => setEndTime(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* User Details */}
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">Your Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <div>
                            <label htmlFor="user-name" className="block text-sm font-medium text-gray-700 mb-2">
                              <Person className="w-4 h-4 inline mr-1" />
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="user-name"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="user-phone" className="block text-sm font-medium text-gray-700 mb-2">
                              <Phone className="w-4 h-4 inline mr-1" />
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="user-phone"
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                              placeholder="9876543210"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 mb-2">
                            <Email className="w-4 h-4 inline mr-1" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="user-email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Your booking confirmation will be sent to this email address
                          </p>
                        </div>
                      </div>

                      {/* Promo Code */}
                      <div className="mb-6">
                        <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-2">
                          <LocalOffer className="w-4 h-4 inline mr-1" />
                          Promo Code (Optional)
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            id="promo-code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Enter promo code"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            disabled={promoApplied}
                          />
                          <button
                            type="button"
                            onClick={applyPromoCode}
                            disabled={promoApplied || !promoCode}
                            className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition duration-300 disabled:bg-gray-300"
                          >
                            Apply
                          </button>
                        </div>
                        {promoApplied && (
                          <p className="text-green-600 text-sm mt-1 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            10% discount applied!
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {bookingStep === 2 && (
                    <>
                      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

                      {/* Payment Method Selection */}
                      <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-4">Select Payment Method</label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Razorpay Option */}
                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              paymentMethod === "razorpay"
                                ? "border-purple-600 bg-purple-50"
                                : "border-gray-200 hover:border-purple-300"
                            }`}
                            onClick={() => setPaymentMethod("razorpay")}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-5 h-5 rounded-full border ${
                                  paymentMethod === "razorpay" ? "border-purple-600" : "border-gray-400"
                                } flex items-center justify-center mr-3`}
                              >
                                {paymentMethod === "razorpay" && (
                                  <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                                )}
                              </div>
                              <div className="flex items-center">
                                <CreditCard className="text-gray-700 mr-2" />
                                <span className="font-medium">Pay Online (Razorpay)</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 ml-8">
                              Pay securely with credit/debit card, UPI, or net banking
                            </p>
                          </div>

                          {/* Cash on Delivery Option */}
                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              paymentMethod === "cod"
                                ? "border-purple-600 bg-purple-50"
                                : "border-gray-200 hover:border-purple-300"
                            }`}
                            onClick={() => setPaymentMethod("cod")}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-5 h-5 rounded-full border ${
                                  paymentMethod === "cod" ? "border-purple-600" : "border-gray-400"
                                } flex items-center justify-center mr-3`}
                              >
                                {paymentMethod === "cod" && <div className="w-3 h-3 rounded-full bg-purple-600"></div>}
                              </div>
                              <div className="flex items-center">
                                <Money className="text-gray-700 mr-2" />
                                <span className="font-medium">Cash on Delivery</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 ml-8">Pay in cash when you pick up the vehicle</p>
                          </div>
                        </div>
                      </div>

                      {/* Payment Details */}
                      {paymentMethod === "razorpay" && (
                        <div className="border border-gray-200 rounded-lg p-6 mb-6">
                          <h3 className="text-lg font-medium mb-4 flex items-center">
                            <AccountBalance className="mr-2" />
                            Payment Information
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            You'll be redirected to Razorpay's secure payment gateway to complete your payment.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <div className="bg-gray-100 rounded p-2 text-xs">Credit Card</div>
                            <div className="bg-gray-100 rounded p-2 text-xs">Debit Card</div>
                            <div className="bg-gray-100 rounded p-2 text-xs">UPI</div>
                            <div className="bg-gray-100 rounded p-2 text-xs">Net Banking</div>
                            <div className="bg-gray-100 rounded p-2 text-xs">Wallet</div>
                          </div>
                          <div className="text-xs text-gray-500">
                            <p>* Your payment information is secure with our payment partner.</p>
                            <p>* You'll receive a payment receipt via email after successful payment.</p>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "cod" && (
                        <div className="border border-gray-200 rounded-lg p-6 mb-6">
                          <h3 className="text-lg font-medium mb-4 flex items-center">
                            <Money className="mr-2" />
                            Cash on Delivery
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">Please note the following for Cash on Delivery:</p>
                          <ul className="list-disc pl-5 mb-4 text-sm text-gray-600 space-y-2">
                            <li>Bring the exact amount in cash when you pick up the vehicle</li>
                            <li>You'll need to pay the security deposit in advance</li>
                            <li>A valid ID proof is required at the time of pickup</li>
                            <li>The booking may be cancelled if payment is not made at pickup</li>
                          </ul>
                          <div className="text-xs text-gray-500">
                            <p>* We accept cash in Indian Rupees only.</p>
                            <p>* A receipt will be provided upon payment.</p>
                          </div>
                        </div>
                      )}

                      {/* Terms and Conditions */}
                      <div className="mb-6">
                        <div className="flex items-start">
                          <input type="checkbox" id="terms" className="mt-1 mr-2" required />
                          <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the{" "}
                            <a href="#" className="text-purple-600 hover:underline">
                              Terms and Conditions
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-purple-600 hover:underline">
                              Privacy Policy
                            </a>
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between mt-8">
                    {bookingStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setBookingStep(bookingStep - 1)}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                        disabled={isProcessing}
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={isProcessing}
                      className="ml-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300 disabled:bg-purple-400 flex items-center"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : bookingStep === 2 ? (
                        "Proceed to Pay"
                      ) : (
                        "Continue"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="flex items-center mb-6">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden mr-4">
                      <Image
                        src={vehicle.images?.[0] || "/placeholder.svg?height=80&width=80"}
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{vehicle.name}</h3>
                      <p className="text-sm text-gray-600">
                        {vehicle.brand} • {vehicle.type}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-b border-gray-100 py-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Rental Plan</span>
                      <span className="font-medium capitalize">{selectedPlan}</span>
                    </div>
                    {startDate && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Start Date</span>
                        <span className="font-medium">{new Date(startDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {endDate && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">End Date</span>
                        <span className="font-medium">{new Date(endDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {selectedPlan === "hourly" && startTime && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Start Time</span>
                        <span className="font-medium">{startTime}</span>
                      </div>
                    )}
                    {selectedPlan === "hourly" && endTime && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">End Time</span>
                        <span className="font-medium">{endTime}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Base Price</span>
                      <span className="font-medium">₹{totalPrice + discount}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Security Deposit</span>
                      <span className="font-medium">₹1,000</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-6">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-purple-700">₹{(totalPrice + 1000).toFixed(2)}</span>
                  </div>

                  <div className="text-xs text-gray-500">
                    <p>* Security deposit is refundable upon return of the vehicle in good condition.</p>
                    <p>* Cancellation policy: Full refund if cancelled 24 hours before pickup time.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Booking Confirmation
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your booking has been successfully confirmed. {emailSent && "We've sent the details to your email."}
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden mr-4">
                    <Image
                      src={vehicle.images?.[0] || "/placeholder.svg?height=64&width=64"}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{vehicle.name}</h3>
                    <p className="text-sm text-gray-600">
                      {vehicle.brand} • {vehicle.type}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-500 text-sm">Booking ID</p>
                    <p className="font-medium">{bookingId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Rental Plan</p>
                    <p className="font-medium capitalize">{selectedPlan}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Start Date</p>
                    <p className="font-medium">{new Date(startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">End Date</p>
                    <p className="font-medium">{new Date(endDate).toLocaleDateString()}</p>
                  </div>
                  {selectedPlan === "hourly" && (
                    <>
                      <div>
                        <p className="text-gray-500 text-sm">Start Time</p>
                        <p className="font-medium">{startTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">End Time</p>
                        <p className="font-medium">{endTime}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-gray-500 text-sm">Payment Method</p>
                    <p className="font-medium">
                      {paymentMethod === "razorpay" ? "Online Payment" : "Cash on Delivery"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Amount</p>
                    <p className="font-bold text-purple-700">₹{(totalPrice + 1000).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-left">
                <h4 className="font-medium text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Please bring your ID proof and driver's license for verification</li>
                  <li>• Arrive at the pickup location 15 minutes before your scheduled time</li>
                  <li>• The vehicle will be handed over after a brief inspection</li>
                  {paymentMethod === "cod" && <li>• Please keep the exact amount ready for cash payment</li>}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/zup-rides"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300"
                >
                  Back to Home
                </Link>
                <button
                  onClick={() => {
                    // In a real app, this would download the booking details
                    alert("Booking details would be downloaded here")
                  }}
                  className="bg-white border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition duration-300"
                >
                  Download Receipt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
