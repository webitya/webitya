import { NextResponse } from "next/server"
import { verifyRazorpayPayment } from "@/lib/razorpay"
import { sendPaymentConfirmationEmail, sendAdminNotificationEmail } from "@/lib/email"

export const runtime = "nodejs"

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userDetails, paymentDetails } =
      await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing payment parameters" },
        { status: 400 }
      )
    }

    const isValid = verifyRazorpayPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      return NextResponse.json(
        { success: false, verified: false, error: "Invalid payment signature" },
        { status: 400 }
      )
    }

    // Send emails (optional)
    try {
      if (userDetails?.email) {
        await sendPaymentConfirmationEmail(userDetails.email, {
          ...paymentDetails,
          paymentId: razorpay_payment_id,
          name: userDetails?.name ?? "Customer",
        })
      }

      await sendAdminNotificationEmail({
        ...userDetails,
        ...paymentDetails,
        paymentMethod: "Razorpay",
      })
    } catch (emailError) {
      console.error("[API] ⚠️ Email sending failed:", emailError)
      // don’t block success if emails fail
    }

    return NextResponse.json({ success: true, verified: true })
  } catch (error) {
    console.error("[API] ❌ Payment verification error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Verification failed" },
      { status: 500 }
    )
  }
}
