import { NextResponse } from "next/server"
import crypto from "crypto"

// Define the hash function directly since import is failing
function generateSHA256Hash(string) {
  return crypto.createHash("sha256").update(string).digest("hex")
}

export async function POST(request) {
  try {
    const data = await request.json()
    const headers = request.headers

    // Verify the webhook signature
    const xVerify = headers.get("X-VERIFY")
    if (!xVerify) {
      return NextResponse.json({ success: false, message: "Missing X-VERIFY header" }, { status: 400 })
    }

    // PhonePe API credentials
    const saltKey = "d4b5b5ee-fe38-43a7-afcb-77b5c06cad3f"

    // Verify the signature
    const payload = JSON.stringify(data)
    const expectedHash = generateSHA256Hash(payload + saltKey)
    const [receivedHash, saltIndex] = xVerify.split("###")

    if (receivedHash !== expectedHash) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 401 })
    }

    // Process different webhook event types
    if (data.event === "PAYMENT_SUCCESS") {
      // Handle successful payment
      console.log("Payment successful:", {
        merchantTransactionId: data.merchantTransactionId,
        transactionId: data.transactionId,
        amount: data.amount / 100, // Convert paise to rupees
      })

      // Update order status in your database
      // Grant course access
      // Send confirmation email
    } else if (data.event === "PAYMENT_FAILED") {
      // Handle failed payment
      console.log("Payment failed:", {
        merchantTransactionId: data.merchantTransactionId,
        transactionId: data.transactionId,
        errorCode: data.errorCode,
        errorMessage: data.errorMessage,
      })

      // Update order status in your database
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
    })
  } catch (error) {
    console.error("Webhook processing error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process webhook",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
