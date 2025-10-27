"use client"

import { useState, useEffect, useMemo } from "react"
import { CreditCard, DollarSign, IndianRupee, CheckCircle, Loader2 } from "lucide-react"
import { FaPaypal } from "react-icons/fa"
import { SiRazorpay } from "react-icons/si"
import Footer from "@/components/FooterEl"


const predefinedServices = [
  { id: "web-development", name: "Web Development", priceINR: 25000, priceUSD: 300 },
  { id: "mobile-app", name: "Mobile App Development", priceINR: 50000, priceUSD: 600 },
  { id: "ui-ux-design", name: "UI/UX Design", priceINR: 15000, priceUSD: 180 },
  { id: "digital-marketing", name: "Digital Marketing", priceINR: 20000, priceUSD: 240 },
  { id: "seo-services", name: "SEO Services", priceINR: 12000, priceUSD: 145 },
  { id: "consultation", name: "Business Consultation", priceINR: 5000, priceUSD: 60 },
  { id: "custom", name: "Custom Service", priceINR: 1, priceUSD: 0 },
]

export default function PayOnline() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedService: "",
    customServiceName: "",
    customServiceDescription: "",
    paymentMethod: "",
    customAmount: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [notification, setNotification] = useState("")
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  const selectedService = useMemo(() => {
    return predefinedServices.find((service) => service.id === formData.selectedService) || null
  }, [formData.selectedService])

  const currentPrice = useMemo(() => {
    if (!formData.selectedService) return { amount: 0, currency: "INR" }

    if (formData.selectedService === "custom") {
      const amount = Number.parseFloat(formData.customAmount) || 0
      return {
        amount: amount,
        currency: formData.paymentMethod === "paypal" ? "USD" : "INR",
      }
    }

    const service = predefinedServices.find((s) => s.id === formData.selectedService)
    if (!service) return { amount: 0, currency: "INR" }

    return {
      amount: formData.paymentMethod === "paypal" ? service.priceUSD : service.priceINR,
      currency: formData.paymentMethod === "paypal" ? "USD" : "INR",
    }
  }, [formData.selectedService, formData.customAmount, formData.paymentMethod])

  const isFormValid = useMemo(() => {
    if (!formData.name.trim()) return false
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return false
    if (!formData.phone.trim() || !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) return false
    if (!formData.selectedService) return false
    if (!formData.paymentMethod) return false

    if (formData.selectedService === "custom") {
      if (!formData.customServiceName.trim()) return false
      if (!formData.customAmount || Number.parseFloat(formData.customAmount) <= 0) return false
    }

    return true
  }, [formData])

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => setRazorpayLoaded(true)
    script.onerror = () => setNotification("Payment system unavailable")
    document.body.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 4000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name required"
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email required"
    if (!formData.phone.trim() || !/^\d{10,}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Valid phone required"
    if (!formData.selectedService) newErrors.selectedService = "Service required"
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment method required"

    if (formData.selectedService === "custom") {
      if (!formData.customServiceName.trim()) newErrors.customServiceName = "Service name required"
      if (!formData.customAmount || Number.parseFloat(formData.customAmount) <= 0)
        newErrors.customAmount = "Valid amount required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!validateForm()) {
      setNotification("Please fill all required fields")
      return
    }

    if (formData.paymentMethod === "razorpay" && !razorpayLoaded) {
      setNotification("Payment system loading, please wait")
      return
    }

    setIsLoading(true)

    try {
      if (formData.paymentMethod === "razorpay") {
        await handleRazorpayPayment()
      } else {
        await handlePayPalPayment()
      }
    } catch (error) {
      console.error("Payment error:", error)
      setNotification("Payment failed. Please try again")
      setIsLoading(false)
    }
  }

  const handleRazorpayPayment = async () => {
    const orderResponse = await fetch("/api/create-razorpay-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: currentPrice.amount,
        currency: currentPrice.currency,
        receipt: `payment_${Date.now()}`,
      }),
    })

    const { order } = await orderResponse.json()

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_R6NNxjOWTpFlM1",
      amount: order.amount,
      currency: order.currency,
      name: "Webitya",
      description: selectedService?.name || formData.customServiceName,
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
                amount: currentPrice.amount,
                currency: currentPrice.currency,
                service: selectedService?.name || formData.customServiceName,
                customService: formData.selectedService === "custom" ? formData.customServiceDescription : null,
              },
            }),
          })

          if (!verifyResponse.ok) {
            throw new Error(`Verification failed with status: ${verifyResponse.status}`)
          }

          const result = await verifyResponse.json()

          if (result.success && result.verified) {
            setIsLoading(false)

            const receiptData = {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              type: "service",
              amount: currentPrice.amount,
              currency: currentPrice.currency,
              service: selectedService?.name || formData.customServiceName,
              customerName: formData.name,
              customerEmail: formData.email,
              customerPhone: formData.phone,
              paymentMethod: "Razorpay",
              timestamp: new Date().toISOString(),
            }

            localStorage.setItem("receiptData", JSON.stringify(receiptData))

            setNotification("Payment successful! Redirecting to receipt...")

            window.location.href = `/receipt?payment_id=${response.razorpay_payment_id}&type=service&amount=${currentPrice.amount}&currency=${currentPrice.currency}`
          } else {
            throw new Error(result.error || "Payment verification failed")
          }
        } catch (error) {
          setNotification("Payment verification failed. Please contact support.")
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
          setNotification("Payment cancelled")
        },
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handlePayPalPayment = async () => {
    try {
      const orderResponse = await fetch("/api/create-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: currentPrice.amount,
          currency: currentPrice.currency,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error(`PayPal order creation failed: ${orderResponse.status}`)
      }

      const orderData = await orderResponse.json()

      if (!orderData.success || !orderData.order) {
        throw new Error(orderData.error || "Failed to create PayPal order")
      }

      const { order } = orderData

      const receiptData = {
        payment_id: order.id,
        order_id: order.id,
        type: "service",
        amount: currentPrice.amount,
        currency: currentPrice.currency,
        service: selectedService?.name || formData.customServiceName,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        paymentMethod: "PayPal",
        timestamp: new Date().toISOString(),
      }

      localStorage.setItem("receiptData", JSON.stringify(receiptData))
      localStorage.setItem("paymentFormData", JSON.stringify(formData))
      localStorage.setItem("paymentDetails", JSON.stringify(currentPrice))

      const approvalUrl = order.links?.find((link) => link.rel === "approve")?.href

      if (!approvalUrl) {
        throw new Error("PayPal approval URL not found")
      }

      setIsLoading(false)
      setNotification("Redirecting to PayPal...")

      window.location.href = approvalUrl
    } catch (error) {
      setNotification(`PayPal payment failed: ${error.message}`)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-md"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-sky-200 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-12 h-12 text-sky-500 animate-spin" />
              <p className="text-gray-800 font-medium">Processing Payment...</p>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className="fixed bottom-4 right-4 z-40 bg-white/95 backdrop-blur-sm border border-sky-200 rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-right-5">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-sky-500" />
            <p className="text-sm text-gray-800 font-medium">{notification}</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-white py-4 px-3 mt-13">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Pay Online</h1>
            <p className="text-sky-600 text-sm">Secure payment for our services</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Payment Details</h2>

                {/* Personal Information */}
                <div className="mb-5">
                  <h3 className="text-base font-medium text-sky-600 mb-3">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-sky-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm ${
                          errors.name ? "border-red-400" : "border-gray-300"
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-sky-700 mb-1">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm ${
                          errors.email ? "border-red-400" : "border-gray-300"
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-sky-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm ${
                        errors.phone ? "border-red-400" : "border-gray-300"
                      }`}
                      placeholder="Enter your phone"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service Selection */}
                <div className="mb-5">
                  <h3 className="text-base font-medium text-sky-600 mb-3">Select Service</h3>
                  <select
                    value={formData.selectedService}
                    onChange={(e) => handleInputChange("selectedService", e.target.value)}
                    className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm ${
                      errors.selectedService ? "border-red-400" : "border-gray-300"
                    }`}
                  >
                    <option value="" className="bg-white text-gray-900">
                      Choose a service
                    </option>
                    {predefinedServices.map((service) => (
                      <option key={service.id} value={service.id} className="bg-white text-gray-900">
                        {service.name}
                        {service.id !== "custom" && ` - ₹${service.priceINR.toLocaleString()} / $${service.priceUSD}`}
                      </option>
                    ))}
                  </select>
                  {errors.selectedService && <p className="text-red-500 text-xs mt-1">{errors.selectedService}</p>}

                  {formData.selectedService === "custom" && (
                    <div className="mt-3 p-3 bg-gray-100/80 rounded-lg space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-sky-700 mb-1">Service Name *</label>
                        <input
                          type="text"
                          value={formData.customServiceName}
                          onChange={(e) => handleInputChange("customServiceName", e.target.value)}
                          className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm ${
                            errors.customServiceName ? "border-red-400" : "border-gray-300"
                          }`}
                          placeholder="Enter service name"
                        />
                        {errors.customServiceName && (
                          <p className="text-red-500 text-xs mt-1">{errors.customServiceName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-sky-700 mb-1">Description</label>
                        <textarea
                          value={formData.customServiceDescription}
                          onChange={(e) => handleInputChange("customServiceDescription", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm"
                          placeholder="Describe your service"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-sky-700 mb-1">Amount *</label>
                        <input
                          type="number"
                          value={formData.customAmount}
                          onChange={(e) => handleInputChange("customAmount", e.target.value)}
                          className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm ${
                            errors.customAmount ? "border-red-400" : "border-gray-300"
                          }`}
                          placeholder="Enter amount"
                          min="1"
                        />
                        {errors.customAmount && <p className="text-red-500 text-xs mt-1">{errors.customAmount}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="mb-5">
                  <h3 className="text-base font-medium text-sky-600 mb-3">Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === "razorpay"
                          ? "border-sky-400 bg-sky-50"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={formData.paymentMethod === "razorpay"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        className="mr-3 accent-sky-500"
                      />
                      <SiRazorpay className="w-6 h-6 text-sky-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Razorpay</p>
                        <p className="text-xs text-sky-600 flex items-center">
                          <IndianRupee className="w-3 h-3 mr-1" />
                          Indian Rupees
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === "paypal"
                          ? "border-sky-400 bg-sky-50"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        className="mr-3 accent-sky-500"
                      />
                      <FaPaypal className="w-6 h-6 text-sky-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">PayPal</p>
                        <p className="text-xs text-sky-600 flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          US Dollars
                        </p>
                      </div>
                    </label>
                  </div>
                  {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-5 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                {formData.selectedService ? (
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {formData.selectedService === "custom"
                          ? formData.customServiceName || "Custom Service"
                          : predefinedServices.find((s) => s.id === formData.selectedService)?.name ||
                            "Selected Service"}
                      </p>
                      {formData.selectedService === "custom" && formData.customServiceDescription && (
                        <p className="text-xs text-sky-600 mt-1 p-2 bg-sky-50 rounded">
                          {formData.customServiceDescription}
                        </p>
                      )}
                    </div>

                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-900">Total</p>
                        {formData.paymentMethod && (
                          <p className="text-xl font-bold text-sky-600">
                            {currentPrice.currency === "USD" ? "$" : "₹"}
                            {currentPrice.amount.toLocaleString()}
                          </p>
                        )}
                      </div>
                      {formData.paymentMethod && (
                        <p className="text-xs text-sky-600 text-right">
                          {currentPrice.currency === "USD" ? "US Dollars" : "Indian Rupees"}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={!isFormValid || isLoading}
                      className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:text-gray-500 text-white py-3 px-4 rounded-lg font-medium transition-all text-sm"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Processing...
                        </div>
                      ) : (
                        `Pay ${currentPrice.currency === "USD" ? "$" : "₹"}${currentPrice.amount.toLocaleString()}`
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-xs text-sky-600 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Secure payment processing
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <CreditCard className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sky-600 text-sm">Select a service to see pricing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
