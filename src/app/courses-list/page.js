import CourseCTA from "@/components/CoursesPage/CoursesCTA";
import CourseFAQ from "@/components/CoursesPage/CoursesFAQS";
import CourseFeatures from "@/components/CoursesPage/CoursesFeatures";
import CoursesHeroCarousel from "@/components/CoursesPage/CoursesHero";
import CoursesList from "@/components/CoursesPage/CoursesList";
import CourseTestimonials from "@/components/CoursesPage/CoursesTestimonials";
import Footer from "@/components/FooterEl";

export const metadata = {
  title: "Webitya Courses | Learn Digital Marketing, SEO, and More",
  description:
    "Explore Webitya’s range of courses in digital marketing, SEO, web design, and more. Learn from industry experts and boost your career in 2025.",
  keywords: [
    "Digital Marketing Courses",
    "SEO Courses",
    "Web Design Courses",
    "Learn Digital Marketing",
    "Webitya Courses",
    "Online Learning",
    "2025 Courses",
    "SEO Training",
  ],
  alternates: {
    canonical: "https://www.webitya.com/courses",
  },
  openGraph: {
    title: "Webitya Courses | Learn Digital Marketing, SEO, and More",
    description:
      "Explore Webitya’s range of courses in digital marketing, SEO, web design, and more. Learn from industry experts and boost your career in 2025.",
    url: "https://www.webitya.com/courses",
    type: "website",
  },
};

const Courses = () => {
  return (
    <main className="mx-auto">
      <CoursesHeroCarousel />
      <CoursesList />
      <CourseFeatures />
      <CourseTestimonials />
      <CourseFAQ />
      <CourseCTA />
      <Footer />
    </main>
  );
};

export default Courses;
