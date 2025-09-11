import { NextResponse } from "next/server"
import { generateToken } from "@/lib/auth"
import { sendPasswordResetEmail } from "@/lib/nodemailer"
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("webitya_lms")

    const user = await db.collection("users").findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Generate reset token
    const resetToken = generateToken(user._id.toString())
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour expiry

    // Save reset token and expiry to DB
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
        },
      }
    )

    // Send reset email
    await sendPasswordResetEmail(email, resetToken, user.name)

    return NextResponse.json({
      message: "Password reset email sent successfully",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
