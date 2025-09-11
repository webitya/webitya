import Head from "next/head"; 
import { Container, Typography, Divider } from "@mui/material";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SecurityIcon from '@mui/icons-material/Security';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import PublicIcon from '@mui/icons-material/Public';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Footer from "@/components/FooterEl";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Webitya - Digital Marketing Services & Courses</title>
        <meta
          name="description"
          content="Read Webitya's comprehensive privacy policy detailing how your data is collected, used, and protected when you use our digital marketing services and online courses."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="privacy policy, Webitya, digital marketing privacy, marketing courses, data protection, user rights, GDPR, CCPA" />
        <meta property="og:title" content="Privacy Policy | Webitya" />
        <meta property="og:description" content="Webitya's privacy policy explains how we collect, use, and protect your data when using our marketing services or enrolling in courses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.webitya.com/privacy-policy" />
        <meta property="og:image" content="https://www.webitya.com/assets/privacy-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | Webitya" />
        <meta name="twitter:description" content="Complete privacy policy for Webitya's digital marketing services and training programs." />
        <meta name="twitter:image" content="https://www.webitya.com/assets/privacy-og-image.jpg" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
          {
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            "url": "https://www.webitya.com/privacy-policy",
            "publisher": {
              "@type": "Organization",
              "name": "Webitya",
              "url": "https://www.webitya.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.webitya.com/assets/logo.png"
              }
            },
            "description": "This Privacy Policy explains how Webitya collects, uses, and protects user data in accordance with GDPR and CCPA."
          }
        ` }} />
      </Head>

      <main className="bg-gray-50 py-4 min-h-screen">
        <Container>
          <div className="flex items-center gap-2 mb-6">
            <PrivacyTipIcon className="text-blue-600" fontSize="large" />
            <Typography variant="h1" className="font-bold !text-3xl">Privacy Policy</Typography>
          </div>

          <Typography variant="subtitle1" className="mb-4">Effective Date: April 5, 2025</Typography>
          <Typography className="mb-6">
            This Privacy Policy outlines how Webitya (“we,” “our,” or “us”) collects, uses, discloses, and protects your information when you access or use our website, digital marketing services, and digital marketing courses. By using our services, you agree to this policy.
          </Typography>

          <Divider className="my-6" />

          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <InfoIcon className="text-gray-900" />
              <Typography variant="h6" className="font-semibold">1. Information We Collect</Typography>
            </div>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li><strong>Personal Information:</strong> Full name, email, phone number, address, job title, company, billing details.</li>
              <li><strong>Account Data:</strong> Login credentials, preferences, subscription choices.</li>
              <li><strong>Course Data:</strong> Progress, certifications, reviews, quizzes.</li>
              <li><strong>Marketing Data:</strong> Communication preferences, form data, campaign interactions.</li>
              <li><strong>Technical Info:</strong> IP address, device info, cookies, browser type, interaction logs.</li>
            </ul>
          </section>

          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <DataUsageIcon className="text-gray-900" />
              <Typography variant="h6" className="font-semibold">2. How We Use Your Information</Typography>
            </div>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>To provide digital marketing services and educational content.</li>
              <li>To process payments and verify accounts.</li>
              <li>To send updates, promotional offers, and newsletters.</li>
              <li>To monitor course performance and user engagement.</li>
              <li>To comply with legal and regulatory requirements.</li>
              <li>To protect against fraudulent, unauthorized, or illegal activity.</li>
            </ul>
          </section>

          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <GavelIcon className="text-gray-900" />
              <Typography variant="h6" className="font-semibold">3. Legal Grounds (GDPR)</Typography>
            </div>
            <ul className="list-disc ml-6 text-gray-700">
              <li><strong>Consent:</strong> You opt-in to receive communications or register for courses.</li>
              <li><strong>Contract:</strong> We process data to fulfill your service agreement.</li>
              <li><strong>Legal Obligation:</strong> Tax, fraud, or regulatory compliance.</li>
              <li><strong>Legitimate Interest:</strong> To optimize, secure, and improve service delivery.</li>
            </ul>
          </section>

          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <PublicIcon className="text-gray-900" />
              <Typography variant="h6" className="font-semibold">4. Third-Party Sharing</Typography>
            </div>
            <Typography>
              We never sell your data. Your data may be shared with:
            </Typography>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Payment gateways (Razorpay, Stripe)</li>
              <li>Email tools (EmailJS, Mailchimp)</li>
              <li>Analytics (Google Analytics, Meta Pixel)</li>
              <li>Learning platforms or webinar services</li>
              <li>Legal authorities if required</li>
            </ul>
          </section>

          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <SecurityIcon className="text-gray-900" />
              <Typography variant="h6" className="font-semibold">5. Data Security</Typography>
            </div>
            <Typography>
              We implement SSL encryption, firewalls, access control, and periodic security audits. While we work hard to safeguard your data, no system is 100% secure.
            </Typography>
          </section>

          <section className="mb-6">
            <Typography variant="h6" className="font-semibold mb-2">6. Cookies & Tracking</Typography>
            <Typography>
              We use cookies to:
            </Typography>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Track site activity and analytics</li>
              <li>Personalize experiences</li>
              <li>Maintain login sessions</li>
              <li>Retarget advertisements</li>
            </ul>
            <Typography className="mt-2">You may disable cookies in your browser settings.</Typography>
          </section>

          <section className="mb-6">
            <Typography variant="h6" className="font-semibold mb-2">7. Data Retention</Typography>
            <Typography>
              We retain user data only as long as necessary. When data is no longer required, we delete or anonymize it securely.
            </Typography>
          </section>

          <section className="mb-6">
            <Typography variant="h6" className="font-semibold mb-2">8. Your Rights</Typography>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Access, edit, or delete your data</li>
              <li>Withdraw consent</li>
              <li>Object to processing</li>
              <li>Request data portability</li>
              <li>File a complaint with your data protection authority</li>
            </ul>
          </section>

          <section className="mb-6">
            <Typography variant="h6" className="font-semibold mb-2">9. Updates to This Policy</Typography>
            <Typography>
              We may update this privacy policy as needed. Updates will be posted with a new effective date. Continued use of our site indicates acceptance.
            </Typography>
          </section>

          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <ContactSupportIcon className="text-gray-900" />
              <Typography variant="h6" className="font-semibold">10. Contact Us</Typography>
            </div>
            <ul className="list-none ml-0 mt-2 text-gray-700">
              <li><strong>Email:</strong> webitya@gmail.com</li>
              <li><strong>Phone:</strong> +91-9693245941</li>
              <li><strong>Address:</strong> Webitya Web Services, Ganga Nagar Harmu Ranchi, Jharkhand 834002</li>
            </ul>
          </section>
        </Container>
        <Footer/>
      </main>
    </>
  );
}