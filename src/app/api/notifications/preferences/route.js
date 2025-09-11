import { NextResponse } from "next/server"
import { verifyToken, getUserById } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function GET(request) {
  try {
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
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      preferences: user.emailPreferences || {
        loginNotifications: true,
        courseUpdates: true,
        progressReports: true,
        announcements: true,
        marketing: false,
      },
    })
  } catch (error) {
    console.error("Get preferences error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { preferences } = await request.json()

    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("webitya_lms")

    await db.collection("users").updateOne({ _id: decoded.userId }, { $set: { emailPreferences: preferences } })

    return NextResponse.json({ message: "Preferences updated successfully" })
  } catch (error) {
    console.error("Update preferences error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
