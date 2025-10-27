"use client";

import { Button, Typography, Box, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { motion } from "framer-motion";

const ServicesCTA = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 bg-gradient-to-br from-[#e0f7ff] via-[#d1edff] to-[#b3eaff] overflow-hidden">
      {/* Soft background shapes */}
      <div className="absolute top-[-3rem] left-[-3rem] w-48 h-48 bg-[#bae6fd] rounded-full blur-3xl opacity-25 animate-pulse" />
      <div className="absolute bottom-[-3rem] right-[-3rem] w-64 h-64 bg-[#7dd3fc] rounded-full blur-[90px] opacity-20 animate-ping" />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ color: "#0f172a", mb: 1 }}
          >
            Let's Grow Your Brand with Webitya
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              color: "#475569",
              fontSize: "1rem",
              maxWidth: 600,
              mx: "auto",
              mb: 4,
            }}
          >
            Beautiful websites, smart marketing, and SEO that drives results —
            all in one place.
          </Typography>

          <Box display="flex" justifyContent="center">
            <Link href="https://wa.me/917970409108?text=Hello%20Webitya" passHref>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                size="medium"
                sx={{
                  borderRadius: "999px",
                  textTransform: "none",
                  px: 4,
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: 15,
                  backgroundColor: "#3b82f6",
                  boxShadow: "0 6px 14px rgba(59,130,246,0.25)",
                  "&:hover": {
                    backgroundColor: "#2563eb",
                  },
                }}
              >
                Contact Us
              </Button>
            </Link>
          </Box>
        </motion.div>
      </Container>
    </section>
  );
};

export default ServicesCTA;
