import Head from "next/head";
import { Container, Typography, Divider } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import GavelIcon from '@mui/icons-material/Gavel';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Footer from "@/components/FooterEl";

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Disclaimer | Webitya</title>
        <meta name="description" content="Read our detailed disclaimer to understand the scope of liability, external links, and professional advice limitations for Webitya's digital marketing services and courses." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="disclaimer, Webitya, liability, digital marketing, external links, professional advice" />
        <meta property="og:title" content="Disclaimer | Webitya" />
        <meta property="og:description" content="Understand the disclaimer and limitations of Webitya’s digital marketing content, course materials, and external links." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.webitya.com/disclaimer" />
        <meta property="og:image" content="https://www.webitya.com/assets/disclaimer-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Disclaimer | Webitya" />
        <meta name="twitter:description" content="Read the disclaimer for Webitya's marketing services and training programs." />
        <meta name="twitter:image" content="https://www.webitya.com/assets/disclaimer-og-image.jpg" />
      </Head>

      <main className="bg-gray-50 py-6 min-h-screen">
        <Container>
          <div className="flex items-center gap-2 mb-6">
            <InfoOutlinedIcon className="text-blue-600" />
            <Typography variant="h1" className="font-bold !text-4xl">Disclaimer</Typography>
          </div>

          <Typography variant="subtitle1" className="mb-6">Last updated: April 5, 2025</Typography>

          <Divider className="my-6" />

          <section className="mb-6">
            <Typography variant="h6" className="font-semibold mb-2">General Disclaimer</Typography>
            <Typography>
              All information provided on this website by Webitya (“we,” “us,” or “our”) is published in good faith and for general informational purposes only. While we strive for accuracy, we make no guarantees of completeness, reliability, or accuracy. Any action you take based upon the information found on this website is strictly at your own risk.
            </Typography>
          </section>

          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <LinkOffIcon className="text-gray-900" />
              <Typography variant="h6" className="font-semibold">External Links Disclaimer</Typography>
            </div>
            <Typography>
              Our website may contain links to other websites or content belonging to or originating from third parties. These external links are provided for convenience only. We do not monitor or verify the accuracy, relevance, timeliness, or completeness of any external content. Webitya does not accept any responsibility or liability for these external sites.
            </Typography>
          </section>

          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <GavelIcon className="text-gray-900" />
              <Typography variant="h6" className="font-semibold">Professional Disclaimer</Typography>
            </div>
            <Typography>
              The content available on Webitya’s website and associated services does not constitute professional advice of any kind, including legal, financial, or business strategy. Users are encouraged to seek the advice of qualified professionals for their specific situations. All educational and marketing materials are intended for informational and training purposes only.
            </Typography>
          </section>

          <section className="mb-6">
            <Typography variant="h6" className="font-semibold mb-2">No Guarantees of Results</Typography>
            <Typography>
              Webitya does not guarantee any specific results from using our services or enrolling in our courses. Outcomes depend on multiple variables including, but not limited to, market conditions, business models, personal effort, and implementation strategies.
            </Typography>
          </section>

          <section className="mb-6">
            <Typography variant="h6" className="font-semibold mb-2">Affiliate & Advertising Disclaimer</Typography>
            <Typography>
              Webitya may participate in affiliate marketing and display advertisements. This means we may earn commissions if you click or purchase via certain links, at no additional cost to you. These partnerships do not influence our content or recommendations.
            </Typography>
          </section>

          <section className="mb-6">
            <Typography variant="h6" className="font-semibold mb-2">Limitation of Liability</Typography>
            <Typography>
              Under no circumstances shall Webitya, its team members, affiliates, or partners be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of our website or services.
            </Typography>
          </section>

          <Divider className="my-6" />

          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <ContactSupportIcon className="text-gray-900" />
              <Typography variant="h6" className="font-semibold">Contact Us</Typography>
            </div>
            <Typography>
              If you have any questions regarding this disclaimer, feel free to contact us:
            </Typography>
            <ul className="list-none ml-0 mt-2 text-gray-900">
              <li><strong>Email:</strong> webitya@gmail.com</li>
              <li><strong>Phone:</strong> +91-7970409108</li>
              <li><strong>Address:</strong> Webitya Web Services, Ganga Nagar Harmu Ranchi, Jharkhand 834002</li>
            </ul>
          </section>
        </Container>
        <Footer/>
      </main>
    </>
  );
}