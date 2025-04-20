'use client';
import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Fade,
  Backdrop,
} from '@mui/material';
import {
  InfoOutlined,
  CheckCircleOutline,
  ErrorOutline,
  WarningAmberRounded,
  Close as CloseIcon,
} from '@mui/icons-material';

// Icon map using MUI icons
const iconMap = {
  info: {
    icon: <InfoOutlined sx={{ fontSize: 50, color: '#5c6bc0' }} />,
  },
  check_circle: {
    icon: <CheckCircleOutline sx={{ fontSize: 50, color: '#66bb6a' }} />,
  },
  error: {
    icon: <ErrorOutline sx={{ fontSize: 50, color: '#ef5350' }} />,
  },
  warning: {
    icon: <WarningAmberRounded sx={{ fontSize: 50, color: '#ffa726' }} />,
  },
};

// Soft white glass style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(240, 240, 240, 0.7)',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
  p: 4,
  textAlign: 'center',
};

export default function GlassModal({
  isOpen,
  title,
  message,
  icon = 'info',
  onClose,
}) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300 }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          {/* Close Button */}
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={onClose} sx={{ color: '#888' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Icon */}
          <Box mb={2}>{iconMap[icon]?.icon || iconMap.info.icon}</Box>

          {/* Title */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: '#222',
              mb: 1,
              letterSpacing: '0.3px',
            }}
          >
            {title}
          </Typography>

          {/* Message */}
          <Typography
            variant="body2"
            sx={{
              color: '#555',
              lineHeight: 1.6,
              fontSize: '0.95rem',
            }}
          >
            {message}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
