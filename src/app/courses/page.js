import CourseCTA from "@/components/CoursesPage/CoursesCTA"
import CourseFAQ from "@/components/CoursesPage/CoursesFAQS"
import CourseFeatures from "@/components/CoursesPage/CoursesFeatures"
import CoursesHeroCarousel from "@/components/CoursesPage/CoursesHero"
import CoursesList from "@/components/CoursesPage/CoursesList"
import CourseTestimonials from "@/components/CoursesPage/CoursesTestimonials"
import Footer from "@/components/FooterEl"


const Courses=()=>{
    return (
        <>
          <CoursesHeroCarousel/>
          <CoursesList/>
          <CourseFeatures/>
          <CourseTestimonials/>
          <CourseFAQ/>
          <CourseCTA/>
          <Footer/>
        </>
    )
}
export default Courses