import { NextResponse } from "next/server"
import { capturePayPalOrder } from "@/lib/paypal"

export async function POST(request) {
  try {
    const { orderId, userDetails, paymentDetails } = await request.json()

    console.log("[v0] Capturing PayPal order:", orderId)

    const captureData = await capturePayPalOrder(orderId)

    console.log("[v0] PayPal capture result:", captureData)

    if (captureData.status === "COMPLETED") {
      const receiptData = {
        payment_id: captureData.id,
        order_id: orderId,
        type: paymentDetails.type || "service",
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        service: paymentDetails.service,
        customerName: userDetails.name,
        customerEmail: userDetails.email,
        customerPhone: userDetails.phone,
        paymentMethod: "PayPal",
        timestamp: new Date().toISOString(),
      }

      return NextResponse.json({
        success: true,
        captureData,
        receiptData,
        redirectUrl: `/receipt?payment_id=${captureData.id}&type=${paymentDetails.type || "service"}&amount=${paymentDetails.amount}&currency=${paymentDetails.currency}`,
      })
    } else {
      return NextResponse.json({ success: false, error: "Payment capture failed" })
    }
  } catch (error) {
    console.error("PayPal capture error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
