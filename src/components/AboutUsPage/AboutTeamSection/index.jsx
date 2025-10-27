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
    name: "Rajnish Kumar",
    role: "Co-Founder & Chief Visionary Officer",
    description:
      "A forward-thinking entrepreneur shaping the future of Webitya. With deep expertise in strategy, digital innovation, and team leadership, Rajnish drives the company’s vision — helping brands unlock growth through smart technology and marketing solutions.",
    image: "/RajnishKumarCoFounder.webp",
    linkedin: "https://www.linkedin.com/in/",
    facebook: "https://www.facebook.com/webitya.in",
    instagram: "https://www.instagram.com/webitya.in",
  },
  {
    name: "Piyush Goel",
    role: "Operations & Strategy Manager",
    description:
      "The powerhouse behind execution and efficiency. Piyush ensures every project runs seamlessly — from client acquisition to campaign success. Known for his analytical mindset and business acumen, he builds bridges between vision and measurable results.",
    image: "/PiyushGoel.webp",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    name: "Raj Shekhar",
    role: "Brand Ambassador & Creative Partner",
    description:
      "A dynamic storyteller and the creative voice of Webitya. Raj transforms ideas into engaging brand stories, building authentic connections through innovative campaigns, digital events, and social storytelling that inspire audiences everywhere.",
    image: "/RajShekhar.webp",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
];

const MotionCard = motion(Card);

const TeamSection = () => {
  return (
    <Box
 
      textAlign="center"
      bgcolor="#f9fafb"
    >
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        Meet Our Team
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mt={2} mx="auto">
        The powerhouse team of Webitya Web Services — innovators, creatives, and
        digital experts driving transformation.
      </Typography>

      <Grid container spacing={2} mt={6} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
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
                textAlign: "center",
                height: "100%",
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
              <CardContent sx={{ maxWidth: 312 }}>
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
                  sx={{
                    fontSize: 14,
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
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
