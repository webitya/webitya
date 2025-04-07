"use client";

import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "Are these courses offline or online?",
    answer:
      "These are offline courses with the option of recorded lectures for remote learners. You can also attend offline for doubt resolution.",
  },
  {
    question: "Can I clear my doubts even if I buy only the recorded course?",
    answer:
      "Yes, you can visit our center to clear doubts offline even if you've purchased just the recorded version.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes! You get a full money-back guarantee within 48 hours of payment—no questions asked.",
  },
  {
    question: "Will I get support after the course ends?",
    answer:
      "Absolutely! You’ll receive continued support through our offline sessions and mentor groups even after completion.",
  },
  {
    question: "Do I need any prior knowledge to enroll?",
    answer:
      "No prior experience is required. We start from the basics and guide you through hands-on projects.",
  },
];

const CourseFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-5 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <ExpandMoreIcon
                  className={`transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`mt-3 text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFAQ;
