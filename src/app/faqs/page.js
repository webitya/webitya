"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "@/components/FooterEl";

const FAQWebitya = () => {
  const faqs = [
    {
      key: "1",
      label: "What services does Webitya Web Services offer?",
      answer:
        "We specialize in web development, digital marketing, cloud hosting, and IT consulting—providing customized solutions for businesses of every size.",
    },
    {
      key: "2",
      label: "How can I integrate Webitya's solutions into my business?",
      answer:
        "Our experts work closely with you to understand your unique requirements and design a seamless integration strategy, ensuring minimal disruption and maximum efficiency.",
    },
    {
      key: "3",
      label: "What support options does Webitya provide?",
      answer:
        "We offer round-the-clock technical support, detailed documentation, and personalized consulting sessions to help you optimize our services for your business.",
    },
    {
      key: "4",
      label: "What are the pricing models for your services?",
      answer:
        "Our pricing is flexible and competitive, with packages tailored to your specific needs. Please contact our team for a detailed and custom quote.",
    },
    {
      key: "5",
      label: "Can I request a demo of Webitya's services?",
      answer:
        "Absolutely! We offer free demos and consultations so you can experience our solutions firsthand. Simply schedule a demo via our website or contact our sales team.",
    },
    {
      key: "6",
      label: "How secure are Webitya's hosting and services?",
      answer:
        "Security is our top priority. Our hosting solutions include robust encryption, regular security audits, and continuous monitoring to ensure your data is always protected.",
    },
    {
      key: "7",
      label: "How do I get started with Webitya Web Services?",
      answer:
        "Getting started is easy! Reach out to our sales team or complete the inquiry form on our website, and we’ll guide you through every step of the process.",
    },
  ];

  return (
 <>
    <section className="mt-20 px-6 md:px-6 mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12">
        Frequently Asked Questions
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 text-left">
        {faqs.map((faq) => (
          <Accordion key={faq.key}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${faq.key}-content`}
              id={`panel-${faq.key}-header`}
            >
              <Typography className="font-medium">{faq.label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-gray-700 leading-relaxed">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
    <Footer/>
 </>
  );
};

export default FAQWebitya;
