"use client";

import {
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Aditya Kumar",
    role: "Founder",
    description:
      "Visionary leader and founder of Webitya, passionate about driving innovation in digital marketing and web solutions.",
    image: "/team.webp",
    linkedin: "https://www.linkedin.com/in/aditya-kumar",
    facebook: "https://www.facebook.com/aditya.kumar",
    instagram: "https://www.instagram.com/aditya.kumar",
  },
  {
    name: "Raj Jaiswal",
    role: "CEO",
    description:
      "Leads company strategy and business growth with sharp market insight and leadership excellence.",
    image: "/team.webp",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    name: "Ananya Kumari",
    role: "Brand Ambassador",
    description:
      "Drives brand engagement, promotions and represents Webitya across marketing campaigns with charm and creativity.",
    image: "/team.webp",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    name: "Deepak Gupta",
    role: "Co-Founder, Sr. Graphic & Video Editor, Founder of San Innovation",
    description:
      "Creative powerhouse leading multimedia content, visual storytelling and strategic branding.",
    image: "/team.webp",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    name: "Sachin & Surendra Kumar",
    role: "Web Developers & Social Media Marketing Experts",
    description:
      "Tech experts building optimized websites and delivering impactful social media strategies for clients.",
    image: "/team.webp",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    name: "Siya Sharma",
    role: "Graphic Designer",
    description:
      "Passionate designer crafting visual assets that enhance user experience and brand identity.",
    image: "/team.webp",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
];

const MotionCard = motion(Card);

const TeamSection = () => {
  return (
    <Box
      component="section"
      py={10}
      px={{ xs: 3, md: 10 }}
      textAlign="center"
      bgcolor="#f9fafb"
    >
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        Meet Our Team
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        mt={2}
        maxWidth="600px"
        mx="auto"
      >
        The powerhouse team of Webitya Web Services — innovators, creatives, and
        digital experts driving transformation.
      </Typography>

      <Grid container spacing={4} mt={6}>
        {teamMembers.map((member, index) => (
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            key={index}
            sx={{ display: "flex" }}
          >
            <MotionCard
              elevation={4}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{
                borderRadius: 4,
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#fff",
                flex: 1,
                textAlign: "center",
              }}
            >
              <Avatar
                alt={member.name}
                src={member.image}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  border: "4px solid #d1d5db",
                  boxShadow: 2,
                }}
              />
              <CardContent sx={{ maxWidth: 300 }}>
                <Typography variant="h6" fontWeight={600}>
                  {member.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  fontWeight={500}
                  gutterBottom
                >
                  {member.role}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 14, wordBreak: "break-word", whiteSpace: "normal" }}
                >
                  {member.description}
                </Typography>
              </CardContent>

              <Box mt={2} display="flex" justifyContent="center" gap={2}>
                <IconButton
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#0077B5", "&:hover": { color: "#005582" } }}
                >
                  <LinkedInIcon fontSize="medium" />
                </IconButton>
                <IconButton
                  href={member.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#1877F2", "&:hover": { color: "#125ecf" } }}
                >
                  <FacebookIcon fontSize="medium" />
                </IconButton>
                <IconButton
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#E4405F", "&:hover": { color: "#C13584" } }}
                >
                  <InstagramIcon fontSize="medium" />
                </IconButton>
              </Box>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamSection;
