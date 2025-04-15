"use client";

import { motion } from "framer-motion";

const CharDhamRouteMap = () => {
  return (
    <section className="bg-[#f1f7fb] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
          The Sacred Route of Char Dham Yatra
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Embark on the divine journey from Haridwar to the sacred Char Dham,
          traversing the spiritual peaks and ancient temples. Follow the route
          that will lead you to spiritual awakening.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full"
        >
          {/* Replace the src with your route map image */}
          <img
            src="/images/char-dham-route.jpg"
            alt="Char Dham Route Map"
            className="w-full rounded-xl shadow-lg"
          />
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="bg-white bg-opacity-40 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800">
                Haridwar → Yamunotri → Gangotri → Kedarnath → Badrinath
              </h3>
            </div>
          </div>
        </motion.div>

        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-8 text-gray-800"
          >
            <div>
              <h4 className="text-lg font-semibold">Yamunotri</h4>
              <p className="text-sm text-gray-600">The origin of River Yamuna, a sacred place for pilgrims.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Gangotri</h4>
              <p className="text-sm text-gray-600">Where the sacred River Ganga is believed to have descended to Earth.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Kedarnath</h4>
              <p className="text-sm text-gray-600">The home of Lord Shiva, surrounded by snow-clad peaks.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Badrinath</h4>
              <p className="text-sm text-gray-600">The abode of Lord Vishnu, a place of eternal peace.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CharDhamRouteMap;
