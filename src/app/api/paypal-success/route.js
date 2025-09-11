import { NextResponse } from "next/server"
import { capturePayPalOrder } from "@/lib/paypal"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    const PayerID = searchParams.get("PayerID")

    console.log("[v0] PayPal success callback:", { token, PayerID })

    if (!token) {
      return NextResponse.redirect(new URL("/pay-online?error=missing_token", request.url))
    }

    // For now, we'll capture the order and redirect to a generic success page
    const captureData = await capturePayPalOrder(token)

    if (captureData.status === "COMPLETED") {
      const redirectUrl = new URL("/receipt", request.url)
      redirectUrl.searchParams.set("payment_id", captureData.id)
      redirectUrl.searchParams.set("type", "service")
      redirectUrl.searchParams.set("amount", captureData.purchase_units[0].payments.captures[0].amount.value)
      redirectUrl.searchParams.set("currency", captureData.purchase_units[0].payments.captures[0].amount.currency_code)

      return NextResponse.redirect(redirectUrl)
    } else {
      return NextResponse.redirect(new URL("/pay-online?error=payment_failed", request.url))
    }
  } catch (error) {
    console.error("PayPal success handler error:", error)
    return NextResponse.redirect(new URL("/pay-online?error=processing_failed", request.url))
  }
}
