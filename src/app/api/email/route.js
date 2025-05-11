import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate input data
    if (!data.name || !data.email || !data.vehicleName) {
      return NextResponse.json({ error: "Missing required booking information" }, { status: 400 })
    }

    // Format the booking date and time
    const bookingDate = data.date ? new Date(data.date).toLocaleDateString() : "Not specified"
    const bookingTime = data.time || "Not specified"

    // Create email content
    const emailContent = `
      <h1>Booking Confirmation</h1>
      <p>Dear ${data.name},</p>
      <p>Thank you for booking with Zup Rides. Your booking details are as follows:</p>
      <ul>
        <li><strong>Vehicle:</strong> ${data.vehicleName}</li>
        <li><strong>Date:</strong> ${bookingDate}</li>
        <li><strong>Time:</strong> ${bookingTime}</li>
        <li><strong>Amount:</strong> ₹${data.vehiclePrice}</li>
        <li><strong>Payment ID:</strong> ${data.paymentId || "Not available"}</li>
      </ul>
      <p>If you have any questions, please contact us at support@zuprides.com or call us at +91 9876543210.</p>
      <p>Thank you for choosing Zup Rides!</p>
    `

    // In a real application, you would use a service like Nodemailer, SendGrid, etc.
    // For now, we'll simulate a successful email send
    console.log("Email would be sent to:", data.email)
    console.log("Email content:", emailContent)

    // Return success
    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email: " + error.message }, { status: 500 })
  }
}
