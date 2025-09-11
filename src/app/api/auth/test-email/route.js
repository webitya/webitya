import { verifyEmailConnection, sendOTPEmail } from "@/lib/nodemailer"

export async function GET() {
  try {
    console.log("[v0] Testing email configuration...")

    // Test SMTP connection
    const isConnected = await verifyEmailConnection()

    if (!isConnected) {
      return Response.json(
        {
          success: false,
          error: "SMTP connection failed",
          details: "Check your SMTP configuration in .env.local",
        },
        { status: 500 },
      )
    }

    // Test sending an email
    const testResult = await sendOTPEmail(
      process.env.SMTP_USER, // Send to yourself for testing
      "123456",
      "Test User",
    )

    return Response.json({
      success: true,
      message: "Email test successful",
      messageId: testResult.messageId,
    })
  } catch (error) {
    console.error("[v0] Email test failed:", error)

    return Response.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        details: error.response || "Check server logs for more details",
      },
      { status: 500 },
    )
  }
}
