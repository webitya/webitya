import { NextResponse } from "next/server"
import { createRazorpayOrder } from "@/lib/razorpay"
import { getCourseById } from "@/lib/courses"
import { verifyToken, getUserById } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const { courseId } = await request.json()

    // Verify authentication
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

    // Check if course exists
    const course = getCourseById(courseId)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check if user already purchased the course
    if (user.purchasedCourses && user.purchasedCourses.includes(courseId)) {
      return NextResponse.json({ error: "Course already purchased" }, { status: 400 })
    }

    // Create Razorpay order
    const receipt = `course_${courseId}_user_${user._id}_${Date.now()}`
    const order = await createRazorpayOrder(course.price, "INR", receipt)

    // Store order in database
    const client = await clientPromise
    const db = client.db("webitya_lms")

    await db.collection("orders").insertOne({
      orderId: order.id,
      userId: user._id,
      courseId,
      amount: course.price,
      currency: "INR",
      status: "created",
      receipt,
      createdAt: new Date(),
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      course: {
        id: course.id,
        title: course.title,
        price: course.price,
      },
    })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
