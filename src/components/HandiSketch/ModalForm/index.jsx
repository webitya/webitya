import { useState } from "react";
import emailjs from "emailjs-com";
import { Modal, Box, TextField, Button, IconButton, Grid, InputAdornment, Typography } from "@mui/material";
import { Close as CloseIcon, Phone as PhoneIcon, Email as EmailIcon, LocationOn as LocationIcon } from "@mui/icons-material";

export default function ModalForm({ open, handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "", // New field for user description or requirements
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // To store validation errors

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.description) newErrors.description = "Description is required."; // Validation for the new field
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submitting
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    emailjs
      .send(
        "service_webitya", // Replace with your EmailJS service ID
        "template_y9g4vob", // Replace with your template ID
        formData,
        "Iw_1wMHg3mqNItEUH" // Replace with your user ID from EmailJS
      )
      .then(
        (response) => {
          setMessage("Your enquiry has been sent successfully!");
          setFormData({ name: "", email: "", phone: "", address: "", description: "" });
          setErrors({}); // Clear errors on successful submission
        },
        (error) => {
          setMessage("There was an error sending your enquiry.");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="p-4 bg-white rounded-lg shadow-md w-[90%] max-w-md mx-auto mt-20">
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" className="font-bold">Enquiry Form</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Grid>

        {/* Display success or error message */}
        {message && (
          <div className="mb-2 text-center">
            <Typography variant="body2">{message}</Typography>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="dense"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="dense"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
            margin="dense"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
            margin="dense"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="User Description / Requirements"
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            margin="dense"
            size="small"
            multiline
            rows={3}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4 py-1"
            disabled={isSubmitting}
            size="small"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
