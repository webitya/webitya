// Course data structure and management utilities
export const COURSES = {
  "web-development": {
    id: "web-development",
    title: "Web Development",
    description: "Master modern web development with HTML, CSS, JavaScript, React, and Node.js",
    price: 4999,
    duration: "12 weeks",
    level: "Beginner to Advanced",
    thumbnail: "/web-development-course-thumbnail.png",
    instructor: "Webitya Team",
    features: [
      "Live coding sessions",
      "Real-world projects",
      "Industry mentorship",
      "Job placement assistance",
      "Certificate of completion",
    ],
    chapters: [
      {
        id: 1,
        title: "HTML & CSS Fundamentals",
        lessons: [
          { id: 1, title: "Introduction to HTML", videoId: "dQw4w9WgXcQ", duration: "45 min" },
          { id: 2, title: "CSS Styling Basics", videoId: "dQw4w9WgXcQ", duration: "60 min" },
          { id: 3, title: "Responsive Design", videoId: "dQw4w9WgXcQ", duration: "75 min" },
        ],
      },
      {
        id: 2,
        title: "JavaScript Programming",
        lessons: [
          { id: 4, title: "JavaScript Basics", videoId: "dQw4w9WgXcQ", duration: "90 min" },
          { id: 5, title: "DOM Manipulation", videoId: "dQw4w9WgXcQ", duration: "80 min" },
          { id: 6, title: "Async Programming", videoId: "dQw4w9WgXcQ", duration: "70 min" },
        ],
      },
      {
        id: 3,
        title: "React Development",
        lessons: [
          { id: 7, title: "React Components", videoId: "dQw4w9WgXcQ", duration: "85 min" },
          { id: 8, title: "State Management", videoId: "dQw4w9WgXcQ", duration: "95 min" },
          { id: 9, title: "React Hooks", videoId: "dQw4w9WgXcQ", duration: "100 min" },
        ],
      },
    ],
    studyMaterials: [
      { title: "HTML Cheat Sheet", type: "pdf", url: "/materials/html-cheat-sheet.pdf" },
      { title: "CSS Grid Guide", type: "pdf", url: "/materials/css-grid-guide.pdf" },
      { title: "JavaScript Reference", type: "pdf", url: "/materials/js-reference.pdf" },
      { title: "React Best Practices", type: "pdf", url: "/materials/react-best-practices.pdf" },
    ],
  },
  python: {
    id: "python",
    title: "Python Programming",
    description: "Learn Python from basics to advanced concepts including data science and web development",
    price: 3999,
    duration: "10 weeks",
    level: "Beginner to Intermediate",
    thumbnail: "/python-programming-course-thumbnail.jpg",
    instructor: "Webitya Team",
    features: [
      "Hands-on coding practice",
      "Data science projects",
      "Web scraping techniques",
      "API development",
      "Certificate of completion",
    ],
    chapters: [
      {
        id: 1,
        title: "Python Basics",
        lessons: [
          { id: 1, title: "Python Syntax", videoId: "dQw4w9WgXcQ", duration: "50 min" },
          { id: 2, title: "Data Types", videoId: "dQw4w9WgXcQ", duration: "65 min" },
          { id: 3, title: "Control Structures", videoId: "dQw4w9WgXcQ", duration: "70 min" },
        ],
      },
      {
        id: 2,
        title: "Object-Oriented Programming",
        lessons: [
          { id: 4, title: "Classes and Objects", videoId: "dQw4w9WgXcQ", duration: "80 min" },
          { id: 5, title: "Inheritance", videoId: "dQw4w9WgXcQ", duration: "75 min" },
          { id: 6, title: "Polymorphism", videoId: "dQw4w9WgXcQ", duration: "85 min" },
        ],
      },
    ],
    studyMaterials: [
      { title: "Python Syntax Guide", type: "pdf", url: "/materials/python-syntax.pdf" },
      { title: "Data Structures Handbook", type: "pdf", url: "/materials/data-structures.pdf" },
      { title: "Python Libraries Reference", type: "pdf", url: "/materials/python-libraries.pdf" },
    ],
  },
  "digital-marketing": {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Master digital marketing strategies including SEO, social media, and paid advertising",
    price: 2999,
    duration: "8 weeks",
    level: "Beginner to Intermediate",
    thumbnail: "/digital-marketing-course-thumbnail.png",
    instructor: "Webitya Team",
    features: [
      "Real campaign analysis",
      "Industry tools training",
      "Marketing automation",
      "Analytics and reporting",
      "Certificate of completion",
    ],
    chapters: [
      {
        id: 1,
        title: "Digital Marketing Fundamentals",
        lessons: [
          { id: 1, title: "Marketing Strategy", videoId: "dQw4w9WgXcQ", duration: "40 min" },
          { id: 2, title: "Target Audience", videoId: "dQw4w9WgXcQ", duration: "55 min" },
          { id: 3, title: "Content Marketing", videoId: "dQw4w9WgXcQ", duration: "60 min" },
        ],
      },
      {
        id: 2,
        title: "SEO & SEM",
        lessons: [
          { id: 4, title: "Search Engine Optimization", videoId: "dQw4w9WgXcQ", duration: "90 min" },
          { id: 5, title: "Google Ads", videoId: "dQw4w9WgXcQ", duration: "85 min" },
          { id: 6, title: "Analytics Setup", videoId: "dQw4w9WgXcQ", duration: "70 min" },
        ],
      },
    ],
    studyMaterials: [
      { title: "SEO Checklist", type: "pdf", url: "/materials/seo-checklist.pdf" },
      { title: "Social Media Templates", type: "pdf", url: "/materials/social-templates.pdf" },
      { title: "Analytics Guide", type: "pdf", url: "/materials/analytics-guide.pdf" },
    ],
  },
}

export function getCourseById(courseId) {
  return COURSES[courseId] || null
}

export function getAllCourses() {
  return Object.values(COURSES)
}

export function hasUserPurchasedCourse(userCourses, courseId) {
  return userCourses && userCourses.includes(courseId)
}
