import { NextResponse } from "next/server"
import { getCourseById } from "@/lib/courses"
import { verifyToken, getUserById } from "@/lib/auth"

export async function GET(request, { params }) {
  try {
    const { courseId } = params
    const course = getCourseById(courseId)

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check if user has access to full course content
    const authHeader = request.headers.get("authorization")
    let hasAccess = false

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7)
      const decoded = verifyToken(token)

      if (decoded) {
        const user = await getUserById(decoded.userId)
        if (user && user.purchasedCourses && user.purchasedCourses.includes(courseId)) {
          hasAccess = true
        }
      }
    }

    // Return course with access information
    const courseData = {
      ...course,
      hasAccess,
      chapters: hasAccess
        ? course.chapters
        : course.chapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson) => ({
              ...lesson,
              videoId: hasAccess ? lesson.videoId : null,
            })),
          })),
    }

    return NextResponse.json({ course: courseData })
  } catch (error) {
    console.error("Get course error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
