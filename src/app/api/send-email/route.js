import nodemailer from "nodemailer"
import { userThankYouEmail, adminLeadEmail } from "@/lib/email-templates"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
})

export async function POST(request) {
  try {
    const { name, email, description } = await request.json()

    // Validate input
    if (!name || !email || !description) {
      return Response.json({ message: "Missing required fields" }, { status: 400 })
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Reaching Out - Webitya Web Services",
      html: userThankYouEmail(name),
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Lead: ${name} - Webitya Web Services`,
      html: adminLeadEmail(name, email, description),
    })

    return Response.json({ message: "Emails sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Email sending error:", error)
    return Response.json({ message: "Failed to send email. Please try again later." }, { status: 500 })
  }
}
