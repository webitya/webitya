import { NextResponse } from "next/server"
import { verifyToken, getUserById } from "@/lib/auth"
import { sendBulkAnnouncementEmail } from "@/lib/nodemailer"
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const { subject, content, targetAudience } = await request.json()

    // Verify admin authentication (you can implement admin role check)
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await getUserById(decoded.userId)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const client = await clientPromise
    const db = client.db("webitya_lms")

    // Build query based on target audience
    const query = { isVerified: true }

    if (targetAudience === "course-purchasers") {
      query.purchasedCourses = { $exists: true, $ne: [] }
    } else if (targetAudience === "non-purchasers") {
      query.$or = [{ purchasedCourses: { $exists: false } }, { purchasedCourses: [] }]
    }

    // Get user emails who have announcements enabled
    const users = await db
      .collection("users")
      .find({
        ...query,
        "emailPreferences.announcements": { $ne: false },
      })
      .toArray()

    const recipients = users.map((user) => user.email)

    if (recipients.length === 0) {
      return NextResponse.json({ error: "No recipients found" }, { status: 400 })
    }

    // Send bulk email
    await sendBulkAnnouncementEmail(recipients, subject, content)

    // Log the announcement
    await db.collection("announcements").insertOne({
      subject,
      content,
      targetAudience,
      recipientCount: recipients.length,
      sentBy: user._id,
      sentAt: new Date(),
    })

    return NextResponse.json({
      message: "Announcement sent successfully",
      recipientCount: recipients.length,
    })
  } catch (error) {
    console.error("Send bulk email error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
