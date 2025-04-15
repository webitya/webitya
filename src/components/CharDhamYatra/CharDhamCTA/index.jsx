"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CharDhamCTA = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6"
        >
          Ready to Begin Your Sacred Journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Embrace the spiritual vibrations of the Himalayas and let your soul
          reconnect with the divine. Our team is here to ensure your Char Dham
          Yatra is seamless, soulful, and unforgettable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="inline-block bg-yellow-500 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:bg-yellow-600 transition"
          >
            Plan My Yatra ✨
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CharDhamCTA;
