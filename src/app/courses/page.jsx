import CourseList from "@/components/courses/CourseList"

export const metadata = {
  title: "Courses - Webitya LMS",
  description: "Explore our comprehensive courses in Web Development, Python, and Digital Marketing",
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CourseList />
    </div>
  )
}
