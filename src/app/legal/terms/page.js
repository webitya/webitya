import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Webitya</title>
        <meta
          name="description"
          content="Read our detailed Terms & Conditions to understand your rights and obligations when using Webitya’s digital marketing, SEO, and training services."
        />
        <meta
          name="keywords"
          content="Terms and Conditions, Webitya, Digital Marketing Terms, SEO Service Terms, Online Course Terms, Webitya Policies"
        />
        <meta name="author" content="Webitya Web Services" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Terms & Conditions | Webitya" />
        <meta
          property="og:description"
          content="Understand your rights and obligations when accessing Webitya's services including SEO, digital marketing, and online training."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://webitya.in/terms" />
        <meta property="og:site_name" content="Webitya" />
        <meta property="og:image" content="https://webitya.in/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms & Conditions | Webitya" />
        <meta
          name="twitter:description"
          content="View Webitya's terms of use covering digital marketing services, online courses, and more."
        />
        <meta name="twitter:image" content="https://webitya.in/og-image.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://webitya.in/terms" />
      </Head>

      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
        <p>Last updated: April 5, 2025</p>

        <h2 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Webitya ("we," "us," or "our") and its services including digital marketing, SEO, email marketing, and online training courses, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Eligibility</h2>
        <p>
          You must be at least 18 years of age to use our services. By using our website, you represent that you have the legal capacity to enter into this agreement.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Intellectual Property Rights</h2>
        <p>
          All content, trademarks, logos, graphics, videos, texts, and materials available on Webitya are the exclusive intellectual property of Webitya or our licensors. Unauthorized use, reproduction, or distribution is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. User Responsibilities</h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          <li>You agree not to use our services for any unlawful or prohibited purpose.</li>
          <li>You must not attempt to gain unauthorized access to any part of the website or its services.</li>
          <li>You agree not to engage in any activity that may disrupt or harm the operation of the platform.</li>
          <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">5. Payments & Subscriptions</h2>
        <p>
          All fees for services or courses must be paid in full and are non-refundable unless otherwise stated. We use third-party payment processors to handle transactions securely.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to our services if you violate any of the terms or engage in harmful conduct.
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the content, accuracy, or policies of any external websites.
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Disclaimer of Warranties</h2>
        <p>
          Webitya provides all services "as is" and does not guarantee error-free or uninterrupted services. We disclaim all warranties to the maximum extent permitted by law.
        </p>

        <h2 className="text-xl font-semibold mt-6">9. Limitation of Liability</h2>
        <p>
          In no event shall Webitya be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use our services.
        </p>

        <h2 className="text-xl font-semibold mt-6">10. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be resolved in the courts of Ranchi, Jharkhand.
        </p>

        <h2 className="text-xl font-semibold mt-6">11. Changes to These Terms</h2>
        <p>
          We may revise these Terms from time to time. All changes will be posted on this page with the updated date. Continued use of our site implies acceptance of the revised terms.
        </p>

        <h2 className="text-xl font-semibold mt-6">12. Contact Us</h2>
        <p>
          For questions or concerns regarding these Terms & Conditions, you may contact us at
          <a href="mailto:contact@webitya.in" className="text-blue-500"> contact@webitya.in</a>.
        </p>
      </main>
    </>
  );
}
