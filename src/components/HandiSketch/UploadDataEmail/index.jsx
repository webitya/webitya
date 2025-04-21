"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MessageIcon from "@mui/icons-material/Message";

export default function UploadPhotos() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        (result) => {
          alert("Message Sent!");
          console.log(result.text);
        },
        (error) => {
          alert("Failed to send!");
          console.log(error.text);
        }
      );
  };

  return (
    <Box
      component="form"
      ref={form}
      onSubmit={sendEmail}
      sx={{
        backgroundColor: "white",
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        border: "1px solid #e5e7eb",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3} color="text.primary">
        Send Us Your Reference Photo
      </Typography>

      <Stack spacing={3}>
        {/* Name Field */}
        <TextField
          name="user_name"
          label="Your Name"
          fullWidth
          required
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Email Field */}
        <TextField
          name="user_email"
          label="Your Email"
          type="email"
          fullWidth
          required
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* File Upload */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            mb={1}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <PhotoCameraIcon fontSize="small" /> Upload Image
          </Typography>
          <input
            type="file"
            name="user_file"
            required
            className="w-full text-sm text-gray-700 bg-gray-50 rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </Box>

        {/* Optional Message */}
        <TextField
          name="message"
          label="Message (Optional)"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MessageIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ py: 1.5, fontWeight: "medium", fontSize: "1rem" }}
        >
          Upload Photo
        </Button>
      </Stack>
    </Box>
  );
}
