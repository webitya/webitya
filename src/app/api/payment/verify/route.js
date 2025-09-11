import { NextResponse } from "next/server"
import { verifyRazorpayPayment } from "@/lib/razorpay"
import { verifyToken, getUserById } from "@/lib/auth"
import { getCourseById } from "@/lib/courses"
import { sendPurchaseConfirmationEmail, sendLeadNotificationEmail } from "@/lib/nodemailer"
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    // Verify authentication
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await getUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify Razorpay signature
    const isValidSignature = verifyRazorpayPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature)

    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("webitya_lms")

    // Find the order
    const order = await db.collection("orders").findOne({
      orderId: razorpay_order_id,
      userId: user._id,
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (order.status === "completed") {
      return NextResponse.json({ error: "Order already processed" }, { status: 400 })
    }

    // Update order status
    await db.collection("orders").updateOne(
      { orderId: razorpay_order_id },
      {
        $set: {
          status: "completed",
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          completedAt: new Date(),
        },
      },
    )

    // Add course to user's purchased courses
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $addToSet: { purchasedCourses: order.courseId },
      },
    )

    // Get course details for email
    const course = getCourseById(order.courseId)

    // Send confirmation email
    await sendPurchaseConfirmationEmail(user.email, user.name, course)

    // Send lead notification to admin
    await sendLeadNotificationEmail(user, course, order)

    return NextResponse.json({
      message: "Payment verified successfully",
      courseId: order.courseId,
      orderId: razorpay_order_id,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
