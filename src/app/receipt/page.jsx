"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Download, Mail, Calendar, FileText, AlertCircle } from "lucide-react"
import { downloadReceipt } from "../../lib/receipt-generator"
import Footer from "@/components/FooterEl"

export default function Receipt() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [receiptData, setReceiptData] = useState(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const generateBrowserFingerprint = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillText("Browser fingerprint", 2, 2)

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      navigator.languages?.join(",") || "",
      screen.width + "x" + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
      sessionStorage.length,
      localStorage.length,
      navigator.hardwareConcurrency || 0,
      navigator.deviceMemory || 0,
      navigator.platform,
      navigator.cookieEnabled,
      window.devicePixelRatio || 1,
    ].join("|")

    return btoa(fingerprint).slice(0, 48) // Longer fingerprint for better security
  }

  const isValidAccess = (accessData, currentFingerprint) => {
    const now = Date.now()
    const accessTime = accessData.timestamp || 0
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours max validity

    return accessData.fingerprint === currentFingerprint && now - accessTime < maxAge && !accessData.viewed
  }

  useEffect(() => {
    const paymentId = searchParams.get("payment_id")
    const type = searchParams.get("type")
    const amount = searchParams.get("amount")
    const currency = searchParams.get("currency")

    if (!paymentId || !amount || !currency) {
      setError("Invalid receipt access. Payment information missing.")
      setIsLoading(false)
      return
    }

    const currentFingerprint = generateBrowserFingerprint()
    const receiptKey = `receipt_${paymentId}`
    const storedReceiptAccess = localStorage.getItem(receiptKey)
    const sessionReceiptAccess = sessionStorage.getItem(receiptKey)

    if (storedReceiptAccess) {
      const accessData = JSON.parse(storedReceiptAccess)

      if (!isValidAccess(accessData, currentFingerprint) || !sessionReceiptAccess) {
        setError("Access denied. This receipt is no longer available for security reasons.")
        setIsLoading(false)
        return
      }
    }

    try {
      const storedReceiptData = localStorage.getItem("receiptData")

      if (!storedReceiptData) {
        setError("Receipt access denied. This receipt can only be viewed from the original payment browser session.")
        setIsLoading(false)
        return
      }

      let baseReceiptData = {
        receiptId: `WEB-${Date.now()}`,
        paymentId: paymentId,
        type: type || "service",
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        amount: amount,
        currency: currency,
        status: "Completed",
        customerName: "Customer",
        customerEmail: "customer@example.com",
        customerPhone: "Not provided",
        company: null,
        country: null,
        service: type === "meeting" ? "Meeting Schedule" : "Online Service",
        customServiceDescription: null,
        meetingDate: null,
        paymentMethod: "Online Payment",
        transactionFee: calculateTransactionFee(amount, currency),
      }

      try {
        const parsedReceiptData = JSON.parse(storedReceiptData)
        baseReceiptData = {
          ...baseReceiptData,
          ...parsedReceiptData,
          paymentId: paymentId,
          amount: amount,
          currency: currency,
          type: type || parsedReceiptData.type || "service",
        }
      } catch (parseError) {
        console.error("Error parsing stored receipt data:", parseError)
      }

      setReceiptData(baseReceiptData)
      setIsLoading(false)

      const accessData = {
        fingerprint: currentFingerprint,
        viewed: true,
        timestamp: Date.now(),
        userAgent: navigator.userAgent.slice(0, 100), // Store partial UA for verification
        screenRes: `${screen.width}x${screen.height}`,
      }

      localStorage.setItem(receiptKey, JSON.stringify(accessData))
      sessionStorage.setItem(receiptKey, "accessed")

      localStorage.removeItem("receiptData")
    } catch (error) {
      console.error("Error loading receipt data:", error)
      setError("Failed to load receipt data. Please try again.")
      setIsLoading(false)
    }
  }, [searchParams])

  const calculateTransactionFee = (amount, currency) => {
    const numAmount = Number.parseFloat(amount) || 0
    if (currency === "USD") {
      return (numAmount * 0.029 + 0.3).toFixed(2) // PayPal fees
    } else {
      return (numAmount * 0.02).toFixed(2) // Razorpay fees
    }
  }

  const generateProfessionalPDF = () => {
    if (!receiptData) return

    setIsGeneratingPDF(true)

    try {
      downloadReceipt(receiptData)
    } catch (error) {
      console.error("PDF generation error:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 lg:w-16 lg:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl lg:text-3xl font-bold text-gray-800 mb-2">Receipt Not Available</h1>
          <p className="text-gray-600 mb-6 text-sm">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading receipt...</p>
        </div>
      </div>
    )
  }

  return (
  <>
  
    <div className="min-h-screen bg-gray-50 py-4 px-4 lg:py-6">
      <div className="max-w-6xl mx-auto h-full">
        <div className="text-center mb-4 lg:mb-6">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">Payment Successful!</h1>
          <p className="text-gray-600">Your payment has been processed successfully</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 h-full">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg border-0 h-full">
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Payment Receipt</h2>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1">Receipt ID: {receiptData.receiptId}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {receiptData.status}
                  </span>
                </div>
              </div>
              <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-purple-600" />
                    Customer Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 lg:p-4 grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Name</p>
                      <p className="text-sm text-gray-800 font-semibold">{receiptData.customerName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600">Email</p>
                      <p className="text-sm text-gray-800 font-semibold break-all">{receiptData.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600">Phone</p>
                      <p className="text-sm text-gray-800 font-semibold">{receiptData.customerPhone}</p>
                    </div>
                    {receiptData.company && (
                      <div>
                        <p className="text-xs font-medium text-gray-600">Company</p>
                        <p className="text-sm text-gray-800 font-semibold">{receiptData.company}</p>
                      </div>
                    )}
                    {receiptData.country && (
                      <div>
                        <p className="text-xs font-medium text-gray-600">Country</p>
                        <p className="text-sm text-gray-800 font-semibold">{receiptData.country}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3">Service Details</h3>
                  <div className="bg-purple-50 rounded-lg p-3 lg:p-4 border border-purple-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-medium text-gray-600">Service</p>
                        <p className="text-sm text-gray-800 font-semibold">{receiptData.service}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600">Payment Method</p>
                        <p className="text-sm text-gray-800 font-semibold capitalize">{receiptData.paymentMethod}</p>
                      </div>
                    </div>
                    {receiptData.customServiceDescription && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-600">Description</p>
                        <p className="text-sm text-gray-800">{receiptData.customServiceDescription}</p>
                      </div>
                    )}
                    {receiptData.meetingDate && (
                      <div className="mt-3 bg-purple-100 p-2 rounded-lg border border-purple-300">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          <div>
                            <p className="text-xs font-medium text-purple-600">Scheduled Meeting</p>
                            <p className="text-sm text-purple-600 font-semibold">{receiptData.meetingDate}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3">Payment Summary</h3>
                  <div className="bg-gray-50 rounded-lg p-3 lg:p-4 border border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Amount</span>
                        <span className="text-sm text-gray-800 font-semibold">
                          {receiptData.currency} {Number.parseFloat(receiptData.amount).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Transaction Fee</span>
                        <span className="text-sm text-gray-800">
                          {receiptData.currency} {receiptData.transactionFee}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Payment ID</span>
                        <span className="text-xs text-gray-800 font-mono break-all">{receiptData.paymentId}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Date & Time</span>
                        <span className="text-sm text-gray-800">
                          {receiptData.date} at {receiptData.time}
                        </span>
                      </div>
                      <div className="border-t border-gray-300 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-semibold text-gray-800">Total Paid</span>
                          <span className="text-lg font-bold text-gray-800">
                            {receiptData.currency} {Number.parseFloat(receiptData.amount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-medium text-blue-800">Email Confirmation</p>
                  </div>
                  <p className="text-xs text-blue-700">
                    A confirmation email has been sent to {receiptData.customerEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border-0 sticky top-4">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Actions</h2>
              </div>
              <div className="p-4 space-y-3">
                <button
                  onClick={generateProfessionalPDF}
                  disabled={isGeneratingPDF}
                  className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-md font-medium flex items-center justify-center text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGeneratingPDF ? "Generating..." : "Download PDF"}
                </button>

                <button
                  onClick={() => router.push("/")}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 py-2.5 px-4 rounded-md font-medium text-sm"
                >
                  Back to Home
                </button>

                <div className="pt-3 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Need Help?</h4>
                  <p className="text-xs text-gray-600 mb-3">Contact us if you have any questions about your payment.</p>
                  <button
                    onClick={() => (window.location.href = "mailto:webitya@gmail.com")}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-md font-medium text-xs flex items-center justify-center"
                  >
                    <Mail className="w-3 h-3 mr-2" />
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  )
}
