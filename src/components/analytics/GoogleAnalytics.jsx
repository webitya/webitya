"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    // Load Google Analytics
    const script1 = document.createElement("script")
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script1.async = true
    document.head.appendChild(script1)

    const script2 = document.createElement("script")
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `
    document.head.appendChild(script2)

    return () => {
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [GA_MEASUREMENT_ID])

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      })
    }
  }, [pathname, GA_MEASUREMENT_ID])

  return null
}

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track course enrollment
export const trackCourseEnrollment = (courseId, courseName, price) => {
  trackEvent("purchase", "course", courseName, price)

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "purchase", {
      transaction_id: `course_${courseId}_${Date.now()}`,
      value: price,
      currency: "INR",
      items: [
        {
          item_id: courseId,
          item_name: courseName,
          category: "course",
          quantity: 1,
          price: price,
        },
      ],
    })
  }
}

// Track lesson completion
export const trackLessonCompletion = (courseId, lessonId, lessonName) => {
  trackEvent("lesson_complete", "engagement", `${courseId}_${lessonName}`)
}
