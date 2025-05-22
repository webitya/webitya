import { NextResponse } from "next/server"
import { generateSHA256Hash } from "@/app/wordpress-courses/lib/payment-utils"

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.amount || !data.orderId || !data.customerName || !data.customerEmail || !data.customerPhone) {
      return NextResponse.json({ success: false, message: "Missing required payment information" }, { status: 400 })
    }

    // PhonePe API credentials from environment variables
    const merchantId = process.env.PHONEPE_MERCHANT_ID
    const saltKey = process.env.PHONEPE_SALT_KEY
    const saltIndex = process.env.PHONEPE_SALT_INDEX
    const apiEndpoint = process.env.PHONEPE_API_ENDPOINT || "https://api.phonepe.com/apis/hermes/pg/v1/pay"

    if (!merchantId || !saltKey || !saltIndex) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment gateway configuration missing",
        },
        { status: 500 },
      )
    }

    // Prepare payment request payload
    const amountInPaise = Math.round(data.amount * 100) // Convert to paise

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: data.orderId,
      merchantUserId: `USER_${Date.now()}`,
      amount: amountInPaise,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/wordpress-courses/thank-you?orderId=${data.orderId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/wordpress-courses/payments/webhook`,
      mobileNumber: data.customerPhone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    }

    // Generate base64 encoded payload
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64")

    // Generate SHA256 hash
    const string = `${base64Payload}/pg/v1/pay${saltKey}`
    const sha256Hash = generateSHA256Hash(string)

    // Create X-VERIFY header
    const xVerify = `${sha256Hash}###${saltIndex}`

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

    const responseData = await response.json()

    if (responseData.success) {
      // Save order to database
      await saveOrderToDatabase({
        orderId: data.orderId,
        amount: data.amount,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        courseId: data.courseId,
        courseTitle: data.courseTitle,
        paymentMethod: data.paymentMethod,
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
      throw new Error(responseData.message || "Payment initialization failed")
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

async function saveOrderToDatabase(orderData) {
  // In a real implementation, this would save the order to your database
  // For example, using Prisma, MongoDB, or another database client

  // Example with Prisma:
  // const order = await prisma.order.create({
  //   data: orderData
  // });

  // For now, we'll just log the order data
  console.log("Order saved:", orderData)
  return true
}
