import { NextResponse } from "next/server"
import crypto from "crypto"

// Define the hash function directly since import is failing
function generateSHA256Hash(string) {
  return crypto.createHash("sha256").update(string).digest("hex")
}

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.transactionId) {
      return NextResponse.json({ success: false, message: "Missing transaction ID" }, { status: 400 })
    }

    // PhonePe API credentials
    const merchantId = "SU2505231841350701637815"
    const saltKey = "d4b5b5ee-fe38-43a7-afcb-77b5c06cad3f"
    const saltIndex = "1"
    const apiEndpoint = "https://api.phonepe.com/apis/hermes/pg/v1/status"

    // Generate SHA256 hash
    const string = `/pg/v1/status/${merchantId}/${data.transactionId}${saltKey}`
    const sha256Hash = generateSHA256Hash(string)

    // Create X-VERIFY header
    const xVerify = `${sha256Hash}###${saltIndex}`

    try {
      // Make API call to PhonePe
      const response = await fetch(`${apiEndpoint}/${merchantId}/${data.transactionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
          "X-MERCHANT-ID": merchantId,
        },
      })

      const responseData = await response.json()

      if (responseData.success) {
        // Update order status in database
        console.log("Payment verified:", {
          transactionId: data.transactionId,
          status: responseData.data.state,
        })

        return NextResponse.json({
          success: true,
          status: responseData.data.state,
          message: "Payment verified successfully",
          paymentDetails: {
            transactionId: data.transactionId,
            amount: responseData.data.amount / 100, // Convert paise to rupees
            paymentMethod: responseData.data.paymentInstrument?.type || "UNKNOWN",
            utr: responseData.data.paymentInstrument?.utr || null,
          },
        })
      } else {
        throw new Error(responseData.message || "Payment verification failed")
      }
    } catch (apiError) {
      console.error("PhonePe API error:", apiError)

      // For testing/development, return a mock success response
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json({
          success: true,
          status: "COMPLETED",
          message: "Mock payment verification for development",
          paymentDetails: {
            transactionId: data.transactionId,
            amount: 149,
            paymentMethod: "UPI",
            utr: "123456789012",
          },
        })
      }

      throw apiError
    }
  } catch (error) {
    console.error("Payment verification API error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify payment",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
