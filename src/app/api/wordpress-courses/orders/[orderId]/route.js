import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  try {
    const { orderId } = params

    if (!orderId) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 })
    }

    // In a real implementation, fetch the order from your database
    // For now, return mock data based on the order ID
    const order = {
      orderId,
      courseTitle: "WordPress Course",
      amount: 149,
      paymentMethod: "PhonePe",
      status: "COMPLETED",
      purchaseDate: new Date().toISOString(),
      customerName: "John Doe",
      customerEmail: "john@example.com",
      courseId: 1,
    }

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error("Order fetch error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch order details",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
