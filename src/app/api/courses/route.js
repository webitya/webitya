import { NextResponse } from "next/server"
import { getAllCourses } from "@/lib/courses"

export async function GET() {
  try {
    const courses = getAllCourses()
    return NextResponse.json({ courses })
  } catch (error) {
    console.error("Get courses error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
