import { NextResponse } from "next/server"
import { generateSHA256Hash } from "@/app/wordpress-courses/lib/payment-utils"

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.amount || !data.orderId || !data.customerName || !data.customerEmail || !data.customerPhone) {
      return NextResponse.json({ success: false, message: "Missing required payment information" }, { status: 400 })
    }

    // PhonePe API credentials - hardcoded for immediate deployment
    const merchantId = "SU2505231841350701637815"
    const saltKey = "d4b5b5ee-fe38-43a7-afcb-77b5c06cad3f"
    const saltIndex = "1"
    const apiEndpoint = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://webitya.com"

    // Prepare payment request payload
    const amountInPaise = Math.round(data.amount * 100) // Convert to paise

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: data.orderId,
      merchantUserId: `USER_${Date.now()}`,
      amount: amountInPaise,
      redirectUrl: `${baseUrl}/wordpress-courses/thank-you?orderId=${data.orderId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `${baseUrl}/api/wordpress-courses/payments/webhook`,
      mobileNumber: data.customerPhone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    }

    console.log("Payment payload:", payload)

    // Generate base64 encoded payload
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64")

    // Generate SHA256 hash
    const string = `${base64Payload}/pg/v1/pay${saltKey}`
    const sha256Hash = generateSHA256Hash(string)

    // Create X-VERIFY header
    const xVerify = `${sha256Hash}###${saltIndex}`

    try {
      console.log("Making PhonePe API request")

      // Make API call to PhonePe
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
        },
        body: JSON.stringify({
          request: base64Payload,
        }),
      })

      console.log("PhonePe API response status:", response.status)

      const responseData = await response.json()
      console.log("PhonePe API response:", responseData)

      if (responseData.success) {
        // Save order to database (implement this based on your database)
        console.log("Order created:", {
          orderId: data.orderId,
          amount: data.amount,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          courseId: data.courseId,
          courseTitle: data.courseTitle,
          status: "PENDING",
          transactionId: responseData.data?.transactionId || null,
          createdAt: new Date().toISOString(),
        })

        return NextResponse.json({
          success: true,
          paymentUrl: responseData.data.instrumentResponse.redirectInfo.url,
          message: "Payment link generated successfully",
          transactionId: responseData.data.transactionId,
        })
      } else {
        console.error("PhonePe API error response:", responseData)
        throw new Error(responseData.message || "Payment initialization failed")
      }
    } catch (apiError) {
      console.error("PhonePe API error:", apiError)

      // For testing/development, return a mock success response if in development mode
      if (process.env.NODE_ENV === "development") {
        console.log("Using mock payment URL for development")
        const mockPaymentUrl = `https://pay.phonepe.com/pay/mock-payment?orderId=${data.orderId}&amount=${data.amount}`

        return NextResponse.json({
          success: true,
          paymentUrl: mockPaymentUrl,
          message: "Mock payment link generated for development",
          transactionId: `TXN_${Date.now()}`,
        })
      }

      throw apiError
    }
  } catch (error) {
    console.error("Payment API error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate payment link",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
