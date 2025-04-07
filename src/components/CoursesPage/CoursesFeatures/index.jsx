"use client";

import SchoolIcon from "@mui/icons-material/School";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import GroupsIcon from "@mui/icons-material/Groups";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const features = [
  {
    icon: <SchoolIcon className="text-blue-600" fontSize="large" />,
    title: "Offline Classes",
    description:
      "Interactive sessions with live mentors and real-world guidance.",
  },
  {
    icon: <PlayCircleFilledWhiteIcon className="text-blue-600" fontSize="large" />,
    title: "Recorded Lectures",
    description:
      "Revisit lessons anytime with lifetime access to high-quality recordings.",
  },
  {
    icon: <SupportAgentIcon className="text-blue-600" fontSize="large" />,
    title: "Expert Support",
    description:
      "Get timely help from experienced professionals during your learning journey.",
  },
  {
    icon: <QuestionAnswerIcon className="text-blue-600" fontSize="large" />,
    title: "Doubt Solving",
    description:
      "Ask questions and get quick solutions from mentors and peers.",
  },
  {
    icon: <GroupsIcon className="text-blue-600" fontSize="large" />,
    title: "Doubt Clearing for Recorded Learners",
    description:
      "Purchased recorded lectures? Attend offline sessions to get your doubts cleared too.",
  },
  {
    icon: <MonetizationOnIcon className="text-green-600" fontSize="large" />,
    title: "Money Back Guarantee",
    description:
      "Not satisfied? Get a full refund within 48 hours of payment—no questions asked.",
  },
];

const CourseFeatures = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Why Choose Our Courses?
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-center"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseFeatures;
