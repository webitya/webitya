import { NextResponse } from "next/server"
import { createRazorpayOrder } from "@/lib/razorpay"

export const runtime = "nodejs" // ensure Node.js runtime

export async function POST(request) {
  try {
    const { amount, currency, receipt } = await request.json()

    if (!amount || !receipt) {
      return NextResponse.json(
        { success: false, error: "Amount and receipt are required" },
        { status: 400 }
      )
    }

    const order = await createRazorpayOrder(amount, currency || "INR", receipt)

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("[API] ❌ Razorpay order creation error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Order creation failed" },
      { status: 500 }
    )
  }
}
