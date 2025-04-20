'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  FormHelperText,
  Alert,
  FormControl,
  InputLabel,
  Paper,
  Divider,
  Stack,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Delete as DeleteIcon,
  InfoOutlined,
  CheckCircleOutline,
} from '@mui/icons-material';
import Modal from '../SendEmailFunctionModal'; // Adjust path accordingly

export default function SenderForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [senders, setSenders] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    icon: 'info',
    iconColor: 'blue',
  });

  const showModal = ({ title, message, icon = 'info', iconColor = 'blue' }) => {
    setModal({ isOpen: true, title, message, icon, iconColor });
  };

  const closeModal = () => setModal({ ...modal, isOpen: false });

  useEffect(() => {
    const storedSenders = JSON.parse(localStorage.getItem('senders') || '[]');
    setSenders(storedSenders);

    const saved = localStorage.getItem('selectedSender');
    if (saved) setSelectedEmail(saved);
  }, []);

  const saveSender = () => {
    if (!email || !password) {
      setValidationError('Please enter both email and app password.');
      return;
    }

    const exists = senders.some(sender => sender.email === email);
    if (exists) {
      showModal({
        title: 'Duplicate Sender',
        message: 'This sender email is already saved.',
        icon: 'info',
        iconColor: 'blue',
      });
      return;
    }

    const newSender = { email, pass: password.replace(/\s/g, '') };
    const updatedSenders = [...senders, newSender];
    localStorage.setItem('senders', JSON.stringify(updatedSenders));
    localStorage.setItem('selectedSender', email);

    setSenders(updatedSenders);
    setEmail('');
    setPassword('');
    setSelectedEmail('');
    setValidationError('');

    showModal({
      title: 'Saved!',
      message: 'Sender email saved successfully.',
      icon: 'check_circle',
      iconColor: 'green',
    });
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setSelectedEmail('');
    setValidationError('');
  };

  const handleSelect = (selected) => {
    setSelectedEmail(selected);
    localStorage.setItem('selectedSender', selected);
    const found = senders.find(sender => sender.email === selected);
    if (found) {
      setEmail(found.email);
      setPassword(found.pass);
    }
  };

  const deleteSender = (emailToDelete) => {
    const updated = senders.filter(sender => sender.email !== emailToDelete);
    localStorage.setItem('senders', JSON.stringify(updated));
    setSenders(updated);
    localStorage.removeItem('selectedSender');

    if (selectedEmail === emailToDelete) {
      resetForm();
    }
  };

  return (
    <>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 6,
          mt: 4,
          background: 'linear-gradient(to bottom right, #ffffff, #f9fbfc)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.05)',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={1} color="primary">
          Manage Sender Emails
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Total Saved: {senders.length}
        </Typography>

        <Alert
          severity="info"
          icon={<InfoOutlined />}
          sx={{ mb: 4, background: '#e3f2fd', borderRadius: 2 }}
        >
          Use an <strong>App Password</strong> instead of your regular email password. You can generate this in your email account settings for secure access.
        </Alert>

        {senders.length > 0 && (
       <FormControl sx={{ width: '95vw', mb: 3 }}>
       <InputLabel>Select a Saved Sender</InputLabel>
       <Box sx={{ display: 'flex', alignItems: 'center' }}>
         <Select
           value={selectedEmail}
           label="Select a Saved Sender"
           onChange={(e) => handleSelect(e.target.value)}
           fullWidth
         >
           <MenuItem value="">-- Choose Sender --</MenuItem>
           {senders.map((sender, index) => (
             <MenuItem key={index} value={sender.email}>
               {sender.email}
             </MenuItem>
           ))}
         </Select>
     
         {selectedEmail && (
           <IconButton
             onClick={() => deleteSender(selectedEmail)}
             color="error"
             title="Delete Sender"
             sx={{ ml: 1 }}
           >
             <DeleteIcon />
           </IconButton>
         )}
       </Box>
     </FormControl>
     
     
        )}

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Sender Email"
            type="email"
            placeholder="e.g. sender@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="App Password"
            placeholder="App-specific password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {validationError && (
            <FormHelperText error>{validationError}</FormHelperText>
          )}
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={saveSender}
            startIcon={<CheckCircleOutline />}
            sx={{ borderRadius: 2, px: 3, py: 1 }}
          >
            Save Sender
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={resetForm}
            sx={{ borderRadius: 2, px: 3, py: 1 }}
          >
            Reset
          </Button>
        </Box>
      </Paper>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        icon={modal.icon}
        iconColor={modal.iconColor}
        onClose={closeModal}
      />
    </>
  );
}
