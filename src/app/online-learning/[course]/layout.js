import { htmlCourseData } from "@/components/OnlineLearning/data/courses/html-course"
import { javascriptCourseData } from "@/components/OnlineLearning/data/courses/javascript-course"

const coursesData = {
  html: htmlCourseData,
  javascript: javascriptCourseData,
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const course = coursesData[resolvedParams.course]

  if (!course) {
    return {
      title: "Course Not Found - Webitya Online Learning",
    }
  }

  return {
    title: `${course.title} - Webitya Online Learning`,
    description: course.overview.substring(0, 160),
    keywords: `${course.title}, web development, online course, ${course.level}, programming`,
    openGraph: {
      title: course.title,
      description: course.overview.substring(0, 160),
      type: "website",
    },
  }
}

export default function CourseLayout({ children }) {
  return children
}
