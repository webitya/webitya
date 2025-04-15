"use client";

import { motion } from "framer-motion";

const trustedAgents = [
  {
    name: "Shri Hari Travels",
    location: "Haridwar, Uttarakhand",
    image: "/agents/shri-hari.jpg",
  },
  {
    name: "Divine Yatra Tours",
    location: "Rishikesh, Uttarakhand",
    image: "/agents/divine-yatra.jpg",
  },
  {
    name: "Bhakti Path",
    location: "Varanasi, Uttar Pradesh",
    image: "/agents/bhakti-path.jpg",
  },
  {
    name: "Holy Steps Tours",
    location: "Delhi NCR",
    image: "/agents/holy-steps.jpg",
  },
  {
    name: "Chardham Connect",
    location: "Dehradun, Uttarakhand",
    image: "/agents/chardham-connect.jpg",
  },
  {
    name: "Spiritual Journeys",
    location: "Ahmedabad, Gujarat",
    image: "/agents/spiritual-journeys.jpg",
  },
];

const CharDhamTrustedAgents = () => {
  return (
    <section className="bg-[#f9fafb] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
          Our Trusted Tour Agents & Agencies
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We proudly collaborate with experienced and spiritually aligned agents who ensure that every Yatra is filled with comfort, guidance, and devotion.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {trustedAgents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
            >
              <img
                src={agent.image}
                alt={agent.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharDhamTrustedAgents;
