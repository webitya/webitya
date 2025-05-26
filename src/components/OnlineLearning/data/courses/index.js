import { htmlCourseData } from "./html-course"
import { javascriptCourseData } from "./javascript-course"

export const courses = [
  htmlCourseData,
  javascriptCourseData,
  // CSS Course (Coming Soon)
  {
    id: "css",
    title: "CSS Mastery Pro",
    subtitle: "Complete CSS Course - Styling & Layouts",
    iconName: "Web",
    color: "from-blue-500 to-purple-500",
    duration: "6 Days",
    level: "Intermediate",
    projects: 6,
    category: "markup",
    rating: 4.8,
    students: "6.2k+",
    lectures: 6,
    comingSoon: true,
    features: ["Flexbox", "Grid", "Animations", "Responsive", "Projects"],
    description: "Master CSS from basics to advanced with flexbox, grid, animations, and responsive design techniques.",
  },
  // React Course (Coming Soon)
  {
    id: "react",
    title: "React Development",
    subtitle: "Modern React with Hooks & Context",
    iconName: "Code",
    color: "from-cyan-500 to-blue-500",
    duration: "10 Days",
    level: "Advanced",
    projects: 10,
    category: "framework",
    rating: 4.9,
    students: "4.8k+",
    lectures: 10,
    comingSoon: true,
    isNew: true,
    features: ["Hooks", "Context", "Router", "State Management", "Projects"],
    description: "Build modern React applications with hooks, context API, routing, and state management.",
  },
]

export { htmlCourseData, javascriptCourseData }
