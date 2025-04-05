"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What services does Webitya Web Services offer?",
    answer:
      "We offer a full suite of digital marketing solutions including SEO, Social Media Marketing, Google Ads, Website Development, UI/UX Design, and Email Marketing. We also provide personalized training programs for beginners and businesses.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Depending on the complexity and requirements, a basic website can take 5-10 days. For custom designs, e-commerce platforms, or advanced functionality, timelines may extend to 3-4 weeks.",
  },
  {
    question: "Can you guarantee top rankings on Google?",
    answer:
      "We follow industry best practices for SEO and deliver consistent results, but no ethical SEO agency can guarantee #1 rankings due to frequent algorithm changes. Our focus is on long-term sustainable growth.",
  },
  {
    question: "Do you provide support after the project is delivered?",
    answer:
      "Absolutely! We offer 1-3 months of free support depending on your project, and you can always opt for our affordable maintenance packages for long-term assistance.",
  },
  {
    question: "How do I get started with Webitya?",
    answer:
      "Just fill out our contact form or schedule a free consultation call. We'll understand your goals and tailor a strategy that fits your budget and timeline.",
  },
];

const HomeFaqs = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          Get clear answers to common queries about our services, support, and
          how we work with businesses like yours.
        </Typography>

        <Box mt={4}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                backgroundColor: "#fff",
                boxShadow: 1,
                mb: 2,
                borderRadius: 2,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="medium">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default HomeFaqs;
