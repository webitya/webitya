import { NextResponse } from "next/server"
import { createPayPalOrder } from "@/lib/paypal"

export async function POST(request) {
  try {
    const { amount, currency } = await request.json()

    console.log("[v0] Creating PayPal order:", { amount, currency })

    const order = await createPayPalOrder(amount, currency)

    console.log("[v0] PayPal order created:", order)

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("PayPal order creation error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
