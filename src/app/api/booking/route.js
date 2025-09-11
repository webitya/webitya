import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const bookingData = await request.json()

    // Validate booking data
    if (!bookingData.name || !bookingData.email || !bookingData.vehicleName) {
      return NextResponse.json({ error: "Missing required booking information" }, { status: 400 })
    }

    // In a real application, you would save this data to a database
    // For now, we'll simulate a successful save
    console.log("Booking data would be saved:", bookingData)

    // Create a booking record with a timestamp
    const booking = {
      ...bookingData,
      id: `booking_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    }

    // Return success with booking ID
    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      message: "Booking saved successfully",
    })
  } catch (error) {
    console.error("Error saving booking:", error)
    return NextResponse.json({ error: "Failed to save booking: " + error.message }, { status: 500 })
  }
}
