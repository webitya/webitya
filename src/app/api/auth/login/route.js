import { NextResponse } from "next/server"
import { verifyPassword, generateToken } from "@/lib/auth"
import { sendLoginNotificationEmail } from "@/lib/nodemailer"
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("webitya_lms")

    const user = await db.collection("users").findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: "Please verify your email first" }, { status: 401 })
    }

    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = generateToken(user._id)

    try {
      const loginDetails = {
        timestamp: new Date().toLocaleString(),
        ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown",
        userAgent: request.headers.get("user-agent") || "Unknown",
        location: "Unknown", // You can integrate with IP geolocation service
      }

      // Only send if user has email notifications enabled (default: true)
      if (user.emailPreferences?.loginNotifications !== false) {
        await sendLoginNotificationEmail(user.email, user.name, loginDetails)
      }
    } catch (emailError) {
      console.error("Login notification email error:", emailError)
      // Don't fail login if email fails
    }

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        purchasedCourses: user.purchasedCourses,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
