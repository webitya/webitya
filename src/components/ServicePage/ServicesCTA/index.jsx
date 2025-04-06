"use client";

import { Button, Container, Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { motion } from "framer-motion";

const ServicesCTA = () => {
  return (
    <section className="relative py-24 px-4 sm:px-8 bg-gradient-to-tr from-[#e0f2fe] to-[#f0f9ff] overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#bae6fd] rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-16 right-16 w-40 h-40 bg-[#7dd3fc] rounded-full blur-2xl opacity-20 animate-ping" />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/60 backdrop-blur-md p-10 rounded-xl"
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "center", color: "#0f172a" }}
          >
            Ready to Take Your Business Online?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              maxWidth: "100%",
              color: "#475569",
              textAlign: "center",
            }}
          >
            Let Webitya help you grow your digital presence with stunning websites,
            impactful SEO strategies, and effective marketing. Talk to our expert now!
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            <Link href="https://wa.me/919693245941?text=Hello%20Webitya" passHref>
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                size="large"
                sx={{
                  borderRadius: "999px",
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: 16,
                  textTransform: "none",
                  borderColor: "#0284c7",
                  color: "#0284c7",
                  "&:hover": {
                    backgroundColor: "#e0f2fe",
                    borderColor: "#0369a1",
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
