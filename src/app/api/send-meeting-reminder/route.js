import { NextResponse } from "next/server"
import { sendMeetingReminderEmail, logEmailError, sendEmailWithRetry } from "@/lib/email"

export async function POST(request) {
  try {
    const { userEmail, meetingDetails } = await request.json()

    // ✅ Validate request body
    if (!userEmail || !meetingDetails) {
      console.error("[Meeting Reminder] ❌ Missing required fields:", { userEmail, meetingDetails })
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // ✅ Send reminder email with retry logic
    await sendEmailWithRetry(() => sendMeetingReminderEmail(userEmail, meetingDetails))

    console.log("[Meeting Reminder] ✅ Email sent successfully to:", userEmail)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Meeting Reminder] ❌ Email sending failed:", error?.message || error)
    logEmailError(error, "meeting-reminder", request.userEmail || "unknown-user") // fixed fallback
    return NextResponse.json(
      { success: false, error: error?.message || "Email sending failed" },
      { status: 500 }
    )
  }
}
