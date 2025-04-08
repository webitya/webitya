"use client";

import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import BrushIcon from "@mui/icons-material/Brush";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import GoogleIcon from "@mui/icons-material/Google";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import LanguageIcon from "@mui/icons-material/Language";
import CodeIcon from "@mui/icons-material/Code";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "next/link";
import Image from "next/image";

const courses = [
  {
    title: "Complete Digital Marketing",
    price: "₹4,999",
    icon: <SchoolIcon />,
    image: "/courses/Courses-Images/digital-marketing.webp",
    color: "#3b82f6",
    syllabus: "/syllabus/complete-digital-marketing.pdf",
  },
  {
    title: "Email Marketing",
    price: "₹2,999",
    icon: <EmailIcon />,
    image: "/courses/Courses-Images/email-marketing.webp",
    color: "#ef4444",
    syllabus: "/syllabus/email-marketing.pdf",
  },
  {
    title: "Social Media Marketing",
    price: "₹3,499",
    icon: <FacebookIcon />,
    image: "/courses/Courses-Images/social-media-marketing.webp",
    color: "#3b5998",
    syllabus: "/syllabus/social-media-marketing.pdf",
  },
  {
    title: "Graphic Design",
    price: "₹3,999",
    icon: <BrushIcon />,
    image: "/courses/Courses-Images/graphic-design.webp",
    color: "#eab308",
    syllabus: "/syllabus/graphic-design.pdf",
  },
  {
    title: "Video Editing",
    price: "₹4,499",
    icon: <VideoLibraryIcon />,
    image: "/courses/Courses-Images/video-editing.webp",
    color: "#8b5cf6",
    syllabus: "/syllabus/video-editing.pdf",
  },
  {
    title: "Google Ads",
    price: "₹3,999",
    icon: <GoogleIcon />,
    image: "/courses/Courses-Images/google-ads.webp",
    color: "#34d399",
    syllabus: "/syllabus/google-ads.pdf",
  },
  {
    title: "Meta Ads",
    price: "₹3,999",
    icon: <AdsClickIcon />,
    image: "/courses/Courses-Images/meta-ads.webp",
    color: "#2563eb",
    syllabus: "/syllabus/meta-ads.pdf",
  },
  {
    title: "Content Marketing",
    price: "₹4,999",
    icon: <LanguageIcon />,
    image: "/aboutHero.webp",
    color: "#ec4899",
    syllabus: "/syllabus/website-designing.pdf",
  },
  {
    title: "Python Programming",
    price: "₹3,999",
    icon: <CodeIcon />,
    image: "/aboutHero.webp",
    color: "#f59e0b",
    syllabus: "/syllabus/python.pdf",
  },
  {
    title: "Advanced JavaScript",
    price: "₹3,999",
    icon: <CodeIcon />,
    image: "/aboutHero.webp",
    color: "#10b981",
    syllabus: "/syllabus/advanced-js.pdf",
  },
  {
    title: "Frontend Dev (ReactJS, NextJS)",
    price: "₹5,999",
    icon: <CodeIcon />,
    image: "/aboutHero.webp",
    color: "#6366f1",
    syllabus: "/syllabus/frontend-dev.pdf",
  },
  {
    title: "Backend Dev (NodeJS)",
    price: "₹5,499",
    icon: <CodeIcon />,
    image: "/aboutHero.webp",
    color: "#16a34a",
    syllabus: "/syllabus/backend-dev.pdf",
  },
  {
    title: "Full Stack Dev (MERN)",
    price: "₹8,999",
    icon: <CodeIcon />,
    image: "/aboutHero.webp",
    color: "#7c3aed",
    syllabus: "/syllabus/fullstack-mern.pdf",
  },
  {
    title: "Website with HTML/CSS/JS",
    price: "₹3,999",
    icon: <LanguageIcon />,
    image: "/aboutHero.webp",
    color: "#f43f5e",
    syllabus: "/syllabus/html-css-js.pdf",
  },
  {
    title: "Website using WordPress",
    price: "₹3,499",
    icon: <LanguageIcon />,
    image: "/aboutHero.webp",
    color: "#0ea5e9",
    syllabus: "/syllabus/wordpress.pdf",
  },
];

const CoursesList = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mt-12 mb-10">
          Our Popular Courses
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Card Image */}
              <div className="h-48 w-full">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="text-white p-2 rounded-full"
                      style={{ backgroundColor: course.color }}
                    >
                      {course.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {course.title}
                    </h3>
                  </div>

                  {/* Download Icon */}
                  <a
                    href={course.syllabus}
                    download
                    title="Download Syllabus"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    <DownloadIcon />
                  </a>
                </div>

                <div className="mt-auto">
                  <p className="text-xl font-bold text-gray-700 mb-4 flex justify-between items-center">
                    {course.price}   <span>           <div className="flex items-center gap-2 text-xs text-slate-500">
  <span>Powered by</span>
  <Link href="/">
    <Image
      src="/brand/logo1.png"
      alt="Webitya Logo"
      width={70}
      height={20}
      className="object-contain cursor-pointer"
    />
  </Link>
</div></span>
                  </p>
                  <a
                    href="https://wa.me/919693245941?text=Hi%20I'm%20interested%20in%20your%20courses!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesList;
