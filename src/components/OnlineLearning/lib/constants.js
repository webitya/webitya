export const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"]

export const COURSE_CATEGORIES = [
  { id: "markup", name: "Markup & Styling" },
  { id: "programming", name: "Programming" },
  { id: "framework", name: "Frameworks" },
  { id: "backend", name: "Backend" },
  { id: "database", name: "Database" },
  { id: "tools", name: "Tools & DevOps" },
]

export const DIFFICULTY_COLORS = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
}

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
}
