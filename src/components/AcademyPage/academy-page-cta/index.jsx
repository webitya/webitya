import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white">
      <div className="px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of successful graduates who have changed their lives through our academy. Your future starts
            here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 font-semibold transition-colors">
              Apply Now
              <ArrowRightAltIcon className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white text-white hover:bg-indigo-700 font-semibold transition-colors">
              Schedule a Consultation
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Programs Starting", value: "Monthly" },
              { label: "Financing Options", value: "Available" },
              { label: "Job Guarantee", value: "Yes" },
              { label: "Alumni Network", value: "2,000+" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold mb-1">{item.value}</div>
                <div className="text-sm text-indigo-200">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-indigo-500">
            <p className="text-indigo-200 mb-6">Have questions? We're here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-700 hover:bg-indigo-600 transition-colors"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Contact Us
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-700 hover:bg-indigo-600 transition-colors"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
