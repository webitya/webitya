"use server"

// Function to send booking confirmation emails
export async function sendBookingConfirmation(bookingDetails) {
  try {
    // In a real application, you would use a service like Nodemailer, SendGrid, or Resend
    // to send actual emails. This is a simulated implementation.

    // 1. Send email to the user
    await sendEmailToUser(bookingDetails)

    // 2. Send email to the admin
    await sendEmailToAdmin(bookingDetails)

    return { success: true, message: "Confirmation emails sent successfully" }
  } catch (error) {
    console.error("Error sending confirmation emails:", error)
    throw new Error("Failed to send confirmation emails")
  }
}

// Helper function to send email to the user
async function sendEmailToUser(bookingDetails) {
  // In a real implementation, you would use an email service API
  console.log("Sending email to user:", bookingDetails.userEmail)

  // Simulate API call to email service
  const userEmailContent = {
    to: bookingDetails.userEmail,
    subject: `Booking Confirmation - ${bookingDetails.bookingId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #7C3AED; margin-bottom: 10px;">Booking Confirmed!</h1>
          <p style="color: #6B7280; font-size: 16px;">Thank you for booking with Zup Rides</p>
        </div>
        
        <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #111827; font-size: 18px; margin-bottom: 15px;">Booking Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; width: 40%;">Booking ID</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.bookingId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Vehicle</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.vehicleName} (${bookingDetails.vehicleBrand})</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Rental Plan</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.plan.charAt(0).toUpperCase() + bookingDetails.plan.slice(1)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Start Date</td>
              <td style="padding: 8px 0; font-weight: bold;">${new Date(bookingDetails.startDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">End Date</td>
              <td style="padding: 8px 0; font-weight: bold;">${new Date(bookingDetails.endDate).toLocaleDateString()}</td>
            </tr>
            ${
              bookingDetails.startTime
                ? `
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Start Time</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.startTime}</td>
            </tr>
            `
                : ""
            }
            ${
              bookingDetails.endTime
                ? `
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">End Time</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.endTime}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Payment Method</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.paymentMethod === "razorpay" ? "Online Payment" : "Cash on Delivery"}</td>
            </tr>
            ${
              bookingDetails.paymentId
                ? `
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Payment ID</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.paymentId}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Total Amount</td>
              <td style="padding: 8px 0; font-weight: bold; color: #7C3AED;">₹${bookingDetails.totalAmount.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #FEF3C7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #92400E; font-size: 16px; margin-bottom: 10px;">Important Information</h3>
          <ul style="color: #92400E; margin: 0; padding-left: 20px;">
            <li>Please bring your ID proof and driver's license for verification</li>
            <li>Arrive at the pickup location 15 minutes before your scheduled time</li>
            <li>The vehicle will be handed over after a brief inspection</li>
            ${bookingDetails.paymentMethod === "cod" ? "<li>Please keep the exact amount ready for cash payment</li>" : ""}
          </ul>
        </div>
        
        <div style="text-align: center; color: #6B7280; font-size: 14px;">
          <p>If you have any questions, please contact our support team at support@zuprides.com</p>
          <p>© ${new Date().getFullYear()} Zup Rides. All rights reserved.</p>
        </div>
      </div>
    `,
  }

  // In a real implementation, you would call your email service API here
  // For example: await sendgrid.send(userEmailContent)

  // For this example, we'll just log the email content
  console.log("User email content prepared:", userEmailContent)

  return true
}

// Helper function to send email to the admin
async function sendEmailToAdmin(bookingDetails) {
  // In a real implementation, you would use an email service API
  console.log("Sending email to admin")

  // Admin email address - in a real app, this would be stored in environment variables
  const adminEmail = "admin@zuprides.com"

  // Simulate API call to email service
  const adminEmailContent = {
    to: adminEmail,
    subject: `New Booking Alert - ${bookingDetails.bookingId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #7C3AED; margin-bottom: 10px;">New Booking Alert</h1>
          <p style="color: #6B7280; font-size: 16px;">A new booking has been made on Zup Rides</p>
        </div>
        
        <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #111827; font-size: 18px; margin-bottom: 15px;">Booking Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; width: 40%;">Booking ID</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.bookingId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Vehicle</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.vehicleName} (${bookingDetails.vehicleBrand})</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Rental Plan</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.plan.charAt(0).toUpperCase() + bookingDetails.plan.slice(1)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Start Date</td>
              <td style="padding: 8px 0; font-weight: bold;">${new Date(bookingDetails.startDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">End Date</td>
              <td style="padding: 8px 0; font-weight: bold;">${new Date(bookingDetails.endDate).toLocaleDateString()}</td>
            </tr>
            ${
              bookingDetails.startTime
                ? `
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Start Time</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.startTime}</td>
            </tr>
            `
                : ""
            }
            ${
              bookingDetails.endTime
                ? `
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">End Time</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.endTime}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Payment Method</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.paymentMethod === "razorpay" ? "Online Payment" : "Cash on Delivery"}</td>
            </tr>
            ${
              bookingDetails.paymentId
                ? `
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Payment ID</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.paymentId}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Total Amount</td>
              <td style="padding: 8px 0; font-weight: bold; color: #7C3AED;">₹${bookingDetails.totalAmount.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #F3F4F6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #111827; font-size: 16px; margin-bottom: 10px;">Customer Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; width: 40%;">Name</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.userName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Email</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.userEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Phone</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingDetails.userPhone}</td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; color: #6B7280; font-size: 14px;">
          <p>This is an automated notification from the Zup Rides booking system.</p>
          <p>© ${new Date().getFullYear()} Zup Rides. All rights reserved.</p>
        </div>
      </div>
    `,
  }

  // In a real implementation, you would call your email service API here
  // For example: await sendgrid.send(adminEmailContent)

  // For this example, we'll just log the email content
  console.log("Admin email content prepared:", adminEmailContent)

  return true
}
