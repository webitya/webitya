import { NextResponse } from "next/server"
import { verifyToken, getUserById } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function GET(request, { params }) {
  try {
    const { courseId } = params

    const client = await clientPromise
    const db = client.db("webitya_lms")

    const content = await db.collection("course_content").find({ courseId }).sort({ order: 1 }).toArray()

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Get course content error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request, { params }) {
  try {
    const { courseId } = params
    const contentData = await request.json()

    // Verify admin authentication
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

    const newContent = {
      ...contentData,
      courseId,
      createdBy: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("course_content").insertOne(newContent)

    return NextResponse.json({
      message: "Content created successfully",
      contentId: result.insertedId,
    })
  } catch (error) {
    console.error("Create course content error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
