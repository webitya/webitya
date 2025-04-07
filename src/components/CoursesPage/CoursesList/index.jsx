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

const courses = [
  {
    title: "Complete Digital Marketing",
    price: "₹4,999",
    icon: <SchoolIcon />,
    image: "/aboutHero.webp",
    color: "#3b82f6",
  },
  {
    title: "Email Marketing",
    price: "₹2,999",
    icon: <EmailIcon />,
    image: "/aboutHero.webp",
    color: "#ef4444",
  },
  {
    title: "Social Media Marketing",
    price: "₹3,499",
    icon: <FacebookIcon />,
    image: "/aboutHero.webp",
    color: "#3b5998",
  },
  {
    title: "Graphic Design",
    price: "₹3,999",
    icon: <BrushIcon />,
    image: "/aboutHero.webp",
    color: "#eab308",
  },
  {
    title: "Video Editing",
    price: "₹4,499",
    icon: <VideoLibraryIcon />,
    image: "/aboutHero.webp",
    color: "#8b5cf6",
  },
  {
    title: "Google Ads",
    price: "₹3,999",
    icon: <GoogleIcon />,
    image: "/aboutHero.webp",
    color: "#34d399",
  },
  {
    title: "Meta Ads",
    price: "₹3,999",
    icon: <AdsClickIcon />,
    image: "/aboutHero.webp",
    color: "#2563eb",
  },
  {
    title: "Website Designing",
    price: "₹4,999",
    icon: <LanguageIcon />,
    image: "/aboutHero.webp",
    color: "#ec4899",
  },
  {
    title: "Python Programming",
    price: "₹3,999",
    icon: <CodeIcon />,
    image: "/aboutHero.webp",
    color: "#f59e0b",
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
                <div className="flex items-center gap-4 mb-3">
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

                <div className="mt-auto">
                  <p className="text-xl font-bold text-gray-700 mb-4">
                    {course.price}
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
