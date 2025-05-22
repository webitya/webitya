import { NextResponse } from "next/server"
import { generateSHA256Hash } from "@/app/wordpress-courses/lib/payment-utils"

export async function POST(request) {
  try {
    const data = await request.json()
    const headers = request.headers

    // Verify the webhook signature
    const xVerify = headers.get("X-VERIFY")
    if (!xVerify) {
      return NextResponse.json({ success: false, message: "Missing X-VERIFY header" }, { status: 400 })
    }

    // PhonePe API credentials from environment variables
    const saltKey = process.env.PHONEPE_SALT_KEY

    if (!saltKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment gateway configuration missing",
        },
        { status: 500 },
      )
    }

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
      await updateOrderStatus(data.merchantTransactionId, "COMPLETED", data)

      // Grant course access
      await grantCourseAccess(data.merchantTransactionId)

      // Send confirmation email
      await sendConfirmationEmail(data.merchantTransactionId)
    } else if (data.event === "PAYMENT_FAILED") {
      // Handle failed payment
      await updateOrderStatus(data.merchantTransactionId, "FAILED", data)
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

async function updateOrderStatus(orderId, status, data) {
  // In a real implementation, this would update the order status in your database
  // For example, using Prisma, MongoDB, or another database client

  // Example with Prisma:
  // const order = await prisma.order.update({
  //   where: { orderId },
  //   data: {
  //     status,
  //     transactionId: data.transactionId,
  //     paymentDetails: data
  //   }
  // });

  // For now, we'll just log the status update
  console.log(`Order status updated for order ${orderId}: ${status}`)
  return true
}

async function grantCourseAccess(orderId) {
  // In a real implementation, this would grant access to the course
  // For example, creating a user enrollment record in your database

  // Example with Prisma:
  // const order = await prisma.order.findUnique({
  //   where: { orderId }
  // });
  //
  // await prisma.enrollment.create({
  //   data: {
  //     userId: order.userId,
  //     courseId: order.courseId,
  //     enrolledAt: new Date(),
  //     status: 'ACTIVE'
  //   }
  // });

  console.log(`Course access granted for order ${orderId}`)
  return true
}

async function sendConfirmationEmail(orderId) {
  // In a real implementation, this would send a confirmation email
  // For example, using a service like SendGrid, Mailgun, etc.

  // Example with SendGrid:
  // const order = await prisma.order.findUnique({
  //   where: { orderId },
  //   include: { course: true }
  // });
  //
  // await sendgrid.send({
  //   to: order.customerEmail,
  //   from: 'support@webitya.com',
  //   subject: `Your access to ${order.course.title} is ready!`,
  //   html: `<p>Thank you for your purchase! Here's how to access your course...</p>`
  // });

  console.log(`Confirmation email sent for order ${orderId}`)
  return true
}
