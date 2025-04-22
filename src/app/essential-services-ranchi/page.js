import Head from "next/head";
import { Box, Typography } from "@mui/material";
import ServiceFiltersClient from "../../components/EssentialServices/MainPage"; 
import essentialServices from "../../components/EssentialServices/Data/essentialServices";  // assuming this is server-side data
import Footer from "@/components/FooterEl";

// ✅ SEO metadata generator for Essential Services page
export async function generateMetadata() {
  return {
    title: "Essential Services in Ranchi | Service Directory",
    description: "Explore essential services like plumbers, electricians, and more in Ranchi. Find trusted service providers near you with detailed information and ratings.",
    keywords: "essential services, ranchi, plumbers, electricians, painters, service directory",
    openGraph: {
      title: "Essential Services in Ranchi",
      description: "Explore essential services like plumbers, electricians, and more in Ranchi. Find trusted service providers near you with detailed information and ratings.",
      images: [
        {
          url: "https://yourwebsite.com/images/essential-services-thumbnail.jpg",  // Replace with your image URL
          width: 800,
          height: 600,
          alt: "Essential Services in Ranchi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Essential Services in Ranchi",
      description: "Explore essential services like plumbers, electricians, and more in Ranchi. Find trusted service providers near you with detailed information and ratings.",
      images: ["https://yourwebsite.com/images/essential-services-thumbnail.jpg"],  // Replace with your image URL
    },
  };
}

export default function EssentialServicesPage() {
  return (
    <>
      <Head>
        <title>Essential Services in Ranchi | Service Directory</title>
        <meta name="description" content="Explore essential services like plumbers, electricians, and more in Ranchi. Find trusted service providers near you with detailed information and ratings." />
        <meta name="keywords" content="essential services, ranchi, plumbers, electricians, painters, service directory" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Essential Services in Ranchi" />
        <meta property="og:description" content="Explore essential services like plumbers, electricians, and more in Ranchi. Find trusted service providers near you with detailed information and ratings." />
        <meta property="og:image" content="https://yourwebsite.com/images/essential-services-thumbnail.jpg" /> {/* Image for preview */}
        <meta property="og:url" content="https://yourwebsite.com/essential-services" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Essential Services in Ranchi" />
        <meta name="twitter:description" content="Explore essential services like plumbers, electricians, and more in Ranchi. Find trusted service providers near you with detailed information and ratings." />
        <meta name="twitter:image" content="https://yourwebsite.com/images/essential-services-thumbnail.jpg" /> {/* Image for Twitter */}
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ p: { xs: 2, md: 6 } }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Essential Services in Ranchi
        </Typography>

        {/* Pass all services to client component */}
        <ServiceFiltersClient services={essentialServices} />
      </Box>
      <Footer/>
    </>
  );
}
