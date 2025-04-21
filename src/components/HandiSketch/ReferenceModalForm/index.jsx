"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Slide,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const Transition = Slide;

export default function ReferenceModalForm({ open, handleClose, title }) {
  const form = useRef();
  const [fileName, setFileName] = useState("No file chosen");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your template ID
        form.current,
        "YOUR_PUBLIC_KEY" // Replace with your public key
      )
      .then(
        (result) => {
          alert("Reference submitted successfully!");
          handleClose();
        },
        (error) => {
          alert("Failed to send! Please try again.");
        }
      );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 1,
        }}
      >
        Upload Your Reference
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ paddingBottom: 1 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Portrait: <strong>{title}</strong>
        </Typography>

        <form ref={form} onSubmit={sendEmail}>
          <input type="hidden" name="portrait_title" value={title} />

          <TextField
            name="user_name"
            label="Your Name"
            fullWidth
            required
            variant="outlined"
            margin="dense"
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            name="user_email"
            label="Your Email"
            type="email"
            fullWidth
            required
            variant="outlined"
            margin="dense"
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            name="user_phone"
            label="Phone Number"
            type="tel"
            fullWidth
            required
            variant="outlined"
            margin="dense"
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            name="user_address"
            label="Address"
            multiline
            rows={2}
            fullWidth
            required
            variant="outlined"
            margin="dense"
            size="small"
            sx={{ mb: 1 }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Upload Reference Image
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <label htmlFor="user_file">
                <input
                  id="user_file"
                  name="user_file"
                  type="file"
                  required
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setFileName(
                      e.target.files.length ? e.target.files[0].name : "No file chosen"
                    )
                  }
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AttachFileIcon />}
                  size="small"
                >
                  Choose File
                </Button>
              </label>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                {fileName}
              </Typography>
            </Box>
          </Box>

          <DialogActions sx={{ padding: 1 }}>
            <Button
              onClick={handleClose}
              color="secondary"
              size="small"
              sx={{ fontSize: "0.875rem" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              size="small"
              sx={{ fontSize: "0.875rem" }}
            >
              Submit Reference
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
