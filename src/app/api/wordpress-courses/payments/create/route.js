import { NextResponse } from "next/server"
import crypto from "crypto"

// Optional: force Node.js runtime in App Router
export const runtime = "nodejs"

// SHA256 hash generator
function generateSHA256Hash(string) {
  return crypto.createHash("sha256").update(string).digest("hex")
}

export async function POST(request) {
  try {
    const data = await request.json()

    // Basic validation
    if (!data.amount || !data.orderId || !data.customerName || !data.customerEmail || !data.customerPhone) {
      return NextResponse.json({ success: false, message: "Missing required payment information" }, { status: 400 })
    }

    // 🛑 Hardcoded credentials (move these to .env in production)
    const merchantId = "SU2505231841350701637815"
    const saltKey = "d4b5b5ee-fe38-43a7-afcb-77b5c06cad3f"
    const saltIndex = "1"
    const apiEndpoint = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
    const baseUrl = "https://webitya.com" // Replace with your base domain

    const amountInPaise = Math.round(data.amount * 100)

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

    console.log("📦 Payment payload:", payload)

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64")
    const stringToHash = `${base64Payload}/pg/v1/pay${saltKey}`
    const sha256Hash = generateSHA256Hash(stringToHash)
    const xVerify = `${sha256Hash}###${saltIndex}`

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

    console.log("📬 PhonePe API status:", response.status)
    const responseData = await response.json()
    console.log("📬 PhonePe API response:", responseData)

    if (responseData.success) {
      console.log("✅ Order initiated:", {
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
      console.error("❌ PhonePe API failure:", responseData)
      throw new Error(responseData.message || "Payment initialization failed")
    }
  } catch (error) {
    console.error("❌ Payment API Error:", error)

    if (process.env.NODE_ENV === "development") {
      const mockPaymentUrl = `https://pay.phonepe.com/pay/mock-payment?orderId=${Date.now()}&amount=${Math.random() * 1000}`
      return NextResponse.json({
        success: true,
        paymentUrl: mockPaymentUrl,
        message: "Mock payment link (development mode)",
        transactionId: `TXN_${Date.now()}`,
      })
    }

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
