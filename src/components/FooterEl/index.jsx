'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import {
  GitHub,
  Twitter,
  LinkedIn,
  YouTube,
  Instagram,
} from '@mui/icons-material';
import emailjs from 'emailjs-com';

const footerData = [
  {
    title: 'Resources',
    links: [
      { name: 'Docs', href: '#' },
      { name: 'Learn', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'FAQS', href: '/faqs' },
      { name: 'Team', href: '#' },
      { name: 'SEO Analytics', href: '#' },
      { name: 'Events', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'SEO', href: '#' },
      { name: 'Social Media Marketing', href: '#' },
      { name: 'PPC Advertising', href: '#' },
      { name: 'Email Marketing', href: '#' },
      { name: 'Content Marketing', href: '#' },
      { name: 'Web Design', href: '#' },
    ],
  },
  {
    title: 'Courses',
    links: [
      { name: 'SEO', href: '#' },
      { name: 'Social Media Marketing', href: '#' },
      { name: 'PPC Advertising', href: '#' },
      { name: 'Email Marketing', href: '#' },
      { name: 'Content Marketing', href: '#' },
      { name: 'Web Design', href: '#' },
    ],
  },
  {
    title: 'About us',
    links: [
      { name: 'Privacy', href: '/legal/privacy-policy' },
      { name: 'Terms of service', href: '/legal/terms' },
      { name: 'Disclaimer', href: '/legal/disclaimer' },
      { name: 'Contact', href: '/contact-us' },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const handleSubscribe = (e) => {
    e.preventDefault();
    emailjs
      .send('service_webitya', 'template_y9g4vob', { email }, 'Iw_1wMHg3mqNItEUH')
      .then(() => {
        alert('Subscription successful!');
        setEmail('');
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <Box component="footer" bgcolor="#111827" color="#D1D5DB" py={8} px={4}>
      <Grid
        container
        spacing={4}
        maxWidth="lg"
        mx="auto"
        alignItems="stretch"
        justifyContent="space-between"
      >
        {/* Column 1: Logo + Description + Newsletter */}
        <Grid item xs={12} sm={6} md={2.4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box mb={2}>
            <img src="/logo.png" alt="WEBITYA Logo" style={{ width: '130px' }} />
          </Box>
          <Typography variant="body2" mb={2}>
            WEBITYA is your trusted digital marketing agency<br></br> specializing in SEO,
            Social Media, <br></br> and Content Marketing.
          </Typography>

          {/* Newsletter */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Subscribe to our Newsletter
          </Typography>
          <Typography variant="body2" mb={2}>
            Get the latest tips, news & insights from WEBITYA.
          </Typography>
          <Box component="form" onSubmit={handleSubscribe} sx={{ maxWidth: 300 }}>
            <TextField
              variant="filled"
              fullWidth
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: '#1F2937',
                  borderRadius: '6px',
                  color: 'white',
                },
              }}
              inputProps={{ style: { color: 'white' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#3B82F6',
                '&:hover': { backgroundColor: '#2563EB' },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Grid>

        {/* Dynamic Link Columns */}
        {footerData.map((section, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={2.4}
            key={idx}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {section.title}
            </Typography>
            {section.links.map((link, i) => (
              <Box key={i} mb={1}>
                <Link href={link.href} passHref>
                  <Typography
                    component="a"
                    color="inherit"
                    sx={{
                      '&:hover': { color: '#ffffff' },
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    {link.name}
                  </Typography>
                </Link>
              </Box>
            ))}
          </Grid>
        ))}
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 5, borderColor: '#374151' }} />

      {/* Bottom Text + Social */}
      <Box textAlign="center">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} WEBITYA Digital Marketing Agency. All
          rights reserved.
        </Typography>
        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          <IconButton component="a" href="#" sx={{ color: '#9CA3AF' }}>
            <GitHub />
          </IconButton>
          <IconButton component="a" href="#" sx={{ color: '#9CA3AF' }}>
            <Twitter />
          </IconButton>
          <IconButton component="a" href="#" sx={{ color: '#9CA3AF' }}>
            <LinkedIn />
          </IconButton>
          <IconButton component="a" href="#" sx={{ color: '#9CA3AF' }}>
            <YouTube />
          </IconButton>
          <IconButton component="a" href="#" sx={{ color: '#9CA3AF' }}>
            <Instagram />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
