import nodemailer from "nodemailer"

// Create transporter with better error handling
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: "gmail", // Using Gmail service
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    })
  } catch (error) {
    console.log("Transporter creation error:", error)
    return null
  }
}

export async function POST(request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes("@")) {
      return Response.json({ success: false, message: "Please provide a valid email address." }, { status: 400 })
    }

    // Check if environment variables are available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email credentials. Please set EMAIL_USER and EMAIL_PASS environment variables.")
      return Response.json({ success: false, message: "Email service temporarily unavailable." }, { status: 500 })
    }

    const transporter = createTransporter()
    if (!transporter) {
      return Response.json({ success: false, message: "Email service configuration error." }, { status: 500 })
    }

    // Send welcome email to subscriber
    const welcomeMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Webitya Blog Newsletter! 🚀",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Webitya Blog</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 12px; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to Webitya Blog! 🎉</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Thank you for subscribing to our newsletter</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
          <h2 style="color: #1a202c; margin-top: 0;">What to expect:</h2>
          <ul style="color: #4a5568; padding-left: 20px;">
            <li style="margin-bottom: 8px;">🤖 Latest AI trends and breakthroughs</li>
            <li style="margin-bottom: 8px;">💻 Web development tutorials and tips</li>
            <li style="margin-bottom: 8px;">🐍 Python programming insights</li>
            <li style="margin-bottom: 8px;">⚛️ React and Next.js best practices</li>
            <li style="margin-bottom: 8px;">📈 Digital marketing strategies</li>
          </ul>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://webitya.com/blog" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
            Explore Our Blog
          </a>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; color: #718096; font-size: 14px;">
          <p>You're receiving this email because you subscribed to Webitya Blog newsletter.</p>
          <p>If you no longer wish to receive these emails, you can <a href="#" style="color: #667eea;">unsubscribe here</a>.</p>
          <p style="margin-top: 20px;">
            <strong>Webitya</strong><br>
            Your trusted source for tech insights
          </p>
        </div>
      </body>
      </html>
    `,
    }

    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your own email for lead notification
      subject: "New Newsletter Subscription - Webitya Blog",
      html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a202c; border-bottom: 2px solid #667eea; padding-bottom: 10px;">New Newsletter Subscription</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>IP:</strong> ${request.headers.get("x-forwarded-for") || "Unknown"}</p>
          <p><strong>User Agent:</strong> ${request.headers.get("user-agent") || "Unknown"}</p>
        </div>
        <p style="color: #4a5568;">A new user has subscribed to the Webitya Blog newsletter.</p>
      </div>
    `,
    }

    // Send both emails concurrently
    await Promise.all([transporter.sendMail(welcomeMailOptions), transporter.sendMail(adminMailOptions)])

    return Response.json(
      {
        message: "Thank you for subscribing to our newsletter! Check your inbox for a welcome email.",
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return Response.json(
      {
        message: "Failed to subscribe. Please try again later.",
        success: false,
      },
      { status: 500 },
    )
  }
}

// Handle GET requests (optional - for testing)
export async function GET() {
  return Response.json({ message: "Newsletter API is working" }, { status: 200 })
}
