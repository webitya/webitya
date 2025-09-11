import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"   // ✅ default import
import { generateOTP } from "@/lib/auth"
import { sendOTPEmail } from "@/lib/nodemailer"

export async function POST(request) {
  try {
    console.log("[resend-otp] Request received")

    const { email } = await request.json()

    if (!email) {
      console.log("[resend-otp] No email provided")
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("webitya_lms")

    // ✅ Find user
    const user = await db.collection("users").findOne({ email })

    if (!user) {
      console.log("[resend-otp] User not found")
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.isVerified) {
      console.log("[resend-otp] User already verified")
      return NextResponse.json({ error: "Email already verified" }, { status: 400 })
    }

    // ✅ Generate new OTP
    const otp = generateOTP()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 min

    // ✅ Update user
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          otp,
          otpExpiry,
          updatedAt: new Date(),
        },
      },
    )

    // ✅ Send email
    await sendOTPEmail(email, otp, user.name)

    console.log("[resend-otp] OTP resent successfully")
    return NextResponse.json({
      message: "New OTP sent successfully",
      success: true,
    })
  } catch (error) {
    console.error("[resend-otp] Error:", error)
    return NextResponse.json({ error: "Failed to resend OTP. Please try again." }, { status: 500 })
  }
}
