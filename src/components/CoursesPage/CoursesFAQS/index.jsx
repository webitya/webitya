"use client";

import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ReplayIcon from "@mui/icons-material/Replay";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const faqs = [
  {
    question: "Are these courses offline or online?",
    answer:
      "These are offline courses with recorded lectures available. You can visit the center for live doubt sessions.",
    icon: <LiveTvIcon className="text-blue-500" />,
  },
  {
    question: "Can I clear my doubts with just the recorded course?",
    answer:
      "Yes! Even with the recorded version, you're welcome to come to our center for offline doubt resolution.",
    icon: <ReplayIcon className="text-purple-500" />,
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Definitely. We offer a 100% refund within 48 hours of payment if you're not satisfied—no questions asked.",
    icon: <AssignmentTurnedInIcon className="text-green-500" />,
  },
  {
    question: "Will I get support after course completion?",
    answer:
      "Yes, post-course support is available via mentor groups and scheduled offline doubt-clearing sessions.",
    icon: <SupportAgentIcon className="text-orange-500" />,
  },
  {
    question: "Do I need any experience to start?",
    answer:
      "No prior knowledge required! All courses are beginner-friendly and include practical, step-by-step learning.",
    icon: <SchoolIcon className="text-indigo-500" />,
  },
  {
    question: "Are the certificates recognized?",
    answer:
      "Yes, all students receive a recognized certificate after course completion, which can boost your resume.",
    icon: <VerifiedUserIcon className="text-pink-500" />,
  },
  {
    question: "Can I switch between batches?",
    answer:
      "Absolutely. You can request a batch change anytime, based on availability and your convenience.",
    icon: <SwapHorizIcon className="text-yellow-500" />,
  },
  {
    question: "Is placement assistance included?",
    answer:
      "Yes, we provide placement guidance, resume reviews, and interview preparation support after the course.",
    icon: <WorkOutlineIcon className="text-rose-500" />,
  },
];

const CourseFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left group"
              >
                <div className="flex items-center gap-3">
                  {faq.icon}
                  <span className="text-base sm:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition">
                    {faq.question}
                  </span>
                </div>
                <ExpandMoreIcon
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-blue-600" : "text-gray-500"
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 mt-3 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFAQ;
