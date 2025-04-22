"use client";

import { useRef, useState } from "react";
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
  const [sending, setSending] = useState(false);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const sendEmail = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const fileInput = form.current.querySelector('input[name="user_file"]');
      const file = fileInput.files[0];
      const base64 = await fileToBase64(file);

      const templateParams = {
        user_name: form.current.user_name.value,
        user_email: form.current.user_email.value,
        message: form.current.message.value,
        user_file: base64, // base64 image string
      };

      const result = await emailjs.send(
        "service_webitya",        // Replace with your EmailJS service ID
        "template_y9g4vob",       // Replace with your EmailJS template ID
        templateParams,
        "Iw_1wMHg3mqNItEUH"       // Replace with your public EmailJS key
      );

      alert("Message Sent!");
      console.log(result.text);
      form.current.reset();
    } catch (error) {
      alert("Failed to send!");
      console.error(error);
    }

    setSending(false);
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
        {/* Name */}
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

        {/* Email */}
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
            accept="image/*"
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
          disabled={sending}
          sx={{ py: 1.5, fontWeight: "medium", fontSize: "1rem" }}
        >
          {sending ? "Uploading..." : "Upload Photo"}
        </Button>
      </Stack>
    </Box>
  );
}
