"use server"

import { vehiclesData } from "../../../components/ZupRides/data/vehicles"


// Function to get vehicle by ID
export async function getVehicleById(id) {
  if (!id) return null
  return vehiclesData.find((vehicle) => vehicle.id === id) || null
}

// Function to get all vehicles
export async function getAllVehicles() {
  return vehiclesData
}

export async function sendEmail(data) {
  try {
    // Validate input data
    if (!data.name || !data.email || !data.vehicleName) {
      throw new Error("Missing required booking information")
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
    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email: " + error.message)
  }
}

export async function saveBooking(bookingData) {
  try {
    // Validate booking data
    if (!bookingData.name || !bookingData.email || !bookingData.vehicleName) {
      throw new Error("Missing required booking information")
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

    // You could store this in localStorage for demo purposes
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    existingBookings.push(booking)
    localStorage.setItem("bookings", JSON.stringify(existingBookings))

    return { success: true, bookingId: booking.id, message: "Booking saved successfully" }
  } catch (error) {
    console.error("Error saving booking:", error)
    throw new Error("Failed to save booking: " + error.message)
  }
}

// Function to send booking confirmation email
export async function sendBookingConfirmation(bookingDetails) {
  try {
    // Validate booking details
    if (!bookingDetails || !bookingDetails.userEmail || !bookingDetails.userName) {
      throw new Error("Invalid booking details")
    }

    // Format dates for email
    const startDate = new Date(bookingDetails.startDate).toLocaleDateString()
    const endDate = new Date(bookingDetails.endDate).toLocaleDateString()

    // Create email content
    const emailContent = `
      <h1>Booking Confirmation - Zup Rides</h1>
      <p>Dear ${bookingDetails.userName},</p>
      <p>Thank you for booking with Zup Rides. Your booking has been confirmed!</p>
      
      <h2>Booking Details</h2>
      <ul>
        <li><strong>Booking ID:</strong> ${bookingDetails.bookingId}</li>
        <li><strong>Vehicle:</strong> ${bookingDetails.vehicleName}</li>
        <li><strong>Start Date:</strong> ${startDate}</li>
        <li><strong>End Date:</strong> ${endDate}</li>
        ${bookingDetails.startTime ? `<li><strong>Start Time:</strong> ${bookingDetails.startTime}</li>` : ""}
        ${bookingDetails.endTime ? `<li><strong>End Time:</strong> ${bookingDetails.endTime}</li>` : ""}
        <li><strong>Rental Plan:</strong> ${bookingDetails.plan}</li>
        <li><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</li>
        <li><strong>Payment Method:</strong> ${bookingDetails.paymentMethod === "razorpay" ? "Online Payment" : "Cash on Delivery"}</li>
        ${bookingDetails.paymentId ? `<li><strong>Payment ID:</strong> ${bookingDetails.paymentId}</li>` : ""}
      </ul>
      
      <h2>Important Information</h2>
      <ul>
        <li>Please bring your ID proof and driver's license for verification</li>
        <li>Arrive at the pickup location 15 minutes before your scheduled time</li>
        <li>The vehicle will be handed over after a brief inspection</li>
        ${bookingDetails.paymentMethod === "cod" ? "<li>Please keep the exact amount ready for cash payment</li>" : ""}
      </ul>
      
      <p>If you have any questions, please contact us at support@zuprides.com or call us at +91 9876543210.</p>
      <p>Thank you for choosing Zup Rides!</p>
    `

    // In a real application, you would use a service like Nodemailer, SendGrid, etc.
    console.log("Booking confirmation email would be sent to:", bookingDetails.userEmail)
    console.log("Email content:", emailContent)

    // Simulate sending email to admin
    const adminEmailContent = `
      New booking received:
      Booking ID: ${bookingDetails.bookingId}
      Customer: ${bookingDetails.userName} (${bookingDetails.userEmail})
      Vehicle: ${bookingDetails.vehicleName}
      Dates: ${startDate} to ${endDate}
      Amount: ₹${bookingDetails.totalAmount}
    `
    console.log("Admin notification email would be sent to: admin@zuprides.com")
    console.log("Admin email content:", adminEmailContent)

    return { success: true, message: "Booking confirmation email sent successfully" }
  } catch (error) {
    console.error("Error sending booking confirmation:", error)
    throw new Error("Failed to send booking confirmation: " + error.message)
  }
}

// Function to process payment with Razorpay
export async function processRazorpayPayment(paymentDetails) {
  try {
    // In a real application, you would create an order on your server
    // and then return the order details to initialize Razorpay

    // Validate payment details
    if (!paymentDetails.amount || !paymentDetails.currency || !paymentDetails.receipt) {
      throw new Error("Invalid payment details")
    }

    // Simulate creating an order
    const order = {
      id: `order_${Date.now()}`,
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      receipt: paymentDetails.receipt,
      status: "created",
      created_at: new Date().toISOString(),
    }

    console.log("Razorpay order would be created:", order)

    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: "rzp_live_xkYfvkSJJJucnU", // Your Razorpay API key
    }
  } catch (error) {
    console.error("Error processing Razorpay payment:", error)
    throw new Error("Failed to process payment: " + error.message)
  }
}

// Function to verify Razorpay payment
export async function verifyRazorpayPayment(paymentData) {
  try {
    // In a real application, you would verify the payment signature
    // using Razorpay's API

    // Validate payment data
    if (!paymentData.razorpay_payment_id || !paymentData.razorpay_order_id || !paymentData.razorpay_signature) {
      throw new Error("Invalid payment verification data")
    }

    // Simulate verifying payment
    console.log("Payment would be verified with Razorpay:", paymentData)

    // Return success
    return { success: true, verified: true, paymentId: paymentData.razorpay_payment_id }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error)
    throw new Error("Failed to verify payment: " + error.message)
  }
}
