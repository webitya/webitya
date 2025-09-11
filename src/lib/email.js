// Email configuration using Nodemailer
import nodemailer from "nodemailer"

export const emailConfig = {
  user: process.env.EMAIL_USER || "webitya@gmail.com",
  pass: process.env.EMAIL_PASS || "qeouhetieoquewdd",
}

export const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass,
    },
  })
}

export const sendPaymentConfirmationEmail = async (userEmail, paymentDetails) => {
  const transporter = createTransporter()

  const mailOptions = {
    from: `"Webitya" <${emailConfig.user}>`,
    to: userEmail,
    subject: "Payment Confirmation - Thank You for Your Business",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">WEBITYA</h1>
            <p style="color: #e5e7eb; margin: 10px 0 0 0; font-size: 16px;">Your Digital Partner</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 80px; height: 80px; background-color: #10b981; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 40px;">✓</span>
              </div>
              <h2 style="color: #1f2937; margin: 0; font-size: 24px; font-weight: bold;">Payment Successful!</h2>
              <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Thank you for your payment, ${paymentDetails.name}</p>
            </div>

            <!-- Payment Details -->
            <div style="background-color: #f1f5f9; border-radius: 12px; padding: 30px; margin: 30px 0;">
              <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Payment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Payment ID:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${paymentDetails.paymentId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Amount:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right; font-size: 18px;">${paymentDetails.currency} ${paymentDetails.amount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Service:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${paymentDetails.service || "Meeting Schedule"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Date:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${new Date().toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}</td>
                </tr>
                ${
                  paymentDetails.meetingDate
                    ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Meeting:</td>
                  <td style="padding: 8px 0; color: #8b5cf6; font-weight: 600; text-align: right;">${paymentDetails.meetingDate}</td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>

            <!-- Next Steps -->
            <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0;">
              <h4 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">What's Next?</h4>
              <p style="color: #1e40af; margin: 0; font-size: 14px; line-height: 1.5;">
                ${
                  paymentDetails.meetingDate
                    ? "We will send you a calendar invite and meeting details shortly. Please check your email for further instructions."
                    : "Our team will contact you within 24 hours to discuss your project requirements and next steps."
                }
              </p>
            </div>

            <!-- Contact Info -->
            <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">Need help? Contact us:</p>
              <p style="color: #1f2937; margin: 0; font-weight: 600;">
                <a href="mailto:${emailConfig.user}" style="color: #8b5cf6; text-decoration: none;">${emailConfig.user}</a>
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
              This email was sent by Webitya. Please keep this email for your records.
            </p>
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} Webitya. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export const sendAdminNotificationEmail = async (leadDetails) => {
  const transporter = createTransporter()

  const mailOptions = {
    from: `"Webitya System" <${emailConfig.user}>`,
    to: emailConfig.user,
    subject: `🚀 New Lead Alert - ${leadDetails.paymentMethod} Payment Received`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Lead Notification</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">🚨 NEW LEAD ALERT</h1>
            <p style="color: #fecaca; margin: 10px 0 0 0; font-size: 14px;">Payment received - Action required</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin-bottom: 30px;">
              <h3 style="color: #065f46; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">Payment Received</h3>
              <p style="color: #047857; margin: 0; font-size: 16px; font-weight: 600;">
                ${leadDetails.currency} ${leadDetails.amount} via ${leadDetails.paymentMethod}
              </p>
            </div>

            <!-- Customer Details -->
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin: 20px 0;">
              <h4 style="color: #1f2937; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Customer Information</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-weight: 500; width: 30%;">Name:</td>
                  <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${leadDetails.name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Email:</td>
                  <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">
                    <a href="mailto:${leadDetails.email}" style="color: #8b5cf6; text-decoration: none;">${leadDetails.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Phone:</td>
                  <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">
                    <a href="tel:${leadDetails.phone}" style="color: #8b5cf6; text-decoration: none;">${leadDetails.phone}</a>
                  </td>
                </tr>
                ${
                  leadDetails.company
                    ? `
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Company:</td>
                  <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${leadDetails.company}</td>
                </tr>
                `
                    : ""
                }
                ${
                  leadDetails.country
                    ? `
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Country:</td>
                  <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${leadDetails.country}</td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>

            <!-- Service Details -->
            <div style="background-color: #fef3c7; border-radius: 8px; padding: 25px; margin: 20px 0;">
              <h4 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Service Details</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #92400e; font-weight: 500; width: 30%;">Service:</td>
                  <td style="padding: 6px 0; color: #78350f; font-weight: 600;">${leadDetails.service || "Meeting Schedule"}</td>
                </tr>
                ${
                  leadDetails.customService
                    ? `
                <tr>
                  <td style="padding: 6px 0; color: #92400e; font-weight: 500;">Description:</td>
                  <td style="padding: 6px 0; color: #78350f; font-weight: 600;">${leadDetails.customService}</td>
                </tr>
                `
                    : ""
                }
                ${
                  leadDetails.meetingDate
                    ? `
                <tr>
                  <td style="padding: 6px 0; color: #92400e; font-weight: 500;">Meeting Date:</td>
                  <td style="padding: 6px 0; color: #78350f; font-weight: 600;">${leadDetails.meetingDate}</td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="padding: 6px 0; color: #92400e; font-weight: 500;">Payment Method:</td>
                  <td style="padding: 6px 0; color: #78350f; font-weight: 600;">${leadDetails.paymentMethod}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #92400e; font-weight: 500;">Timestamp:</td>
                  <td style="padding: 6px 0; color: #78350f; font-weight: 600;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <!-- Action Required -->
            <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 30px 0;">
              <h4 style="color: #dc2626; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">⚡ Action Required</h4>
              <ul style="color: #dc2626; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li>Contact the customer within 24 hours</li>
                ${leadDetails.meetingDate ? "<li>Send calendar invite for the scheduled meeting</li>" : ""}
                <li>Update CRM with lead information</li>
                <li>Prepare project proposal if applicable</li>
              </ul>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 12px;">
              This is an automated notification from Webitya payment system.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export const sendMeetingReminderEmail = async (userEmail, meetingDetails) => {
  const transporter = createTransporter()

  const mailOptions = {
    from: `"Webitya" <${emailConfig.user}>`,
    to: userEmail,
    subject: "Meeting Reminder - Tomorrow's Consultation",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Meeting Reminder</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Meeting Reminder</h1>
            <p style="color: #e9d5ff; margin: 10px 0 0 0; font-size: 14px;">Don't forget about tomorrow's consultation</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 80px; height: 80px; background-color: #8b5cf6; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 30px;">📅</span>
              </div>
              <h2 style="color: #1f2937; margin: 0; font-size: 22px; font-weight: bold;">Your Meeting is Tomorrow!</h2>
              <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Hi ${meetingDetails.name}, we're looking forward to speaking with you.</p>
            </div>

            <!-- Meeting Details -->
            <div style="background-color: #f3f4f6; border-radius: 12px; padding: 25px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Meeting Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Date:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${meetingDetails.date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Time:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${meetingDetails.time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Duration:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">60 minutes</td>
                </tr>
              </table>
            </div>

            <!-- Preparation Tips -->
            <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0;">
              <h4 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">How to Prepare</h4>
              <ul style="color: #1e40af; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li>Prepare a brief overview of your project requirements</li>
                <li>Have your questions ready about our services</li>
                <li>Consider your timeline and budget expectations</li>
              </ul>
            </div>

            <!-- Contact -->
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">Need to reschedule?</p>
              <p style="color: #1f2937; margin: 0; font-weight: 600;">
                <a href="mailto:${emailConfig.user}" style="color: #8b5cf6; text-decoration: none;">${emailConfig.user}</a>
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} Webitya. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export const logEmailError = (error, emailType, recipient) => {
  console.error(`Email Error [${emailType}] to ${recipient}:`, {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  })
}

export const sendEmailWithRetry = async (emailFunction, maxRetries = 3) => {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await emailFunction()
      console.log(`Email sent successfully on attempt ${attempt}`)
      return result
    } catch (error) {
      lastError = error
      console.warn(`Email attempt ${attempt} failed:`, error.message)

      if (attempt < maxRetries) {
        // Wait before retrying (exponential backoff)
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }

  throw lastError
}
