import { NextResponse } from "next/server"
import { hashPassword, generateOTP } from "@/lib/auth"
import { sendOTPEmail, sendSignupNotificationEmail, verifyEmailConnection } from "@/lib/nodemailer"
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    console.log("[v0] Signup request received")

    const { name, email, phone, password } = await request.json()
    console.log("[v0] Request data parsed:", { name, email, phone, passwordLength: password?.length })

    // Validation
    if (!name || !email || !phone || !password) {
      console.log("[v0] Validation failed: missing fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      console.log("[v0] Validation failed: password too short")
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check environment variables
    if (!process.env.MONGODB_URI) {
      console.error("[v0] MONGODB_URI not set")
      return NextResponse.json({ error: "Database configuration error" }, { status: 500 })
    }

    if (!process.env.JWT_SECRET) {
      console.error("[v0] JWT_SECRET not set")
      return NextResponse.json({ error: "Authentication configuration error" }, { status: 500 })
    }

    const emailBypass = process.env.NODE_ENV === "development" && process.env.EMAIL_BYPASS === "true"

    if (!emailBypass) {
      console.log("[v0] Verifying email server connection...")
      const emailConnectionValid = await verifyEmailConnection()
      if (!emailConnectionValid) {
        console.error("[v0] Email server connection failed")
        return NextResponse.json(
          {
            error: "Email service unavailable. Please check SMTP configuration.",
          },
          { status: 500 },
        )
      }
    } else {
      console.log("[v0] Email bypass enabled - skipping email verification")
    }

    console.log("[v0] Connecting to MongoDB...")
    const client = await clientPromise
    const db = client.db("webitya_lms")
    console.log("[v0] MongoDB connected successfully")

    // Check if user already exists
    console.log("[v0] Checking for existing user...")
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      console.log("[v0] User already exists")
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password and generate OTP
    console.log("[v0] Hashing password...")
    const hashedPassword = await hashPassword(password)
    console.log("[v0] Generating OTP...")
    const otp = generateOTP()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Create user
    console.log("[v0] Creating user document...")
    const user = {
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: emailBypass ? true : false,
      purchasedCourses: [],
      emailPreferences: {
        loginNotifications: true,
        courseUpdates: true,
        progressReports: true,
        announcements: true,
        marketing: false,
      },
      createdAt: new Date(),
    }

    console.log("[v0] Inserting user into database...")
    await db.collection("users").insertOne(user)
    console.log("[v0] User created successfully")

    if (!emailBypass) {
      // Send OTP email
      console.log("[v0] Sending OTP email...")
      try {
        await sendOTPEmail(email, otp, name)
        console.log("[v0] OTP email sent successfully")
      } catch (emailError) {
        console.error("[v0] OTP email error:", emailError)
        return NextResponse.json(
          {
            error: "Failed to send verification email. Please check your email configuration.",
            details: process.env.NODE_ENV === "development" ? emailError.message : undefined,
          },
          { status: 500 },
        )
      }

      try {
        console.log("[v0] Sending signup notification...")
        await sendSignupNotificationEmail(email, name)
        console.log("[v0] Signup notification sent")
      } catch (emailError) {
        console.error("[v0] Signup notification email error:", emailError)
        // Don't fail signup if notification email fails
      }

      console.log("[v0] Signup process completed successfully")
      return NextResponse.json({
        message: "User created successfully. Please check your email for OTP verification.",
        email,
      })
    } else {
      console.log("[v0] Signup process completed with email bypass")
      return NextResponse.json({
        message: "User created and verified successfully (email bypass enabled).",
        email,
        verified: true,
      })
    }
  } catch (error) {
    console.error("[v0] Signup error:", error)
    console.error("[v0] Error stack:", error.stack)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
