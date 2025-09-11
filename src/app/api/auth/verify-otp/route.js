import { NextResponse } from "next/server"
import { generateToken } from "@/lib/auth"
import { sendWelcomeEmail } from "@/lib/nodemailer"
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("webitya_lms")

    const user = await db.collection("users").findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.isVerified) {
      return NextResponse.json({ error: "Email already verified. Please sign in." }, { status: 400 })
    }

    if (!user.otp) {
      return NextResponse.json({ error: "No OTP found. Please request a new verification code." }, { status: 400 })
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP. Please check the code and try again." }, { status: 400 })
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json({ error: "OTP has expired. Please request a new code." }, { status: 400 })
    }

    // ✅ Update user as verified
    await db.collection("users").updateOne(
      { email },
      {
        $set: { isVerified: true },
        $unset: { otp: "", otpExpiry: "" },
      },
    )

    try {
      await sendWelcomeEmail(email, user.name)
    } catch (emailError) {
      console.log("Welcome email failed to send:", emailError.message)
    }

    // ✅ Generate JWT token
    const token = generateToken(user._id)

    return NextResponse.json({
      message: "Email verified successfully",
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
    console.error("OTP verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
