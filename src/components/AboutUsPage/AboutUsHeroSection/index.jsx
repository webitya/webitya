const AboutHeroSection = () => {
  return (
    <section className="bg-white px-3 md:px-10 md:py-24 mt-13 py-5 flex flex-col md:flex-row items-center gap-10">
      {/* Left: Text Content */}
      <div className="md:w-1/2">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
          About <span className="text-blue-600">Webitya</span>
        </h2>
        <p className="text-gray-700 mt-6 text-lg leading-relaxed">
          At <strong>Webitya Web Services</strong>, we help businesses grow through clean design, SEO-first strategy, and effective digital marketing.
          Our mission is to build your online presence with clarity, creativity, and performance.
        </p>
        <p className="text-gray-600 mt-4 text-base leading-relaxed">
          With deep expertise in <strong>website development</strong>, <strong>search engine optimization</strong>, and <strong>performance marketing</strong>,
          we bring your brand closer to the audience it deserves — driving visibility, engagement, and measurable growth.
        </p>

        {/* Call to Action Button */}
        <div className="mt-8">
  <a
    href="/contact-us"
    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200 ease-in-out ring-1 ring-transparent hover:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    Contact Us
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </a>
</div>

      </div>

      {/* Right: Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/aboutHero.webp"
          alt="Team working illustration"
          className="w-full max-w-md rounded-xl shadow-sm object-cover"
        />
      </div>
    </section>
  );
};

export default AboutHeroSection;
