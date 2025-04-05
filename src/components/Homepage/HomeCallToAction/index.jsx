"use client";

import { Button, Typography, Container, Box } from "@mui/material";
import { motion } from "framer-motion";
import "./HomeCallToAction.css";

const HomeCallToAction = () => {
  return (
    <section className="call-to-action-section relative overflow-hidden">
      <div className="cta-overlay" />
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 1, md: 1 },
          position: "relative",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            color="white"
          >
            Ready to Take Your Business Online?
          </Typography>
          <Typography variant="body1" color="white" mb={4}>
            Let Webitya Web Services be your partner in digital growth. Contact
            us today and unlock your online potential!
          </Typography>
          <Box>
          <Button
  variant="contained"
  size="large"
  sx={{
    backgroundColor: "#fff",
    color: "#000",
    px: 5,
    fontWeight: "bold",
    boxShadow: 2,
    "&:hover": { backgroundColor: "#f4f4f4" },
  }}
  href="https://wa.me/919693245941?text=Hello%20Webitya"
  target="_blank"
  rel="noopener noreferrer"
>
  Message Us on WhatsApp
</Button>


          </Box>
        </motion.div>
      </Container>
    </section>
  );
};

export default HomeCallToAction;
