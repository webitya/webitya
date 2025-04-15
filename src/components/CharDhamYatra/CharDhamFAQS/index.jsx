"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const faqData = [
  {
    question: "What is the best time to visit Char Dham?",
    answer:
      "The best time to visit Char Dham is from May to October. The temples remain closed during winters due to heavy snowfall. The peak season is during the summer months, especially from June to September.",
  },
  {
    question: "Is it safe for senior citizens to visit?",
    answer:
      "Yes, Char Dham is accessible for senior citizens, and there are various facilities for their comfort. However, it’s advisable to consult a doctor before traveling and ensure that the journey aligns with their health condition.",
  },
  {
    question: "Can children come along on the Yatra?",
    answer:
      "Yes, children are welcome on the Char Dham Yatra. However, the journey involves trekking and long travel hours, so it’s important to ensure that children are physically fit for the trip.",
  },
  {
    question: "How long does the Char Dham Yatra take?",
    answer:
      "The Char Dham Yatra usually takes 10-12 days, depending on your travel schedule and the time spent at each Dham. The Yatra covers Yamunotri, Gangotri, Kedarnath, and Badrinath, and can be done by road or trekking.",
  },
  {
    question: "What should I carry for the Yatra?",
    answer:
      "You should carry light and comfortable clothing, warm clothes (especially for Kedarnath), sturdy trekking shoes, medicines, personal hygiene items, and a valid ID proof. It’s also advisable to carry a raincoat or umbrella, as the weather can change quickly in the hills.",
  },
  {
    question: "Are there any facilities for emergency health care?",
    answer:
      "Yes, there are emergency medical facilities at each of the Char Dham locations. We also provide assistance in case of any medical emergencies and have a dedicated support team available 24x7 for any help.",
  },
];

const CharDhamFAQS = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close if the same item is clicked
    } else {
      setActiveIndex(index); // Open the clicked item
    }
  };

  return (
    <section className="bg-[#f7faff] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Here are some frequently asked questions that may help you prepare for your spiritual journey. If you have any other queries, feel free to contact us.
        </p>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="border-b pb-4 cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                <span
                  className={`text-xl transform transition-transform ${activeIndex === index ? "rotate-180" : "rotate-0"}`}
                >
                  &#9660;
                </span>
              </div>

              {activeIndex === index && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 text-gray-600"
                >
                  {item.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharDhamFAQS;
