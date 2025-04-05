"use client";

import { Box, Grid, Typography } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const VisionMissionSection = () => {
  return (
    <Box
      component="section"
      py={10}
      px={{ xs: 3, md: 10 }}
      bgcolor="#fff"
      textAlign="center"
    >
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        Our Vision & Mission
      </Typography>

      <Grid container spacing={6} mt={5} justifyContent="center">
        {/* Vision */}
        <Grid item xs={12} md={6}>
          <MotionBox
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <EmojiObjectsIcon
              sx={{ fontSize: 60, color: "#2563eb", mb: 2 }}
            />
            <Typography variant="h5" fontWeight={600} color="text.primary">
              Our Vision
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              mt={2}
              maxWidth="500px"
              fontSize="1.1rem"
            >
              Empowering businesses with{" "}
              <strong>cutting-edge digital solutions</strong> to establish a
              strong online presence and drive <strong>innovation</strong>.
            </Typography>
          </MotionBox>
        </Grid>

        {/* Mission */}
        <Grid item xs={12} md={6}>
          <MotionBox
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <RocketLaunchIcon
              sx={{ fontSize: 60, color: "#16a34a", mb: 2 }}
            />
            <Typography variant="h5" fontWeight={600} color="text.primary">
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              mt={2}
              maxWidth="500px"
              fontSize="1.1rem"
            >
              Helping brands achieve <strong>growth and visibility</strong>{" "}
              through strategic{" "}
              <strong>digital marketing, SEO, and modern web solutions</strong>.
            </Typography>
          </MotionBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisionMissionSection;
