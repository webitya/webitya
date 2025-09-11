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

const interns = [
  {
    name: "Rahul Sharma",
    role: "Web Development Intern",
    image: "/team.webp",
    linkedin: "",
  },
  {
    name: "Sneha Verma",
    role: "Digital Marketing Intern",
    image: "/team.webp",
    linkedin: "",
  },
  {
    name: "Arjun Patel",
    role: "UI/UX Design Intern",
    image: "/team.webp",
    linkedin: "",
  },
  {
    name: "Priya Singh",
    role: "Content Writing Intern",
    image: "/team.webp",
    linkedin: "",
  },
];

const AboutInternsSection = () => {
  return (
    <Box component="section" py={8} px={{ xs: 3, md: 10 }} bgcolor="#fff" textAlign="center">
      <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
        Our Interns
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Meet the talented interns contributing to Webitya’s growth and innovation.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {interns.map((intern, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 3,
                textAlign: "center",
                backgroundColor: "#f9fafb",
                width: "100%",
                maxWidth: 280,
              }}
            >
              <Avatar
                alt={intern.name}
                src={intern.image}
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto",
                  mb: 2,
                  border: "2px solid #ccc",
                  boxShadow: 2,
                }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                  {intern.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {intern.role}
                </Typography>
                {/* <Box mt={2}>
                  <IconButton
                    href={intern.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "#0077b5",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        color: "#005582",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <LinkedInIcon fontSize="medium" />
                  </IconButton>
                </Box> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutInternsSection;
