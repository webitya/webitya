import nodemailer from "nodemailer";
import { userThankYouEmail, adminLeadEmail } from "@/lib/contact-template";

export async function POST(request) {
  try {
    const { name, email, phone, requirement } = await request.json();

    if (!name || !email || !requirement) {
      return Response.json({ message: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Send thank-you email to user
    await transporter.sendMail({
      from: `"Webitya" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Reaching Out - Webitya",
      html: userThankYouEmail(name),
    });

    // Send admin email
    await transporter.sendMail({
      from: `"Webitya Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Lead from ${name}`,
      html: adminLeadEmail(name, email, phone, requirement),
    });

    return Response.json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    return Response.json({ success: false, message: "Failed to send emails" }, { status: 500 });
  }
}
