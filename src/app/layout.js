import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
import Navbar from "@/components/Navbar";
import FooterEl from "@/components/FooterEl";
// import { WhatsAppOutlined, PhoneOutlined } from "@ant-design/icons";
import { IconButton, Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script"; // Import Next.js Script component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "W E B I T Y A",
  description: "Webitya Web Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <head>
        <link rel="icon" type="image/jpeg" href="/favicon.jpg" />
      </head>
        {/* Google AdSense Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-6282388187810840" />

        {/* Google AdSense Scripts */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6282388187810840"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* AMP Auto Ads Script */}
        <Script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* AMP Auto Ads */}
        <amp-auto-ads
          type="adsense"
          data-ad-client="ca-pub-6282388187810840"
        ></amp-auto-ads>

        <Navbar />
        <Box
  component="main"
  sx={{
    mt: { xs: 7, sm: 5, md: 3, lg: 7, xl: 16 }, // Example: decreasing top margin as screen gets bigger
    mb: { xs: 4, sm: 3, md: 2, lg: 1, xl: 7 }, // Example: optional bottom margin
    px: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }, // Example: increasing padding horizontally
  }}
  
>
  {children}
</Box>
 {/* Vercel Analytics Component */}
 <Analytics />
 <SpeedInsights/>
        {/* <FooterEl /> */}

        {/* Floating Icons */}
        <Box
  sx={{
    position: "fixed",
    bottom: 16,
    right: 16,
    display: "flex",
    flexDirection: "column",
    gap: 1,
    zIndex: 999,
  }}
>
  <IconButton
    component="a"
    href="https://wa.me/919693245941?text=Hello%20Webitya"
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      backgroundColor: "black",
      color: "white",
      borderRadius: 1, // sharp edges
      "&:hover": {
        backgroundColor: "grey.800",
      },
      width: 40,
      height: 40,
      boxShadow: 3,
    }}
  >
    <WhatsAppIcon fontSize="small" />
  </IconButton>

  <IconButton
    component="a"
    href="tel:9693245941"
    sx={{
      backgroundColor: "black",
      color: "white",
      borderRadius: 1, // sharp edges
      "&:hover": {
        backgroundColor: "grey.800",
      },
      width: 40,
      height: 40,
      boxShadow: 3,
    }}
  >
    <PhoneIcon fontSize="small" />
  </IconButton>
</Box>

      </body>
    </html>
  );
}
