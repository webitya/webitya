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
    role: "Founder & CEO",
    description:
      "Leading Webitya with a vision to revolutionize website development and digital marketing.",
    image: "/team.webp",
    linkedin: "https://www.linkedin.com/in/aditya-kumar",
    facebook: "https://www.facebook.com/aditya.kumar",
    instagram: "https://www.instagram.com/aditya.kumar",
  },
  {
    name: "Ananya Sharma",
    role: "Marketing Head",
    description:
      "Specialized in brand growth and customer engagement through innovative marketing strategies.",
    image: "/team.webp",
    linkedin: "https://www.linkedin.com/in/ananya-sharma",
    facebook: "https://www.facebook.com/ananya.sharma",
    instagram: "https://www.instagram.com/ananya.sharma",
  },
  {
    name: "Sahil Verma",
    role: "CTO",
    description:
      "Expert in front-end development and ensuring top-notch user experiences with modern technologies.",
    image: "/team.webp",
    linkedin: "https://www.linkedin.com/in/sahil-verma",
    facebook: "https://www.facebook.com/sahil.verma",
    instagram: "https://www.instagram.com/sahil.verma",
  },
];

const MotionCard = motion(Card);

const TeamSection = () => {
  return (
    <Box
      component="section"
      py={10}
      px={{ xs: 3, md: 10 }}
      bgcolor="linear-gradient(to bottom, #f3f4f6, #e5e7eb)"
      textAlign="center"
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
        The brilliant minds behind Webitya Web Services, committed to digital
        excellence.
      </Typography>

      <Grid container spacing={4} mt={6}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <MotionCard
              elevation={4}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{
                borderRadius: 4,
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#fff",
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
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {member.name}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight={500}>
                  {member.role}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={1}
                  sx={{ fontSize: 14 }}
                >
                  {member.description}
                </Typography>
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
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamSection;
