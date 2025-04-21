"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import UploadPhotos from "../UploadDataEmail";
import ModalForm from "../ModalForm";

export default function PortraitDetailDynamic({ portrait }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const discount = portrait.actualPrice - portrait.discountedPrice;
  const discountPercent = Math.round((discount / portrait.actualPrice) * 100);

  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in the portrait titled "${portrait.title}" listed at ₹${portrait.discountedPrice}. Please share more details.`
  );

  return (
    <Box
      sx={{
        mx: "auto",
        px: { xs: 2, md: 6 },
        py: 6,
        bgcolor: "#ffffff",
        borderRadius: 4,
        boxShadow: 4,
        position: "relative",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Back Button */}
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "text.secondary",
        }}
      >
        Back
      </Button>

      {/* Image */}
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: 3,
          boxShadow: 2,
          my: 6,
        }}
      >
        <img
          src={portrait.image}
          alt={portrait.title}
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Box>

      {/* Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        fontFamily="serif"
        gutterBottom
      >
        {portrait.title}
      </Typography>

      {/* Description */}
      <Typography variant="body1" color="text.secondary" mb={4} maxWidth="700px">
        {portrait.description}
      </Typography>

      {/* Pricing */}
      <Stack direction="row" spacing={2} alignItems="baseline" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          ₹{portrait.discountedPrice}
        </Typography>
        <Typography variant="body1" color="text.disabled" sx={{ textDecoration: "line-through" }}>
          ₹{portrait.actualPrice}
        </Typography>
        <Chip
          label={`${discountPercent}% OFF`}
          color="error"
          size="small"
          sx={{ fontWeight: "medium" }}
        />
      </Stack>

      {/* Buttons */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={5}>
        <Button
          variant="contained"
          color="success"
          startIcon={<WhatsAppIcon />}
          href={`https://wa.me/919876543210?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
        >
          Chat on WhatsApp
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenModal(true)}
          fullWidth
        >
          Enquiry Form
        </Button>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Upload Section */}
      <Typography variant="h6" fontWeight="medium" mb={2} fontFamily="serif">
        Upload Your Own Photo
      </Typography>

      <UploadPhotos />

      {/* Modal */}
      <ModalForm open={openModal} handleClose={() => setOpenModal(false)} />
    </Box>
  );
}
