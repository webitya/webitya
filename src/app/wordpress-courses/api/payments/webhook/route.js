import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const data = await request.json()

    // In a real implementation, you would:
    // 1. Verify the webhook signature using PhonePe's public key
    // 2. Process the payment status update
    // 3. Update your database with the payment status
    // 4. Trigger any necessary actions (e.g., send email, grant course access)

    // Log the webhook data for debugging
    console.log("Payment webhook received:", {
      data,
      timestamp: new Date().toISOString(),
    })

    // Process different webhook event types
    if (data.event === "PAYMENT_SUCCESS") {
      // Handle successful payment
      console.log("Payment successful:", {
        transactionId: data.transactionId,
        merchantTransactionId: data.merchantTransactionId,
        amount: data.amount / 100, // Convert paise to rupees
      })

      // Here you would update your database and grant course access
    } else if (data.event === "PAYMENT_FAILED") {
      // Handle failed payment
      console.log("Payment failed:", {
        transactionId: data.transactionId,
        merchantTransactionId: data.merchantTransactionId,
        errorCode: data.errorCode,
        errorMessage: data.errorMessage,
      })
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
