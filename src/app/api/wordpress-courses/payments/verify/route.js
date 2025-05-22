import { NextResponse } from "next/server"
import { generateSHA256Hash } from "@/app/wordpress-courses/lib/payment-utils"

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.transactionId) {
      return NextResponse.json({ success: false, message: "Missing transaction ID" }, { status: 400 })
    }

    // PhonePe API credentials from environment variables
    const merchantId = process.env.PHONEPE_MERCHANT_ID
    const saltKey = process.env.PHONEPE_SALT_KEY
    const saltIndex = process.env.PHONEPE_SALT_INDEX
    const apiEndpoint = process.env.PHONEPE_STATUS_API_ENDPOINT || "https://api.phonepe.com/apis/hermes/pg/v1/status"

    if (!merchantId || !saltKey || !saltIndex) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment gateway configuration missing",
        },
        { status: 500 },
      )
    }

    // Generate SHA256 hash
    const string = `/pg/v1/status/${merchantId}/${data.transactionId}${saltKey}`
    const sha256Hash = generateSHA256Hash(string)

    // Create X-VERIFY header
    const xVerify = `${sha256Hash}###${saltIndex}`

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
      await updateOrderStatus(data.transactionId, responseData.data.state)

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

async function updateOrderStatus(transactionId, status) {
  // In a real implementation, this would update the order status in your database
  // For example, using Prisma, MongoDB, or another database client

  // Example with Prisma:
  // const order = await prisma.order.updateMany({
  //   where: { transactionId },
  //   data: { status }
  // });

  // For now, we'll just log the status update
  console.log(`Order status updated for transaction ${transactionId}: ${status}`)
  return true
}
