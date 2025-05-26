import { htmlCourseData } from "@/components/OnlineLearning/data/courses/html-course"
import { javascriptCourseData } from "@/components/OnlineLearning/data/courses/javascript-course"

const coursesData = {
  html: htmlCourseData,
  javascript: javascriptCourseData,
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const course = coursesData[resolvedParams.course]
  const lectureIndex = Number.parseInt(resolvedParams.lecture) - 1

  if (!course || !course.lectures[lectureIndex]) {
    return {
      title: "Lecture Not Found - Webitya Online Learning",
    }
  }

  const lecture = course.lectures[lectureIndex]

  return {
    title: `${lecture.title} - ${course.title} - Webitya`,
    description: `Learn ${lecture.subtitle}. ${lecture.objectives.join(", ")}.`,
    keywords: `${lecture.title}, ${course.title}, web development, HTML, tutorial`,
    openGraph: {
      title: `${lecture.title} - ${course.title}`,
      description: lecture.subtitle,
      type: "article",
    },
  }
}

export default function LectureLayout({ children }) {
  return children
}
