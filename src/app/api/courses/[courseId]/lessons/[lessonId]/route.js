import { NextResponse } from "next/server"
import { getCourseById } from "@/lib/courses"
import { verifyToken, getUserById } from "@/lib/auth"

export async function GET(request, { params }) {
  try {
    const { courseId, lessonId } = params
    const course = getCourseById(courseId)

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Find the lesson
    let lesson = null
    for (const chapter of course.chapters) {
      const foundLesson = chapter.lessons.find((l) => l.id === Number.parseInt(lessonId))
      if (foundLesson) {
        lesson = foundLesson
        break
      }
    }

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 })
    }

    // Verify user has purchased the course
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
    if (!user || !user.purchasedCourses || !user.purchasedCourses.includes(courseId)) {
      return NextResponse.json({ error: "Course not purchased" }, { status: 403 })
    }

    return NextResponse.json({ lesson })
  } catch (error) {
    console.error("Get lesson error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
